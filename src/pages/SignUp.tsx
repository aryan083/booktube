import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { SignUpFormData } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import Aurora from "@/components/Aurora";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: SignUpFormData) => {
    // Check for errors before proceeding
    const missingFields: string[] = [];
    if (!data.username) missingFields.push("Username");
    if (!data.email) missingFields.push("Email");
    if (!data.password) missingFields.push("Password");
    if (missingFields.length > 0) {
      toast.error(`Please provide: ${missingFields.join(", ")}`);
      return;
    }
    try {
      setLoading(true);
      await signUp(data.email, data.password, { display_name: data.username });
      toast.success(
        "Account created successfully! Please check your email to verify your account."
      );
      navigate("/signin");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: "google" | "github") => {
    toast.info(`${provider} login coming soon!`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 overflow-hidden">
      <div className="relative w-full max-w-5xl rounded-3xl h-full">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          children={undefined}
        />
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className={cn("relative z-10 w-full animate-fade-up")}>
          <Card className="overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
            <CardContent className="grid p-0 grid-cols-1 md:grid-cols-2 gap-0">
              <div className="relative hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/1 to-primary/5" />
                <div className="absolute inset-0 bg-[url('/images/auth-illustration.jpg')] bg-cover bg-center opacity-30" />
                <Aurora
                  colorStops={["#3A29F9", "#FF94B4"]}
                  blend={0.75}
                  amplitude={2.0}
                  speed={0.7}
                />

                <div className="relative   px-12 mt-12 py-12 flex items-center justify-center">
                  <blockquote className="space-y-3">
                    <p className="text-xl font-light leading-relaxed">
                      "Education is not preparation for life; education is life
                      itself."
                    </p>
                    <footer className="text-sm text-muted-foreground">
                      ― John Dewey
                    </footer>
                  </blockquote>
                </div>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-8 py-10 space-y-8"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <Lock className="w-6 h-6 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold">Create your account</h1>
                    <p className="text-muted-foreground">
                      Join our platform to get started
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        {...register("username", {
                          required: "Username is required",
                        })}
                        placeholder="Username"
                        className={
                          cn(
                            "pl-10 bg-black/50 border-white/10 focus:border-primary transition-colors",
                            errors.username && "border-red-500 focus:border-red-500"
                          )
                        }
                      />
                      
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
                        className={
                          cn(
                            "pl-10 bg-black/50 border-white/10 focus:border-primary transition-colors",
                            errors.email && "border-red-500 focus:border-red-500"
                          )
                        }
                      />
                      
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
                        className={
                          cn(
                            "pl-10 pr-10 bg-black/50 border-white/10 focus:border-primary transition-colors",
                            errors.password && "border-red-500 focus:border-red-500"
                          )
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors focus:outline-none focus:ring-primary focus:ring-offset-1 rounded-full p-1"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        aria-pressed={showPassword}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <Eye className="h-4 w-4" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full transition-all duration-200 hover:opacity-90 hover:scale-[0.99] active:scale-[0.97]"
                    disabled={loading}
                    style={{
                      background: "#27272a",
                      padding: "1.25rem",
                      fontSize: "1rem",
                      fontWeight: "500",
                    }}
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </Button>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-black/40 px-2 text-muted-foreground">
                        OR
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialLogin("google")}
                      className="bg-black/50 border-white/10 hover:bg-white/5 transition-colors duration-200 text-sm py-6 flex items-center justify-center gap-2 font-medium"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        className="w-5 h-5"
                      >
                        <path
                          fill="#FFC107"
                          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                        />
                        <path
                          fill="#FF3D00"
                          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                        />
                        <path
                          fill="#4CAF50"
                          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                        />
                        <path
                          fill="#1976D2"
                          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                        />
                      </svg>
                      Continue with Google
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialLogin("github")}
                      className="bg-black/50 border-white/10 hover:bg-white/5 transition-colors duration-200 text-sm py-6 flex items-center justify-center gap-2 font-medium"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                        fill="currentColor"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      Continue with GitHub
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    <span className="text-muted-foreground mr-2">
                      Already have an account?{" "}
                    </span>
                    <button
                      type="button"
                      onClick={() => navigate("/signin")}
                      className="text-primary hover:opacity-80 transition-opacity duration-200 px-4 py-2 rounded-lg"
                      style={{
                        color: "white",
                        background: "#1d1d1e",
                      }}
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
