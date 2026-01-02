import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Pause, SkipForward, Clock, CheckCircle, BookOpen, FileText, Download } from 'lucide-react';
import { useLearning } from '@/contexts/LearningContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function LessonPlayer() {
  const { lessonId } = useParams();
  const { lessons, updateLessonProgress, addXp } = useLearning();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'playlist' | 'notes' | 'resources'>('playlist');

  const currentLesson = lessons.find(l => l.id === lessonId);
  const otherLessons = lessons.filter(l => l.id !== lessonId);

  if (!currentLesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-display font-bold mb-2">Lesson not found</h2>
        <p className="text-muted-foreground mb-6">The lesson you're looking for doesn't exist.</p>
        <Link to="/">
          <Button className="bg-gradient-primary">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const handleCompleteLesson = () => {
    updateLessonProgress(currentLesson.id, 100);
    addXp(50);
  };

  return (
    <div className="max-w-7xl space-y-6 animate-fade-in">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Back Button */}
      <Link 
        to="/"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Video Section */}
        <div className="lg:col-span-2 space-y-4">
          {/* Video Player */}
          <div className="aspect-video bg-gradient-to-br from-primary/10 via-card to-primary/5 rounded-2xl overflow-hidden relative group shadow-elevated border border-primary/10">
            <iframe
              src={currentLesson.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            
            {/* Custom Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-all shadow-lg glow-primary"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-primary-foreground" />
                  ) : (
                    <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                  )}
                </button>
                
                {/* Progress Bar */}
                <div className="flex-1 h-2 bg-background/30 backdrop-blur-sm rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full transition-all"
                    style={{ width: `${currentLesson.progress}%` }}
                  />
                </div>
                
                <span className="text-sm text-primary-foreground font-medium">{currentLesson.duration}</span>
              </div>
            </div>
          </div>

          {/* Lesson Info */}
          <div className="glass-card rounded-2xl p-6 space-y-5 border border-primary/10 bg-gradient-to-br from-card via-card to-primary/5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 text-primary text-xs font-semibold border border-primary/20">
                  <BookOpen className="w-3 h-3" />
                  {currentLesson.category}
                </span>
                <h1 className="text-2xl font-display font-bold mt-3 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">{currentLesson.title}</h1>
                <p className="text-muted-foreground mt-2 leading-relaxed">{currentLesson.description}</p>
              </div>
              
              <div className="flex items-center gap-2 text-sm bg-primary/10 text-primary px-3 py-2 rounded-xl font-medium shrink-0 border border-primary/20">
                <Clock className="w-4 h-4" />
                {currentLesson.duration}
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-3 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground font-medium">Your Progress</span>
                <span className="font-bold text-primary text-lg">{currentLesson.progress}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-primary via-primary to-primary-glow rounded-full transition-all duration-500 relative"
                  style={{ width: `${currentLesson.progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {currentLesson.isCompleted ? (
                <Button disabled className="flex-1 gap-2 bg-success/20 text-success border border-success/30">
                  <CheckCircle className="w-4 h-4" />
                  Completed
                </Button>
              ) : (
                <Button 
                  onClick={handleCompleteLesson}
                  className="flex-1 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 gap-2 shadow-lg glow-primary transition-all hover:scale-[1.02]"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark as Complete (+50 XP)
                </Button>
              )}
              <Button variant="outline" className="gap-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all">
                <SkipForward className="w-4 h-4" />
                Next Lesson
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Tab Navigation */}
          <div className="glass-card rounded-xl p-1.5 flex bg-gradient-to-r from-primary/5 to-transparent border border-primary/10">
            {(['playlist', 'notes', 'resources'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all capitalize",
                  activeTab === tab
                    ? "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="glass-card rounded-2xl overflow-hidden border border-primary/10 bg-gradient-to-b from-card to-primary/5">
            {activeTab === 'playlist' && (
              <div className="divide-y divide-primary/10 max-h-[500px] overflow-y-auto">
                {/* Current Lesson */}
                <div className="p-4 bg-gradient-to-r from-primary/15 via-primary/10 to-transparent border-l-4 border-primary">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shrink-0 shadow-md animate-pulse-glow">
                      <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate text-primary">{currentLesson.title}</p>
                      <p className="text-xs text-primary/70 font-medium">{currentLesson.duration} • Now Playing</p>
                    </div>
                  </div>
                </div>

                {/* Other Lessons */}
                {otherLessons.map((lesson, index) => (
                  <Link
                    key={lesson.id}
                    to={`/learn/${lesson.id}`}
                    className="p-4 flex items-center gap-3 hover:bg-primary/5 transition-all group/item"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className={cn(
                      "w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover/item:scale-105",
                      lesson.isCompleted 
                        ? "bg-gradient-to-br from-success/20 to-success/10 border border-success/30" 
                        : "bg-gradient-to-br from-muted to-muted/50 border border-border"
                    )}>
                      {lesson.isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-success" />
                      ) : (
                        <Play className="w-4 h-4 text-muted-foreground group-hover/item:text-primary ml-0.5 transition-colors" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate group-hover/item:text-primary transition-colors">{lesson.title}</p>
                      <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold">Lesson Notes</span>
                </div>
                <div className="space-y-3">
                  {[
                    { title: 'Key Concept #1', content: 'Machine learning is a subset of AI that enables computers to learn from data...' },
                    { title: 'Key Concept #2', content: 'Supervised learning uses labeled data to train models for prediction...' },
                    { title: 'Key Concept #3', content: 'Neural networks are inspired by the human brain\'s architecture...' },
                  ].map((note, i) => (
                    <div key={i} className="p-4 bg-gradient-to-r from-primary/10 to-transparent rounded-xl text-sm border border-primary/10 hover:border-primary/30 transition-colors">
                      <p className="font-bold mb-1.5 text-foreground">{note.title}</p>
                      <p className="text-muted-foreground text-xs leading-relaxed">{note.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Download className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold">Downloadable Resources</span>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Lesson Slides', type: 'PDF', size: '2.4 MB', color: 'from-red-500/20 to-red-500/5' },
                    { name: 'Code Examples', type: 'ZIP', size: '1.1 MB', color: 'from-blue-500/20 to-blue-500/5' },
                    { name: 'Cheat Sheet', type: 'PDF', size: '0.5 MB', color: 'from-primary/20 to-primary/5' },
                  ].map((resource, i) => (
                    <button
                      key={i}
                      className="w-full p-4 bg-gradient-to-r from-muted/50 to-transparent rounded-xl flex items-center gap-3 hover:from-primary/10 hover:to-transparent transition-all text-left group/resource border border-transparent hover:border-primary/20"
                    >
                      <div className={cn("w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center border border-primary/20", resource.color)}>
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm group-hover/resource:text-primary transition-colors">{resource.name}</p>
                        <p className="text-xs text-muted-foreground">{resource.type} • {resource.size}</p>
                      </div>
                      <Download className="w-4 h-4 text-muted-foreground group-hover/resource:text-primary transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
