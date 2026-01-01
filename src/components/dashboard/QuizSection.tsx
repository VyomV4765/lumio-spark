import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Sparkles, ArrowRight } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  topic: string;
}

const mockQuizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What is the primary purpose of a neural network activation function?',
    options: [
      'To store data',
      'To introduce non-linearity',
      'To speed up training',
      'To reduce memory usage'
    ],
    correctAnswer: 1,
    topic: 'Neural Networks'
  },
  {
    id: '2',
    question: 'Which data structure uses LIFO (Last In, First Out)?',
    options: ['Queue', 'Stack', 'Array', 'Linked List'],
    correctAnswer: 1,
    topic: 'Data Structures'
  },
  {
    id: '3',
    question: 'What hook is used for side effects in React?',
    options: ['useState', 'useEffect', 'useContext', 'useReducer'],
    correctAnswer: 1,
    topic: 'React Hooks'
  }
];

export function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const question = mockQuizQuestions[currentQuestion];

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    if (selectedAnswer === question.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < mockQuizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizStarted(false);
    setQuizCompleted(false);
  };

  if (!quizStarted) {
    return (
      <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Quick Knowledge Check</h3>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">
            🧠
          </div>
          <div>
            <h4 className="font-display font-semibold text-lg mb-1">Test Your Knowledge</h4>
            <p className="text-sm text-muted-foreground">
              {mockQuizQuestions.length} quick questions based on your recent lessons
            </p>
          </div>
          <Button 
            onClick={() => setQuizStarted(true)}
            className="bg-primary hover:bg-primary/90"
          >
            Start Quiz
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score / mockQuizQuestions.length) * 100);
    return (
      <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Quiz Complete!</h3>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl ${
            percentage >= 70 ? 'bg-success/10' : 'bg-accent/10'
          }`}>
            {percentage >= 70 ? '🎉' : '💪'}
          </div>
          <div>
            <h4 className="font-display font-semibold text-2xl mb-1">
              {score}/{mockQuizQuestions.length} Correct
            </h4>
            <p className="text-sm text-muted-foreground">
              {percentage >= 70 
                ? 'Great job! You\'re mastering this material!' 
                : 'Keep practicing, you\'re getting better!'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetQuiz}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Quick Quiz</h3>
        </div>
        <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
          {currentQuestion + 1}/{mockQuizQuestions.length}
        </span>
      </div>

      <div className="flex-1 space-y-4">
        <div>
          <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
            {question.topic}
          </span>
          <p className="font-medium mt-3 text-sm leading-relaxed">{question.question}</p>
        </div>

        <div className="space-y-2">
          {question.options.map((option, index) => {
            let optionClass = 'border-border/50 hover:border-primary/50 hover:bg-primary/5';
            
            if (showResult) {
              if (index === question.correctAnswer) {
                optionClass = 'border-success bg-success/10';
              } else if (index === selectedAnswer && index !== question.correctAnswer) {
                optionClass = 'border-destructive bg-destructive/10';
              }
            } else if (selectedAnswer === index) {
              optionClass = 'border-primary bg-primary/10';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-3 text-left text-sm rounded-xl border transition-all flex items-center justify-between ${optionClass}`}
              >
                <span>{option}</span>
                {showResult && index === question.correctAnswer && (
                  <CheckCircle className="w-4 h-4 text-success" />
                )}
                {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                  <XCircle className="w-4 h-4 text-destructive" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border/50">
        {!showResult ? (
          <Button 
            onClick={handleSubmit} 
            disabled={selectedAnswer === null}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Check Answer
          </Button>
        ) : (
          <Button onClick={handleNext} className="w-full">
            {currentQuestion < mockQuizQuestions.length - 1 ? 'Next Question' : 'See Results'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
