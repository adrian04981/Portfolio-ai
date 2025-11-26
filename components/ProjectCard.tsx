/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <motion.div
      className="group relative h-[450px] md:h-[550px] w-full overflow-hidden border border-white/10 bg-[#0f172a] cursor-pointer"
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      animate="rest"
      onClick={onClick}
    >
      {/* Image Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img 
          src={project.image} 
          alt={project.title} 
          className="h-full w-full object-cover opacity-60 grayscale transition-all duration-700 ease-out"
          variants={{
            rest: { scale: 1, filter: 'grayscale(100%) blur(0px)' },
            hover: { scale: 1.1, filter: 'grayscale(0%) blur(2px)', opacity: 0.4 }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f172a]/50 to-[#0f172a]" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
        
        {/* Top Bar */}
        <div className="flex justify-between items-start z-10">
           <span className="text-xs font-mono border border-blue-400/30 text-blue-300 px-3 py-1 rounded-full backdrop-blur-md bg-blue-900/20">
             {project.year}
           </span>
           <motion.div
             variants={{
               rest: { opacity: 0, x: 20 },
               hover: { opacity: 1, x: 0 }
             }}
             className="flex gap-2"
           >
              {project.repo && <div className="p-2 bg-white/10 rounded-full hover:bg-white/20"><Github className="w-5 h-5 text-white" /></div>}
              {project.link && <div className="p-2 bg-white rounded-full"><ArrowUpRight className="w-5 h-5 text-black" /></div>}
           </motion.div>
        </div>

        {/* Center - Tech Stack Reveal */}
        <div className="absolute top-1/2 left-0 w-full px-6 md:px-10 -translate-y-1/2 overflow-hidden pointer-events-none">
             <motion.div
                variants={{
                    rest: { y: 100, opacity: 0 },
                    hover: { y: 0, opacity: 1 }
                }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap gap-2 justify-center"
             >
                {project.tech.map(t => (
                    <span key={t} className="text-xs font-bold uppercase tracking-widest text-white/80 bg-black/50 px-3 py-1 border border-white/10">
                        {t}
                    </span>
                ))}
             </motion.div>
        </div>

        {/* Bottom Info */}
        <div className="z-10">
          <motion.p 
            className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400 mb-2"
            variants={{
              rest: { y: 0 },
              hover: { y: -5 }
            }}
          >
            {project.category}
          </motion.p>
          
          <motion.h3 
            className="font-heading text-4xl md:text-5xl font-bold uppercase text-white mb-4"
            variants={{
              rest: { x: 0 },
              hover: { x: 10 }
            }}
          >
            {project.title}
          </motion.h3>

          <motion.div
            variants={{
                rest: { height: 0, opacity: 0 },
                hover: { height: 'auto', opacity: 1 }
            }}
            className="overflow-hidden"
          >
              <p className="text-gray-300 font-light leading-relaxed text-sm md:text-base max-w-md">
                  {project.description}
              </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;