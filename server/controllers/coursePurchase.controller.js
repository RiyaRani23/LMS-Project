import Stripe from "stripe";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found!"
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
      success_url: `${process.env.FRONTEND_URL}/course-progress/${courseId}`, 
      cancel_url: `${process.env.FRONTEND_URL}/course-detail/${courseId}`,    
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
      url: session.url, // Send the Stripe link back to frontend
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
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        console.error(`Payload Error: ${error.message}`);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    // Process the payload based on the event type
    if (event.type === "checkout.session.completed") {
        const session = event.data.object; // This is your main payload object

        // Extracting data from the payload metadata
        const { courseId, userId } = session.metadata;

        try {
            // 1. Update the Purchase record using the session payload data
            await Purchase.findOneAndUpdate(
                { paymentId: session.id },
                { status: "completed" },
                { new: true }
            );

            // 2. Add student to course enrollment list
            // Using $addToSet prevents duplicate enrollments if the payload is sent twice
            await Course.findByIdAndUpdate(
                courseId,
                { $addToSet: { enrolledStudents: userId } },
                { new: true }
            );

            console.log(`Payload processed: Course ${courseId} unlocked for User ${userId}`);
        } catch (dbError) {
            console.error("Database update failed for payload:", dbError);
            return res.status(500).json({ message: "Failed to update enrollment" });
        }
    }
    res.status(200).send();
};

