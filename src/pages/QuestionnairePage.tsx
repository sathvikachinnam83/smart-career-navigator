import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp } from '@/context/AppContext';
import { getRecommendations, interests, qualifications, futurePlans } from '@/data/mockData';
import { 
  ChevronRight, 
  ChevronLeft, 
  GraduationCap, 
  Heart, 
  Rocket,
  Check,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { id: 1, title: 'Education', icon: GraduationCap, description: 'Tell us about your background' },
  { id: 2, title: 'Interests', icon: Heart, description: 'What excites you?' },
  { id: 3, title: 'Vision', icon: Rocket, description: 'Where do you see yourself?' }
];

const QuestionnairePage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [qualification, setQualification] = useState('');
  const [major, setMajor] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [futurePlan, setFuturePlan] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { setAnswers, setRecommendations } = useApp();
  const navigate = useNavigate();

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return qualification && major;
      case 2: return selectedInterests.length > 0;
      case 3: return futurePlan;
      default: return false;
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    const answers = {
      qualification,
      major,
      interests: selectedInterests,
      futurePlan
    };
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const recs = getRecommendations(answers);
    setAnswers(answers);
    setRecommendations(recs);
    
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen hero-gradient">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">CareerCompass</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Step {currentStep} of 3
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div 
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300",
                    currentStep === step.id 
                      ? "bg-primary text-primary-foreground shadow-button scale-110" 
                      : currentStep > step.id
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground"
                  )}
                >
                  {currentStep > step.id ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                <span className={cn(
                  "mt-3 text-sm font-medium transition-colors",
                  currentStep === step.id ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "w-24 h-1 mx-4 rounded-full transition-colors",
                  currentStep > step.id ? "bg-secondary" : "bg-muted"
                )} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-card rounded-3xl shadow-card p-8 md:p-12 animate-scale-in">
          {/* Step 1: Education */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Tell us about your education
                </h2>
                <p className="text-muted-foreground">
                  This helps us understand your background and qualifications
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-foreground text-base">Highest Qualification</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {qualifications.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setQualification(q)}
                        className={cn(
                          "p-4 rounded-xl border-2 text-left transition-all duration-200",
                          qualification === q
                            ? "border-primary bg-primary/5 text-foreground"
                            : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <span className="font-medium">{q}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="major" className="text-foreground text-base">
                    Field of Study / Major
                  </Label>
                  <Input
                    id="major"
                    placeholder="e.g., Computer Science, Business Administration"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    className="h-14 text-base"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Interests */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  What interests you?
                </h2>
                <p className="text-muted-foreground">
                  Select all the areas that excite you (choose at least one)
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={cn(
                      "p-5 rounded-2xl border-2 text-center transition-all duration-200 group",
                      selectedInterests.includes(interest)
                        ? "border-primary bg-primary/10 text-foreground shadow-card"
                        : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span className="font-medium">{interest}</span>
                    {selectedInterests.includes(interest) && (
                      <Check className="w-5 h-5 mx-auto mt-2 text-primary" />
                    )}
                  </button>
                ))}
              </div>

              {selectedInterests.length > 0 && (
                <p className="text-center text-sm text-muted-foreground">
                  {selectedInterests.length} interest{selectedInterests.length > 1 ? 's' : ''} selected
                </p>
              )}
            </div>
          )}

          {/* Step 3: Vision */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  What's your vision for the future?
                </h2>
                <p className="text-muted-foreground">
                  Select the option that best describes your career aspirations
                </p>
              </div>

              <div className="grid gap-4">
                {futurePlans.map((plan) => (
                  <button
                    key={plan.value}
                    type="button"
                    onClick={() => setFuturePlan(plan.value)}
                    className={cn(
                      "p-6 rounded-2xl border-2 text-left transition-all duration-200 flex items-center gap-4",
                      futurePlan === plan.value
                        ? "border-primary bg-primary/5 text-foreground shadow-card"
                        : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <div className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                      futurePlan === plan.value
                        ? "border-primary bg-primary"
                        : "border-muted-foreground"
                    )}>
                      {futurePlan === plan.value && (
                        <Check className="w-4 h-4 text-primary-foreground" />
                      )}
                    </div>
                    <span className="font-medium text-lg">{plan.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-12 pt-8 border-t border-border">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={currentStep === 1}
              className={cn(currentStep === 1 && "invisible")}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back
            </Button>

            {currentStep < 3 ? (
              <Button
                variant="hero"
                size="lg"
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={!canProceed()}
              >
                Continue
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button
                variant="gradient"
                size="xl"
                onClick={handleGenerate}
                disabled={!canProceed() || isGenerating}
                className="min-w-[200px]"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Paths
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuestionnairePage;
