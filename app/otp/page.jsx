"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { newVerification } from "@/actions/auth/newVerification";
import { resendVerificationEmail } from "@/actions/auth/resend-verification";
import { toast } from "react-toastify";
import { useSignUpEmailStore } from "@/store";
import { useRouter } from "next/navigation";


export default function OTPPage() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const { email } = useSignUpEmailStore();
  const router = useRouter();

  // Add this new function to check and log completed OTP
  const checkCompleteOTP = async (newOtp) => {
    if (newOtp.every(digit => digit !== "")) {
      const otpString = newOtp.join("");
      console.log("Completed OTP:", otpString);
     
    }
  };

  // Handle OTP input
  const handleChange = (element, index) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Check if OTP is complete after each change
    checkCompleteOTP(newOtp);

    // Focus next input
    if (element.value && index < 3) {
      const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`input[name=otp-${index - 1}]`);
      if (prevInput) {
        prevInput.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    // setIsLoading(true);
    setIsResending(true);
    if(!email) {
      toast.error("Email is missing!", {
        position: "top-right",
      });
      return;
    }
    try {
      const data = await resendVerificationEmail(email);
      if (data.success) {
        toast.success("Verification email sent!", {
          position: "top-right",
        });
        setIsResending(false);
        if(data.error) {
          toast.error(data.error, {
            position: "top-right",
          });
          setIsResending(false);
        }
      }
      // Add your resend OTP logic here
      setResendTimer(30);
      const countdown = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (otp.every(digit => digit !== "")) {
      const otpString = otp.join("");
      setIsLoading(true);
      newVerification(otpString)
      .then((user) => {
        if (user.success) {
          toast.success(user.success, {
            position: "top-right",
          });
           router.push('/signin')
           return;
        }
        toast.error(user.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
        });
    
    } else {
      toast.error("Please fill in all OTP digits", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="container max-w-md mx-auto p-4 flex items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <Link 
            href="/" 
            className="text-muted-foreground hover:text-foreground inline-flex items-center mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <CardTitle className="text-2xl text-center">Enter OTP</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-4">
            {otp.map((digit, index) => (
              <Input
                key={index}
                type="text"
                name={`otp-${index}`}
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-14 h-14 text-center text-xl"
                autoComplete="off"
              />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button 
            onClick={handleSubmit}
            className="w-full bg-primary hover:bg-primary/90"
          >
           {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
           Verify OTP
          </Button>
          <Button 
            onClick={handleResendOTP} 
            variant="ghost" 
            disabled={resendTimer > 0 || isLoading}
            className="w-full"
          >
            {isResending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 