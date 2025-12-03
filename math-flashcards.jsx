import React, { useState, useEffect, useCallback, useRef } from 'react';

export default function MathFlashcards() {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(10 * 60); // configurable duration
  const [timeRemaining, setTimeRemaining] = useState(10 * 60);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [problemStartTime, setProblemStartTime] = useState(null);
  const [problemHistory, setProblemHistory] = useState([]);
  const [showTimeSettings, setShowTimeSettings] = useState(false);
  const inputRef = useRef(null);

  const generateProblem = useCallback((numbers) => {
    const num1 = numbers[Math.floor(Math.random() * numbers.length)];
    const num2 = Math.floor(Math.random() * 12) + 1;
    return {
      num1,
      num2,
      answer: num1 * num2
    };
  }, []);

  // Timer effect
  useEffect(() => {
    let interval;
    if (quizStarted && timeRemaining > 0 && !sessionComplete) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setSessionComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, timeRemaining, sessionComplete]);

  // Focus input when problem changes
  useEffect(() => {
    if (inputRef.current && quizStarted && !sessionComplete) {
      inputRef.current.focus();
    }
  }, [currentProblem, quizStarted, sessionComplete]);

  const toggleNumber = (num) => {
    setSelectedNumbers(prev => 
      prev.includes(num) 
        ? prev.filter(n => n !== num)
        : [...prev, num]
    );
  };

  const selectAll = () => {
    setSelectedNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  };

  const clearAll = () => {
    setSelectedNumbers([]);
  };

  const startQuiz = () => {
    if (selectedNumbers.length === 0) return;
    setQuizStarted(true);
    setCurrentProblem(generateProblem(selectedNumbers));
    setUserAnswer('');
    setFeedback(null);
    setScore({ correct: 0, total: 0 });
    setShowAnswer(false);
    setTimeRemaining(sessionDuration);
    setSessionComplete(false);
    setProblemStartTime(Date.now());
    setProblemHistory([]);
  };

  const nextProblem = () => {
    setCurrentProblem(generateProblem(selectedNumbers));
    setUserAnswer('');
    setFeedback(null);
    setShowAnswer(false);
    setProblemStartTime(Date.now());
  };

  const checkAnswer = () => {
    const timeTaken = (Date.now() - problemStartTime) / 1000; // in seconds
    const isCorrect = parseInt(userAnswer) === currentProblem.answer;
    
    // Record this problem's details
    setProblemHistory(prev => [...prev, {
      num1: currentProblem.num1,
      num2: currentProblem.num2,
      answer: currentProblem.answer,
      userAnswer: parseInt(userAnswer),
      isCorrect,
      timeTaken
    }]);
    
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
    setShowAnswer(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && userAnswer && !showAnswer) {
      checkAnswer();
    } else if (e.key === 'Enter' && showAnswer) {
      nextProblem();
    }
  };

  const goBack = () => {
    setQuizStarted(false);
    setCurrentProblem(null);
    setUserAnswer('');
    setFeedback(null);
    setScore({ correct: 0, total: 0 });
    setShowAnswer(false);
    setSessionComplete(false);
  };

  const restartSession = () => {
    setTimeRemaining(sessionDuration);
    setSessionComplete(false);
    setScore({ correct: 0, total: 0 });
    setCurrentProblem(generateProblem(selectedNumbers));
    setUserAnswer('');
    setFeedback(null);
    setShowAnswer(false);
    setProblemStartTime(Date.now());
    setProblemHistory([]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    return mins === 1 ? '1 minute' : `${mins} minutes`;
  };

  const timeOptions = [
    { label: '30 sec', value: 30 },
    { label: '1 min', value: 60 },
    { label: '2 min', value: 120 },
    { label: '5 min', value: 300 },
    { label: '10 min', value: 600 },
    { label: '15 min', value: 900 },
    { label: '20 min', value: 1200 },
  ];

  const getTimerColor = () => {
    if (timeRemaining <= 60) return 'text-red-500';
    if (timeRemaining <= 180) return 'text-orange-500';
    return 'text-purple-700';
  };

  // Calculate grade based on accuracy and speed
  const calculateGrade = (accuracy, avgTime) => {
    // Base score from accuracy (0-100)
    let baseScore = accuracy;
    
    // Speed bonus/penalty
    // Under 3 seconds: +10 points
    // 3-5 seconds: +5 points
    // 5-8 seconds: no change
    // 8-12 seconds: -5 points
    // Over 12 seconds: -10 points
    let speedModifier = 0;
    if (avgTime < 3) speedModifier = 10;
    else if (avgTime < 5) speedModifier = 5;
    else if (avgTime < 8) speedModifier = 0;
    else if (avgTime < 12) speedModifier = -5;
    else speedModifier = -10;
    
    const finalScore = Math.min(100, Math.max(0, baseScore + speedModifier));
    
    // Grade thresholds
    if (accuracy === 100 && avgTime < 5) return { grade: 'A+', color: 'text-green-500', emoji: '🌟' };
    if (finalScore >= 97) return { grade: 'A+', color: 'text-green-500', emoji: '🌟' };
    if (finalScore >= 93) return { grade: 'A', color: 'text-green-500', emoji: '⭐' };
    if (finalScore >= 90) return { grade: 'A-', color: 'text-green-500', emoji: '⭐' };
    if (finalScore >= 87) return { grade: 'B+', color: 'text-blue-500', emoji: '👍' };
    if (finalScore >= 83) return { grade: 'B', color: 'text-blue-500', emoji: '👍' };
    if (finalScore >= 80) return { grade: 'B-', color: 'text-blue-500', emoji: '👍' };
    if (finalScore >= 77) return { grade: 'C+', color: 'text-yellow-600', emoji: '📚' };
    if (finalScore >= 73) return { grade: 'C', color: 'text-yellow-600', emoji: '📚' };
    if (finalScore >= 70) return { grade: 'C-', color: 'text-yellow-600', emoji: '📚' };
    if (finalScore >= 67) return { grade: 'D+', color: 'text-orange-500', emoji: '💪' };
    if (finalScore >= 63) return { grade: 'D', color: 'text-orange-500', emoji: '💪' };
    if (finalScore >= 60) return { grade: 'D-', color: 'text-orange-500', emoji: '💪' };
    return { grade: 'F', color: 'text-red-500', emoji: '🔄' };
  };

  // Get timing statistics
  const getTimingStats = () => {
    if (problemHistory.length === 0) return null;
    
    const times = problemHistory.map(p => p.timeTaken);
    const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
    
    // Sort by time for fastest/slowest
    const sorted = [...problemHistory].sort((a, b) => a.timeTaken - b.timeTaken);
    const fastest = sorted.slice(0, 3);
    const slowest = sorted.slice(-3).reverse();
    
    return { avgTime, fastest, slowest };
  };

  // Session complete screen
  if (sessionComplete) {
    const percentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
    const timingStats = getTimingStats();
    const gradeInfo = timingStats ? calculateGrade(percentage, timingStats.avgTime) : { grade: '-', color: 'text-gray-500', emoji: '❓' };
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="text-5xl mb-2">{gradeInfo.emoji}</div>
            <h1 className="text-2xl font-bold text-purple-600 mb-1">
              Practice Complete!
            </h1>
            <p className="text-gray-500 text-sm">
              Great job finishing your {sessionDuration >= 60 ? formatDuration(sessionDuration) : `${sessionDuration} second`} session!
            </p>
          </div>

          {/* Grade Display */}
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-4 mb-4 text-center">
            <p className="text-gray-500 text-sm mb-1">Your Grade</p>
            <p className={`text-6xl font-bold ${gradeInfo.color}`}>{gradeInfo.grade}</p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-purple-600">{score.total}</p>
              <p className="text-gray-500 text-xs">Problems</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-green-500">{score.correct}</p>
              <p className="text-gray-500 text-xs">Correct</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-blue-500">{percentage}%</p>
              <p className="text-gray-500 text-xs">Accuracy</p>
            </div>
          </div>

          {/* Average Time */}
          {timingStats && (
            <div className="bg-yellow-50 rounded-xl p-3 mb-4 text-center">
              <p className="text-gray-500 text-sm">Average Time Per Question</p>
              <p className="text-3xl font-bold text-yellow-600">
                {timingStats.avgTime.toFixed(1)}s
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {timingStats.avgTime < 5 ? '⚡ Lightning fast!' : 
                 timingStats.avgTime < 8 ? '👍 Good pace!' : 
                 timingStats.avgTime < 12 ? '📚 Keep practicing!' : '🐢 Take your time to learn!'}
              </p>
            </div>
          )}

          {/* Fastest & Slowest */}
          {timingStats && problemHistory.length >= 3 && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Fastest */}
              <div className="bg-green-50 rounded-xl p-3">
                <p className="text-green-700 font-bold text-sm mb-2 flex items-center gap-1">
                  ⚡ Fastest
                </p>
                <div className="space-y-1">
                  {timingStats.fastest.map((p, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-700">{p.num1}×{p.num2}</span>
                      <span className="text-green-600 font-medium">{p.timeTaken.toFixed(1)}s</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Slowest */}
              <div className="bg-red-50 rounded-xl p-3">
                <p className="text-red-700 font-bold text-sm mb-2 flex items-center gap-1">
                  🐢 Needs Practice
                </p>
                <div className="space-y-1">
                  {timingStats.slowest.map((p, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-700">{p.num1}×{p.num2}</span>
                      <span className="text-red-600 font-medium">{p.timeTaken.toFixed(1)}s</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Missed Problems */}
          {problemHistory.filter(p => !p.isCorrect).length > 0 && (
            <div className="bg-orange-50 rounded-xl p-3 mb-4">
              <p className="text-orange-700 font-bold text-sm mb-2">📝 Review These</p>
              <div className="flex flex-wrap gap-2">
                {problemHistory.filter(p => !p.isCorrect).slice(0, 6).map((p, i) => (
                  <span key={i} className="bg-white px-2 py-1 rounded-lg text-sm text-gray-700 border border-orange-200">
                    {p.num1}×{p.num2}={p.answer}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Grade Legend */}
          <div className="bg-gray-50 rounded-xl p-3 mb-4">
            <p className="text-gray-500 text-xs text-center mb-2">Grade Guide</p>
            <div className="flex justify-center gap-3 text-xs">
              <span><span className="text-green-500 font-bold">A+</span> 100% + &lt;5s avg</span>
              <span><span className="text-blue-500 font-bold">B</span> 83%+</span>
              <span><span className="text-yellow-600 font-bold">C</span> 73%+</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={goBack}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-4 rounded-xl transition-all duration-200"
            >
              Change Numbers
            </button>
            <button
              onClick={restartSession}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200"
            >
              Practice Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Number selection screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center text-purple-600 mb-2">
            ✨ Math Flashcards ✨
          </h1>
          <p className="text-center text-gray-600 mb-2">
            Select numbers to practice (pick one or more!)
          </p>
          
          {/* Clickable time setting */}
          <button
            onClick={() => setShowTimeSettings(true)}
            className="w-full text-center text-sm text-purple-500 mb-4 hover:text-purple-700 hover:bg-purple-50 py-2 px-4 rounded-lg transition-all cursor-pointer"
          >
            ⏱️ {sessionDuration >= 60 ? formatDuration(sessionDuration) : `${sessionDuration} seconds`} practice session
            <span className="text-purple-400 ml-1">(tap to change)</span>
          </button>

          {/* Time Settings Dialog */}
          {showTimeSettings && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
                <h2 className="text-xl font-bold text-purple-600 mb-4 text-center">
                  ⏱️ Session Length
                </h2>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {timeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSessionDuration(option.value);
                        setShowTimeSettings(false);
                      }}
                      className={`py-3 px-4 rounded-xl font-medium transition-all ${
                        sessionDuration === option.value
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowTimeSettings(false)}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Quick select buttons */}
          <div className="flex justify-center gap-2 mb-4">
            <button
              onClick={selectAll}
              className="text-sm bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-1 rounded-full transition-all"
            >
              Select All
            </button>
            <button
              onClick={clearAll}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-all"
            >
              Clear
            </button>
          </div>
          
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
              <button
                key={num}
                onClick={() => toggleNumber(num)}
                className={`aspect-square text-2xl font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 ${
                  selectedNumbers.includes(num)
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white ring-4 ring-purple-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Selected numbers display */}
          {selectedNumbers.length > 0 && (
            <div className="text-center mb-4">
              <p className="text-sm text-gray-500 mb-1">Practicing:</p>
              <p className="text-purple-600 font-bold">
                {selectedNumbers.sort((a, b) => a - b).join(', ')} times tables
              </p>
            </div>
          )}

          <button
            onClick={startQuiz}
            disabled={selectedNumbers.length === 0}
            className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-4 px-6 rounded-xl text-xl shadow-lg transform hover:scale-102 transition-all duration-200"
          >
            {selectedNumbers.length === 0 ? 'Select Numbers First' : 'Start Practice! →'}
          </button>
        </div>
      </div>
    );
  }

  // Quiz screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        {/* Header with timer */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={goBack}
            className="text-purple-500 hover:text-purple-700 font-medium flex items-center gap-1"
          >
            ← Back
          </button>
          <div className={`text-2xl font-bold ${getTimerColor()}`}>
            ⏱️ {formatTime(timeRemaining)}
          </div>
          <div className="bg-purple-100 px-3 py-1 rounded-full">
            <span className="text-purple-700 font-bold text-sm">
              {score.correct}/{score.total}
            </span>
          </div>
        </div>

        {/* Practicing badge */}
        <div className="text-center mb-4">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Practicing: {selectedNumbers.sort((a, b) => a - b).join(', ')}× Tables
          </span>
        </div>

        {/* Timer progress bar */}
        <div className="mb-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${
                timeRemaining <= 60 ? 'bg-red-400' : 
                timeRemaining <= 180 ? 'bg-orange-400' : 
                'bg-gradient-to-r from-purple-400 to-pink-400'
              }`}
              style={{ width: `${(timeRemaining / sessionDuration) * 100}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-8 mb-6 shadow-inner">
          <div className="text-center">
            <p className="text-5xl font-bold text-gray-800 mb-2">
              {currentProblem.num1} × {currentProblem.num2}
            </p>
            <p className="text-3xl text-gray-500">=</p>
            <p className="text-4xl font-bold text-gray-400 mt-2">?</p>
          </div>
        </div>

        {/* Answer input */}
        <div className="mb-6">
          <input
            ref={inputRef}
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your answer..."
            className="w-full text-center text-3xl font-bold p-4 border-3 border-purple-300 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
            disabled={showAnswer}
          />
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`text-center p-4 rounded-xl mb-4 ${
            feedback === 'correct' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {feedback === 'correct' ? (
              <div>
                <p className="text-2xl font-bold">🎉 Correct!</p>
                <p className="text-lg">Great job!</p>
              </div>
            ) : (
              <div>
                <p className="text-2xl font-bold">Not quite!</p>
                <p className="text-lg">
                  The answer is <span className="font-bold">{currentProblem.answer}</span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          {!showAnswer ? (
            <button
              onClick={checkAnswer}
              disabled={!userAnswer}
              className="flex-1 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-4 px-6 rounded-xl text-xl shadow-lg transform hover:scale-102 transition-all duration-200"
            >
              Check ✓
            </button>
          ) : (
            <button
              onClick={nextProblem}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-xl text-xl shadow-lg transform hover:scale-102 transition-all duration-200"
            >
              Next →
            </button>
          )}
        </div>

        {/* Accuracy bar */}
        {score.total > 0 && (
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>Accuracy</span>
              <span>{Math.round((score.correct / score.total) * 100)}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500"
                style={{ width: `${(score.correct / score.total) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
