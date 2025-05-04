
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, BrainCircuit, TrendingUp, ShieldCheck, Sparkles, LogIn } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AuthForm from '@/components/AuthForm';

const LandingPage = ({ session, setSession }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const features = [
    {
      icon: Zap,
      title: 'Real-Time Market Data',
      description: 'Access up-to-the-minute stock prices, market trends, and financial news.',
    },
    {
      icon: BrainCircuit,
      title: 'AI-Powered Insights',
      description: 'Leverage advanced AI agents for deep market analysis and stock research.',
    },
    {
      icon: TrendingUp,
      title: 'Portfolio Optimization',
      description: 'Get personalized recommendations to enhance your investment strategy.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure & Reliable',
      description: 'Your financial data is handled with the utmost security and privacy.',
    },
  ];
  
  const handleAuthSuccess = (newSession) => {
    setSession(newSession);
    setIsAuthModalOpen(false); // Close modal on success
    navigate('/dashboard'); // Navigate to dashboard after successful auth
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-900/10 to-purple-900/20 text-foreground grid-pattern">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <Sparkles className="h-6 w-6 text-primary mr-2" />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          StockInsight Pro
          </h1>
        </div>
        {session ? (
           <Button asChild variant="outline">
             <Link to="/dashboard">Go to Dashboard</Link>
           </Button>
        ) : (
          <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <LogIn className="mr-2 h-4 w-4" /> Login / Register
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Welcome</DialogTitle>
                 {/* Description removed as Tabs have their own */}
              </DialogHeader>
              <AuthForm onAuthSuccess={handleAuthSuccess} />
            </DialogContent>
          </Dialog>
        )}
      </header>

      <main className="container mx-auto px-4 py-16 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Unlock Financial Insights with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">AI Power</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          StockInsight Pro combines cutting-edge AI with real-time market data to help you make smarter investment decisions. Analyze stocks, optimize portfolios, and stay ahead of the market.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
             <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
               <DialogTrigger asChild>
                  <Button size="lg">
                    Get Started for Free
                  </Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[425px]">
                 <DialogHeader>
                   <DialogTitle>Get Started</DialogTitle>
                 </DialogHeader>
                 <AuthForm onAuthSuccess={handleAuthSuccess} />
               </DialogContent>
             </Dialog>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.2 }}
          className="mt-24"
        >
          <h3 className="text-3xl font-bold mb-12">Why Choose StockInsight Pro?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} variants={featureVariants}>
                <Card className="text-left h-full glass-card border-border/30 hover:border-primary transition-colors duration-300">
                  <CardHeader>
                    <div className="bg-primary/10 text-primary rounded-lg p-3 w-fit mb-4">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-24 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
           <Card className="glass-card border-border/30 p-8 md:p-12">
             <h3 className="text-3xl font-bold mb-6">Ready to Elevate Your Investments?</h3>
             <p className="text-muted-foreground mb-8">
               Join thousands of users leveraging AI for smarter financial decisions. Access powerful tools and insights today.
             </p>
             <motion.div
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
                <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
                  <DialogTrigger asChild>
                     <Button size="lg">
                       Launch StockInsight Pro
                     </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Welcome Back</DialogTitle>
                    </DialogHeader>
                    <AuthForm onAuthSuccess={handleAuthSuccess} />
                  </DialogContent>
                </Dialog>
             </motion.div>
           </Card>
        </motion.div>

      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} StockInsight Pro. All rights reserved. Not financial advice.
      </footer>
    </div>
  );
};

export default LandingPage;
