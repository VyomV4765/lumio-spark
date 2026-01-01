import { useLearning } from '@/contexts/LearningContext';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const weeklyData = [
  { day: 'Mon', xp: 120, lessons: 2 },
  { day: 'Tue', xp: 80, lessons: 1 },
  { day: 'Wed', xp: 200, lessons: 3 },
  { day: 'Thu', xp: 150, lessons: 2 },
  { day: 'Fri', xp: 280, lessons: 4 },
  { day: 'Sat', xp: 100, lessons: 1 },
  { day: 'Sun', xp: 180, lessons: 2 },
];

const categoryData = [
  { name: 'AI & ML', progress: 65, color: 'hsl(175 84% 50%)' },
  { name: 'Web Dev', progress: 45, color: 'hsl(265 80% 65%)' },
  { name: 'Data Sci', progress: 30, color: 'hsl(15 90% 65%)' },
  { name: 'Algorithms', progress: 80, color: 'hsl(145 70% 50%)' },
];

export function ProgressCharts() {
  const { userProgress } = useLearning();
  
  const completionPercent = Math.round((userProgress.lessonsCompleted / userProgress.totalLessons) * 100);

  return (
    <section className="space-y-4 animate-slide-up stagger-2">
      <h2 className="text-xl font-display font-semibold">Learning Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weekly XP Chart */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold">Weekly Progress</h3>
              <p className="text-sm text-muted-foreground">XP earned this week</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold gradient-text">1,110</p>
              <p className="text-xs text-success">+15% from last week</p>
            </div>
          </div>
          
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(175 84% 50%)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(175 84% 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'hsl(215 20% 55%)', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'hsl(215 20% 55%)', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(222 47% 9%)',
                    border: '1px solid hsl(222 30% 18%)',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px hsl(222 47% 4% / 0.5)',
                  }}
                  labelStyle={{ color: 'hsl(210 40% 98%)' }}
                />
                <Area
                  type="monotone"
                  dataKey="xp"
                  stroke="hsl(175 84% 50%)"
                  strokeWidth={3}
                  fill="url(#xpGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Progress */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold">Category Progress</h3>
              <p className="text-sm text-muted-foreground">Completion by subject</p>
            </div>
          </div>
          
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical">
                <XAxis 
                  type="number" 
                  domain={[0, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(215 20% 55%)', fontSize: 12 }}
                />
                <YAxis 
                  type="category" 
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(215 20% 55%)', fontSize: 12 }}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(222 47% 9%)',
                    border: '1px solid hsl(222 30% 18%)',
                    borderRadius: '12px',
                  }}
                  formatter={(value: number) => [`${value}%`, 'Progress']}
                />
                <Bar dataKey="progress" radius={[0, 8, 8, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard
              label="Total XP"
              value={userProgress.xp.toLocaleString()}
              icon="⚡"
              color="xp"
            />
            <StatCard
              label="Lessons Done"
              value={`${userProgress.lessonsCompleted}/${userProgress.totalLessons}`}
              icon="📚"
              color="primary"
            />
            <StatCard
              label="Current Streak"
              value={`${userProgress.streak} days`}
              icon="🔥"
              color="streak"
            />
            <StatCard
              label="Completion"
              value={`${completionPercent}%`}
              icon="🎯"
              color="success"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ 
  label, 
  value, 
  icon, 
  color 
}: { 
  label: string; 
  value: string; 
  icon: string; 
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    xp: 'bg-xp/10 text-xp',
    primary: 'bg-primary/10 text-primary',
    streak: 'bg-streak/10 text-streak',
    success: 'bg-success/10 text-success',
  };

  return (
    <div className="text-center">
      <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center mx-auto mb-3 text-xl`}>
        {icon}
      </div>
      <p className="text-2xl font-bold font-display">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
