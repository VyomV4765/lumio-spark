import { FileText, Clock, BookOpen } from 'lucide-react';

interface Note {
  id: string;
  topic: string;
  content: string;
  lesson: string;
  timestamp: string;
}

const recentNotes: Note[] = [
  {
    id: '1',
    topic: 'Activation Functions',
    content: 'Remember: ReLU (Rectified Linear Unit) outputs 0 for negative inputs and the input value for positive inputs. It\'s computationally efficient and helps with vanishing gradient problem.',
    lesson: 'Introduction to Machine Learning',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    topic: 'Gradient Descent',
    content: 'Key insight: Learning rate determines step size. Too high = overshooting, too low = slow convergence. Start with 0.01 and adjust based on loss curve.',
    lesson: 'Introduction to Machine Learning',
    timestamp: 'Yesterday'
  },
  {
    id: '3',
    topic: 'useState Best Practices',
    content: 'Always use functional updates when new state depends on previous state: setState(prev => prev + 1). This ensures you\'re working with the latest value.',
    lesson: 'React Hooks Mastery',
    timestamp: '3 days ago'
  }
];

export function TeacherNotes() {
  return (
    <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-accent" />
          <h3 className="font-semibold">Teacher's Notes</h3>
        </div>
        <span className="text-xs text-muted-foreground">Recent topics</span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar">
        {recentNotes.map((note, index) => (
          <div 
            key={note.id}
            className="p-4 rounded-xl bg-card/50 border border-border/30 hover:border-accent/30 transition-all group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full">
                {note.topic}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {note.timestamp}
              </span>
            </div>
            
            <p className="text-sm text-foreground/80 leading-relaxed mb-3">
              {note.content}
            </p>
            
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <BookOpen className="w-3 h-3" />
              <span>{note.lesson}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full py-2 text-sm text-primary hover:text-primary/80 transition-colors flex items-center justify-center gap-1 border border-dashed border-border/50 rounded-xl hover:border-primary/30">
        <FileText className="w-4 h-4" />
        View All Notes
      </button>
    </div>
  );
}
