import { Recipe } from "@/pages/Recipes";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractRecipeData(text: string): Recipe {
  // Normalize text for consistent parsing
  const cleanedText = text.trim().replace(/\r/g, "");

  // Extract name: first non-empty line
  const nameMatch = cleanedText.match(/^(.+?)\n/);
  const name = nameMatch ? nameMatch[1].trim() : null;

  // Extract description: line after name and before any metadata or section
  const descriptionMatch = cleanedText.match(
    /^.+?\n\s*\n(.+?)\n(?:\s*\*|Cooking Time:|Serves:|Difficulty:)/s
  );
  const description = descriptionMatch ? descriptionMatch[1].trim() : null;

  // Extract metadata (prepTime, servings, difficulty)
  const prepTimeMatch = cleanedText.match(/Cooking Time:\s*(.+?)\n/i);
  const servingsMatch = cleanedText.match(/Serves:\s*(.+?)\n/i);
  const difficultyMatch = cleanedText.match(/Difficulty:\s*(.+?)\n/i);

  // Extract Ingredients block
  const ingredientsMatch = cleanedText.match(
    /Ingredients:\s*\n([\s\S]*?)(?:\n[-–]{2,}|\nInstructions:|\n\d+\.\s)/i
  );
  const ingredients = ingredientsMatch
    ? ingredientsMatch[1]
        .split("\n")
        .map((line) => line.replace(/^\*\s*/, "").trim())
        .filter(Boolean)
    : [];

  // Extract Instructions block
  const instructionsMatch = cleanedText.match(
    /Instructions:\s*\n([\s\S]*?)(?:\n\*|$)/i
  );
  const instructions = instructionsMatch
    ? instructionsMatch[1]
        .split(/\n\d+\.\s*/)
        .map((step) => step.trim())
        .filter(Boolean)
    : [];

  return {
    name,
    description,
    prepTime: prepTimeMatch ? parseInt(prepTimeMatch[1].trim()) : 10,
    servings: servingsMatch ? parseInt(servingsMatch[1].trim()) : 4,
    difficulty: difficultyMatch ? difficultyMatch[1].trim() : "Hard",
    ingredients,
    instructions,
  };
}
