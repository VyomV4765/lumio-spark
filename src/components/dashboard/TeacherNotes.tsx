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
    content: 'ReLU outputs 0 for negative inputs and the input value for positive ones.',
    lesson: 'Intro to ML',
    timestamp: '2h ago'
  },
  {
    id: '2',
    topic: 'Gradient Descent',
    content: 'Learning rate determines step size. Start with 0.01 and adjust.',
    lesson: 'Intro to ML',
    timestamp: 'Yesterday'
  }
];

export function TeacherNotes() {
  return (
    <div className="glass-card rounded-2xl p-5 h-full flex flex-col border border-primary/10">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <h3 className="font-semibold text-sm">Teacher's Notes</h3>
        </div>
        <span className="text-xs text-muted-foreground">Recent</span>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto">
        {recentNotes.map((note) => (
          <div 
            key={note.id}
            className="p-3 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10 hover:border-primary/30 transition-all"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-primary">
                {note.topic}
              </span>
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" />
                {note.timestamp}
              </span>
            </div>
            
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {note.content}
            </p>
          </div>
        ))}
      </div>

      <button className="mt-3 w-full py-2 text-xs text-primary hover:bg-primary/10 transition-colors flex items-center justify-center gap-1 border border-primary/20 rounded-xl">
        <FileText className="w-3 h-3" />
        View All
      </button>
    </div>
  );
}
