"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Database, Brain, Server, Globe } from "lucide-react"

export default function SkillsPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const skills = [
    {
      category: "Frontend",
      icon: <Globe className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      items: [
        { name: "HTML", level: 95 },
        { name: "CSS", level: 90 },
        { name: "JavaScript", level: 92 },
        { name: "React", level: 88 },
      ],
    },
    {
      category: "Backend",
      icon: <Server className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      items: [
        { name: "MongoDB", level: 85 },
        { name: "C", level: 80 },
        { name: "C++", level: 82 },
      ],
    },
    {
      category: "Data Science",
      icon: <Database className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      items: [
        { name: "Python", level: 90 },
        { name: "Pandas", level: 85 },
        { name: "NumPy", level: 88 },
        { name: "Matplotlib", level: 80 },
      ],
    },
    {
      category: "AI & ML",
      icon: <Brain className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      items: [
        { name: "Machine Learning", level: 85 },
        { name: "AI Development", level: 82 },
      ],
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">My Skills</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8"
        >
          {skills.map((skillCategory, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={cardVariants}
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
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
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

        {/* Interactive Skills Cloud */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Technology Stack</h2>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              "React",
              "JavaScript",
              "Python",
              "MongoDB",
              "HTML5",
              "CSS3",
              "C++",
              "Machine Learning",
              "NumPy",
              "Pandas",
              "Matplotlib",
              "AI",
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
    </div>
  )
}
