import { useEffect, useState } from "react";
import { Brain, Cpu, Network, Zap } from "lucide-react";
import { ProgressBar } from "@/components/ProgressBar";
import { TableOfContents } from "@/components/TableOfContents";
import { motion } from "framer-motion";
import { GlowingEffect } from "./ui/glowing-effect";

const sections = [
  { id: "introduction", title: "Introduction to Neural Networks" },
  { id: "fundamentals", title: "Fundamental Concepts" },
  { id: "architecture", title: "Network Architecture" },
  { id: "training", title: "Training Process" },
];

const Index = () => {
  const [currentSection, setCurrentSection] = useState(sections[0].id);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500/2 via-purple-500/2 to-pink-500/2" />
      <ProgressBar />
      
      {/* Hero Section */}


      {/* Main Content */}
      <main className="relative min-h-screen w-full bg-[#1a1a1a] text-white overflow-x-hidden pt-16">
        <article className="relative px-8 md:px-16 lg:px-24 py-16 max-w-7xl mx-auto">
          <header className="mb-20 text-center pt-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 text-white">
              Neural Networks Tutorial
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto px-4">
              A comprehensive guide to understanding neural networks, their architecture, and training process.
            </p>
          </header>

          {/* Introduction Section */}
          <motion.section 
            id="introduction" 
            className="mb-24 px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/5 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-blue-400 pt-4">
                Introduction to Neural Networks
              </h2>
              <p className="text-xl text-gray-300 mb-16 leading-relaxed max-w-4xl">
                Neural networks are computational models inspired by the human brain's structure and function.
                They form the backbone of modern artificial intelligence, enabling machines to learn from experience
                and adapt to new situations. These sophisticated systems have revolutionized how we approach 
                complex problems in computing.
              </p>
              
              <img
                src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
                alt="Neural Network Code"
                className="w-full aspect-video object-cover rounded-lg mb-8"
              />
              
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="p-8 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                  <h3 className="text-2xl font-semibold mb-4 text-white">Key Components</h3>
                  <ul className="space-y-4 text-gray-300 leading-relaxed">
                    <li className="flex gap-3">
                      <span className="text-primary">•</span>
                      <span>Neurons (nodes) - The basic computational units</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary">•</span>
                      <span>Synapses (connections) - Links between neurons</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary">•</span>
                      <span>Weights and biases - Adjustable parameters</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-8 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                  <h3 className="text-2xl font-semibold mb-4 text-white">Applications</h3>
                  <ul className="space-y-4 text-gray-300 leading-relaxed">
                    <li className="flex gap-3">
                      <span className="text-primary">•</span>
                      <span>Image Recognition - Processing visual data</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary">•</span>
                      <span>Natural Language Processing - Understanding text</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary">•</span>
                      <span>Autonomous Systems - Decision making</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Fundamentals Section */}
          <motion.section 
            id="fundamentals" 
            className="mb-24 px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/5 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-purple-400 pt-4">
                Fundamental Concepts
              </h2>
              <p className="text-xl text-gray-300 mb-16 leading-relaxed max-w-4xl">
                Understanding the basic principles that govern neural networks is crucial for grasping their capabilities
                and limitations. These fundamentals provide the foundation for more complex architectures and applications.
              </p>
              
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                alt="Neural Network Visualization"
                className="w-full aspect-video object-cover rounded-lg mb-8"
              />
              
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="p-8 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                  <h3 className="text-2xl font-semibold mb-4 text-white">Input Layer</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Receives and processes raw data, transforming it into a format suitable for the network
                  </p>
                </div>
                <div className="p-8 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                  <h3 className="text-2xl font-semibold mb-4 text-white">Hidden Layers</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Perform intermediate computations and feature extraction through multiple transformations
                  </p>
                </div>
                <div className="p-8 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                  <h3 className="text-2xl font-semibold mb-4 text-white">Output Layer</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Produces the final prediction or result based on the processed information
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Architecture Section */}
          <motion.section 
            id="architecture" 
            className="mb-24 px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/5 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-pink-400 pt-4">
                Network Architecture
              </h2>
              <p className="text-xl text-gray-300 mb-16 leading-relaxed max-w-4xl">
                The structure of a neural network determines its learning capacity and the types of problems it can solve.
                Different architectures are suited to different types of tasks and data structures.
              </p>
              
              <img
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
                alt="AI Robot"
                className="w-full aspect-video object-cover rounded-lg mb-8"
              />
              
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="p-8 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                  <h3 className="text-2xl font-semibold mb-4 text-white">Common Architectures</h3>
                  <ul className="space-y-4 text-gray-300 leading-relaxed">
                    <li>
                      <strong className="block text-foreground">Feedforward Networks</strong>
                      <p>Information flows in one direction, from input to output</p>
                    </li>
                    <li>
                      <strong className="block text-foreground">Convolutional Networks</strong>
                      <p>Specialized for processing grid-like data, such as images</p>
                    </li>
                    <li>
                      <strong className="block text-foreground">Recurrent Networks</strong>
                      <p>Handle sequential data with memory capabilities</p>
                    </li>
                  </ul>
                </div>
                
                <div className="p-8 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                  <h3 className="text-2xl font-semibold mb-4 text-white">Design Considerations</h3>
                  <ul className="space-y-4 text-gray-300 leading-relaxed">
                    <li>
                      <strong className="block text-foreground">Layer Depth</strong>
                      <p>The number of hidden layers affects the network's complexity</p>
                    </li>
                    <li>
                      <strong className="block text-foreground">Node Count</strong>
                      <p>The number of neurons per layer impacts processing capacity</p>
                    </li>
                    <li>
                      <strong className="block text-foreground">Connectivity</strong>
                      <p>How nodes are connected determines information flow</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Training Section */}
          <motion.section 
            id="training" 
            className="mb-24 px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/5 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-blue-400 pt-4">
                Training Process
              </h2>
              <p className="text-xl text-gray-300 mb-16 leading-relaxed max-w-4xl">
                Training a neural network involves adjusting its parameters to minimize errors and improve performance.
                This iterative process requires careful consideration of various factors and techniques.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-8 items-start p-8 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                  <span className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-500/10 text-blue-400 font-bold">1</span>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-white">Data Preparation</h3>
                    <p className="text-gray-300 leading-relaxed">
                      The process begins with cleaning and preprocessing input data to ensure quality and consistency.
                      This includes normalization, handling missing values, and splitting into training and validation sets.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-8 items-start p-8 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                  <span className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-purple-500/10 text-purple-400 font-bold">2</span>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-white">Forward Propagation</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Data flows through the network, with each layer performing its computations and passing
                      results to the next layer until reaching the output.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-8 items-start p-8 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                  <span className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-500/10 text-blue-400 font-bold">3</span>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-white">Error Calculation</h3>
                    <p className="text-gray-300 leading-relaxed">
                      The network's predictions are compared with actual values to measure accuracy and
                      calculate the loss function that needs to be minimized.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-8 items-start p-8 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                  <span className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-purple-500/10 text-purple-400 font-bold">4</span>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-white">Backpropagation</h3>
                    <p className="text-gray-300 leading-relaxed">
                      The network adjusts its weights and biases based on the calculated errors,
                      propagating these adjustments backward through the layers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </article>
      </main>

      {/* <style >{`
        // @keyframes gradient {
        //   0% { background-position: 0% 50%; }
        //   50% { background-position: 100% 50%; }
        //   100% { background-position: 0% 50%; }
        // }

        .article-container {
          @apply relative max-w-4xl mx-auto;
        }

        .article-heading {
          @apply text-3xl font-semibold mb-6;
        }

        .article-subheading {
          @apply text-xl font-medium mb-4 text-white/90;
        }

        .article-text {
          @apply text-lg leading-relaxed text-gray-300;
        }

        section {
          @apply relative p-8 rounded-lg border border-[#303030]/50 bg-[#1a1a1a]/90 backdrop-blur-[2px];
          box-shadow: 0 0 30px rgba(147, 51, 234, 0.1);
          transition: all 0.3s ease;
        }

        // section:hover {
        //   border-color: rgba(147, 51, 234, 0.3);
        //   box-shadow: 0 0 40px rgba(147, 51, 234, 0.2);
        // }

        img {
          @apply transition-all duration-300;
        }

        img:hover {
          @apply scale-[1.02] shadow-xl shadow-purple-500/20;
        }
      `}</style> */}
    </div>
  );
};

export { ProgressBar } from './ProgressBar';
export { TableOfContents } from './TableOfContents';
export { useCurrentSection } from '@/hooks/useCurrentSection';

export default Index;