import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import type { SignInFormData } from "@/types/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/Label";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import Aurora from "@/components/Aurora";

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: SignInFormData) => {
    try {
      setLoading(true);
      await signIn(data.email, data.password);
      toast.success("Welcome back!");
      navigate("/home");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Invalid credentials";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // const handleSocialLo gin = (provider: string) => {
  //   toast.info(`${provider} login coming soon!`);
  // };

  return (
    <div className="min-h-screen flex items-center justify-center p-20  overflow-hidden">
      <div className="relative w-full rounded-3xl h-full">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          children={undefined}
        />
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div
          className={cn(
            "relative z-10 w-full w-100 animate-fade-up",
            className
          )}
          {...props}
        >
          <Card className="overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
            <CardContent className="grid p-0 grid-cols-1 md:grid-cols-2 gap-0">
              <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12">
                <div className="flex flex-col gap-7">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6 text-primary"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                      </svg>
                    </div>
                    <h1 className="text-2xl font-bold">Welcome back </h1>
                    <p className="text-muted-foreground">
                      Sign in to your BookTube account
                      <br/>
                      For demo purposes, use the following credentials:
                      <br/>
                      Email: aryanmahida1268@gmail.com
                      <br/>
                      Password: 1234567890
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        defaultValue="aryanmahida1268@gmail.com"
                        {...register("email", {
                          required: "Email is required",
                        })}
                        className="bg-black/50 border-white/10"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          defaultValue="1234567890"
                          type={showPassword ? "text" : "password"}
                          {...register("password", {
                            required: "Password is required",
                          })}
                          className="bg-black/50 border-white/10 pr-10"
                          aria-label="Password input field"
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
                      {errors.password && (
                        <p className="text-red-500 text-sm">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-red"
                    disabled={loading}
                    style={{
                      background: "#27272a",
                    }}
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </Button>
                  <div className="text-center text-sm">
                    <span className="text-muted-foreground mr-2">
                      Don't have an account?{" "}
                    </span>
                    <button
                      type="button"
                      onClick={() => navigate("/signup")}
                      className="text-primary "
                      style={{
                        color: "white",
                        background: "#1d1d1e",
                      }}
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </form>

              <div className="relative hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/1 to-primary/5" />
                <div className="absolute inset-0  bg-cover bg-center opacity-30" />
                <Aurora
                  colorStops={["#3A29FF", "#FF94B4"]}
                  blend={0.75}
                  amplitude={3.0}
                  speed={0.5}
                />
                <div className="relative mt-9 p-12 flex items-center justify-center">
                  <blockquote className="space-y-2">
                    <p className="text-lg">
                      "The beautiful thing about learning is that no one can
                      take it away from you."
                    </p>
                    <footer className="text-sm text-muted-foreground">
                      ― B.B. King
                    </footer>
                  </blockquote>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
