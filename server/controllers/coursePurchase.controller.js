import Stripe from "stripe";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { CourseProgress } from "../models/courseProgress.model.js";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.courseTitle,
              images: [course.courseThumbnail],
            },
            unit_amount: course.coursePrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/course-progress/${courseId}`,
      cancel_url: `http://localhost:5173/course-detail/${courseId}`,
      metadata: {
        courseId,
        userId,
      },
    });

    //  Create a record in your Purchase model with 'pending' status
    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
      paymentId: session.id,
    });

    await newPurchase.save();

    return res.status(200).json({
      success: true,
      url: session.url, 
    });
  } catch (error) {
    console.error("Checkout Error:", error);
    return res.status(500).json({
      success: false,
      message: "Could not initiate payment",
    });
  }
};

export const stripeWebhook = async (req, res) => {
  let event;

  try {
    const signature = req.headers["stripe-signature"];

    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.error(`Webhook Error: ${error.message}`);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { courseId, userId } = session.metadata;

    try {
        const purchase = await CoursePurchase.findOneAndUpdate(
        { paymentId: session.id },
        { status: "completed" },
        { new: true },
      );

      const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        { $addToSet: { enrolledStudents: userId } },
        { new: true },
      );

      if (updatedCourse && updatedCourse.lectures.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: updatedCourse.lectures } },
          { $set: { isPreviewFree: true } },
        );
      }

      console.log(
        `Payment Success: Course ${courseId} is now fully unlocked for User ${userId}`,
      );
    } catch (dbError) {
      console.error("Database Error during Webhook:", dbError);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  res.status(200).send();
};

export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id; 

    const course = await Course.findById(courseId).populate({
      path: "lectures",
      select: "lectureTitle duration isPreviewFree"
    })
    .populate({
        path: "creator",
        select: "name photoUrl" 
      });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const purchased = course.enrolledStudents.includes(userId);

    return res.status(200).json({
      success: true,
      course,
      purchased 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllPurchasedCourses = async (req, res) => {
  try {
    const userId = req.id;

    const purchased = await CoursePurchase.find({
      userId,
      status: "completed",
    }).populate({
      path: "courseId",
      select: "courseTitle courseThumbnail coursePrice" 
    });

    if (!purchased || purchased.length === 0) {
      return res.status(200).json({
        success: true,
        purchasedCourses: [],
      });
    }

    const validPurchasedCourses = purchased
      .map((p) => p.courseId)
      .filter((course) => course !== null);

    return res.status(200).json({
      success: true,
      purchasedCourses: validPurchasedCourses,
    });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching purchased courses" 
    });
  }
};

