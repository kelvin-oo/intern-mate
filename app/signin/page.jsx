"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { GoogleButton } from "@/components/ui/google-button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth/login";
import { toast } from "react-toastify";
import ComponentLevelLoader from "@/components/Loader";
import { Loader2 } from "lucide-react";



export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  // const router = useRouter();
  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const {  email, password } =
      formData || {};



    if (!email) {
      toast.error("Please enter email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);

      return;
    }

    if (!password) {
      toast.error("Please enter password!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);

      return;
    }

    if (!isValidEmail(email || "")) {
      toast.error("Email is invalid", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);

      return;
    }

    const body = {
      ...formData,
    };
    
    console.log(body)

    login(body)
      .then((user) => {
        if (user.success) {
          console.log(user.success);
          router.push('/applications')
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
        setLoading(false);
        console.log("finally activated");
      });
  };

  const handleGoogleSignIn = async () => {
    // Implement Google sign-in logic here
  };

  return (
    <div className="container flex items-center justify-center py-10">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <h1 className="text-2xl font-semibold">Sign In</h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <GoogleButton onClick={handleGoogleSignIn} />
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <p className="text-sm text-center text-muted-foreground">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="text-primary hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 