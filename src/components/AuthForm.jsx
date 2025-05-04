
import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

const AuthForm = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [activeTab, setActiveTab] = useState("login");
  const { toast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      toast({ title: "Login Successful!", description: "Welcome back." });
      if (onAuthSuccess) onAuthSuccess(data.session);
    } catch (error) {
      setAuthError(error.message || "Login failed. Please check your credentials.");
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAuthError("Passwords do not match.");
      toast({ title: "Registration Failed", description: "Passwords do not match.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setAuthError(null);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      toast({ title: "Registration Successful!", description: "Please check your email to confirm your account." });
       // Optionally automatically log in or wait for confirmation
      if (onAuthSuccess && data.session) onAuthSuccess(data.session);
      else if (!data.session && data.user) {
         // Handle case where confirmation is required
      }
    } catch (error) {
      setAuthError(error.message || "Registration failed. Please try again.");
      toast({ title: "Registration Failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {activeTab === "login" && (
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>Enter your email and password to access your dashboard.</CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <Label htmlFor="login-email">Email</Label>
                      <Input id="login-email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="login-password">Password</Label>
                      <Input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    {authError && <p className="text-sm text-destructive">{authError}</p>}
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={loading} className="w-full">
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Login
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          )}

          {activeTab === "register" && (
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Register</CardTitle>
                  <CardDescription>Create a new account to get started.</CardDescription>
                </CardHeader>
                <form onSubmit={handleRegister}>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <Label htmlFor="register-email">Email</Label>
                      <Input id="register-email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="register-password">Password</Label>
                      <Input id="register-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                     {authError && <p className="text-sm text-destructive">{authError}</p>}
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={loading} className="w-full">
                       {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Register
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          )}
        </motion.div>
      </AnimatePresence>
    </Tabs>
  );
};

export default AuthForm;
