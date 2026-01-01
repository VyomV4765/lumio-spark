import { Link } from 'react-router-dom';
import { Play, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { useLearning } from '@/contexts/LearningContext';
import { cn } from '@/lib/utils';

export function RecommendedLessons() {
  const { lessons } = useLearning();
  
  // Get lessons not started yet
  const recommendedLessons = lessons
    .filter(l => l.progress === 0)
    .slice(0, 4);

  return (
    <section className="space-y-4 animate-slide-up stagger-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          <h2 className="text-xl font-display font-semibold">Recommended for You</h2>
        </div>
        <Link 
          to="/lessons"
          className="text-sm text-primary hover:text-primary-glow flex items-center gap-1 transition-colors"
        >
          Browse all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendedLessons.map((lesson, index) => (
          <Link
            key={lesson.id}
            to={`/learn/${lesson.id}`}
            className="group glass-card rounded-xl overflow-hidden hover:shadow-card transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Thumbnail placeholder */}
            <div className="aspect-video bg-gradient-to-br from-muted to-card relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-background/80 backdrop-blur flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                  <Play className="w-5 h-5 text-primary group-hover:text-primary-foreground ml-0.5" />
                </div>
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-2 left-2">
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-medium",
                  lesson.category === 'AI & ML' && "bg-primary/20 text-primary",
                  lesson.category === 'Programming' && "bg-accent/20 text-accent",
                  lesson.category === 'Web Development' && "bg-secondary/20 text-secondary",
                  lesson.category === 'Data Science' && "bg-success/20 text-success",
                )}>
                  {lesson.category}
                </span>
              </div>

              {/* Duration */}
              <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded bg-background/80 backdrop-blur text-xs">
                <Clock className="w-3 h-3" />
                {lesson.duration}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                {lesson.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {lesson.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
