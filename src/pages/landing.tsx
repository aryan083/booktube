import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, BookOpen, Brain, Sparkles, MessageSquare, GraduationCap, BookCopy, LayoutGrid } from "lucide-react"
import { useState, useEffect } from "react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      {/* Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-20%] w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[128px]" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[128px]" />
      </div>

      {/* Navigation Bar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-6 flex items-center justify-between backdrop-blur-sm bg-black/10 mt-4 rounded-2xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full" />
          <span className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            BookTube
          </span>
        </div>
        <div className="flex items-center gap-8">
          <Link to="/about" className="text-white/80 hover:text-white transition-colors">
            About
          </Link>
          <Link to="/learn" className="text-white/80 hover:text-white transition-colors">
            Learn More
          </Link>
          <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
            Contact
          </Link>
          <Link to="/signup">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90 rounded-full px-6 shadow-lg shadow-purple-500/25">
              Get Started
            </Button>
          </Link>
          <Link to="/signin">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90 rounded-full px-6 shadow-lg shadow-purple-500/25">
              Login
            </Button>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-24 pb-32">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1 className="text-7xl font-bold tracking-tight bg-gradient-to-br from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Introducing BookTube:
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Your Personal AI Learning Companion
              </span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h2 className="text-6xl font-medium tracking-tight mt-4 leading-tight">
              Turn textbooks into
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                interactive experiences!
              </span>
            </h2>
          </motion.div>

          <motion.div 
            className="space-y-4 mt-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <p className="text-2xl text-white/80 font-light">
              Chapterwise. Personalized. Interactive.
            </p>
            <p className="text-2xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-medium">
              Learn the Way You Love. <br/>
              For demo purposes, use the following credentials:
              <br />
              Email: aryanmahida1268@gmail.com
              <br />
              Password: 1234567890
            </p>
          </motion.div>

          <motion.div 
            className="mt-16"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 rounded-full px-12 py-7 text-lg font-medium shadow-lg shadow-purple-500/25 transition-all hover:scale-105">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-32 backdrop-blur-sm bg-black/30">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
          >
            Why Choose BookTube?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Create Playlists",
                description: "Organize your favorite articles into custom playlists for easy access and sharing.",
                delay: 0.2
              },
              {
                title: "Share Insights",
                description: "Share your thoughts and recommendations with a community of readers.",
                delay: 0.4
              },
              {
                title: "Discover Content",
                description: "Explore curated playlists and discover new articles from fellow readers.",
                delay: 0.6
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: feature.delay }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all hover:scale-105"
              >
                <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-lg">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Carousel Section */}
      <div className="relative py-32">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
          >
            Powerful Features for Modern Learning
          </motion.h2>

          <FeatureCarousel />
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-32">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-white/70 mb-12">
            Join our community of learners and start creating your personalized learning experience today.
          </p>
          <Link to="/signup">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-full px-12 py-7 text-lg font-medium shadow-lg shadow-purple-500/25 transition-all hover:scale-105">
              Sign Up Now
            </Button>
          </Link>
        </motion.div>
      </div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 4s linear infinite;
        }
      `}</style>
    </div>
  )
}

function FeatureCarousel() {
  const [currentPage, setCurrentPage] = useState(0)
  
  const features = [
    {
      icon: Brain,
      title: "Hyper-Personalized Learning",
      description: "BookTube adapts to your syllabus, your textbook, and your pace. No filler content. No generic summaries.",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: BookOpen,
      title: "Built From Your Books",
      description: "Upload your textbook or syllabus, and let BookTube break it down into smart, interactive chapters.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Sparkles,
      title: "Interactive, Not Passive",
      description: "You don't just read — you explore. With questions, visuals, summaries, and chatbot assistance.",
      gradient: "from-pink-500 to-red-500"
    },
    {
      icon: LayoutGrid,
      title: "Focus on What Matters",
      description: "Get chapter-wise content aligned to your curriculum. Nothing extra, nothing missing.",
      gradient: "from-red-500 to-orange-500"
    },
    {
      icon: GraduationCap,
      title: "Powered by AI, Built for You",
      description: "From NLP to knowledge graphs, BookTube brings the best of AI into your study flow — no tech degree needed.",
      gradient: "from-orange-500 to-yellow-500"
    },
    {
      icon: MessageSquare,
      title: "Save Time, Study Smarter",
      description: "Say goodbye to hours of Googling or asking for notes. Get clear, topic-wise explanations instantly.",
      gradient: "from-yellow-500 to-green-500"
    },
    {
      icon: BookCopy,
      title: "Access Anytime, Anywhere",
      description: "Cross-device support ensures your study assistant is always just a tap away.",
      gradient: "from-green-500 to-blue-500"
    }
  ]

  const totalPages = Math.ceil(features.length / 3)

  // Auto-rolling functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [totalPages])

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-8"
          initial={false}
          animate={{ x: `${-currentPage * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                className="min-w-[calc(33.333%-1.33rem)] p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all hover:scale-105 group"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
              >
                <div 
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                >
                  <Icon className="w-8 h-8 text-white transform group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-lg flex-grow group-hover:text-white/90 transition-colors duration-300">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevPage}
        className="absolute left-[-4rem] top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-full text-white shadow-lg shadow-purple-500/25 hover:scale-110 transition-transform opacity-70 hover:opacity-100"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextPage}
        className="absolute right-[-4rem] top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-full text-white shadow-lg shadow-purple-500/25 hover:scale-110 transition-transform opacity-70 hover:opacity-100"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Page Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`h-2 rounded-full transition-all duration-500 ${
              currentPage === index
                ? "w-8 bg-gradient-to-r from-purple-500 to-blue-500"
                : "w-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  )
} 