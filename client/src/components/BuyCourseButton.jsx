import React from "react";
import { Button } from "@/components/ui/button";
import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId, isEnrolled }) => {
  const navigate = useNavigate();
  const [createCheckoutSession, { isLoading }] =
    useCreateCheckoutSessionMutation();

  const handleAction = async (courseId) => {
    if (isEnrolled) {
      navigate(`/course-progress/${courseId}`);
    } else {
      try {
        const response = await createCheckoutSession(courseId).unwrap();
        if (response.url) {
          window.location.assign(response.url);  
        }
      } catch (error) {
        toast.error(error?.data?.message || "Failed to initiate purchase.");
      }
    }
  };

  return (
    <Button
     onClick={() => handleAction(courseId)}
      disabled={isLoading}
      className="w-full py-6 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-lg transition-all"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : isEnrolled ? (
        "Continue Learning"
      ) : (
        "Buy Now"
      )}
    </Button>
  );
};

export default BuyCourseButton;
