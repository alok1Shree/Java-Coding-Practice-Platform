# Java Practice Platform

A HackerRank-style practice site for Java interview preparation, built with **React + Vite**.
71 auto-graded questions across **Core Java**, **Collections** and **Java 8 Streams**, with explanations, progress tracking and a fully static build you can host anywhere.

## Problem it solves
Interview prep material for Java is scattered and rarely checks your understanding. This gives learners a single place to predict program output, see exactly why an answer is right or wrong, and track progress by topic and difficulty.

## Question bank (71)
| Topic | Subtopics | Questions |
|---|---|---|
| Core Java | Strings, Exceptions, OOP, Language Basics | 24 |
| Collections | List, Set, Map, Queue & Deque, Sorting & Comparators, Iterators | 26 |
| Java 8 Streams | Stream Basics, Collectors, Optional & Functional | 21 |

Two question types, both graded deterministically in the browser:
- **Output prediction (63)** — read a complete Java program and type its exact console output.
- **Multiple choice (8)** — conceptual questions with one correct answer.

Each question has a difficulty (Easy / Medium / Hard) and an explanation shown after a correct answer or when you reveal it.

## How answers are guaranteed correct
Every output question's expected answer is **not hand-typed**: `npm run verify` recompiles each program with a real JDK (`javac --release 8`, so the code is Java-8 compatible), runs it, and compares stdout with the stored answer. CI runs this on every push.
Design rules for the question set:
- No output depends on `HashSet`/`HashMap` iteration order (unspecified by the spec) or JDK-specific exception messages; ordered collections (`TreeMap`, `LinkedHashSet`, …) are used where order matters.
- Output comparison ignores blank lines and edge whitespace, but the content and the order of lines must match exactly (`[1,3]` is not `[1, 3]`).

> The platform checks answers; it does **not** execute Java in the browser. Typing a program's output is the exercise.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm test           # grading logic + question-bank integrity (no JDK needed)
npm run verify     # re-run all 63 programs with your JDK (needs javac/java 8+)
npm run build      # static site in dist/
```
Requires Node 18+.

## Deploy
The build is static (`base: "./"`), so any static host works:
- **GitHub Pages:** push to `main`, then *Settings → Pages → Source: GitHub Actions*. `.github/workflows/deploy.yml` builds and publishes.
- **Netlify:** import the repo; `netlify.toml` is included. **Vercel:** import the repo; `vercel.json` is included.

## Project structure
```
src/
  App.jsx                  state, filters, progress, navigation
  grading.js               deterministic answer checking (unit-tested)
  storage.js               localStorage with safe fallbacks
  components/              Sidebar, QuestionView, CodeBlock (tiny Java highlighter)
  data/questions.json      the 71 questions (code, answer, explanation)
scripts/verify-questions.mjs   JDK-backed answer verification
tests/                     node:test suites
```

## Adding a question
Add an object to `src/data/questions.json` (output type: full `Main` class in `code`; run `npm run verify` and paste the produced output into `answer`), keep ids sequential, and update the counts in `tests/data.test.js`.

## License
MIT
