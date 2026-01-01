import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hi! I'm Lumio AI, your personal learning assistant. Ask me anything about your courses, concepts, or get help with problems! 🚀",
    timestamp: new Date(),
  },
];

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response (Replace with actual Gemini API call)
    setTimeout(() => {
      const responses = [
        "Great question! Let me explain that concept in detail. The key thing to understand is that this builds upon what you learned in the previous lesson...",
        "I'd be happy to help with that! Based on your current progress, I'd recommend focusing on the fundamentals first. Here's a step-by-step approach...",
        "That's a common confusion! Think of it this way - it's similar to how we organize information in everyday life. Let me give you an example...",
        "Excellent thinking! You're on the right track. To take it further, consider how this connects with the concepts from your recent lessons...",
      ];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow-primary transition-all duration-300 hover:scale-110 z-40",
          isOpen && "scale-0 opacity-0"
        )}
      >
        <MessageSquare className="w-6 h-6 text-primary-foreground" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full animate-pulse" />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 w-96 h-[32rem] glass-card rounded-2xl shadow-elevated flex flex-col overflow-hidden transition-all duration-300 z-50",
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-border bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display font-semibold">Lumio AI</h3>
                <p className="text-xs text-muted-foreground">Your learning assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 animate-fade-in",
                message.role === 'user' && "flex-row-reverse"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  message.role === 'assistant'
                    ? "bg-gradient-primary"
                    : "bg-gradient-xp"
                )}
              >
                {message.role === 'assistant' ? (
                  <Bot className="w-4 h-4 text-primary-foreground" />
                ) : (
                  <User className="w-4 h-4 text-accent-foreground" />
                )}
              </div>
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                  message.role === 'assistant'
                    ? "bg-muted text-foreground rounded-tl-sm"
                    : "bg-gradient-primary text-primary-foreground rounded-tr-sm"
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-primary"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
              className="bg-gradient-primary hover:opacity-90 shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
