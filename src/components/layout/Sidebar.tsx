import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Trophy, Settings, Flame, Star, Zap, Sparkles, LogIn } from 'lucide-react';
import { useLearning } from '@/contexts/LearningContext';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: Sparkles, label: 'How It Works', path: '/how-it-works' },
  { icon: BookOpen, label: 'Lessons', path: '/lessons' },
  { icon: Trophy, label: 'Achievements', path: '/achievements' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: LogIn, label: 'Login', path: '/auth' },
];

export function Sidebar() {
  const location = useLocation();
  const { userProgress, badges } = useLearning();
  
  const xpToNextLevel = 500;
  const currentLevelXp = userProgress.xp % xpToNextLevel;
  const xpProgress = (currentLevelXp / xpToNextLevel) * 100;

  const earnedBadges = badges.filter(b => b.isEarned).slice(0, 3);

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-sidebar border-r border-sidebar-border flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-display font-bold gradient-text">Lumio</span>
        </Link>
      </div>

      {/* User Stats Card */}
      <div className="p-4">
        <div className="glass-card rounded-2xl p-4 space-y-4">
          {/* Level & XP */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-xp flex items-center justify-center">
                <span className="text-lg font-bold text-accent-foreground">{userProgress.level}</span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Level</p>
                <p className="font-semibold gradient-text-xp">Scholar</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">XP</p>
              <p className="font-bold text-xp">{userProgress.xp.toLocaleString()}</p>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{currentLevelXp} XP</span>
              <span>{xpToNextLevel} XP</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-xp rounded-full transition-all duration-500"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>

          {/* Streak */}
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-streak animate-pulse" />
              <span className="text-sm font-medium">Streak</span>
            </div>
            <span className="text-xl font-bold text-streak">{userProgress.streak} days</span>
          </div>

          {/* Earned Badges */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Recent Badges</p>
            <div className="flex gap-2">
              {earnedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-lg hover:scale-110 transition-transform cursor-pointer"
                  title={badge.title}
                >
                  {badge.icon}
                </div>
              ))}
              <Link
                to="/achievements"
                className="w-10 h-10 rounded-lg border border-dashed border-muted-foreground/30 flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <Star className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary glow-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "animate-pulse")} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Weekly Goal */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="glass-card rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Weekly Goal</span>
            <span className="text-xs text-muted-foreground">
              {userProgress.weeklyProgress}/{userProgress.weeklyGoal} lessons
            </span>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: userProgress.weeklyGoal }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "flex-1 h-2 rounded-full transition-all duration-300",
                  i < userProgress.weeklyProgress
                    ? "bg-gradient-primary"
                    : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
