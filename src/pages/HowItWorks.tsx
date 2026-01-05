import { Link } from 'react-router-dom';
import { 
  Play, ArrowRight, Sparkles, Brain, MessageCircle, Trophy, ClipboardCheck,
  Clock, Eye, HelpCircle, TrendingDown, Lightbulb, Users, Building2,
  RefreshCw, Zap, GraduationCap, BarChart3, Target, Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const problemPoints = [
  { icon: Clock, title: 'Fixed Pace Learning', description: 'Everyone moves at the same speed, regardless of understanding' },
  { icon: Eye, title: 'Passive Video Watching', description: 'No interaction, no engagement, just endless watching' },
  { icon: HelpCircle, title: 'Doubts Left Unanswered', description: 'Questions pile up with no immediate help' },
  { icon: TrendingDown, title: 'No Motivation Loop', description: 'No rewards, no progress visibility, no reason to continue' },
];

const lumioSteps = [
  { 
    step: 1, 
    icon: Brain, 
    title: 'Personalized Learning Path', 
    description: 'Content adapts based on your progress, performance, and interests. No two learning journeys are the same.',
    color: 'from-primary to-primary/60'
  },
  { 
    step: 2, 
    icon: Play, 
    title: 'Interactive Video Learning', 
    description: 'Learn via videos designed for clarity and engagement with built-in checkpoints and interactive elements.',
    color: 'from-lesson to-lesson/60'
  },
  { 
    step: 3, 
    icon: MessageCircle, 
    title: 'Live AI Doubt Solving', 
    description: 'In-video AI chatbot for instant doubt resolution. Never wait for answers again.',
    color: 'from-success to-success/60'
  },
  { 
    step: 4, 
    icon: Trophy, 
    title: 'Gamified Progress System', 
    description: 'Earn XP, unlock badges, maintain streaks, and level up. Learning becomes an adventure.',
    color: 'from-xp to-streak'
  },
  { 
    step: 5, 
    icon: ClipboardCheck, 
    title: 'Smart Assessments', 
    description: 'AI-generated quizzes & flashcards after each module to reinforce your learning.',
    color: 'from-level to-level/60'
  },
];

const userTypes = [
  {
    icon: GraduationCap,
    title: 'Students',
    features: ['Adaptive learning pace', 'Gamified motivation', 'Instant doubt solving', 'Track your growth'],
    gradient: 'from-primary/10 to-success/10',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary'
  },
  {
    icon: Users,
    title: 'Teachers',
    features: ['Track student engagement', 'Analyze performance', 'Identify strengths & gaps', 'Actionable insights'],
    gradient: 'from-lesson/10 to-level/10',
    iconBg: 'bg-lesson/10',
    iconColor: 'text-lesson'
  },
  {
    icon: Building2,
    title: 'Institutions',
    features: ['Centralized management', 'Performance analytics', 'Scalable environment', 'Custom branding'],
    gradient: 'from-xp/10 to-streak/10',
    iconBg: 'bg-xp/10',
    iconColor: 'text-xp'
  },
];

const loopSteps = ['Learn', 'Practice', 'Get Feedback', 'Improve', 'Level Up'];

export default function HowItWorks() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-success/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-success/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Discover the future of learning</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground leading-tight">
            See How <span className="gradient-text">Lumio</span> Works
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learning that adapts to you, not the other way around. Experience education that evolves with every step you take.
          </p>
          
          <p className="text-muted-foreground max-w-xl mx-auto">
            Lumio combines AI-powered personalization, gamified engagement, and instant support to transform how you learn. No more passive watching—just active, rewarding progress.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow-primary hover:opacity-90 transition-opacity">
              <Play className="w-5 h-5 mr-2" />
              Start Learning
            </Button>
            <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/5">
              Explore Features
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              The Problem With Traditional Learning
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've all been there—sitting through lessons that don't match our pace, struggling with unanswered questions, and losing motivation along the way.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problemPoints.map((point, index) => (
              <Card 
                key={point.title}
                className="p-6 bg-card/50 border-destructive/20 hover:border-destructive/40 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4">
                  <point.icon className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{point.title}</h3>
                <p className="text-sm text-muted-foreground">{point.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How Lumio Changes This */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              How <span className="gradient-text">Lumio</span> Changes This
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A step-by-step transformation of your learning experience
            </p>
          </div>
          
          <div className="space-y-8">
            {lumioSteps.map((item, index) => (
              <div 
                key={item.step}
                className={`flex flex-col md:flex-row items-center gap-8 animate-fade-in ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex-1">
                  <Card className="p-8 hover:shadow-elevated transition-all duration-300 bg-card border-border/50">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                        <item.icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Step {item.step}</span>
                        <h3 className="text-xl font-display font-bold text-foreground mt-1 mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                </div>
                
                {index < lumioSteps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center w-12">
                    <div className="w-0.5 h-12 bg-gradient-to-b from-primary/50 to-transparent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Designed for Everyone */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Designed for Everyone
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you're learning, teaching, or managing—Lumio adapts to your needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {userTypes.map((type, index) => (
              <Card 
                key={type.title}
                className={`p-8 bg-gradient-to-br ${type.gradient} border-border/50 hover:shadow-elevated transition-all duration-300 animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-2xl ${type.iconBg} flex items-center justify-center mb-6`}>
                  <type.icon className={`w-7 h-7 ${type.iconColor}`} />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-4">{type.title}</h3>
                <ul className="space-y-3">
                  {type.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Loop */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              The Lumio <span className="gradient-text">Learning Loop</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A continuous cycle of growth that evolves with every session
            </p>
          </div>
          
          <div className="relative animate-fade-in">
            {/* Loop Diagram */}
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              {loopSteps.map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className="relative group">
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-primary/10 to-success/10 border border-primary/20 flex items-center justify-center hover:scale-105 transition-transform duration-300 hover:shadow-glow-primary">
                      <span className="font-display font-bold text-foreground text-center text-sm md:text-base px-2">{step}</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-xs text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                  </div>
                  {index < loopSteps.length - 1 && (
                    <ArrowRight className="w-6 h-6 text-primary/50 mx-2 hidden md:block" />
                  )}
                </div>
              ))}
              <RefreshCw className="w-8 h-8 text-primary animate-spin-slow hidden md:block" style={{ animationDuration: '8s' }} />
            </div>
            
            <p className="text-center text-muted-foreground mt-8 max-w-xl mx-auto">
              This loop never ends—each cycle builds on the last, making you stronger, smarter, and more confident in your learning journey.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-muted/50 to-success/5">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            <span>Our Philosophy</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
            Learning Should Feel <span className="gradient-text">Alive</span>
          </h2>
          
          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>
              At Lumio, we believe learning isn't a destination—it's a journey. A journey that should spark curiosity, reward consistency, and adapt to who you are, not who you're expected to be.
            </p>
            <p>
              We use AI not as a replacement for human connection, but as a guide. A patient, always-available companion that helps you overcome obstacles and celebrate victories, no matter how small.
            </p>
            <p>
              Curiosity and consistency matter more than cramming. Progress over perfection. Understanding over memorization. That's the Lumio way.
            </p>
          </div>
          
          <div className="flex justify-center gap-8 mt-10">
            <div className="flex items-center gap-2 text-primary">
              <Lightbulb className="w-5 h-5" />
              <span className="font-medium">Curiosity First</span>
            </div>
            <div className="flex items-center gap-2 text-success">
              <Target className="w-5 h-5" />
              <span className="font-medium">Progress Over Perfection</span>
            </div>
            <div className="flex items-center gap-2 text-level">
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium">Understanding Over Memorization</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
            Ready to Experience Learning <span className="gradient-text">Differently</span>?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            Join thousands of learners, teachers, and institutions already transforming education with Lumio.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow-primary hover:opacity-90 transition-opacity">
              <GraduationCap className="w-5 h-5 mr-2" />
              Start as Student
            </Button>
            <Button size="lg" variant="outline" className="border-lesson/50 text-lesson hover:bg-lesson/10">
              <Users className="w-5 h-5 mr-2" />
              Teach on Lumio
            </Button>
            <Button size="lg" variant="outline" className="border-xp/50 text-xp hover:bg-xp/10">
              <Building2 className="w-5 h-5 mr-2" />
              Partner as Institution
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
