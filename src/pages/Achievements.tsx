import { useLearning } from '@/contexts/LearningContext';
import { Trophy, Lock, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const rarityStyles = {
  common: {
    bg: 'bg-muted',
    border: 'border-muted-foreground/20',
    glow: '',
    text: 'text-muted-foreground',
  },
  rare: {
    bg: 'bg-lesson/10',
    border: 'border-lesson/30',
    glow: 'shadow-[0_0_20px_hsl(210_90%_60%/0.2)]',
    text: 'text-lesson',
  },
  epic: {
    bg: 'bg-accent/10',
    border: 'border-accent/30',
    glow: 'shadow-[0_0_20px_hsl(265_80%_65%/0.3)]',
    text: 'text-accent',
  },
  legendary: {
    bg: 'bg-xp/10',
    border: 'border-xp/30',
    glow: 'shadow-[0_0_30px_hsl(45_100%_60%/0.4)]',
    text: 'text-xp',
  },
};

export default function Achievements() {
  const { achievements, badges, userProgress } = useLearning();

  const unlockedAchievements = achievements.filter(a => a.isUnlocked);
  const lockedAchievements = achievements.filter(a => !a.isUnlocked);

  return (
    <div className="max-w-5xl space-y-8 animate-fade-in">
      {/* Header */}
      <header>
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-8 h-8 text-xp" />
          <h1 className="text-3xl font-display font-bold">Achievements</h1>
        </div>
        <p className="text-muted-foreground">
          Collect achievements and badges as you learn. Show off your progress!
        </p>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Achievements" value={`${unlockedAchievements.length}/${achievements.length}`} icon="🏆" />
        <StatCard label="Badges Earned" value={`${badges.filter(b => b.isEarned).length}/${badges.length}`} icon="🎖️" />
        <StatCard label="Total XP" value={userProgress.xp.toLocaleString()} icon="⚡" />
        <StatCard label="Current Level" value={userProgress.level.toString()} icon="📊" />
      </div>

      {/* Badges Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-display font-semibold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          Badges
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={cn(
                "glass-card rounded-xl p-4 text-center transition-all duration-300",
                badge.isEarned
                  ? "hover:scale-105 hover:shadow-glow-achievement"
                  : "opacity-50"
              )}
            >
              <div className={cn(
                "w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center text-3xl",
                badge.isEarned ? "bg-gradient-achievement" : "bg-muted"
              )}>
                {badge.isEarned ? badge.icon : <Lock className="w-6 h-6 text-muted-foreground" />}
              </div>
              <p className={cn(
                "font-semibold text-sm",
                !badge.isEarned && "text-muted-foreground"
              )}>
                {badge.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Unlocked Achievements */}
      {unlockedAchievements.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-display font-semibold">Unlocked</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unlockedAchievements.map((achievement) => {
              const styles = rarityStyles[achievement.rarity];
              return (
                <div
                  key={achievement.id}
                  className={cn(
                    "glass-card rounded-xl p-5 border-2 transition-all duration-300 hover:scale-[1.02]",
                    styles.border,
                    styles.glow
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0",
                      styles.bg
                    )}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium capitalize",
                          styles.bg,
                          styles.text
                        )}>
                          {achievement.rarity}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      {achievement.unlockedAt && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Unlocked {achievement.unlockedAt.toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-display font-semibold flex items-center gap-2">
            <Lock className="w-5 h-5 text-muted-foreground" />
            Locked
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lockedAchievements.map((achievement) => {
              const styles = rarityStyles[achievement.rarity];
              return (
                <div
                  key={achievement.id}
                  className="glass-card rounded-xl p-5 border border-border opacity-60"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center shrink-0">
                      <Lock className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium capitalize bg-muted",
                          styles.text
                        )}>
                          {achievement.rarity}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="glass-card rounded-xl p-4 text-center">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-2xl font-bold font-display">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
