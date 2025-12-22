import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp } from '@/context/AppContext';
import { Compass, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let success: boolean;
      if (isLogin) {
        success = await auth.login(email, password);
      } else {
        success = await auth.signup(email, password, name);
      }

      if (success) {
        toast({
          title: isLogin ? "Welcome back!" : "Account created!",
          description: "Redirecting to your dashboard...",
        });
        navigate('/questionnaire');
      } else {
        toast({
          title: "Error",
          description: "Please check your credentials and try again.",
          variant: "destructive"
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const success = await auth.loginWithGoogle();
      if (success) {
        toast({
          title: "Welcome!",
          description: "Successfully signed in with Google.",
        });
        navigate('/questionnaire');
      }
    } catch {
      toast({
        title: "Error",
        description: "Google sign-in failed. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 via-secondary/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--secondary)/0.1),transparent_60%)]" />
        
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12">
          <div className="animate-float">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-card-hover mb-8">
              <Compass className="w-16 h-16 text-primary-foreground" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-foreground text-center mb-4 animate-fade-in">
            Discover Your Path
          </h2>
          <p className="text-muted-foreground text-center max-w-md text-lg animate-fade-in stagger-1 opacity-0" style={{ animationFillMode: 'forwards' }}>
            "The future belongs to those who believe in the beauty of their dreams."
          </p>
          <p className="text-primary font-medium mt-4 animate-fade-in stagger-2 opacity-0" style={{ animationFillMode: 'forwards' }}>
            — Eleanor Roosevelt
          </p>

          <div className="mt-12 grid grid-cols-3 gap-6 animate-fade-in stagger-3 opacity-0" style={{ animationFillMode: 'forwards' }}>
            {[
              { icon: Sparkles, label: 'AI-Powered' },
              { icon: Compass, label: 'Personalized' },
              { icon: ArrowRight, label: 'Actionable' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-card shadow-card flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 hero-gradient">
        <div className="w-full max-w-md animate-scale-in">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 justify-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Compass className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">CareerCompass</span>
          </div>

          <div className="bg-card rounded-2xl shadow-card p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-muted-foreground">
                {isLogin 
                  ? 'Sign in to continue your journey' 
                  : 'Start your career discovery today'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-11 h-12"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 h-12"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-muted-foreground">or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <p className="text-center text-muted-foreground mt-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-medium hover:underline"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
