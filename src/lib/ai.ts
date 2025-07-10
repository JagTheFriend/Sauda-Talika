import { Recipe } from "@/pages/Recipes";
import { extractRecipeData } from "./utils";

const aiPrompt = `
Generate a recipe for the dish [Dish Name]. It should should include:

1. Title: The name of the dish.
2. Description: A brief description of the dish (1-2 sentences).
3. Cooking Time: How long the dish takes to prepare (in minutes).
4. Servings: The number of servings the recipe makes.
5. Difficulty: The difficulty level (e.g., Easy, Medium, Hard).
6. Ingredients: A list of ingredients required, with the quantity for each item.
7. Instructions: Numbered steps that explain how to cook the dish.

Use the following template for the output:

[Dish Name]

----

[A brief description of the dish.]

* Cooking Time: [X mins]
* Serves: [X]
* Difficulty: [Level]

----

Ingredients:

* [Ingredient 1]
* [Ingredient 2]
* [Ingredient 3]
* [etc.]

----

Instructions:

1. [Instruction step 1]
2. [Instruction step 2]
3. [Instruction step 3]
4. [etc.]

----

NO NEED TO GIVE REASONING.
DO NOT INCLUDE ANYTHING ELSE OTHER THAN THE ABOVE LIST.
DO NOT USE MARKDOWN OR HTML TAGS. EXCEPT FOR THE LIST.
DO NOT INCLUDE HEADERS OR ANYTHING ELSE OTHER THAN THE ABOVE LIST.
SEPARATE EACH SECTION WITH "----".
`;

const url = "https://openrouter.ai/api/v1/chat/completions";
const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_PUBLIC_OPENROUTER_API_KEY}`,
  "Content-Type": "application/json",
};

export async function generateRecipe(dishName: string): Promise<Recipe> {
  const payload = {
    model: "google/gemini-2.0-flash-exp:free",
    messages: [
      {
        role: "system",
        content: aiPrompt,
      },
      {
        role: "user",
        content: `Dish name is "${dishName}"`,
      },
    ],
    stream: false,
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    cache: "force-cache",
    body: JSON.stringify(payload),
  });
  const parsedData = await response.json();
  const messageContent = parsedData.choices[0].message.content;
  return extractRecipeData(messageContent);
}
