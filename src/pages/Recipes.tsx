
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { generateRecipe } from "@/lib/ai";
import {
  ChefHat,
  Clock,
  ListPlus,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";

export interface Recipe {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  servings: number;
  difficulty: string;
}

function DeleteRecipe({
  index,
  pastRecipes,
  recipe,
}: {
  recipe: Recipe;
  index: number;
  pastRecipes: Recipe[];
}) {
  const { toast } = useToast();

  const deleteRecipe = (index: number) => {
    const recipeToDelete = pastRecipes[index];
    pastRecipes.splice(index, 1);
    localStorage.setItem(
      "saudaTalikaPastRecipies",
      JSON.stringify(pastRecipes)
    );
    toast({
      title: "Recipe deleted!",
      description: `"${recipeToDelete.name}" has been removed.`,
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Recipe</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{recipe.name}"? This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteRecipe(index)}
            className="bg-destructive hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function ViewRecipe({
  currentRecipe,
  setCurrentRecipe,
  isAddToListDialogOpen,
  setIsAddToListDialogOpen,
  newListName,
  setNewListName,
  addIngredientsToList,
}: {
  currentRecipe: Recipe;
  setCurrentRecipe: (recipe: Recipe) => void;
  isAddToListDialogOpen: boolean;
  setIsAddToListDialogOpen: (open: boolean) => void;
  newListName: string;
  setNewListName: (name: string) => void;
  addIngredientsToList: () => void;
}) {
  return (
    <Sheet
      open={!!currentRecipe}
      onOpenChange={(e) => {
        setCurrentRecipe(null);
      }}
    >
      <SheetContent className="min-w-full overflow-auto">
        <SheetHeader className="hidden">
          <SheetTitle>Current Viewing {currentRecipe?.name}</SheetTitle>
        </SheetHeader>
        <Card className="light:border-orange-200 bg-white/80 mb-8 dark:bg-background/90 backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <CardTitle className="text-2xl text-gray-800 mb-2 dark:text-white/90">
                  {currentRecipe.name}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-white/70">
                  {currentRecipe.description}
                </CardDescription>
              </div>

              <Dialog
                open={isAddToListDialogOpen}
                onOpenChange={setIsAddToListDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                    <ListPlus className="h-4 w-4 mr-2" />
                    Add to List
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Shopping List</DialogTitle>
                    <DialogDescription>
                      All recipe ingredients will be added to a new shopping
                      list.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="listName" className="pb-2">
                        List Name
                      </Label>
                      <Input
                        id="listName"
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        placeholder={`Ingredients for ${currentRecipe.name}`}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddToListDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={addIngredientsToList}
                      disabled={!newListName.trim()}
                    >
                      Create List
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Badge
                variant="outline"
                className="border-orange-300 text-orange-600"
              >
                <Clock className="h-3 w-3 mr-1" />
                {currentRecipe.prepTime} mins
              </Badge>
              <Badge
                variant="outline"
                className="border-orange-300 text-orange-600"
              >
                <Users className="h-3 w-3 mr-1" />
                Serves {currentRecipe.servings}
              </Badge>
              <Badge
                variant="outline"
                className="border-orange-300 text-orange-600"
              >
                {currentRecipe.difficulty}
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Ingredients */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 dark:text-white/90">
                  Ingredients
                </h3>
                <ul className="space-y-2">
                  {currentRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span className="text-gray-700 dark:text-white/80">
                        {ingredient}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 dark:text-white/90">
                  Instructions
                </h3>
                <ol className="space-y-3">
                  {currentRecipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold rounded-full flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 text-sm dark:text-white/80">
                        {instruction}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </SheetContent>
    </Sheet>
  );
}

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [newListName, setNewListName] = useState("");
  const [isAddToListDialogOpen, setIsAddToListDialogOpen] = useState(false);
  const { toast } = useToast();

  const pastRecipes = JSON.parse(
    localStorage.getItem("saudaTalikaPastRecipies") || "[]"
  ) as Recipe[];

  const generateRecipeFunc = async () => {
    setCurrentRecipe(null);

    if (!searchQuery.trim()) {
      toast({
        title: "Please enter a dish name",
        description: "Tell us what you'd like to cook!",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const receivedRecipe = await generateRecipe(searchQuery);
    setCurrentRecipe(receivedRecipe);
    setIsLoading(false);

    toast({
      title: "Recipe generated!",
      description: `Found a great ${receivedRecipe.name} recipe for you. Enjoy!`,
    });

    localStorage.setItem(
      "saudaTalikaPastRecipies",
      JSON.stringify([...pastRecipes, receivedRecipe])
    );
  };

  const addIngredientsToList = () => {
    if (!currentRecipe || !newListName.trim()) return;

    try {
      // Get existing lists from localStorage
      const existingLists = JSON.parse(
        localStorage.getItem("saudaTalikaLists") || "[]"
      );

      // Create new list with recipe ingredients
      const newList = {
        id: Date.now().toString(),
        name: newListName,
        description: `Ingredients for ${currentRecipe.name}`,
        items: currentRecipe.ingredients.map((ingredient) => ({
          id: Date.now().toString() + Math.random(),
          text: ingredient,
          completed: false,
        })),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Save updated lists
      const updatedLists = [...existingLists, newList];
      localStorage.setItem("saudaTalikaLists", JSON.stringify(updatedLists));

      setIsAddToListDialogOpen(false);
      setNewListName("");

      toast({
        title: "List created!",
        description: `"${newListName}" has been created with all recipe ingredients.`,
      });
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      toast({
        title: "Error",
        description: "Failed to save the list. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            AI Recipe Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-white/70">
            Discover amazing recipes with AI and automatically add ingredients
            to your shopping lists
          </p>
        </div>

        {/* Recipe Search Form */}
        <Card className="light:border-orange-200 bg-white/80 mb-8 dark:bg-background/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-white/90">
              <Sparkles className="h-5 w-5 text-orange-600" />
              What would you like to cook?
            </CardTitle>
            <CardDescription>
              Tell our AI chef what dish you're craving, and we'll create a
              personalized recipe for you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 items-center gap-4">
              <div>
                <Label
                  htmlFor="dish"
                  className="text-gray-800 pb-2 dark:text-white/90"
                >
                  Dish Name
                </Label>
                <Input
                  id="dish"
                  placeholder="e.g., Paneer Tikka Masala"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && generateRecipeFunc()}
                />
              </div>
              <div>
                <Button
                  onClick={generateRecipeFunc}
                  disabled={isLoading || !searchQuery.trim()}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                >
                  {isLoading ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                      Generating Recipe...
                    </>
                  ) : (
                    <>
                      <ChefHat className="h-4 w-4 mr-2" />
                      Generate Recipe
                    </>
                  )}
                </Button>
                <Label
                  htmlFor="dish"
                  className="text-gray-400 text-xs font-light dark:text-white/50"
                >
                  Content Generated May Not Be Accurate. Proceed with Caution
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generated Recipe */}
        {currentRecipe && (
          <ViewRecipe
            currentRecipe={currentRecipe}
            setCurrentRecipe={setCurrentRecipe}
            isAddToListDialogOpen={isAddToListDialogOpen}
            setIsAddToListDialogOpen={setIsAddToListDialogOpen}
            newListName={newListName}
            setNewListName={setNewListName}
            addIngredientsToList={addIngredientsToList}
          />
        )}

        {/* Past Recipes */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 dark:text-white/90">
            Past Recipes
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {pastRecipes.map((recipe, index) => (
              <Card
                key={index}
                className="light:border-orange-200 hover:shadow-lg hover:scale-110 transition-all duration-300 bg-white/80 dark:bg-background/80"
              >
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800 dark:text-white/90">
                    {recipe.name}
                  </CardTitle>
                  <CardDescription>{recipe.description}</CardDescription>
                  <div className="flex gap-2 mt-2">
                    <Badge
                      variant="outline"
                      className="border-orange-300 text-orange-600"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {recipe.prepTime} mins
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-orange-300 text-orange-600"
                    >
                      <Users className="h-3 w-3 mr-1" />
                      Serves {recipe.servings}
                    </Badge>
                    <DeleteRecipe
                      recipe={recipe}
                      index={index}
                      pastRecipes={pastRecipes}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => setCurrentRecipe(recipe)}
                    variant="outline"
                    className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-700"
                  >
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes
