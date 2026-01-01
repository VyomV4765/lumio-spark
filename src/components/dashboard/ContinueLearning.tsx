import { Link } from 'react-router-dom';
import { Play, Clock, ArrowRight } from 'lucide-react';
import { useLearning } from '@/contexts/LearningContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ContinueLearning() {
  const { lessons } = useLearning();
  
  // Get lessons in progress (not completed, has some progress)
  const inProgressLessons = lessons
    .filter(l => l.progress > 0 && !l.isCompleted)
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 2);

  if (inProgressLessons.length === 0) {
    return null;
  }

  const mainLesson = inProgressLessons[0];

  return (
    <section className="space-y-4 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-semibold">Continue Learning</h2>
        <Link 
          to="/lessons"
          className="text-sm text-primary hover:text-primary-glow flex items-center gap-1 transition-colors"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Featured Lesson */}
        <Link
          to={`/learn/${mainLesson.id}`}
          className="lg:col-span-2 group relative overflow-hidden rounded-2xl glass-card hover:shadow-glow-primary transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative p-6 flex flex-col h-full min-h-[240px]">
            <div className="flex items-start justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                {mainLesson.category}
              </span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {mainLesson.duration}
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-display font-bold mb-2 group-hover:gradient-text transition-all">
                {mainLesson.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {mainLesson.description}
              </p>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold text-primary">{mainLesson.progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                  style={{ width: `${mainLesson.progress}%` }}
                />
              </div>
            </div>

            <Button className="mt-4 bg-gradient-primary hover:opacity-90 gap-2 w-full">
              <Play className="w-4 h-4" />
              Continue Lesson
            </Button>
          </div>
        </Link>

        {/* Secondary Lessons */}
        <div className="space-y-4">
          {inProgressLessons.slice(1).map((lesson) => (
            <Link
              key={lesson.id}
              to={`/learn/${lesson.id}`}
              className="block group glass-card rounded-xl p-4 hover:shadow-card transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                    {lesson.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">{lesson.category}</p>
                  <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-primary rounded-full"
                      style={{ width: `${lesson.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Quick Start New */}
          <Link
            to="/lessons"
            className="block glass-card rounded-xl p-4 border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Start New Lesson</h4>
                <p className="text-xs text-muted-foreground">Explore more topics</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
