
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      description: "JagTheFriend12@gmail.com",
      action: "mailto:JagTheFriend12@gmail.com",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-gray-400">
            Have questions, suggestions, or need help? We'd love to hear from
            you. Reach out and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                Contact Us
              </h2>
              <div className="grid gap-4">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="light:border-orange-200 hover:shadow-md transition-shadow duration-300 bg-white dark:bg-card/80"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                          <info.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-white">
                            {info.title}
                          </h3>
                          <p className="text-gray-600 dark:text-white/80">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <Card className="light:border-orange-200 bg-white dark:bg-card/80">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 dark:text-white">
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium dark:text-white/80 text-gray-800">
                    Is my data secure?
                  </p>
                  <p className="text-sm text-gray-600 dark:text-white/60">
                    Yes, all data is stored locally on your device for maximum
                    privacy.
                  </p>
                </div>
                <div>
                  <p className="font-medium dark:text-white/80 text-gray-800">
                    Do I need to create an account?
                  </p>
                  <p className="text-sm text-gray-600 dark:text-white/60">
                    No account required! Start using Sauda Talika immediately.
                  </p>
                </div>
                <div>
                  <p className="font-medium dark:text-white/80 text-gray-800">
                    Is the app free?
                  </p>
                  <p className="text-sm text-gray-600 dark:text-white/60">
                    Yes, Sauda Talika is completely free to use with all
                    features included.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact
