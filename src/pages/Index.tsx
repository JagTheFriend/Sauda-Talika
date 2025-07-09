
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { ChefHat, ListChecks, Smartphone, Sparkles } from "lucide-react"
import { Logo } from "@/components/Logo"

const Index = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: ListChecks,
      title: "Smart Lists",
      description: "Create and manage multiple shopping lists with an intuitive interface"
    },
    {
      icon: ChefHat,
      title: "AI Recipes",
      description: "Get recipe suggestions and automatically add ingredients to your lists"
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Access your lists anywhere with our responsive mobile design"
    },
    {
      icon: Sparkles,
      title: "Local Storage",
      description: "Your data stays with you - no account required, completely private"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
            Sauda Talika
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Your intelligent shopping companion. Create lists, discover recipes, and make grocery shopping effortless.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg"
            >
              Start Creating Lists
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/recipes")}
              className="border-orange-300 dark:border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 px-8 py-4 text-lg"
            >
              Explore Recipes
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800 dark:text-gray-200">
            Everything you need for smart shopping
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Sauda Talika combines the simplicity of list-making with the power of AI to transform how you plan your meals and shopping.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-orange-200 dark:border-gray-600 hover:shadow-lg transition-shadow duration-300 bg-white/80 dark:bg-gray-800/80">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-gray-800 dark:text-gray-200">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            Ready to revolutionize your shopping?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have made their grocery shopping smarter and more efficient with Sauda Talika.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg"
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Index
