"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projects, Project } from "@/lib/projects";
import { updateHash } from '@/lib/url-updater';
// A new, self-contained, and intelligent component for each project title.
const ProjectTitle = ({ project, setActiveProject }: { project: Project; setActiveProject: (p: Project) => void; }) => {
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger when 50% of the element is in the viewport
    triggerOnce: false, // Re-trigger every time
  });

React.useEffect(() => {
    if (inView) {
      setActiveProject(project);
      // Update hash to the specific project title
      updateHash(`projects-${project.title.toLowerCase()}`);
    }
  }, [inView, project, setActiveProject]);

  return (
    // Each title has its own space, creating the necessary padding.
    <div ref={ref} className="h-screen flex items-center">
      <motion.div
        animate={{ opacity: inView ? 1 : 0.4 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="font-display text-5xl font-bold">{project.title}</h2>
        <p className="text-foreground/70 mt-4">{project.description}</p>
      </motion.div>
    </div>
  );
};

const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);

  return (
    <section className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-16">
      
      {/* Left Column: The scrolling list of titles */}
      <div className="lg:col-span-1">
        {/* The "hold" frame is now just padding at the end of the list */}
        <div className="pt-[calc(50vh_-_10rem)]" />
        {projects.map((project) => (
          <ProjectTitle key={project.id} project={project} setActiveProject={setActiveProject} />
        ))}
        <div className="pb-[calc(50vh_-_10rem)]" />
      </div>

      {/* Right Column: The STICKY Video Showcase */}
      <div className="hidden md:block lg:col-span-2 sticky top-0 h-screen">
        <div className="flex h-full w-full items-center justify-center p-8">
          <div 
            className="relative h-[60vh] w-full rounded-2xl overflow-hidden"
            style={{ backgroundColor: 'rgb(39 39 42)' }}
          >
            <AnimatePresence mode="wait">
              {activeProject.videoUrl ? (
                <motion.video
                  key={activeProject.videoUrl}
                  src={activeProject.videoUrl}
                  autoPlay loop muted playsInline
                  className="absolute h-full w-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.4 } }}
                  exit={{ opacity: 0, transition: { duration: 0.4 } }}
                />
              ) : (
                <motion.div
                  key={`${activeProject.id}-placeholder`}
                  className="absolute h-full w-full"
                  style={{ backgroundColor: activeProject.bgColor }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>
            <div className="absolute bottom-8 right-8 z-10">
              <a href={activeProject.siteUrl} target="_blank" rel="noopener noreferrer" className="bg-foreground text-background px-6 py-3 rounded-full font-bold hover:bg-accent hover:text-background transition-colors duration-300">
                Go To Site
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;