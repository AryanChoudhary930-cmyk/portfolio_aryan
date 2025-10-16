"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export default function AboutPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants}>
            <div className="relative">
              <motion.div
                className="w-80 h-80 mx-auto relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-lg opacity-30"></div>
                <Image
                  src="/placeholder.svg?height=320&width=320"
                  alt="Profile"
                  width={320}
                  height={320}
                  className="relative z-10 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-xl"
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <motion.h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white" variants={itemVariants}>
              About Me
            </motion.h1>

            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
              variants={itemVariants}
            ></motion.div>

            <motion.p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed" variants={itemVariants}>
              I'm a passionate full-stack developer with a strong background in modern web technologies and artificial
              intelligence. With expertise in React, Node.js, and machine learning, I create innovative solutions that
              bridge the gap between cutting-edge technology and user-friendly experiences.
            </motion.p>

            <motion.p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed" variants={itemVariants}>
              My journey in tech started with a curiosity about how things work, which led me to explore everything from
              frontend frameworks to AI algorithms. I believe in continuous learning and staying updated with the latest
              industry trends.
            </motion.p>

            <motion.p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed" variants={itemVariants}>
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or
              sharing knowledge with the developer community.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">My Journey</h2>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>

            {[
              { year: "2023", title: "Senior Full Stack Developer", company: "Tech Corp" },
              { year: "2022", title: "AI/ML Engineer", company: "Innovation Labs" },
              { year: "2021", title: "Frontend Developer", company: "StartupXYZ" },
              { year: "2020", title: "Junior Developer", company: "WebSolutions" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`flex items-center mb-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + index * 0.2, duration: 0.6 }}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-blue-600 dark:text-blue-400">{item.company}</p>
                    <p className="text-gray-500 dark:text-gray-400">{item.year}</p>
                  </div>
                </div>
                <div className="w-2/12 flex justify-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900"></div>
                </div>
                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
