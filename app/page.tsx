"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Send,
  ExternalLink,
  X,
  MessageCircle,
  Database,
  Server,
  Globe,
  Brain,
} from "lucide-react"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import emailjs from "@emailjs/browser"

function AnimatedBackground() {
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<
    Array<{
      id: number
      left: string
      top: string
      delay: number
      duration: number
    }>
  >([])

  useEffect(() => {
    setMounted(true)
    // Generate consistent particle data after mount
    const particleData = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
    }))
    setParticles(particleData)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-blue-400/20 dark:bg-blue-300/20 rounded-full"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
          }}
          style={{
            left: particle.left,
            top: particle.top,
          }}
        />
      ))}
    </div>
  )
}

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState("")

  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const projectsRef = useRef(null)
  const contactRef = useRef(null)

  const aboutInView = useInView(aboutRef, { once: true })
  const skillsInView = useInView(skillsRef, { once: true })
  const projectsInView = useInView(projectsRef, { once: true })
  const contactInView = useInView(contactRef, { once: true })

  const skills = [
    {
      category: "Core ML & Data",
      icon: <Brain className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      items: [
        { name: "Python", level: 95 },
        { name: "Pandas", level: 90 },
        { name: "NumPy", level: 92 },
        { name: "Scikit-learn", level: 88 },
        { name: "Machine Learning", level: 85 },
      ],
    },
    {
      category: "Deep Learning",
      icon: <Database className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      items: [
        { name: "TensorFlow", level: 85 },
        { name: "Keras", level: 82 },
        { name: "CNN", level: 88 },
        { name: "RNN", level: 80 },
        { name: "NLP", level: 85 },
      ],
    },
    {
      category: "Data Visualization",
      icon: <MessageCircle className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      items: [
        { name: "Matplotlib", level: 90 },
        { name: "Seaborn", level: 85 },
        { name: "Data Analysis", level: 88 },
        { name: "Exploratory Data Analysis", level: 87 },
      ],
    },
    {
      category: "NLP & Deployment",
      icon: <Server className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      items: [
        { name: "NLP", level: 85 },
        { name: "MLflow", level: 82 },
        { name: "Docker", level: 80 },
        { name: "CI/CD", level: 85 },
      ],
    },
  ]

  const projects = [
    {
      id: 1,
      title: "Bike Frontend Application",
      description: "A full-stack bike rental application with React frontend and Flask API backend",
      longDescription:
        "A comprehensive bike rental platform featuring user authentication, bike booking system, payment integration, and admin dashboard. The frontend is built with React and deployed on Vercel, while the Flask API backend is deployed on Render. Features include real-time booking, user management, and responsive design.",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop&crop=center",
      technologies: ["React", "Flask", "JavaScript", "CSS", "HTML"],
      github: "https://github.com/AryanChoudhary930-cmyk/bike_frontend",
      demo: "https://bikefrontend-rosy.vercel.app/",
      category: "Full Stack",
    },
    {
      id: 2,
      title: "Real-time Object Detection App",
      description: "AI-powered object detection system using YOLOv8 and OpenCV",
      longDescription:
        "A real-time object detection application built with Python, OpenCV, and YOLOv8, deployed using Streamlit. This app detects and tracks multiple objects directly from a live webcam feed, displaying bounding boxes, class labels, and confidence scores in real-time. Features interactive UI and high-performance detection capabilities.",
      image: "https://via.placeholder.com/400x300/667eea/ffffff?text=AI+Object+Detection",
      technologies: ["Python", "OpenCV", "YOLOv8", "Streamlit", "Ultralytics"],
      github: "https://github.com/AryanChoudhary930-cmyk/Real-time-object-detection-app",
      category: "AI/ML",
    },
    {
      id: 3,
      title: "Movie Recommendation System",
      description: "Intelligent movie recommendation engine using machine learning",
      longDescription:
        "A sophisticated movie recommendation system that suggests personalized movie choices based on user preferences and viewing history. Built with Python and deployed on Streamlit, it uses advanced machine learning algorithms to provide accurate recommendations. Features include similarity-based recommendations and an intuitive user interface.",
      image: "https://via.placeholder.com/400x300/f093fb/ffffff?text=Movie+Recommendations",
      technologies: ["Python", "Machine Learning", "Streamlit", "Pandas", "NumPy"],
      github: "https://github.com/AryanChoudhary930-cmyk/movies-recommendation_DataScience",
      demo: "https://movies-recommendationdatascience-35bcuxcfzzar4zffdy3p3o.streamlit.app/",
      category: "Data Science",
    },
    {
      id: 4,
      title: "Pneumonia Detection System",
      description: "AI-powered medical diagnosis tool for chest X-ray analysis",
      longDescription:
        "A web application powered by AI that identifies pneumonia from chest X-rays based on a deep learning CNN model. Users can upload X-ray images and receive instant predictions (Normal or Pneumonia). Developed with Python and Streamlit, the application presents an easy-to-use interface with real-time feedback. Trained on the Kaggle pneumonia dataset for high accuracy.",
      image: "https://via.placeholder.com/400x300/4ade80/ffffff?text=Pneumonia+Detection",
      technologies: ["Python", "Deep Learning", "CNN", "Keras", "Streamlit", "Medical AI"],
      github: "https://github.com/AryanChoudhary930-cmyk/Pneumonia-detection-app",
      category: "AI/ML",
    },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      )

      setIsSubmitting(false)
      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })

      setTimeout(() => {
        setSubmitStatus("")
      }, 3000)
    } catch (error) {
      console.error("EmailJS error:", error)
      setIsSubmitting(false)
      setSubmitStatus("error")

      setTimeout(() => {
        setSubmitStatus("")
      }, 3000)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="min-h-screen relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
          <AnimatedBackground />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              <div className="order-2 md:order-1">
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Aryan Choudhary
                </motion.h1>

                <motion.p
                  className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-3 sm:mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Machine Learning Engineer & AI Enthusiast
                </motion.p>

                <motion.p
                  className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mb-6 sm:mb-8 max-w-xl mx-auto px-4 sm:px-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  "Passionate about building intelligent systems and solving complex problems with machine learning and deep learning algorithms."
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 px-4 sm:px-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <button
                    onClick={() => scrollToSection("projects")}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                  >
                    View My Work
                  </button>
                  <a
                    href="https://wa.me/918319359979"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                  >
                    <MessageCircle size={18} className="sm:w-5 sm:h-5" />
                    <span>WhatsApp Me</span>
                  </a>
                </motion.div>

                <motion.div
                  className="flex justify-center space-x-4 sm:space-x-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <motion.a
                    href="https://github.com/aryanrdx01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github size={24} />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/aryan-choudhary-485465230/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin size={24} />
                  </motion.a>
                  <motion.a
                    href="mailto:choudharyaryan855@gmail.com"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Mail size={24} />
                  </motion.a>
                </motion.div>
              </div>

              <motion.div
                className="order-1 md:order-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative mx-auto max-w-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 blur-lg opacity-30 rounded-lg transform rotate-3"></div>
                  <div className="relative overflow-hidden rounded-lg border-4 border-white dark:border-gray-800 shadow-xl">
                    <Image
                      src="/images/profile.jpeg"
                      alt="Aryan Choudhary"
                      width={400}
                      height={500}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          onClick={() => scrollToSection("about")}
        >
          <ArrowDown className="text-gray-400 dark:text-gray-500" size={24} />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            ref={aboutRef}
            variants={containerVariants}
            initial="hidden"
            animate={aboutInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants}>
              <div className="relative">
                <motion.div
                  className="mx-auto relative max-w-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 blur-lg opacity-30 rounded-lg transform -rotate-3"></div>
                  <div className="relative overflow-hidden rounded-lg border-4 border-white dark:border-gray-800 shadow-xl">
                    <Image
                      src="/images/profile.jpeg"
                      alt="Aryan Choudhary"
                      width={400}
                      height={500}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
                variants={itemVariants}
              >
                About Me
              </motion.h1>

              <motion.div
                className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                variants={itemVariants}
              ></motion.div>

              <motion.p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed" variants={itemVariants}>
                I'm a passionate machine learning engineer and AI enthusiast with a strong background in core ML algorithms,
                deep learning, and natural language processing. With expertise in Python, TensorFlow, PyTorch, and advanced
                AI techniques, I create intelligent solutions that solve real-world problems through data-driven insights.
              </motion.p>

              <motion.p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed" variants={itemVariants}>
                My journey in AI/ML started with a fascination for how machines can learn and make decisions, which led me to
                explore everything from classical machine learning algorithms to cutting-edge deep learning architectures.
                I believe in continuous learning and staying updated with the latest advances in artificial intelligence.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">My Skills</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise and proficiency levels
            </p>
          </motion.div>

          <motion.div
            ref={skillsRef}
            variants={containerVariants}
            initial="hidden"
            animate={skillsInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          >
            {skills.map((skillCategory, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${skillCategory.color} text-white mr-4`}>
                    {skillCategory.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{skillCategory.category}</h3>
                </div>

                <div className="space-y-4">
                  {skillCategory.items.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full bg-gradient-to-r ${skillCategory.color}`}
                          initial={{ width: 0 }}
                          animate={skillsInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{
                            duration: 1.5,
                            delay: categoryIndex * 0.2 + skillIndex * 0.1,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Technology Stack */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Technology Stack</h2>

            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Python",
                "Pandas",
                "NumPy",
                "Matplotlib",
                "Seaborn",
                "Scikit-learn",
                "Machine Learning",
                "TensorFlow",
                "Keras",
                "CNN",
                "NLP",
                "RNN",
                "Deep Learning",
                "MLflow",
                "Docker",
                "CI/CD",
                "Automation",
                "Deployment",
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold cursor-pointer"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 2 + index * 0.1,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">My Projects</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A showcase of my recent work and personal projects
            </p>
          </motion.div>

          <motion.div
            ref={projectsRef}
            variants={containerVariants}
            initial="hidden"
            animate={projectsInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer"
                whileHover={{ y: -5 }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image || "https://via.placeholder.com/400x300/1f2937/ffffff?text=Project+Image"}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={16} className="mr-1" />
                      Code
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={16} className="mr-1" />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <Image
                    src={selectedProject.image || "https://via.placeholder.com/600x400/1f2937/ffffff?text=Project+Image"}
                    alt={selectedProject.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{selectedProject.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedProject.longDescription}</p>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech: string, index: number) => (
                        <span
                          key={index}
                          className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-gray-900 dark:bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Github size={20} className="mr-2" />
                      View Code
                    </a>
                    {selectedProject.demo && (
                      <a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <ExternalLink size={20} className="mr-2" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              I'd love to hear from you. Send me a message and I'll respond as soon as possible.
            </p>
          </motion.div>

          <motion.div
            ref={contactRef}
            variants={containerVariants}
            initial="hidden"
            animate={contactInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
          >
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>

                <div className="space-y-6">
                  <motion.div
                    className="flex items-center space-x-4"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                      <p className="text-gray-600 dark:text-gray-300">choudharyaryan855@gmail.com</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-4"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                      <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Phone</h3>
                      <p className="text-gray-600 dark:text-gray-300">+91 8319359979</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-4"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Location</h3>
                      <p className="text-gray-600 dark:text-gray-300">MP, India</p>
                    </div>
                  </motion.div>

                  <motion.a
                    href="https://wa.me/918319359979"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg transition-colors"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-white/20 p-3 rounded-lg">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">WhatsApp</h3>
                      <p className="text-green-100">Chat with me directly</p>
                    </div>
                  </motion.a>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Follow Me</h3>
                <div className="flex space-x-4">
                  <motion.a
                    href="https://github.com/aryanrdx01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github size={24} />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/aryan-choudhary-485465230/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin size={24} />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <motion.input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200 resize-none"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 dark:text-green-400 text-center font-medium"
                  >
                    Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 dark:text-red-400 text-center font-medium"
                  >
                    Failed to send message. Please try again.
                  </motion.div>
                )}
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
