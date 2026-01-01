import { CheckCircle, BookOpen, Trophy, Flame, Clock } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'lesson_completed',
    title: 'Completed "Data Structures Essentials"',
    xp: 50,
    time: '2 hours ago',
    icon: CheckCircle,
    color: 'success',
  },
  {
    id: 2,
    type: 'achievement',
    title: 'Earned "Week Warrior" achievement',
    xp: 100,
    time: '1 day ago',
    icon: Trophy,
    color: 'xp',
  },
  {
    id: 3,
    type: 'streak',
    title: 'Extended learning streak to 7 days!',
    xp: 25,
    time: '1 day ago',
    icon: Flame,
    color: 'streak',
  },
  {
    id: 4,
    type: 'lesson_started',
    title: 'Started "Introduction to Machine Learning"',
    xp: 10,
    time: '2 days ago',
    icon: BookOpen,
    color: 'primary',
  },
];

const colorClasses: Record<string, { bg: string; text: string }> = {
  success: { bg: 'bg-success/10', text: 'text-success' },
  xp: { bg: 'bg-xp/10', text: 'text-xp' },
  streak: { bg: 'bg-streak/10', text: 'text-streak' },
  primary: { bg: 'bg-primary/10', text: 'text-primary' },
};

export function RecentActivity() {
  return (
    <section className="space-y-4 animate-slide-up stagger-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-semibold">Recent Activity</h2>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          Last 7 days
        </div>
      </div>

      <div className="glass-card rounded-2xl divide-y divide-border">
        {activities.map((activity, index) => {
          const colors = colorClasses[activity.color];
          return (
            <div
              key={activity.id}
              className="p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
                <activity.icon className={`w-5 h-5 ${colors.text}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-sm font-semibold text-xp">+{activity.xp} XP</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
