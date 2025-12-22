import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Compass, 
  ArrowRight, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Users,
  CheckCircle2,
  Star
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: 'Personalized Matching',
      description: 'Our AI analyzes your interests, skills, and goals to find your perfect career path.'
    },
    {
      icon: TrendingUp,
      title: 'Clear Roadmaps',
      description: 'Step-by-step guidance from where you are now to where you want to be.'
    },
    {
      icon: Users,
      title: 'Expert Insights',
      description: 'Curated resources and certifications recommended by industry professionals.'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Career Paths Discovered' },
    { value: '95%', label: 'User Satisfaction' },
    { value: '200+', label: 'Career Options' }
  ];

  return (
    <div className="min-h-screen hero-gradient overflow-hidden">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-card">
            <Compass className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">CareerCompass</span>
        </div>
        <Button variant="hero-outline" onClick={() => navigate('/auth')}>
          Sign In
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Career Guidance</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
              Find Your
              <span className="block gradient-text">Perfect Career</span>
              Path
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-lg">
              Discover careers that match your unique combination of skills, interests, and aspirations. Get a personalized roadmap to success.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="xl" 
                onClick={() => navigate('/auth')}
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="hero-outline" 
                size="xl"
              >
                Learn More
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Trusted by 50,000+ professionals
                </p>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative hidden lg:block animate-fade-in stagger-2" style={{ animationFillMode: 'forwards', opacity: 0 }}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
            <div className="relative bg-card rounded-3xl shadow-card-hover p-8 border border-border/50">
              {/* Mock Dashboard Preview */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Your Top Match</p>
                    <p className="text-sm text-muted-foreground">Based on your profile</p>
                  </div>
                </div>
                
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-foreground">Product Manager</h3>
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold">95% Match</span>
                  </div>
                  <p className="text-muted-foreground mb-4">Lead product strategy and work with cross-functional teams</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm">Strategy</span>
                    <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm">Leadership</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {['UX Designer', 'Data Scientist'].map((career) => (
                    <div key={career} className="p-4 rounded-xl bg-muted/50 border border-border">
                      <p className="font-medium text-foreground">{career}</p>
                      <p className="text-sm text-muted-foreground">88% Match</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl bg-secondary/20 animate-float" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-primary/10 animate-float" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards', opacity: 0 }}
              >
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to discover your ideal career path
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-card rounded-3xl shadow-card hover:shadow-card-hover p-8 transition-all duration-300 animate-slide-up opacity-0"
              style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'forwards' }}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${
                index === 0 ? 'bg-primary text-primary-foreground' :
                index === 1 ? 'bg-secondary text-secondary-foreground' :
                'bg-gradient-to-br from-primary to-secondary text-primary-foreground'
              }`}>
                <feature.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="relative bg-gradient-to-br from-primary to-secondary rounded-3xl p-12 md:p-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
          
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Discover Your Path?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Join thousands of professionals who found their dream careers with CareerCompass.
            </p>
            <Button 
              variant="secondary"
              size="xl"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-button"
              onClick={() => navigate('/auth')}
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <div className="mt-8 flex items-center justify-center gap-6 text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>No credit card</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Compass className="w-6 h-6 text-primary" />
            <span className="font-bold text-foreground">CareerCompass</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2024 CareerCompass. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
