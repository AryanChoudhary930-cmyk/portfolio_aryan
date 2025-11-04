"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Github, ExternalLink, X } from "lucide-react"

export default function ProjectsPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  interface Project {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    technologies: string[];
    github: string;
    demo: string;
    category: string;
  }

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution built with React and Node.js",
      longDescription:
        "A comprehensive e-commerce platform featuring user authentication, product management, shopping cart functionality, payment integration, and admin dashboard. Built with modern technologies and best practices.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com",
      demo: "https://demo.com",
      category: "Full Stack",
    },
    {
      id: 2,
      title: "AI Image Classifier",
      description: "Machine learning model for image classification using TensorFlow",
      longDescription:
        "An advanced image classification system using deep learning techniques. The model can accurately classify images into multiple categories with high precision and includes a user-friendly web interface.",
      technologies: ["Python", "TensorFlow", "Flask", "OpenCV"],
      github: "https://github.com",
      demo: "https://demo.com",
      category: "AI/ML",
    },
    {
      id: 3,
      title: "Data Visualization Dashboard",
      description: "Interactive dashboard for data analysis and visualization",
      longDescription:
        "A powerful data visualization tool that transforms complex datasets into interactive charts and graphs. Features real-time data updates, multiple chart types, and export functionality.",
      technologies: ["Python", "Pandas", "Matplotlib", "Streamlit"],
      github: "https://github.com",
      demo: "https://demo.com",
      category: "Data Science",
    },
    {
      id: 4,
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates",
      longDescription:
        "A modern task management application that enables teams to collaborate effectively. Features include real-time updates, drag-and-drop functionality, deadline tracking, and team communication tools.",
      technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
      github: "https://github.com",
      demo: "https://demo.com",
      category: "Full Stack",
    },
    {
      id: 5,
      title: "Weather Prediction Model",
      description: "ML model for accurate weather forecasting",
      longDescription:
        "A sophisticated weather prediction system using machine learning algorithms to forecast weather conditions. Incorporates historical data, real-time inputs, and advanced statistical models.",
      technologies: ["Python", "Scikit-learn", "NumPy", "API Integration"],
      github: "https://github.com",
      demo: "https://demo.com",
      category: "AI/ML",
    },
    {
      id: 6,
      title: "Portfolio Website",
      description: "Responsive portfolio website with modern animations",
      longDescription:
        "A modern, responsive portfolio website showcasing projects and skills. Features smooth animations, dark mode support, and optimized performance across all devices.",
      technologies: ["React", "Framer Motion", "Tailwind CSS", "Next.js"],
      github: "https://github.com",
      demo: "https://demo.com",
      category: "Frontend",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">My Projects</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A showcase of my recent work and personal projects
          </p>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 no-image"
          >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer"
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative">
                <div className="h-48 bg-gray-100 dark:bg-gray-700"></div>
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
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-t-xl"></div>
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg"
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
                  {selectedProject.technologies.map((tech, index) => (
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
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink size={20} className="mr-2" />
                  Live Demo
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
