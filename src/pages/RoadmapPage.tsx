import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getRoadmap } from '@/data/mockData';
import { 
  ArrowLeft, 
  GraduationCap, 
  Wrench, 
  Briefcase, 
  TrendingUp,
  ExternalLink,
  BookOpen,
  Award,
  Sparkles,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const nodeIcons = {
  foundation: GraduationCap,
  skills: Wrench,
  entry: Briefcase,
  senior: TrendingUp
};

const RoadmapPage: React.FC = () => {
  const { careerId } = useParams<{ careerId: string }>();
  const navigate = useNavigate();
  
  const roadmap = getRoadmap(careerId || '');

  return (
    <div className="min-h-screen hero-gradient">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">CareerCompass</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {roadmap.careerTitle}
          </h1>
          <p className="text-xl text-muted-foreground">
            Your complete roadmap to becoming a {roadmap.careerTitle.toLowerCase()}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timeline - Main Content */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-muted" />

              {/* Timeline Nodes */}
              <div className="space-y-8">
                {roadmap.nodes.map((node, index) => {
                  const IconComponent = nodeIcons[node.id as keyof typeof nodeIcons] || GraduationCap;
                  
                  return (
                    <div 
                      key={node.id}
                      className={cn(
                        "relative pl-20 animate-slide-up opacity-0",
                        `stagger-${index + 1}`
                      )}
                      style={{ animationFillMode: 'forwards' }}
                    >
                      {/* Node Icon */}
                      <div className={cn(
                        "absolute left-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-card z-10",
                        index === 0 
                          ? "bg-primary text-primary-foreground" 
                          : index === roadmap.nodes.length - 1
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-card border-2 border-primary/30 text-primary"
                      )}>
                        <IconComponent className="w-6 h-6" />
                      </div>

                      {/* Card */}
                      <div className="bg-card rounded-2xl shadow-card p-6 hover:shadow-card-hover transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-foreground">
                              {node.title}
                            </h3>
                            <p className="text-muted-foreground">
                              {node.subtitle}
                            </p>
                          </div>
                          {node.duration && (
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm">
                              <Clock className="w-4 h-4" />
                              {node.duration}
                            </div>
                          )}
                        </div>

                        <ul className="space-y-3">
                          {node.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                              <span className="text-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar - Resources */}
          <div className="space-y-6">
            {/* Recommended Courses */}
            <div className="bg-card rounded-2xl shadow-card p-6 animate-fade-in stagger-2" style={{ animationFillMode: 'forwards', opacity: 0 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Recommended Courses</h3>
              </div>

              <div className="space-y-4">
                {roadmap.courses.map((course, index) => (
                  <a
                    key={index}
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {course.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {course.provider}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-card rounded-2xl shadow-card p-6 animate-fade-in stagger-3" style={{ animationFillMode: 'forwards', opacity: 0 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Certifications</h3>
              </div>

              <div className="space-y-4">
                {roadmap.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl border border-border"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">
                          {cert.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {cert.issuer}
                        </p>
                      </div>
                      <span className={cn(
                        "px-2 py-1 rounded-md text-xs font-medium",
                        cert.importance === 'Essential'
                          ? "bg-primary/10 text-primary"
                          : cert.importance === 'Recommended'
                            ? "bg-secondary/10 text-secondary"
                            : "bg-muted text-muted-foreground"
                      )}>
                        {cert.importance}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-primary-foreground animate-fade-in stagger-4" style={{ animationFillMode: 'forwards', opacity: 0 }}>
              <h3 className="text-lg font-bold mb-2">Ready to start?</h3>
              <p className="text-primary-foreground/80 mb-4 text-sm">
                Begin your journey today with our curated resources and expert guidance.
              </p>
              <Button 
                variant="secondary"
                className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoadmapPage;
