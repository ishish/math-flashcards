import React, { useState, useEffect, useCallback, useRef } from 'react';

// ============================================================================
// MATH LESSONS DATA
// ============================================================================

const mathLessons = {
  multiplication: {
    title: "Multiplication",
    icon: "✖️",
    color: "from-purple-500 to-pink-500",
    lessons: [
      {
        id: "mult-intro",
        title: "What is Multiplication?",
        content: [
          {
            type: "explanation",
            text: "Multiplication is a shortcut for adding the same number over and over again."
          },
          {
            type: "example",
            before: "Instead of writing:",
            expression: "3 + 3 + 3 + 3 = 12",
            after: "We can write:",
            result: "3 × 4 = 12",
            note: "This means \"3 added together 4 times\""
          },
          {
            type: "visual",
            visualization: "groups",
            groups: 4,
            itemsPerGroup: 3,
            emoji: "🍎"
          },
          {
            type: "tip",
            text: "Think of multiplication as counting groups. 3 × 4 means \"4 groups of 3 things.\""
          }
        ],
        practice: [
          { question: "2 + 2 + 2 = 2 × ?", answer: 3, hint: "How many 2s are being added?" },
          { question: "5 + 5 + 5 + 5 = 5 × ?", answer: 4, hint: "Count how many 5s you see" },
          { question: "4 × 3 means 4 added how many times?", answer: 3, hint: "The second number tells you how many groups" }
        ]
      },
      {
        id: "mult-commutative",
        title: "The Order Doesn't Matter",
        content: [
          {
            type: "explanation",
            text: "Here's a secret that makes multiplication easier: you can flip the numbers and get the same answer!"
          },
          {
            type: "example",
            expression: "3 × 4 = 12",
            result: "4 × 3 = 12",
            note: "Both equal 12!"
          },
          {
            type: "visual",
            visualization: "grid",
            rows: 3,
            cols: 4,
            emoji: "🟦"
          },
          {
            type: "explanation",
            text: "Look at the grid above. Whether you count 3 rows of 4, or 4 columns of 3, you get 12 squares."
          },
          {
            type: "tip",
            text: "This is called the Commutative Property. Use it to your advantage! If you don't know 8 × 3, try thinking of 3 × 8 instead."
          }
        ],
        practice: [
          { question: "If 7 × 8 = 56, what is 8 × 7?", answer: 56, hint: "The order doesn't change the answer" },
          { question: "6 × 9 = ?", answer: 54, hint: "Try 9 × 6 if that's easier" },
          { question: "If 4 × 5 = 20, what is 5 × 4?", answer: 20, hint: "Flip it!" }
        ]
      },
      {
        id: "mult-by-1",
        title: "Multiplying by 1",
        content: [
          {
            type: "explanation",
            text: "Multiplying by 1 is the easiest rule in math: any number times 1 equals itself!"
          },
          {
            type: "example",
            expression: "7 × 1 = 7",
            note: "One group of 7 is just... 7"
          },
          {
            type: "example",
            expression: "1 × 100 = 100",
            note: "100 taken once is still 100"
          },
          {
            type: "tip",
            text: "Think of it this way: if you have 1 bag with 7 apples, how many apples do you have? Just 7!"
          }
        ],
        practice: [
          { question: "9 × 1 = ?", answer: 9, hint: "Any number times 1 stays the same" },
          { question: "1 × 12 = ?", answer: 12, hint: "One group of 12" },
          { question: "1 × 1 = ?", answer: 1, hint: "One group of one" }
        ]
      },
      {
        id: "mult-by-0",
        title: "Multiplying by 0",
        content: [
          {
            type: "explanation",
            text: "Anything multiplied by 0 equals 0. Always. No exceptions!"
          },
          {
            type: "example",
            expression: "5 × 0 = 0",
            note: "Zero groups of 5 is... nothing!"
          },
          {
            type: "example",
            expression: "1,000,000 × 0 = 0",
            note: "Even a million times zero is still zero"
          },
          {
            type: "visual",
            visualization: "groups",
            groups: 0,
            itemsPerGroup: 5,
            emoji: "🍕"
          },
          {
            type: "tip",
            text: "Imagine you have 0 boxes, and each box has 5 pizzas. How many pizzas total? Zero! No boxes means no pizzas."
          }
        ],
        practice: [
          { question: "8 × 0 = ?", answer: 0, hint: "Zero groups of anything is..." },
          { question: "0 × 12 = ?", answer: 0, hint: "Anything times zero" },
          { question: "0 × 0 = ?", answer: 0, hint: "Zero groups of zero things" }
        ]
      },
      {
        id: "mult-by-2",
        title: "Multiplying by 2 (Doubles)",
        content: [
          {
            type: "explanation",
            text: "Multiplying by 2 is the same as doubling a number, or adding it to itself."
          },
          {
            type: "example",
            expression: "6 × 2 = 12",
            note: "This is the same as 6 + 6"
          },
          {
            type: "explanation",
            text: "If you know your doubles in addition, you already know your 2 times table!"
          },
          {
            type: "tip",
            text: "Quick trick: To double any number, think of it as two groups. 7 × 2 = 7 + 7 = 14"
          }
        ],
        practice: [
          { question: "4 × 2 = ?", answer: 8, hint: "What's 4 + 4?" },
          { question: "9 × 2 = ?", answer: 18, hint: "Double 9" },
          { question: "7 × 2 = ?", answer: 14, hint: "7 + 7 = ?" }
        ]
      },
      {
        id: "mult-by-5",
        title: "Multiplying by 5",
        content: [
          {
            type: "explanation",
            text: "The 5 times table has a beautiful pattern: every answer ends in 0 or 5!"
          },
          {
            type: "example",
            expression: "5, 10, 15, 20, 25, 30...",
            note: "Notice the pattern: 5, 0, 5, 0, 5, 0..."
          },
          {
            type: "tip",
            text: "Quick trick: To multiply by 5, multiply by 10 first, then cut in half. For 8 × 5: First do 8 × 10 = 80, then half of 80 = 40!"
          },
          {
            type: "explanation",
            text: "Another way to think about it: 5 is half of 10. So 5 × 6 is half of 10 × 6 = 30."
          }
        ],
        practice: [
          { question: "5 × 4 = ?", answer: 20, hint: "Count by 5s: 5, 10, 15, ..." },
          { question: "5 × 7 = ?", answer: 35, hint: "Half of 70" },
          { question: "5 × 12 = ?", answer: 60, hint: "Half of 120" }
        ]
      },
      {
        id: "mult-by-10",
        title: "Multiplying by 10",
        content: [
          {
            type: "explanation",
            text: "Multiplying by 10 is super easy: just add a zero to the end of the number!"
          },
          {
            type: "example",
            expression: "7 × 10 = 70",
            note: "Just add a 0 to 7"
          },
          {
            type: "example",
            expression: "12 × 10 = 120",
            note: "Works for bigger numbers too!"
          },
          {
            type: "explanation",
            text: "Why does this work? Our number system is based on 10. When you multiply by 10, every digit moves one place to the left."
          },
          {
            type: "tip",
            text: "This trick helps with other problems too. Don't know 9 × 6? Well, 10 × 6 = 60, and 9 × 6 is just one less 6, so 60 - 6 = 54!"
          }
        ],
        practice: [
          { question: "10 × 5 = ?", answer: 50, hint: "Add a zero" },
          { question: "10 × 11 = ?", answer: 110, hint: "11 with a zero added" },
          { question: "3 × 10 = ?", answer: 30, hint: "Just add a 0" }
        ]
      },
      {
        id: "mult-by-9",
        title: "Multiplying by 9 (The Finger Trick)",
        content: [
          {
            type: "explanation",
            text: "The 9 times table has amazing patterns! Here's a finger trick that works for 9 × 1 through 9 × 10:"
          },
          {
            type: "tip",
            text: "Hold up both hands. To find 9 × 4, put down your 4th finger. Count fingers to the LEFT (3) and to the RIGHT (6). Answer: 36!"
          },
          {
            type: "explanation",
            text: "Another pattern: The digits of every answer add up to 9!"
          },
          {
            type: "example",
            expression: "9 × 7 = 63",
            note: "Check: 6 + 3 = 9 ✓"
          },
          {
            type: "example",
            expression: "9 × 8 = 72",
            note: "Check: 7 + 2 = 9 ✓"
          },
          {
            type: "tip",
            text: "Quick trick: 9 × any number = 10 × that number, minus the number. So 9 × 7 = 70 - 7 = 63"
          }
        ],
        practice: [
          { question: "9 × 6 = ?", answer: 54, hint: "10 × 6 = 60, minus 6" },
          { question: "9 × 9 = ?", answer: 81, hint: "Fingers: 8 on left, 1 on right" },
          { question: "9 × 4 = ?", answer: 36, hint: "The digits should add to 9" }
        ]
      },
      {
        id: "mult-by-11",
        title: "Multiplying by 11",
        content: [
          {
            type: "explanation",
            text: "For single digit numbers, 11 creates a fun double-digit pattern!"
          },
          {
            type: "example",
            expression: "11 × 4 = 44",
            note: "The digit just repeats!"
          },
          {
            type: "example",
            expression: "11 × 7 = 77",
            note: "7 becomes 77"
          },
          {
            type: "explanation",
            text: "For 11 × 11 and 11 × 12, you need to remember: 11 × 11 = 121 and 11 × 12 = 132"
          },
          {
            type: "tip",
            text: "Think of it as: the number × 10 + the number × 1. So 11 × 6 = 60 + 6 = 66"
          }
        ],
        practice: [
          { question: "11 × 5 = ?", answer: 55, hint: "The 5 doubles" },
          { question: "11 × 8 = ?", answer: 88, hint: "8 becomes 88" },
          { question: "11 × 11 = ?", answer: 121, hint: "This one you memorize: 121" }
        ]
      },
      {
        id: "mult-by-12",
        title: "Multiplying by 12 (The Dozen)",
        content: [
          {
            type: "explanation",
            text: "12 is special — it's a dozen! We use dozens for eggs, donuts, months, and more."
          },
          {
            type: "tip",
            text: "Here's the secret: 12 = 10 + 2. So to multiply by 12, multiply by 10, then multiply by 2, and add them!"
          },
          {
            type: "example",
            before: "For 12 × 7:",
            expression: "10 × 7 = 70",
            result: "2 × 7 = 14",
            note: "70 + 14 = 84 ✓"
          },
          {
            type: "explanation",
            text: "This break-apart trick works because 12 × 7 = (10 + 2) × 7 = (10 × 7) + (2 × 7)"
          }
        ],
        practice: [
          { question: "12 × 3 = ?", answer: 36, hint: "30 + 6" },
          { question: "12 × 5 = ?", answer: 60, hint: "50 + 10" },
          { question: "12 × 8 = ?", answer: 96, hint: "80 + 16" }
        ]
      }
    ]
  },
  
  division: {
    title: "Division",
    icon: "➗",
    color: "from-blue-500 to-cyan-500",
    lessons: [
      {
        id: "div-intro",
        title: "What is Division?",
        content: [
          {
            type: "explanation",
            text: "Division is sharing equally. When you divide, you're splitting something into equal groups."
          },
          {
            type: "example",
            expression: "12 ÷ 3 = 4",
            note: "12 cookies shared among 3 friends = 4 cookies each"
          },
          {
            type: "visual",
            visualization: "division",
            total: 12,
            groups: 3,
            emoji: "🍪"
          },
          {
            type: "tip",
            text: "Division is the opposite of multiplication. If 3 × 4 = 12, then 12 ÷ 3 = 4 and 12 ÷ 4 = 3"
          }
        ],
        practice: [
          { question: "8 ÷ 2 = ?", answer: 4, hint: "8 split into 2 equal groups" },
          { question: "15 ÷ 3 = ?", answer: 5, hint: "15 shared among 3" },
          { question: "20 ÷ 4 = ?", answer: 5, hint: "20 split 4 ways" }
        ]
      },
      {
        id: "div-mult-connection",
        title: "Division & Multiplication are Family",
        content: [
          {
            type: "explanation",
            text: "Every division fact has a matching multiplication fact. They're like two sides of the same coin!"
          },
          {
            type: "example",
            before: "If you know:",
            expression: "6 × 7 = 42",
            after: "Then you also know:",
            result: "42 ÷ 6 = 7  and  42 ÷ 7 = 6"
          },
          {
            type: "tip",
            text: "To solve division, ask: \"What times the divisor equals the dividend?\" For 56 ÷ 8, ask \"8 times what equals 56?\""
          },
          {
            type: "explanation",
            text: "This is why learning your times tables helps you divide! Every multiplication fact gives you two division facts for free."
          }
        ],
        practice: [
          { question: "If 5 × 6 = 30, what is 30 ÷ 5?", answer: 6, hint: "Use the multiplication fact" },
          { question: "If 8 × 9 = 72, what is 72 ÷ 8?", answer: 9, hint: "The answer is the other factor" },
          { question: "35 ÷ 7 = ?", answer: 5, hint: "7 times what equals 35?" }
        ]
      },
      {
        id: "div-by-1",
        title: "Dividing by 1",
        content: [
          {
            type: "explanation",
            text: "Any number divided by 1 equals itself. Sharing with just 1 person means they get everything!"
          },
          {
            type: "example",
            expression: "9 ÷ 1 = 9",
            note: "9 cookies for 1 person = 9 cookies for them"
          },
          {
            type: "tip",
            text: "Think of it this way: if you're the only one at the pizza party, you get the whole pizza!"
          }
        ],
        practice: [
          { question: "7 ÷ 1 = ?", answer: 7, hint: "Dividing by 1 keeps it the same" },
          { question: "100 ÷ 1 = ?", answer: 100, hint: "All for one person" },
          { question: "12 ÷ 1 = ?", answer: 12, hint: "One group gets everything" }
        ]
      },
      {
        id: "div-same-number",
        title: "Dividing by Itself",
        content: [
          {
            type: "explanation",
            text: "Any number divided by itself equals 1. If you split something into that many equal parts, each part is 1!"
          },
          {
            type: "example",
            expression: "8 ÷ 8 = 1",
            note: "8 cookies split among 8 friends = 1 each"
          },
          {
            type: "visual",
            visualization: "division",
            total: 6,
            groups: 6,
            emoji: "⭐"
          },
          {
            type: "tip",
            text: "How many times does 5 fit into 5? Exactly once! So 5 ÷ 5 = 1"
          }
        ],
        practice: [
          { question: "6 ÷ 6 = ?", answer: 1, hint: "A number divided by itself" },
          { question: "11 ÷ 11 = ?", answer: 1, hint: "How many 11s in 11?" },
          { question: "100 ÷ 100 = ?", answer: 1, hint: "Always equals 1" }
        ]
      },
      {
        id: "div-by-2",
        title: "Dividing by 2 (Halving)",
        content: [
          {
            type: "explanation",
            text: "Dividing by 2 means finding half. This is one of the most useful skills in math!"
          },
          {
            type: "example",
            expression: "16 ÷ 2 = 8",
            note: "Half of 16 is 8"
          },
          {
            type: "tip",
            text: "For even numbers, just find the number that doubles to your starting number. Half of 14? What number + itself = 14? It's 7!"
          },
          {
            type: "explanation",
            text: "Quick mental trick for big even numbers: half of 48? Split it: half of 40 is 20, half of 8 is 4, so half of 48 is 24."
          }
        ],
        practice: [
          { question: "10 ÷ 2 = ?", answer: 5, hint: "Half of 10" },
          { question: "18 ÷ 2 = ?", answer: 9, hint: "What plus itself equals 18?" },
          { question: "24 ÷ 2 = ?", answer: 12, hint: "Half of 24" }
        ]
      },
      {
        id: "div-zero",
        title: "Zero and Division",
        content: [
          {
            type: "explanation",
            text: "Zero divided by any number is 0. If you have nothing to share, everyone gets nothing!"
          },
          {
            type: "example",
            expression: "0 ÷ 5 = 0",
            note: "0 cookies among 5 friends = 0 each"
          },
          {
            type: "explanation",
            text: "BUT: You cannot divide BY zero! 5 ÷ 0 is undefined — it's impossible and breaks math."
          },
          {
            type: "tip",
            text: "Why can't we divide by zero? Imagine sharing 5 cookies among 0 friends. It doesn't make sense — there's no one to share with!"
          }
        ],
        practice: [
          { question: "0 ÷ 7 = ?", answer: 0, hint: "Nothing shared is nothing" },
          { question: "0 ÷ 100 = ?", answer: 0, hint: "Zero divided by anything is zero" },
          { question: "0 ÷ 3 = ?", answer: 0, hint: "Nothing to share" }
        ]
      }
    ]
  },
  
  squares: {
    title: "Perfect Squares",
    icon: "²",
    color: "from-green-500 to-teal-500",
    lessons: [
      {
        id: "sq-intro",
        title: "What are Perfect Squares?",
        content: [
          {
            type: "explanation",
            text: "A perfect square is what you get when you multiply a number by itself. We write it with a small 2, like 5² (said \"five squared\")."
          },
          {
            type: "example",
            expression: "4² = 4 × 4 = 16",
            note: "16 is a perfect square"
          },
          {
            type: "visual",
            visualization: "square",
            size: 4,
            emoji: "🟦"
          },
          {
            type: "explanation",
            text: "See why it's called a \"square\"? 4 × 4 makes a perfect square shape with 16 units!"
          },
          {
            type: "tip",
            text: "The word \"squared\" comes from geometry. A square with sides of length 4 has an area of 4 × 4 = 16 square units."
          }
        ],
        practice: [
          { question: "3² = ?", answer: 9, hint: "3 × 3" },
          { question: "5² = ?", answer: 25, hint: "5 × 5" },
          { question: "What is 2 squared?", answer: 4, hint: "2 × 2" }
        ]
      },
      {
        id: "sq-memorize",
        title: "Know Your Squares (1-12)",
        content: [
          {
            type: "explanation",
            text: "Here are the perfect squares from 1 to 12. These are worth memorizing — they show up everywhere in math!"
          },
          {
            type: "example",
            expression: "1² = 1    2² = 4    3² = 9    4² = 16",
            note: "The first four"
          },
          {
            type: "example",
            expression: "5² = 25   6² = 36   7² = 49   8² = 64",
            note: "The middle four"
          },
          {
            type: "example",
            expression: "9² = 81   10² = 100  11² = 121  12² = 144",
            note: "The last four"
          },
          {
            type: "tip",
            text: "Notice the pattern in the ones digit: 1, 4, 9, 6, 5, 6, 9, 4, 1, 0... then it repeats!"
          }
        ],
        practice: [
          { question: "7² = ?", answer: 49, hint: "7 × 7" },
          { question: "9² = ?", answer: 81, hint: "9 × 9" },
          { question: "12² = ?", answer: 144, hint: "12 × 12" }
        ]
      },
      {
        id: "sq-patterns",
        title: "Square Number Patterns",
        content: [
          {
            type: "explanation",
            text: "Perfect squares have beautiful patterns. One amazing pattern: the difference between consecutive squares increases by 2 each time!"
          },
          {
            type: "example",
            expression: "1, 4, 9, 16, 25, 36...",
            note: "Differences: +3, +5, +7, +9, +11... (odd numbers!)"
          },
          {
            type: "explanation",
            text: "This means: any perfect square = the previous square + an odd number. Like 36 = 25 + 11"
          },
          {
            type: "tip",
            text: "Quick trick: To find 6², start with 5² = 25, then add the next odd number (11). 25 + 11 = 36 ✓"
          }
        ],
        practice: [
          { question: "If 8² = 64, what is 9²?", answer: 81, hint: "64 + 17 (next odd number)" },
          { question: "If 10² = 100, what is 11²?", answer: 121, hint: "100 + 21" },
          { question: "What's the difference between 4² and 5²?", answer: 9, hint: "25 - 16" }
        ]
      },
      {
        id: "sq-ending-digits",
        title: "How Squares End",
        content: [
          {
            type: "explanation",
            text: "Perfect squares can only end in certain digits: 0, 1, 4, 5, 6, or 9. Never 2, 3, 7, or 8!"
          },
          {
            type: "example",
            expression: "Numbers ending in 0: 10² = 100, 20² = 400",
            note: "Squares end in 0"
          },
          {
            type: "example",
            expression: "Numbers ending in 5: 5² = 25, 15² = 225",
            note: "Squares end in 5"
          },
          {
            type: "tip",
            text: "This is useful for checking your work! If you calculate a square and it ends in 7, you made a mistake."
          },
          {
            type: "explanation",
            text: "Fun pattern: 1 and 9 both give squares ending in 1. 2 and 8 both give squares ending in 4. 3 and 7 give squares ending in 9. 4 and 6 give squares ending in 6."
          }
        ],
        practice: [
          { question: "Can 67 be a perfect square?", answer: 0, hint: "Does it end in 0, 1, 4, 5, 6, or 9? (Answer 0 for no)" },
          { question: "8² ends in what digit?", answer: 4, hint: "64 ends in..." },
          { question: "What does 6² end in?", answer: 6, hint: "36 ends in..." }
        ]
      }
    ]
  },
  
  mental_math: {
    title: "Mental Math Tricks",
    icon: "🧠",
    color: "from-orange-500 to-red-500",
    lessons: [
      {
        id: "mm-doubles",
        title: "Doubling Strategies",
        content: [
          {
            type: "explanation",
            text: "Doubling (multiplying by 2) is a foundation skill. Master it, and many other calculations become easy!"
          },
          {
            type: "tip",
            text: "To double any number, split it up. Double 37: double 30 (60) + double 7 (14) = 74"
          },
          {
            type: "example",
            before: "Double 48:",
            expression: "Double 40 = 80",
            result: "Double 8 = 16",
            note: "80 + 16 = 96"
          },
          {
            type: "explanation",
            text: "To multiply by 4, double twice. To multiply by 8, double three times!"
          },
          {
            type: "example",
            expression: "7 × 4 = double(double 7) = double 14 = 28",
            note: "Double twice for × 4"
          }
        ],
        practice: [
          { question: "Double 35 = ?", answer: 70, hint: "Double 30 + double 5" },
          { question: "Double 26 = ?", answer: 52, hint: "Double 20 + double 6" },
          { question: "6 × 4 = ?", answer: 24, hint: "Double 6 twice: 12, then 24" }
        ]
      },
      {
        id: "mm-halving",
        title: "Halving Strategies",
        content: [
          {
            type: "explanation",
            text: "Halving (dividing by 2) is just as important as doubling. It helps with division and multiplication by 5."
          },
          {
            type: "tip",
            text: "To halve a number, split it into parts you can easily halve. Half of 86: half of 80 (40) + half of 6 (3) = 43"
          },
          {
            type: "example",
            expression: "Half of 74 = half of 70 + half of 4 = 35 + 2 = 37",
            note: "Split, halve, combine"
          },
          {
            type: "explanation",
            text: "Remember: Multiplying by 5 is the same as halving then multiplying by 10 (or multiplying by 10 then halving)."
          },
          {
            type: "example",
            expression: "16 × 5 = half of 16 × 10 = 8 × 10 = 80",
            note: "Halve first, then × 10"
          }
        ],
        practice: [
          { question: "Half of 64 = ?", answer: 32, hint: "Half of 60 + half of 4" },
          { question: "Half of 98 = ?", answer: 49, hint: "Split it up" },
          { question: "14 × 5 = ?", answer: 70, hint: "Half of 14 = 7, then × 10" }
        ]
      },
      {
        id: "mm-near-tens",
        title: "Near Tens Strategy",
        content: [
          {
            type: "explanation",
            text: "When a number is close to 10, 20, 30, etc., round to that ten and adjust. This makes calculations much easier!"
          },
          {
            type: "example",
            before: "For 9 × 7:",
            expression: "Think: 10 × 7 = 70",
            result: "Then subtract one 7: 70 - 7 = 63",
            note: "9 is one less than 10"
          },
          {
            type: "example",
            before: "For 11 × 8:",
            expression: "Think: 10 × 8 = 80",
            result: "Then add one 8: 80 + 8 = 88",
            note: "11 is one more than 10"
          },
          {
            type: "tip",
            text: "This works for any \"near\" number! 19 × 6 = 20 × 6 - 6 = 120 - 6 = 114"
          }
        ],
        practice: [
          { question: "9 × 8 = ?", answer: 72, hint: "10 × 8 - 8" },
          { question: "11 × 6 = ?", answer: 66, hint: "10 × 6 + 6" },
          { question: "9 × 12 = ?", answer: 108, hint: "10 × 12 - 12" }
        ]
      },
      {
        id: "mm-break-apart",
        title: "Break Apart Strategy",
        content: [
          {
            type: "explanation",
            text: "You can break any multiplication into easier pieces, solve them, then add the results."
          },
          {
            type: "example",
            before: "For 7 × 8:",
            expression: "Think: 7 × 8 = 7 × (5 + 3)",
            result: "= (7 × 5) + (7 × 3) = 35 + 21 = 56",
            note: "Break 8 into 5 + 3"
          },
          {
            type: "example",
            before: "For 6 × 7:",
            expression: "Think: (5 × 7) + (1 × 7)",
            result: "= 35 + 7 = 42",
            note: "Break 6 into 5 + 1"
          },
          {
            type: "tip",
            text: "The key is breaking into numbers you know well — usually involving 5, 10, or 2."
          }
        ],
        practice: [
          { question: "6 × 8 = ? (try 5×8 + 1×8)", answer: 48, hint: "40 + 8" },
          { question: "7 × 7 = ? (try 5×7 + 2×7)", answer: 49, hint: "35 + 14" },
          { question: "8 × 8 = ? (try 8×5 + 8×3)", answer: 64, hint: "40 + 24" }
        ]
      },
      {
        id: "mm-square-neighbors",
        title: "Neighbors of Squares",
        content: [
          {
            type: "explanation",
            text: "Here's a magical trick: the product of two consecutive numbers (like 6 × 7) is always one less than the square of the number in between!"
          },
          {
            type: "example",
            expression: "6 × 8 = 7² - 1 = 49 - 1 = 48",
            note: "7 is between 6 and 8"
          },
          {
            type: "example",
            expression: "9 × 11 = 10² - 1 = 100 - 1 = 99",
            note: "10 is between 9 and 11"
          },
          {
            type: "tip",
            text: "If you know your squares, you can find these products instantly! 7 × 9 = 8² - 1 = 63"
          },
          {
            type: "explanation",
            text: "For numbers that differ by 2, subtract 1 from the square. 5 × 7 = 6² - 1 = 35"
          }
        ],
        practice: [
          { question: "8 × 10 = ? (hint: 9² - 1)", answer: 80, hint: "81 - 1" },
          { question: "5 × 7 = ? (hint: 6² - 1)", answer: 35, hint: "36 - 1" },
          { question: "11 × 13 = ? (hint: 12² - 1)", answer: 143, hint: "144 - 1" }
        ]
      }
    ]
  },
  
  number_sense: {
    title: "Number Sense",
    icon: "🔢",
    color: "from-indigo-500 to-purple-500",
    lessons: [
      {
        id: "ns-odd-even",
        title: "Odd and Even Numbers",
        content: [
          {
            type: "explanation",
            text: "Even numbers can be split into two equal groups. Odd numbers always have one left over."
          },
          {
            type: "example",
            expression: "Even: 2, 4, 6, 8, 10, 12...",
            note: "End in 0, 2, 4, 6, or 8"
          },
          {
            type: "example",
            expression: "Odd: 1, 3, 5, 7, 9, 11...",
            note: "End in 1, 3, 5, 7, or 9"
          },
          {
            type: "tip",
            text: "Multiplication rules: Even × anything = Even. Odd × Odd = Odd. That's it!"
          },
          {
            type: "explanation",
            text: "Addition rules: Even + Even = Even. Odd + Odd = Even. Even + Odd = Odd."
          }
        ],
        practice: [
          { question: "Is 7 × 8 odd or even? (1 for odd, 2 for even)", answer: 2, hint: "Even times anything is even" },
          { question: "Is 9 × 11 odd or even? (1 for odd, 2 for even)", answer: 1, hint: "Odd times odd is..." },
          { question: "Is 6 × 4 odd or even? (1 for odd, 2 for even)", answer: 2, hint: "Both are even" }
        ]
      },
      {
        id: "ns-place-value",
        title: "Understanding Place Value",
        content: [
          {
            type: "explanation",
            text: "In our number system, each position is worth 10 times the position to its right. This is why it's called \"base 10.\""
          },
          {
            type: "example",
            expression: "352 = 300 + 50 + 2",
            note: "3 hundreds + 5 tens + 2 ones"
          },
          {
            type: "tip",
            text: "Multiplying by 10 moves every digit one place to the left. That's why 35 × 10 = 350!"
          },
          {
            type: "explanation",
            text: "Dividing by 10 moves every digit one place to the right. So 350 ÷ 10 = 35."
          }
        ],
        practice: [
          { question: "In 847, what digit is in the tens place?", answer: 4, hint: "The middle digit" },
          { question: "What is 56 × 10?", answer: 560, hint: "Move digits left, add zero" },
          { question: "What is 230 ÷ 10?", answer: 23, hint: "Move digits right, remove zero" }
        ]
      },
      {
        id: "ns-factors",
        title: "Factors and Factoring",
        content: [
          {
            type: "explanation",
            text: "Factors are numbers that divide evenly into another number. They're like the building blocks of that number."
          },
          {
            type: "example",
            expression: "Factors of 12: 1, 2, 3, 4, 6, 12",
            note: "All these divide evenly into 12"
          },
          {
            type: "tip",
            text: "Factors come in pairs! 12 = 1×12 = 2×6 = 3×4. Find one factor, you get another free."
          },
          {
            type: "explanation",
            text: "Prime numbers have only two factors: 1 and themselves. Examples: 2, 3, 5, 7, 11, 13..."
          }
        ],
        practice: [
          { question: "Is 4 a factor of 20? (1 for yes, 0 for no)", answer: 1, hint: "Does 20 ÷ 4 give a whole number?" },
          { question: "How many factors does 6 have?", answer: 4, hint: "1, 2, 3, 6" },
          { question: "Is 7 prime? (1 for yes, 0 for no)", answer: 1, hint: "What divides evenly into 7?" }
        ]
      },
      {
        id: "ns-multiples",
        title: "Multiples",
        content: [
          {
            type: "explanation",
            text: "Multiples are what you get when you multiply a number by 1, 2, 3, 4, 5... They're like the number's \"times table.\""
          },
          {
            type: "example",
            expression: "Multiples of 5: 5, 10, 15, 20, 25, 30...",
            note: "Keep adding 5"
          },
          {
            type: "example",
            expression: "Multiples of 7: 7, 14, 21, 28, 35, 42...",
            note: "The 7 times table!"
          },
          {
            type: "tip",
            text: "Easy checks: Multiples of 5 end in 0 or 5. Multiples of 10 end in 0. Multiples of 2 are all even numbers."
          }
        ],
        practice: [
          { question: "Is 35 a multiple of 7? (1 for yes, 0 for no)", answer: 1, hint: "Is 35 in the 7 times table?" },
          { question: "What is the 8th multiple of 3?", answer: 24, hint: "3 × 8" },
          { question: "Is 42 a multiple of 6? (1 for yes, 0 for no)", answer: 1, hint: "Does 42 ÷ 6 work?" }
        ]
      },
      {
        id: "ns-estimation",
        title: "Estimation: Close Enough!",
        content: [
          {
            type: "explanation",
            text: "Estimation means finding an answer that's close to the exact answer, using simpler numbers. It's incredibly useful in real life!"
          },
          {
            type: "example",
            before: "Estimate 48 × 6:",
            expression: "Round 48 to 50",
            result: "50 × 6 = 300",
            note: "Actual answer: 288 (pretty close!)"
          },
          {
            type: "tip",
            text: "When estimating, round to numbers that are easy to work with — usually ending in 0 or 5."
          },
          {
            type: "explanation",
            text: "Estimation helps you check if your answer makes sense. If you calculate 23 × 4 and get 552, estimation (20 × 4 = 80) tells you something's wrong!"
          }
        ],
        practice: [
          { question: "Estimate 39 × 5 (round 39 to 40)", answer: 200, hint: "40 × 5" },
          { question: "Estimate 52 × 3 (round 52 to 50)", answer: 150, hint: "50 × 3" },
          { question: "Is 8 × 9 closer to 70 or 80?", answer: 70, hint: "8 × 9 = 72" }
        ]
      }
    ]
  }
};

// ============================================================================
// LESSON COMPONENTS
// ============================================================================

const GroupsVisualization = ({ groups, itemsPerGroup, emoji }) => {
  if (groups === 0) {
    return (
      <div className="text-center py-4 text-gray-400 italic">
        Zero groups = nothing!
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-4 justify-center py-4">
      {Array.from({ length: groups }).map((_, groupIndex) => (
        <div key={groupIndex} className="flex gap-1 bg-white bg-opacity-50 rounded-lg p-2">
          {Array.from({ length: itemsPerGroup }).map((_, itemIndex) => (
            <span key={itemIndex} className="text-2xl">{emoji}</span>
          ))}
        </div>
      ))}
    </div>
  );
};

const GridVisualization = ({ rows, cols, emoji }) => (
  <div className="flex flex-col items-center gap-1 py-4">
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="flex gap-1">
        {Array.from({ length: cols }).map((_, colIndex) => (
          <span key={colIndex} className="text-lg">{emoji}</span>
        ))}
      </div>
    ))}
    <p className="text-sm text-gray-600 mt-2">{rows} rows × {cols} columns = {rows * cols}</p>
  </div>
);

const SquareVisualization = ({ size, emoji }) => (
  <div className="flex flex-col items-center gap-1 py-4">
    {Array.from({ length: size }).map((_, rowIndex) => (
      <div key={rowIndex} className="flex gap-1">
        {Array.from({ length: size }).map((_, colIndex) => (
          <span key={colIndex} className="text-lg">{emoji}</span>
        ))}
      </div>
    ))}
    <p className="text-sm text-gray-600 mt-2">{size} × {size} = {size * size}</p>
  </div>
);

const DivisionVisualization = ({ total, groups, emoji }) => {
  const perGroup = total / groups;
  return (
    <div className="flex flex-wrap gap-4 justify-center py-4">
      {Array.from({ length: groups }).map((_, groupIndex) => (
        <div key={groupIndex} className="flex flex-col items-center">
          <div className="flex gap-1 bg-white bg-opacity-50 rounded-lg p-2">
            {Array.from({ length: perGroup }).map((_, itemIndex) => (
              <span key={itemIndex} className="text-xl">{emoji}</span>
            ))}
          </div>
          <span className="text-xs text-gray-500 mt-1">Group {groupIndex + 1}</span>
        </div>
      ))}
    </div>
  );
};

const ContentBlock = ({ block }) => {
  switch (block.type) {
    case 'explanation':
      return (
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          {block.text}
        </p>
      );
    
    case 'example':
      return (
        <div className="bg-white bg-opacity-60 rounded-xl p-4 mb-4 border-l-4 border-purple-400">
          {block.before && <p className="text-gray-600 text-sm mb-1">{block.before}</p>}
          <p className="text-2xl font-bold text-purple-700 font-mono">{block.expression}</p>
          {block.after && <p className="text-gray-600 text-sm mt-2 mb-1">{block.after}</p>}
          {block.result && <p className="text-2xl font-bold text-green-600 font-mono">{block.result}</p>}
          {block.note && <p className="text-gray-500 text-sm mt-2 italic">{block.note}</p>}
        </div>
      );
    
    case 'tip':
      return (
        <div className="bg-yellow-100 rounded-xl p-4 mb-4 border-l-4 border-yellow-400">
          <p className="text-yellow-800">
            <span className="font-bold">💡 Tip: </span>
            {block.text}
          </p>
        </div>
      );
    
    case 'visual':
      return (
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 mb-4">
          {block.visualization === 'groups' && (
            <GroupsVisualization groups={block.groups} itemsPerGroup={block.itemsPerGroup} emoji={block.emoji} />
          )}
          {block.visualization === 'grid' && (
            <GridVisualization rows={block.rows} cols={block.cols} emoji={block.emoji} />
          )}
          {block.visualization === 'square' && (
            <SquareVisualization size={block.size} emoji={block.emoji} />
          )}
          {block.visualization === 'division' && (
            <DivisionVisualization total={block.total} groups={block.groups} emoji={block.emoji} />
          )}
        </div>
      );
    
    default:
      return null;
  }
};

const LessonView = ({ lesson, onBack, onComplete }) => {
  const [currentSection, setCurrentSection] = useState('learn'); // 'learn' or 'practice'
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [practiceResults, setPracticeResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (currentSection === 'practice' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentSection, practiceIndex]);

  const currentPractice = lesson.practice[practiceIndex];

  const checkAnswer = () => {
    const isCorrect = parseInt(userAnswer) === currentPractice.answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setPracticeResults([...practiceResults, { ...currentPractice, isCorrect }]);
  };

  const nextPractice = () => {
    if (practiceIndex < lesson.practice.length - 1) {
      setPracticeIndex(practiceIndex + 1);
      setUserAnswer('');
      setFeedback(null);
    } else {
      onComplete(practiceResults);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && userAnswer && !feedback) {
      checkAnswer();
    } else if (e.key === 'Enter' && feedback) {
      nextPractice();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="text-purple-600 hover:text-purple-800 font-medium">
            ← Back
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentSection('learn')}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                currentSection === 'learn'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white text-purple-600'
              }`}
            >
              📖 Learn
            </button>
            <button
              onClick={() => setCurrentSection('practice')}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                currentSection === 'practice'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white text-purple-600'
              }`}
            >
              ✏️ Practice
            </button>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          {lesson.title}
        </h1>

        {currentSection === 'learn' ? (
          /* Learning Section */
          <div className="bg-white bg-opacity-80 rounded-2xl p-6 shadow-lg">
            {lesson.content.map((block, index) => (
              <ContentBlock key={index} block={block} />
            ))}
            <button
              onClick={() => setCurrentSection('practice')}
              className="w-full mt-4 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all"
            >
              Ready to Practice! →
            </button>
          </div>
        ) : (
          /* Practice Section */
          <div className="bg-white bg-opacity-80 rounded-2xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <span className="text-sm text-gray-500">
                Question {practiceIndex + 1} of {lesson.practice.length}
              </span>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-4">
              <p className="text-2xl font-bold text-gray-800 text-center">
                {currentPractice.question}
              </p>
            </div>

            <input
              ref={inputRef}
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Your answer..."
              className="w-full text-center text-2xl font-bold p-4 border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:outline-none mb-4"
              disabled={feedback !== null}
            />

            {!feedback && (
              <p className="text-center text-gray-500 text-sm mb-4">
                💡 Hint: {currentPractice.hint}
              </p>
            )}

            {feedback && (
              <div className={`text-center p-4 rounded-xl mb-4 ${
                feedback === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {feedback === 'correct' ? (
                  <p className="text-xl font-bold">🎉 Correct!</p>
                ) : (
                  <div>
                    <p className="text-xl font-bold">Not quite!</p>
                    <p>The answer is <span className="font-bold">{currentPractice.answer}</span></p>
                  </div>
                )}
              </div>
            )}

            {!feedback ? (
              <button
                onClick={checkAnswer}
                disabled={!userAnswer}
                className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-all"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={nextPractice}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl transition-all"
              >
                {practiceIndex < lesson.practice.length - 1 ? 'Next Question →' : 'Finish Lesson →'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const LessonComplete = ({ lesson, results, onBack, onRestart }) => {
  const correct = results.filter(r => r.isCorrect).length;
  const total = results.length;
  const percentage = Math.round((correct / total) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">
          {percentage === 100 ? '🌟' : percentage >= 70 ? '⭐' : '💪'}
        </div>
        <h1 className="text-2xl font-bold text-purple-600 mb-2">
          Lesson Complete!
        </h1>
        <p className="text-gray-600 mb-6">{lesson.title}</p>

        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 mb-6">
          <p className="text-4xl font-bold text-purple-600">{correct}/{total}</p>
          <p className="text-gray-500">Questions Correct</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl transition-all"
          >
            Back to Lessons
          </button>
          <button
            onClick={onRestart}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN FLASHCARDS COMPONENT (with Lessons Integration)
// ============================================================================

export default function MathFlashcards() {
  const [mode, setMode] = useState('menu'); // 'menu', 'practice', 'lessons', 'lesson-view', 'lesson-complete'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessonResults, setLessonResults] = useState(null);
  
  // Practice mode state
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [selectedOperations, setSelectedOperations] = useState(['multiplication']);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(10 * 60);
  const [timeRemaining, setTimeRemaining] = useState(10 * 60);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [problemStartTime, setProblemStartTime] = useState(null);
  const [problemHistory, setProblemHistory] = useState([]);
  const [showTimeSettings, setShowTimeSettings] = useState(false);
  const inputRef = useRef(null);

  // ... (all the practice mode logic from before)
  const generateProblem = useCallback((numbers, operations) => {
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    if (operation === 'squares') {
      const num = numbers.length > 0 
        ? numbers[Math.floor(Math.random() * numbers.length)]
        : Math.floor(Math.random() * 12) + 1;
      return { num1: num, num2: num, answer: num * num, operation: 'squares', display: `${num}²` };
    } else if (operation === 'division') {
      const num1 = numbers[Math.floor(Math.random() * numbers.length)];
      const num2 = Math.floor(Math.random() * 12) + 1;
      const product = num1 * num2;
      return { num1: product, num2: num1, answer: num2, operation: 'division', display: `${product} ÷ ${num1}` };
    } else {
      const num1 = numbers[Math.floor(Math.random() * numbers.length)];
      const num2 = Math.floor(Math.random() * 12) + 1;
      return { num1, num2, answer: num1 * num2, operation: 'multiplication', display: `${num1} × ${num2}` };
    }
  }, []);

  useEffect(() => {
    let interval;
    if (quizStarted && timeRemaining > 0 && !sessionComplete) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) { setSessionComplete(true); return 0; }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, timeRemaining, sessionComplete]);

  useEffect(() => {
    if (inputRef.current && quizStarted && !sessionComplete) inputRef.current.focus();
  }, [currentProblem, quizStarted, sessionComplete]);

  const toggleNumber = (num) => setSelectedNumbers(prev => prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]);
  const toggleOperation = (op) => setSelectedOperations(prev => {
    if (prev.includes(op)) { if (prev.length === 1) return prev; return prev.filter(o => o !== op); }
    return [...prev, op];
  });
  const selectAll = () => setSelectedNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  const clearAll = () => setSelectedNumbers([]);

  const startQuiz = () => {
    if (selectedNumbers.length === 0 && !selectedOperations.includes('squares')) return;
    const nums = selectedNumbers.length > 0 ? selectedNumbers : [1,2,3,4,5,6,7,8,9,10,11,12];
    setQuizStarted(true);
    setCurrentProblem(generateProblem(nums, selectedOperations));
    setUserAnswer(''); setFeedback(null); setScore({ correct: 0, total: 0 }); setShowAnswer(false);
    setTimeRemaining(sessionDuration); setSessionComplete(false); setProblemStartTime(Date.now()); setProblemHistory([]);
  };

  const nextProblem = () => {
    const nums = selectedNumbers.length > 0 ? selectedNumbers : [1,2,3,4,5,6,7,8,9,10,11,12];
    setCurrentProblem(generateProblem(nums, selectedOperations));
    setUserAnswer(''); setFeedback(null); setShowAnswer(false); setProblemStartTime(Date.now());
  };

  const checkAnswer = () => {
    const timeTaken = (Date.now() - problemStartTime) / 1000;
    const isCorrect = parseInt(userAnswer) === currentProblem.answer;
    setProblemHistory(prev => [...prev, { ...currentProblem, userAnswer: parseInt(userAnswer), isCorrect, timeTaken }]);
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setScore(prev => ({ correct: prev.correct + (isCorrect ? 1 : 0), total: prev.total + 1 }));
    setShowAnswer(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && userAnswer && !showAnswer) checkAnswer();
    else if (e.key === 'Enter' && showAnswer) nextProblem();
  };

  const goBack = () => { setQuizStarted(false); setCurrentProblem(null); setUserAnswer(''); setFeedback(null); setScore({ correct: 0, total: 0 }); setShowAnswer(false); setSessionComplete(false); };
  
  const restartSession = () => {
    const nums = selectedNumbers.length > 0 ? selectedNumbers : [1,2,3,4,5,6,7,8,9,10,11,12];
    setTimeRemaining(sessionDuration); setSessionComplete(false); setScore({ correct: 0, total: 0 });
    setCurrentProblem(generateProblem(nums, selectedOperations));
    setUserAnswer(''); setFeedback(null); setShowAnswer(false); setProblemStartTime(Date.now()); setProblemHistory([]);
  };

  const formatTime = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;
  const formatDuration = (s) => { const m = Math.floor(s/60); return m === 1 ? '1 minute' : `${m} minutes`; };
  
  const timeOptions = [
    { label: '30 sec', value: 30 }, { label: '1 min', value: 60 }, { label: '2 min', value: 120 },
    { label: '5 min', value: 300 }, { label: '10 min', value: 600 }, { label: '15 min', value: 900 }, { label: '20 min', value: 1200 },
  ];
  const operationOptions = [
    { id: 'multiplication', label: '× Multiply' }, { id: 'division', label: '÷ Divide' }, { id: 'squares', label: 'n² Squares' },
  ];

  const getTimerColor = () => timeRemaining <= 60 ? 'text-red-500' : timeRemaining <= 180 ? 'text-orange-500' : 'text-purple-700';
  
  const calculateGrade = (accuracy, avgTime) => {
    let speedMod = avgTime < 3 ? 10 : avgTime < 5 ? 5 : avgTime < 8 ? 0 : avgTime < 12 ? -5 : -10;
    const finalScore = Math.min(100, Math.max(0, accuracy + speedMod));
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

  const getTimingStats = () => {
    if (problemHistory.length === 0) return null;
    const times = problemHistory.map(p => p.timeTaken);
    const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
    const sorted = [...problemHistory].sort((a, b) => a.timeTaken - b.timeTaken);
    return { avgTime, fastest: sorted.slice(0, 3), slowest: sorted.slice(-3).reverse() };
  };

  const formatProblemDisplay = (p) => p.display || `${p.num1}×${p.num2}`;
  const getOperationsLabel = () => {
    const labels = [];
    if (selectedOperations.includes('multiplication')) labels.push('×');
    if (selectedOperations.includes('division')) labels.push('÷');
    if (selectedOperations.includes('squares')) labels.push('n²');
    return labels.join(' ');
  };

  // ============================================================================
  // RENDER LOGIC
  // ============================================================================

  // Lesson view mode
  if (mode === 'lesson-view' && selectedLesson) {
    return (
      <LessonView
        lesson={selectedLesson}
        onBack={() => { setMode('lessons'); setSelectedLesson(null); }}
        onComplete={(results) => { setLessonResults(results); setMode('lesson-complete'); }}
      />
    );
  }

  // Lesson complete mode
  if (mode === 'lesson-complete' && selectedLesson && lessonResults) {
    return (
      <LessonComplete
        lesson={selectedLesson}
        results={lessonResults}
        onBack={() => { setMode('lessons'); setSelectedLesson(null); setLessonResults(null); }}
        onRestart={() => { setLessonResults(null); setMode('lesson-view'); }}
      />
    );
  }

  // Lessons browser mode
  if (mode === 'lessons') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setMode('menu')}
            className="text-purple-600 hover:text-purple-800 font-medium mb-4"
          >
            ← Back to Menu
          </button>
          
          <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
            📚 Math Lessons
          </h1>

          {!selectedCategory ? (
            // Category selection
            <div className="grid gap-4">
              {Object.entries(mathLessons).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`bg-gradient-to-r ${category.color} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-left`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{category.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold">{category.title}</h2>
                      <p className="text-white text-opacity-80">{category.lessons.length} lessons</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            // Lesson list for selected category
            <div>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-purple-600 hover:text-purple-800 font-medium mb-4"
              >
                ← All Categories
              </button>
              
              <h2 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${mathLessons[selectedCategory].color} bg-clip-text text-transparent`}>
                {mathLessons[selectedCategory].icon} {mathLessons[selectedCategory].title}
              </h2>

              <div className="grid gap-3">
                {mathLessons[selectedCategory].lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => { setSelectedLesson(lesson); setMode('lesson-view'); }}
                    className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all text-left flex items-center gap-4"
                  >
                    <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-800 font-medium">{lesson.title}</span>
                    <span className="ml-auto text-gray-400">→</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Practice session complete
  if (mode === 'practice' && sessionComplete) {
    const percentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
    const timingStats = getTimingStats();
    const gradeInfo = timingStats ? calculateGrade(percentage, timingStats.avgTime) : { grade: '-', color: 'text-gray-500', emoji: '❓' };
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full">
          <div className="text-center mb-4">
            <div className="text-5xl mb-2">{gradeInfo.emoji}</div>
            <h1 className="text-2xl font-bold text-purple-600 mb-1">Practice Complete!</h1>
            <p className="text-gray-500 text-sm">Great job finishing your {sessionDuration >= 60 ? formatDuration(sessionDuration) : `${sessionDuration} second`} session!</p>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-4 mb-4 text-center">
            <p className="text-gray-500 text-sm mb-1">Your Grade</p>
            <p className={`text-6xl font-bold ${gradeInfo.color}`}>{gradeInfo.grade}</p>
          </div>
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
          {timingStats && (
            <div className="bg-yellow-50 rounded-xl p-3 mb-4 text-center">
              <p className="text-gray-500 text-sm">Average Time Per Question</p>
              <p className="text-3xl font-bold text-yellow-600">{timingStats.avgTime.toFixed(1)}s</p>
            </div>
          )}
          {timingStats && problemHistory.length >= 3 && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-green-50 rounded-xl p-3">
                <p className="text-green-700 font-bold text-sm mb-2">⚡ Fastest</p>
                {timingStats.fastest.map((p, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-700">{formatProblemDisplay(p)}</span>
                    <span className="text-green-600 font-medium">{p.timeTaken.toFixed(1)}s</span>
                  </div>
                ))}
              </div>
              <div className="bg-red-50 rounded-xl p-3">
                <p className="text-red-700 font-bold text-sm mb-2">🐢 Needs Practice</p>
                {timingStats.slowest.map((p, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-700">{formatProblemDisplay(p)}</span>
                    <span className="text-red-600 font-medium">{p.timeTaken.toFixed(1)}s</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-3">
            <button onClick={() => { goBack(); setMode('menu'); }} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-4 rounded-xl">Back to Menu</button>
            <button onClick={restartSession} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-xl">Practice Again</button>
          </div>
        </div>
      </div>
    );
  }

  // Active practice quiz
  if (mode === 'practice' && quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => { goBack(); setMode('menu'); }} className="text-purple-500 hover:text-purple-700 font-medium">← Back</button>
            <div className={`text-2xl font-bold ${getTimerColor()}`}>⏱️ {formatTime(timeRemaining)}</div>
            <div className="bg-purple-100 px-3 py-1 rounded-full">
              <span className="text-purple-700 font-bold text-sm">{score.correct}/{score.total}</span>
            </div>
          </div>
          <div className="text-center mb-4">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium">
              {selectedOperations.length === 1 && selectedOperations[0] === 'squares' ? 'Squares' : `${selectedNumbers.sort((a,b)=>a-b).join(', ')} • ${getOperationsLabel()}`}
            </span>
          </div>
          <div className="mb-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-1000 ${timeRemaining <= 60 ? 'bg-red-400' : timeRemaining <= 180 ? 'bg-orange-400' : 'bg-gradient-to-r from-purple-400 to-pink-400'}`}
                style={{ width: `${(timeRemaining / sessionDuration) * 100}%` }} />
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-8 mb-6 shadow-inner">
            <div className="text-center">
              <p className="text-5xl font-bold text-gray-800 mb-2">{currentProblem.display}</p>
              <p className="text-3xl text-gray-500">=</p>
              <p className="text-4xl font-bold text-gray-400 mt-2">?</p>
            </div>
          </div>
          <input ref={inputRef} type="number" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} onKeyPress={handleKeyPress}
            placeholder="Your answer..." className="w-full text-center text-3xl font-bold p-4 border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:outline-none mb-4" disabled={showAnswer} />
          {feedback && (
            <div className={`text-center p-4 rounded-xl mb-4 ${feedback === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {feedback === 'correct' ? <p className="text-xl font-bold">🎉 Correct!</p> : <div><p className="text-xl font-bold">Not quite!</p><p>Answer: <span className="font-bold">{currentProblem.answer}</span></p></div>}
            </div>
          )}
          {!showAnswer ? (
            <button onClick={checkAnswer} disabled={!userAnswer} className="w-full bg-gradient-to-r from-green-400 to-green-500 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-4 rounded-xl text-xl">Check ✓</button>
          ) : (
            <button onClick={nextProblem} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl text-xl">Next →</button>
          )}
        </div>
      </div>
    );
  }

  // Practice setup screen
  if (mode === 'practice') {
    const canStart = selectedNumbers.length > 0 || (selectedOperations.length === 1 && selectedOperations[0] === 'squares');
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-md w-full">
          <button onClick={() => setMode('menu')} className="text-purple-500 hover:text-purple-700 font-medium mb-4">← Back</button>
          <h1 className="text-2xl font-bold text-center text-purple-600 mb-4">⚡ Timed Practice</h1>
          <button onClick={() => setShowTimeSettings(true)} className="w-full text-center text-sm text-purple-500 mb-4 hover:bg-purple-50 py-2 rounded-lg">
            ⏱️ {sessionDuration >= 60 ? formatDuration(sessionDuration) : `${sessionDuration}s`} <span className="text-purple-400">(tap to change)</span>
          </button>
          {showTimeSettings && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
                <h2 className="text-xl font-bold text-purple-600 mb-4 text-center">⏱️ Session Length</h2>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {timeOptions.map(opt => (
                    <button key={opt.value} onClick={() => { setSessionDuration(opt.value); setShowTimeSettings(false); }}
                      className={`py-3 rounded-xl font-medium ${sessionDuration === opt.value ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
                <button onClick={() => setShowTimeSettings(false)} className="w-full bg-gray-200 text-gray-700 py-2 rounded-xl">Cancel</button>
              </div>
            </div>
          )}
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2 text-center">Practice Type</p>
            <div className="flex gap-2 justify-center">
              {operationOptions.map(op => (
                <button key={op.id} onClick={() => toggleOperation(op.id)}
                  className={`py-2 px-3 rounded-xl text-sm font-medium ${selectedOperations.includes(op.id) ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                  {op.label}
                </button>
              ))}
            </div>
          </div>
          {!(selectedOperations.length === 1 && selectedOperations[0] === 'squares') && (
            <>
              <p className="text-sm text-gray-500 mb-2 text-center">Select numbers</p>
              <div className="flex justify-center gap-2 mb-3">
                <button onClick={selectAll} className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">Select All</button>
                <button onClick={clearAll} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Clear</button>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(num => (
                  <button key={num} onClick={() => toggleNumber(num)}
                    className={`aspect-square text-xl font-bold rounded-xl shadow ${selectedNumbers.includes(num) ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white ring-4 ring-purple-300' : 'bg-gray-100 text-gray-700'}`}>
                    {num}
                  </button>
                ))}
              </div>
            </>
          )}
          <button onClick={startQuiz} disabled={!canStart}
            className="w-full bg-gradient-to-r from-green-400 to-green-500 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-4 rounded-xl text-xl">
            {!canStart ? 'Select Numbers' : 'Start Practice! →'}
          </button>
        </div>
      </div>
    );
  }

  // Main menu
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-2">✨ Math Flashcards ✨</h1>
        <p className="text-center text-gray-600 mb-8">Master your math facts!</p>
        
        <div className="space-y-4">
          <button
            onClick={() => setMode('lessons')}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-5 px-6 rounded-2xl text-xl shadow-lg transition-all flex items-center justify-center gap-3"
          >
            <span className="text-2xl">📚</span>
            Learn with Lessons
          </button>
          
          <button
            onClick={() => setMode('practice')}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-5 px-6 rounded-2xl text-xl shadow-lg transition-all flex items-center justify-center gap-3"
          >
            <span className="text-2xl">⚡</span>
            Timed Practice
          </button>
        </div>
        
        <p className="text-center text-gray-400 text-sm mt-8">
          Start with lessons to learn, then practice to master!
        </p>
      </div>
    </div>
  );
}
