import { User, Bell, Moon, Palette, Shield, HelpCircle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const settingsSections = [
  {
    title: 'Profile',
    icon: User,
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center text-3xl">
            🧑‍🎓
          </div>
          <Button variant="outline" size="sm">Change Avatar</Button>
        </div>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Display Name</Label>
            <Input defaultValue="Student Learner" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input defaultValue="student@lumio.com" type="email" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Notifications',
    icon: Bell,
    content: (
      <div className="space-y-4">
        {[
          { label: 'Daily Reminders', description: 'Get notified to maintain your streak', defaultChecked: true },
          { label: 'Achievement Alerts', description: 'Celebrate when you unlock achievements', defaultChecked: true },
          { label: 'New Lessons', description: 'Be notified when new content is available', defaultChecked: false },
          { label: 'Weekly Summary', description: 'Receive a weekly progress report', defaultChecked: true },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
            <Switch defaultChecked={item.defaultChecked} />
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Appearance',
    icon: Palette,
    content: (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">Dark Mode</p>
            <p className="text-xs text-muted-foreground">Use dark theme</p>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">Reduce Animations</p>
            <p className="text-xs text-muted-foreground">Minimize motion effects</p>
          </div>
          <Switch />
        </div>
      </div>
    ),
  },
  {
    title: 'Learning Preferences',
    icon: Moon,
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Daily Learning Goal</Label>
          <div className="flex gap-2">
            {[1, 3, 5, 7].map((num) => (
              <Button
                key={num}
                variant={num === 5 ? "default" : "outline"}
                size="sm"
                className={num === 5 ? "bg-gradient-primary" : ""}
              >
                {num} lessons
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">Auto-play Next Lesson</p>
            <p className="text-xs text-muted-foreground">Continue to next lesson automatically</p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
    ),
  },
  {
    title: 'Privacy & Security',
    icon: Shield,
    content: (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">Profile Visibility</p>
            <p className="text-xs text-muted-foreground">Allow others to see your achievements</p>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">Learning Analytics</p>
            <p className="text-xs text-muted-foreground">Share anonymous data to improve Lumio</p>
          </div>
          <Switch defaultChecked />
        </div>
        <Button variant="outline" className="w-full">Change Password</Button>
      </div>
    ),
  },
  {
    title: 'Help & Support',
    icon: HelpCircle,
    content: (
      <div className="space-y-3">
        <Button variant="outline" className="w-full justify-start">📚 Help Center</Button>
        <Button variant="outline" className="w-full justify-start">💬 Contact Support</Button>
        <Button variant="outline" className="w-full justify-start">📋 Send Feedback</Button>
        <Button variant="outline" className="w-full justify-start">📄 Terms of Service</Button>
      </div>
    ),
  },
];

export default function Settings() {
  return (
    <div className="max-w-3xl space-y-8 animate-fade-in">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-display font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Customize your Lumio experience.
        </p>
      </header>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section) => (
          <div key={section.title} className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <section.icon className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-display font-semibold">{section.title}</h2>
            </div>
            {section.content}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Lumio Learning Platform v1.0.0</p>
        <p className="mt-1">Made with 💜 for learners everywhere</p>
      </div>
    </div>
  );
}
