# Math Flashcards ✨

A fun, interactive math flashcard app to help kids practice their multiplication tables (times tables 1-12).

## Features

- **Multi-number selection** — Practice one or multiple times tables at once
- **Configurable timer** — Set session length from 30 seconds to 20 minutes (default: 10 minutes)
- **Real-time feedback** — Instant correct/incorrect feedback with answers shown
- **Detailed scoring** — At session end, see:
  - Letter grade (A+ through F) based on accuracy and speed
  - Average time per question
  - Fastest and slowest problems
  - Problems to review (ones answered incorrectly)
- **Keyboard support** — Press Enter to check answer and move to next problem

## Grading System

Grades are calculated based on a combination of accuracy and speed:

- **A+** — 100% accuracy with average time under 5 seconds
- **A/A-** — 90%+ accuracy with good speed
- **B+/B/B-** — 80%+ accuracy
- **C+/C/C-** — 70%+ accuracy
- **D+/D/D-** — 60%+ accuracy
- **F** — Below 60% accuracy

Speed modifiers adjust the base accuracy score:
- Under 3 seconds average: +10 points
- 3-5 seconds: +5 points
- 5-8 seconds: no change
- 8-12 seconds: -5 points
- Over 12 seconds: -10 points

## Tech Stack

- React
- Tailwind CSS

## Usage

This is a single-file React component designed to run in environments that support JSX and Tailwind CSS (like Claude Artifacts, CodeSandbox, or any React project with Tailwind configured).

## Development

To use in a standard React project:

1. Copy `math-flashcards.jsx` to your components directory
2. Import and use the component:

```jsx
import MathFlashcards from './math-flashcards';

function App() {
  return <MathFlashcards />;
}
```

## License

MIT
