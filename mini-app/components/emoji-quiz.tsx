"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function EmojiQuiz() {
  const puzzles = [
    { emojis: "🍕🍔", answer: "pizza burger" },
    { emojis: "🏠🚪", answer: "home door" },
    { emojis: "🐶🐱", answer: "dog cat" },
  ];

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);

  const current = puzzles[index];

  const handleSubmit = () => {
    if (disabled) return;
    const correct = guess.trim().toLowerCase() === current.answer.toLowerCase();
    setFeedback(correct ? "Correct!" : `Wrong! The answer was "${current.answer}".`);
    setScore((s) => s + (correct ? 1 : 0));
    setDisabled(true);
    setTimeout(() => {
      setIndex((i) => (i + 1) % puzzles.length);
      setGuess("");
      setFeedback(null);
      setDisabled(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <h2 className="text-xl font-semibold text-center">Emoji Quiz</h2>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="text-6xl">{current.emojis}</div>
        <Input
          placeholder="Your guess"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          disabled={disabled}
          className="w-full"
        />
        <Button onClick={handleSubmit} disabled={disabled} className="w-full">
          Submit
        </Button>
        {feedback && (
          <p className={cn("mt-2 text-center", feedback === "Correct!" ? "text-green-600" : "text-red-600")}>
            {feedback}
          </p>
        )}
        <p className="mt-4 text-sm text-muted-foreground">
          Score: {score}
        </p>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-xs text-muted-foreground">
          Tap the emojis to guess the word, phrase, or movie.
        </p>
      </CardFooter>
    </Card>
  );
}
