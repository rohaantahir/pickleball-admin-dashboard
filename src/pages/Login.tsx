import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Dummy authentication
    if (email && password) {
      localStorage.setItem('isAuthenticated', 'true');
      toast.success('Login successful!');
      navigate('/admin');
    } else {
      toast.error('Please enter email and password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-purple p-8 space-y-6">
          {/* Logo */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-primary-foreground">P</span>
            </div>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded">PC</span>
              <span className="px-2 py-1 bg-purple-600 text-white text-xs font-semibold rounded">PI</span>
              <span className="px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded">PT</span>
              <span className="px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded">PTL</span>
            </div>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Login to Pickleball Club</h1>
            <p className="text-sm text-muted-foreground">
              New member?{" "}
              <button className="text-primary hover:underline font-medium">
                Register
              </button>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(checked) => setRemember(checked as boolean)}
                />
                <Label
                  htmlFor="remember"
                  className="text-sm font-normal cursor-pointer"
                >
                  Remember for 30 days
                </Label>
              </div>
              <button
                type="button"
                className="text-sm text-primary hover:underline font-medium"
              >
                Forgot password
              </button>
            </div>

            <Button type="submit" className="w-full h-11 text-base font-semibold">
              Sign in
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button className="text-primary hover:underline font-medium">
                Create one here
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
