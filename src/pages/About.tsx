
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Target, Users, Zap } from "lucide-react"

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "User-Centric",
      description: "Everything we build is designed with the user experience at the forefront"
    },
    {
      icon: Target,
      title: "Simplicity",
      description: "We believe the best solutions are often the simplest ones"
    },
    {
      icon: Users,
      title: "Accessibility",
      description: "Our app works for everyone, everywhere, on any device"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We leverage AI to make everyday tasks smarter and more efficient"
    }
  ]

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            About Sauda Talika
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Making grocery shopping and meal planning effortless through intelligent list management and AI-powered recipe suggestions.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <Card className="border-orange-200 bg-white/80">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed mb-4">
                Sauda Talika was born from a simple observation: grocery shopping doesn't have to be chaotic. 
                We noticed that people were juggling multiple apps, forgetting ingredients, and struggling to 
                plan meals efficiently.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our solution combines the simplicity of traditional shopping lists with the power of artificial 
                intelligence. Whether you're planning a week's worth of meals or just need to grab a few items, 
                Sauda Talika adapts to your needs.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The name "Sauda Talika" reflects our commitment to making shopping ("Sauda") and list-making 
                ("Talika") a seamless, enjoyable experience for everyone.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-orange-200 hover:shadow-lg transition-shadow duration-300 bg-white/80">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <value.icon className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-gray-800">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="text-center">
          <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-600 leading-relaxed">
                To empower people to shop smarter, eat better, and waste less by providing 
                intelligent tools that make meal planning and grocery shopping a delightful experience.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default About
