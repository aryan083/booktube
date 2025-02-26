import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { SignUpFormData } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>();
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setLoading(true);
      await signUp(data.email, data.password, { display_name: data.username });
      toast.success("Account created successfully! Please check your email to verify your account.");
      navigate('/signin');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: "google" | "github") => {
    toast.info(`${provider} login coming soon!`);
  };

  return (
    <div className="flex items-center justify-center bg-[#121212] p-4 py-16">
      <div className="w-full max-w-xl bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 animate-fade-in shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Create your account</h1>
          <p className="text-muted-foreground">Join our community to get started</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                {...register("username", { required: "Username is required" })}
                placeholder="Username"
                className="pl-10 bg-black/50 border-white/10 focus:border-primary"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Email"
                className="pl-10 bg-black/50 border-white/10 focus:border-primary"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="pl-10 pr-10 bg-black/50 border-white/10 focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-start space-x-2 mt-4">
            <Checkbox
              {...register("agreeToTerms", {
                required: "You must agree to the terms and conditions"
              })}
              id="terms"
              className="mt-1 h-4 w-4 rounded border-white/10 bg-black/50"
            />
            <label
              htmlFor="terms"
              className="text-sm text-muted-foreground"
            >
              I agree to the{" "}
              <button type="button" className="text-primary hover:underline">
                terms and conditions
              </button>
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-red-500 text-sm">{errors.agreeToTerms.message}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 mt-6"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black/40 px-2 text-muted-foreground">
                OR
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin("google")}
              className="bg-black/50 border-white/10 hover:bg-white/5"
            >
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin("github")}
              className="bg-black/50 border-white/10 hover:bg-white/5"
            >
              GitHub
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate('/signin')}
              className="text-primary hover:underline"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
