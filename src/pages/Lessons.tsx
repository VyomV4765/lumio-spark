import { Link } from 'react-router-dom';
import { useLearning } from '@/contexts/LearningContext';
import { Play, Clock, CheckCircle, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const categories = ['All', 'AI & ML', 'Programming', 'Web Development', 'Data Science'];

export default function Lessons() {
  const { lessons } = useLearning();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || lesson.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const completedCount = lessons.filter(l => l.isCompleted).length;
  const inProgressCount = lessons.filter(l => l.progress > 0 && !l.isCompleted).length;

  return (
    <div className="max-w-6xl space-y-8 animate-fade-in">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-display font-bold mb-2">All Lessons</h1>
        <p className="text-muted-foreground">
          Browse all available lessons. You've completed {completedCount} lessons with {inProgressCount} in progress.
        </p>
      </header>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search lessons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "shrink-0",
                activeCategory === category && "bg-gradient-primary"
              )}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson, index) => (
          <Link
            key={lesson.id}
            to={`/learn/${lesson.id}`}
            className="group glass-card rounded-xl overflow-hidden hover:shadow-card transition-all duration-300"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Thumbnail */}
            <div className="aspect-video bg-gradient-to-br from-muted to-card relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300",
                  lesson.isCompleted
                    ? "bg-success/20"
                    : "bg-background/80 backdrop-blur group-hover:scale-110 group-hover:bg-primary"
                )}>
                  {lesson.isCompleted ? (
                    <CheckCircle className="w-7 h-7 text-success" />
                  ) : (
                    <Play className="w-6 h-6 text-primary group-hover:text-primary-foreground ml-0.5" />
                  )}
                </div>
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  lesson.category === 'AI & ML' && "bg-primary/20 text-primary",
                  lesson.category === 'Programming' && "bg-accent/20 text-accent",
                  lesson.category === 'Web Development' && "bg-secondary/20 text-secondary",
                  lesson.category === 'Data Science' && "bg-success/20 text-success",
                )}>
                  {lesson.category}
                </span>
              </div>

              {/* Duration */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded bg-background/80 backdrop-blur text-xs">
                <Clock className="w-3 h-3" />
                {lesson.duration}
              </div>

              {/* Progress Indicator */}
              {lesson.progress > 0 && !lesson.isCompleted && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                  <div 
                    className="h-full bg-gradient-primary"
                    style={{ width: `${lesson.progress}%` }}
                  />
                </div>
              )}
            </div>

            <div className="p-5">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {lesson.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {lesson.description}
              </p>

              <div className="flex items-center justify-between">
                {lesson.isCompleted ? (
                  <span className="text-sm text-success font-medium flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Completed
                  </span>
                ) : lesson.progress > 0 ? (
                  <span className="text-sm text-primary font-medium">
                    {lesson.progress}% complete
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Not started
                  </span>
                )}

                <Button size="sm" variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10">
                  {lesson.isCompleted ? 'Review' : lesson.progress > 0 ? 'Continue' : 'Start'}
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredLessons.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No lessons found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}
