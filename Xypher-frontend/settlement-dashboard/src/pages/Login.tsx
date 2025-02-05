import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = () => {
    console.log("in login");
    try {
      //   const response = await fetch.post("/api/login", {
      //     email,
      //     password,
      //   });

      if (email !== "" && password !== "") {
        toast({
          description: "Login Successful",
        });
        
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid Credentials",
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    }
  };

  return (
    <div className="flex flex-col self-center  items-center justify-center pt-6  p-10 m-2 min-h-[96vh] min-w-[96vw] overflow-hidden">
      <ThemeToggle />
      <h2 className=" relative top-1 mb-20 text-3xl font-bold tracking-tight text-primary">
        DTCC SETTLEMENT DASHBOARD
      </h2>
      <div className="relative self-center w-full max-w-[400px] max-h-[500px] p-12 rounded-lg border bg-card text-card-foreground shadow-xl">
        <div className="space-y-4">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl mb-2 font-semibold tracking-tight">
              Dashboard Login
            </h1>
            <div className=" relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card mb-6 px-2 text-muted-foreground" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Enter your email and password below to login to your account
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                onChange={(e: any) => setEmail(e.target.value)}
                id="email"
                placeholder="m@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
              />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                onChange={(e: any) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                autoCapitalize="none"
                autoCorrect="off"
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
