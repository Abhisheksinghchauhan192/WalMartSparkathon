import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const headingText = "Welcome to Walmart Sparkathon Prototype";

const letterAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05 },
  }),
};

const Intro = ({ onContinue }) => {
  const [startBlur, setStartBlur] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [askName, setAskName] = useState(false);
  const [name, setName] = useState("");
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const blurTimer = setTimeout(() => setStartBlur(true), 2000);
    const promptTimer = setTimeout(() => setShowPrompt(true), 4000);

    const handleContinue = () => {
      setShowPrompt(false);
      setAskName(true);
    };

    window.addEventListener("keydown", handleContinue);
    window.addEventListener("click", handleContinue);

    return () => {
      clearTimeout(blurTimer);
      clearTimeout(promptTimer);
      window.removeEventListener("keydown", handleContinue);
      window.removeEventListener("click", handleContinue);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setExiting(true); // Start exit animation
      setTimeout(() => onContinue(name), 1200); // Delay to allow animation
    }
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="relative w-screen h-screen overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Background Video */}
          <video
            autoPlay
            muted
            loop
            className={`absolute w-full h-full object-cover transition-[filter] duration-[2000ms] ease-in-out ${
              startBlur ? "blur-md md:blur-lg" : "blur-none"
            }`}
          >
            <source src="intro.mp4" type="video/mp4" />
          </video>

          {/* Heading */}
          {startBlur && (
            <>
              <motion.div
                className="absolute top-10 w-full flex justify-center z-10 px-4"
                initial="hidden"
                animate="visible"
              >
                <motion.h1 className="text-white text-2xl md:text-4xl font-bold flex flex-wrap justify-center text-center drop-shadow-lg">
                  {headingText.split("").map((char, i) => (
                    <motion.span key={i} custom={i} variants={letterAnimation}>
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.h1>
              </motion.div>

              {/* Created by */}
              <motion.div
                className="absolute top-24 w-full flex justify-center z-10 px-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: headingText.length * 0.05 + 0.5, duration: 0.8 }}
              >
                <p className="text-white text-sm md:text-base text-center italic drop-shadow-md">
                  Created by Abhisheak Chauhan and Anshul Verma
                </p>
              </motion.div>
            </>
          )}

          {/* Prompt */}
          {showPrompt && (
            <motion.div
              className="absolute bottom-16 w-full text-center z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <p className="text-white text-lg md:text-xl animate-pulse drop-shadow-md">
                Press any key or click to continue
              </p>
            </motion.div>
          )}

          {/* Name Input */}
          {askName && (
            <motion.form
              onSubmit={handleSubmit}
              className="absolute inset-0 flex items-center justify-center z-20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                className="bg-black/70 backdrop-blur-md p-8 rounded-2xl shadow-xl text-center border border-white/10"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  {/* Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white animate-bounce"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A4.992 4.992 0 0112 14c1.657 0 3.156.804 4.121 2.093M15 11a3 3 0 10-6 0 3 3 0 006 0z"
                    />
                  </svg>
                  <label className="text-white text-xl md:text-2xl font-medium">
                    Enter your name to begin:
                  </label>
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={exiting}
                  className="px-4 py-2 rounded-lg text-black w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Your name"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={exiting}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
                >
                  Continue
                </button>
              </motion.div>
            </motion.form>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Intro;
