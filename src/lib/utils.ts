import { Recipe } from "@/pages/Recipes";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractRecipeData(text: string): Recipe {
  const nameMatch = text.match(/^\s*<answer>.*?\n(.*?)\n/);
  const descriptionMatch = text.match(/----\n\n(.*?)\n\n\*/s);
  const prepTimeMatch = text.match(/\* Cooking Time: (.*?)\n/);
  const servingsMatch = text.match(/\* Serves: (.*?)\n/);
  const difficultyMatch = text.match(/\* Difficulty: (.*?)\n/);

  const ingredientsMatch = text.match(/Ingredients:\n\n([\s\S]*?)\n----/);
  const instructionsMatch = text.match(/Instructions:\n\n([\s\S]*?)\n----/);

  return {
    name: nameMatch ? nameMatch[1].trim() : null,
    description: descriptionMatch ? descriptionMatch[1].trim() : null,
    prepTime: prepTimeMatch ? parseInt(prepTimeMatch[1].trim()) : 10,
    servings: servingsMatch ? parseInt(servingsMatch[1].trim()) : 3,
    difficulty: difficultyMatch ? difficultyMatch[1].trim() : "Hard",
    ingredients: ingredientsMatch
      ? ingredientsMatch[1]
          .trim()
          .split("\n")
          .map((i) => i.replace(/^\* /, "").trim())
      : [],
    instructions: instructionsMatch
      ? instructionsMatch[1]
          .trim()
          .split("\n")
          .map((i) => i.replace(/^\d+\.\s*/, "").trim())
      : [],
  };
}
