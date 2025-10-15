import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, BookOpen, Award } from 'lucide-react';
import { Progress } from './ui/progress';

interface AwarenessProps {
  onBack: () => void;
}

export function Awareness({ onBack }: AwarenessProps) {
  const [currentQuiz, setCurrentQuiz] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const articles = [
    {
      title: 'Global Waste Management Trends 2025',
      country: 'Global',
      excerpt: 'Worldwide waste generation is expected to increase by 70% by 2050. Countries are implementing innovative solutions...',
      content: 'According to the World Bank, global waste generation is on track to increase from 2.01 billion tonnes in 2016 to 3.40 billion tonnes by 2050. High-income countries generate about 34% of the world\'s waste despite making up only 16% of the world\'s population.'
    },
    {
      title: 'Chemical Recycling Revolution',
      country: 'International',
      excerpt: 'Chemical recycling breaks down plastics to their molecular level, enabling infinite recycling possibilities...',
      content: 'Chemical recycling, also known as advanced recycling, uses chemical processes to break down plastic waste into its original monomers or other useful chemicals. This technology can handle mixed and contaminated plastics that are difficult to recycle mechanically.'
    },
    {
      title: 'Segregation at Source: A Guide',
      country: 'Global',
      excerpt: 'Proper waste segregation at home can increase recycling efficiency by up to 90%...',
      content: 'Segregating waste at the source means separating different types of waste at the point where they are generated. This includes separating organic waste, recyclables (plastic, paper, glass, metal), and hazardous waste. Proper segregation reduces contamination and makes recycling more efficient and cost-effective.'
    },
    {
      title: 'E-Waste Management in Developing Nations',
      country: 'Multiple',
      excerpt: 'Electronic waste is the fastest-growing waste stream globally, with special challenges in developing countries...',
      content: 'The UN estimates that the world generates over 50 million tonnes of e-waste annually, but only 20% is formally recycled. Developing nations face unique challenges including informal recycling sectors, lack of infrastructure, and health risks from improper handling of toxic materials.'
    }
  ];

  const quizzes = [
    {
      id: 1,
      title: 'Waste Basics Quiz',
      level: 'Beginner',
      questions: [
        {
          question: 'What percentage of plastic waste is actually recycled globally?',
          options: ['9%', '25%', '50%', '75%'],
          correct: 0,
          explanation: 'Only about 9% of all plastic ever produced has been recycled. The majority ends up in landfills or the environment.'
        },
        {
          question: 'Which type of waste decomposes the fastest?',
          options: ['Plastic bags', 'Glass bottles', 'Food waste', 'Aluminum cans'],
          correct: 2,
          explanation: 'Food waste decomposes in weeks to months, while plastic can take hundreds of years and glass never fully decomposes.'
        },
        {
          question: 'What color bin is typically used for recyclables?',
          options: ['Green', 'Blue', 'Red', 'Black'],
          correct: 1,
          explanation: 'Blue bins are commonly used for recyclable materials like paper, plastic, and metal in many countries.'
        },
        {
          question: 'Which is NOT a benefit of recycling?',
          options: ['Saves energy', 'Reduces pollution', 'Creates jobs', 'Increases landfill space'],
          correct: 3,
          explanation: 'Recycling actually reduces the need for landfill space by diverting waste from landfills.'
        },
        {
          question: 'How long does it take for a plastic bottle to decompose?',
          options: ['10 years', '50 years', '100 years', '450 years'],
          correct: 3,
          explanation: 'A plastic bottle can take up to 450 years to decompose in a landfill.'
        }
      ]
    },
    {
      id: 2,
      title: 'Advanced Recycling',
      level: 'Intermediate',
      questions: [
        {
          question: 'What is chemical recycling?',
          options: [
            'Burning waste to produce energy',
            'Breaking down plastics to molecular level',
            'Sorting waste by chemical composition',
            'Using chemicals to clean waste'
          ],
          correct: 1,
          explanation: 'Chemical recycling breaks down plastic waste into its basic molecular components, allowing for infinite recycling.'
        },
        {
          question: 'Which country recycles the most waste per capita?',
          options: ['USA', 'Japan', 'Germany', 'Sweden'],
          correct: 2,
          explanation: 'Germany recycles about 65% of its waste, one of the highest rates in the world.'
        },
        {
          question: 'What does "zero waste" mean?',
          options: [
            'Producing no waste at all',
            'Recycling all waste',
            'Diverting 90%+ waste from landfills',
            'Burning all waste'
          ],
          correct: 2,
          explanation: 'Zero waste aims to divert 90% or more of waste from landfills and incinerators through reduction, reuse, and recycling.'
        },
        {
          question: 'Which material can be recycled indefinitely?',
          options: ['Paper', 'Plastic', 'Glass', 'Fabric'],
          correct: 2,
          explanation: 'Glass can be recycled endlessly without loss of quality or purity.'
        },
        {
          question: 'What is composting?',
          options: [
            'Burning organic waste',
            'Biological decomposition of organic matter',
            'Storing food waste',
            'Freezing organic materials'
          ],
          correct: 1,
          explanation: 'Composting is the biological decomposition of organic matter into a nutrient-rich soil amendment.'
        }
      ]
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const quiz = quizzes[currentQuiz!];
    
    setTimeout(() => {
      if (answerIndex === quiz.questions[currentQuestion].correct) {
        setQuizScore(quizScore + 1);
        
        // Award coins and diamonds
        const currentCoins = parseInt(localStorage.getItem('terranova_coins') || '0');
        const currentDiamonds = parseInt(localStorage.getItem('terranova_diamonds') || '0');
        localStorage.setItem('terranova_coins', (currentCoins + 2).toString());
        localStorage.setItem('terranova_diamonds', (currentDiamonds + 1).toString());
      }
      
      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // Quiz complete - update level
        const currentLevel = parseInt(localStorage.getItem('terranova_level') || '1');
        localStorage.setItem('terranova_level', (currentLevel + 1).toString());
        
        // Show results
        setTimeout(() => {
          alert(`Quiz Complete!\nScore: ${quizScore + (answerIndex === quiz.questions[currentQuestion].correct ? 1 : 0)}/${quiz.questions.length}\nLevel Up! You're now level ${currentLevel + 1}`);
          setCurrentQuiz(null);
          setQuizScore(0);
          setCurrentQuestion(0);
          setSelectedAnswer(null);
        }, 1500);
      }
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="mb-6">
        <h2>Awareness & Education</h2>
        <p className="text-muted-foreground">Learn about waste management and sustainability</p>
      </div>

      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-4 mt-6">
          {articles.map((article, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{article.title}</CardTitle>
                    <CardDescription>{article.country}</CardDescription>
                  </div>
                  <BookOpen className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-3">{article.excerpt}</p>
                <details className="text-muted-foreground">
                  <summary className="cursor-pointer hover:text-foreground" style={{ fontSize: '0.875rem' }}>
                    Read more
                  </summary>
                  <p className="mt-3" style={{ fontSize: '0.875rem' }}>{article.content}</p>
                </details>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-4 mt-6">
          {currentQuiz === null ? (
            <>
              {quizzes.map((quiz) => (
                <Card key={quiz.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentQuiz(quiz.id - 1)}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{quiz.title}</CardTitle>
                        <CardDescription>Level: {quiz.level}</CardDescription>
                      </div>
                      <Award className="w-5 h-5 text-yellow-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                      {quiz.questions.length} questions • Earn 2 coins & 1 diamond per correct answer
                    </p>
                  </CardContent>
                </Card>
              ))}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <p className="text-center">
                    💡 Complete quizzes to level up and earn rewards!
                  </p>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>{quizzes[currentQuiz].title}</CardTitle>
                <Progress value={(currentQuestion / quizzes[currentQuiz].questions.length) * 100} className="mt-2" />
                <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                  Question {currentQuestion + 1} of {quizzes[currentQuiz].questions.length}
                </p>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="mb-4">{quizzes[currentQuiz].questions[currentQuestion].question}</h3>
                  <div className="space-y-3">
                    {quizzes[currentQuiz].questions[currentQuestion].options.map((option, index) => {
                      const isCorrect = index === quizzes[currentQuiz].questions[currentQuestion].correct;
                      const isSelected = selectedAnswer === index;
                      
                      return (
                        <button
                          key={index}
                          onClick={() => selectedAnswer === null && handleAnswer(index)}
                          disabled={selectedAnswer !== null}
                          className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                            selectedAnswer === null
                              ? 'border-border hover:border-primary hover:bg-primary/5'
                              : isSelected
                              ? isCorrect
                                ? 'border-green-500 bg-green-50'
                                : 'border-red-500 bg-red-50'
                              : isCorrect
                              ? 'border-green-500 bg-green-50'
                              : 'border-border opacity-50'
                          }`}
                        >
                          <p>{option}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                {selectedAnswer !== null && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p style={{ fontSize: '0.875rem' }}>
                      <strong>Explanation:</strong> {quizzes[currentQuiz].questions[currentQuestion].explanation}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
