import { useLearning } from '@/contexts/LearningContext';
import { ContinueLearning } from '@/components/dashboard/ContinueLearning';
import { ProgressCharts } from '@/components/dashboard/ProgressCharts';
import { RecommendedLessons } from '@/components/dashboard/RecommendedLessons';
import { RecentActivity } from '@/components/dashboard/RecentActivity';

export default function Dashboard() {
  const { userProgress } = useLearning();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <header className="animate-slide-up">
        <h1 className="text-3xl font-display font-bold mb-2">
          {getGreeting()}, <span className="gradient-text">Learner</span> 👋
        </h1>
        <p className="text-muted-foreground">
          You're on a {userProgress.streak}-day streak! Keep up the great work.
        </p>
      </header>

      {/* Main Content Grid */}
      <div className="space-y-8">
        <ContinueLearning />
        <ProgressCharts />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RecommendedLessons />
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}
