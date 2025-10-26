"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaLinkedin, FaDiscord, FaGithub } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

// THE FIX: The new, expanded cast list
const socials = [
  {
    name: "WhatsApp",
    url: "#", // Replace with your link
    icon: <FaWhatsapp size={32} />,
  },
  {
    name: "Email",
    url: "mailto:youremail@gmail.com", // Replace with your email
    icon: <CiMail size={32} />,
  },
  {
    name: "GitHub",
    url: "#", // Replace with your GitHub profile
    icon: <FaGithub size={32} />,
  },
  {
    name: "LinkedIn",
    url: "#", // Replace with your LinkedIn profile
    icon: <FaLinkedin size={32} />,
  },
  {
    name: "Discord",
    url: "#", // Replace with your Discord link
    icon: <FaDiscord size={32} />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Slightly adjusted stagger for 5 items
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SocialsSection = () => {
  return (
    <section id="socials" className="grid min-h-screen w-full place-content-center bg-background px-4">
      <motion.div
        className="mx-auto flex max-w-4xl flex-col items-center text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.5 }} // No 'once: true' for re-animation
        variants={containerVariants}
      >
        <motion.h2
          className="mb-4 font-display text-5xl font-bold md:text-7xl"
          variants={itemVariants}
        >
          My Socials
        </motion.h2>
        <motion.p
          className="mb-12 text-foreground/60"
          variants={itemVariants}
        >
          Have a word, leave with an idea.
        </motion.p>

        {/* THE FIX: A flexible, centered grid for the new cast */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6"
          variants={containerVariants}
        >
          {socials.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex aspect-square w-32 flex-col items-center justify-center gap-2 rounded-lg border border-foreground bg-background p-4"
              style={{ boxShadow: '6px 6px 0px 0px rgba(245,245,245,1)' }}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: '8px 8px 0px 0px #CEFF1A',
                y: -4,
                x: -4,
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {social.icon}
              <span className="font-sans font-semibold">{social.name}</span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SocialsSection;