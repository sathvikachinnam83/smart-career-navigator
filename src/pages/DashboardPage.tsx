import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { 
  Brain, 
  Target, 
  Palette, 
  Code, 
  BarChart3, 
  PenTool,
  Briefcase,
  FolderKanban,
  ArrowRight,
  LogOut,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Target,
  Palette,
  Code,
  BarChart3,
  PenTool,
  Briefcase,
  FolderKanban
};

const DashboardPage: React.FC = () => {
  const { recommendations, setSelectedCareer, auth } = useApp();
  const navigate = useNavigate();

  const handleViewRoadmap = (careerId: string) => {
    setSelectedCareer(careerId);
    navigate(`/roadmap/${careerId}`);
  };

  const handleLogout = () => {
    auth.logout();
    navigate('/');
  };

  if (recommendations.length === 0) {
    navigate('/questionnaire');
    return null;
  }

  return (
    <div className="min-h-screen hero-gradient">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">CareerCompass</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:block">
              Welcome, {auth.user?.name}
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Your personalized results are ready</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your Career Matches
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Based on your interests, education, and aspirations, here are your top career recommendations
          </p>
        </div>

        {/* Career Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((career, index) => {
            const IconComponent = iconMap[career.icon] || Briefcase;
            
            return (
              <div
                key={career.id}
                className={cn(
                  "group bg-card rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden animate-slide-up opacity-0",
                  `stagger-${index + 1}`
                )}
                style={{ animationFillMode: 'forwards' }}
              >
                {/* Card Header */}
                <div className={cn(
                  "p-6 relative overflow-hidden",
                  career.color === 'primary' 
                    ? "bg-gradient-to-br from-primary/10 to-primary/5" 
                    : "bg-gradient-to-br from-secondary/10 to-secondary/5"
                )}>
                  <div className={cn(
                    "absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-20",
                    career.color === 'primary' ? "bg-primary" : "bg-secondary"
                  )} />
                  
                  <div className="flex items-start justify-between relative">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center",
                      career.color === 'primary' 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-secondary text-secondary-foreground"
                    )}>
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <div className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-bold",
                      career.color === 'primary'
                        ? "bg-primary/20 text-primary"
                        : "bg-secondary/20 text-secondary"
                    )}>
                      {career.matchScore}% Match
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {career.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {career.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <span className="font-medium text-foreground">{career.salaryRange}</span>
                    <span>/year</span>
                  </div>

                  <Button 
                    variant="hero-outline" 
                    className="w-full group/btn"
                    onClick={() => handleViewRoadmap(career.id)}
                  >
                    View Roadmap
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/questionnaire')}
            className="text-muted-foreground hover:text-foreground"
          >
            Want different results? Retake the questionnaire
          </Button>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
