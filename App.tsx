
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Github, Linkedin, Mail, Code2, Cpu, Globe, Terminal, Database, BarChart3, Layers, Briefcase, Phone, GraduationCap } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ProjectCard from './components/ProjectCard';
import AIChat from './components/AIChat';
import { Project } from './types';

// Portfolio Data
const PROJECTS: Project[] = [
  { 
    id: '1', 
    title: 'Grupoflk.lat', 
    category: 'Sistema Web Móvil / Tesis', 
    year: '2024', 
    image: 'https://grupoflk.com/wp-content/uploads/2024/10/cropped-Logo-de-Grupo-Flk.png', 
    description: 'Sistema Web Móvil diseñado para gestionar eficientemente la acreditación de maquinaria y operadores. Optimiza flujos de trabajo en el sector industrial.',
    tech: ['Vue.js', 'Vite', 'Supabase', 'Mobile First'],
    link: 'https://grupoflk.lat',
    repo: '#'
  },
  { 
    id: '2', 
    title: 'Drone Data Analytics', 
    category: 'Análisis de Datos', 
    year: '2023', 
    image: 'https://images.unsplash.com/photo-1506947411487-a56738267384?q=80&w=2664&auto=format&fit=crop', // Drone/Analysis
    description: 'Procesamiento y análisis de imágenes obtenidas por drones para reportes técnicos estratégicos y toma de decisiones.',
    tech: ['Python', 'Power BI', 'ArcGIS', 'Data Proc'],
    link: '#',
    repo: '#'
  },
  { 
    id: '3', 
    title: 'Certificaciones ISO', 
    category: 'Gestión de Calidad', 
    year: '2023', 
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop', // Business/Docs
    description: 'Gestión documental y apoyo administrativo integral para la obtención exitosa de las certificaciones internacionales ISO 9001 y ISO 45001.',
    tech: ['ISO 9001', 'ISO 45001', 'Excel', 'Auditoría'],
    link: '#',
    repo: '#'
  },
  { 
    id: '4', 
    title: 'Mobile Utilities', 
    category: 'Aplicación Móvil', 
    year: '2022', 
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop', // Mobile
    description: 'Prototipos de aplicaciones móviles enfocados en la experiencia de usuario y rendimiento nativo.',
    tech: ['React Native', 'JavaScript', 'CSS', 'UX/UI'],
    link: '#',
    repo: '#'
  }
];

const SKILLS = [
    { name: 'C# / ASP.NET', level: 90 },
    { name: 'Python / Data', level: 85 },
    { name: 'Vue.js / JS', level: 88 },
    { name: 'React Native', level: 80 },
    { name: 'Power BI / Excel', level: 95 },
    { name: 'SQL / Bases de Datos', level: 85 }
];

const EXPERIENCIA = [
  {
    role: 'Analista de datos, Logística y TI',
    company: 'Empresa Privada',
    period: 'Nov 2022 - Jul 2024',
    desc: 'Gestión de grandes volúmenes de datos, logística de EPPs, análisis de imágenes de drones y administración de licencias de software.'
  },
  {
    role: 'Asistente SSOMAC',
    company: 'GRUPO FLK',
    period: 'Jul 2023 - Oct 2023',
    desc: 'Apoyo administrativo y documentación para certificaciones ISO 9001 y 45001.'
  }
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, setSelectedProject] = useState<Project | null>(null);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-blue-500 selection:text-white cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />
      <AIChat />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-6 mix-blend-difference">
        <div className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-white cursor-default z-50">ADRIAN_HINOJOSA</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-xs font-bold tracking-[0.2em] uppercase">
          {[
            { label: 'Proyectos', id: 'work' },
            { label: 'Sobre Mí', id: 'about' },
            { label: 'Contacto', id: 'contact' }
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={() => scrollToSection(item.id)}
              className="hover:text-blue-400 transition-colors text-white cursor-pointer bg-transparent border-none relative group"
              data-hover="true"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right group-hover:origin-left duration-300" />
            </button>
          ))}
        </div>
        <a 
          href="#contact"
          onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
          className="hidden md:inline-flex items-center gap-2 border border-white/20 px-6 py-2 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 text-white cursor-pointer"
          data-hover="true"
        >
          Hablemos <ArrowRight className="w-4 h-4" />
        </a>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-30 bg-[#0f172a] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {[
              { label: 'Proyectos', id: 'work' },
              { label: 'Sobre Mí', id: 'about' },
              { label: 'Contacto', id: 'contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-4xl font-heading font-bold text-white hover:text-blue-400 transition-colors uppercase bg-transparent border-none"
              >
                {item.label}
              </button>
            ))}
            
            <div className="absolute bottom-12 flex gap-8">
               <a href="#" className="text-white/50 hover:text-white"><Github /></a>
               <a href="#" className="text-white/50 hover:text-white"><Linkedin /></a>
               <a href="#" className="text-white/50 hover:text-white"><Mail /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-4 pt-20">
        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl"
        >
           {/* Role Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 text-xs md:text-sm font-mono text-blue-300 tracking-[0.3em] uppercase mb-8 bg-blue-900/20 border border-blue-500/20 px-6 py-2 rounded-full backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"/>
            <span>Bachiller en Ingeniería Informática</span>
          </motion.div>

          {/* Main Title - Updated Layout */}
          <div className="relative w-full flex flex-col items-center justify-center z-10">
            <motion.span 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-[6vw] md:text-[5vw] leading-none font-bold tracking-[0.2em] text-white/80 block mb-[-1vw] md:mb-[-1.5vw]"
            >
              ADRIAN
            </motion.span>
            <GradientText 
              text="HINOJOSA" 
              as="h1" 
              className="text-[14vw] md:text-[13vw] leading-[0.9] font-black tracking-tighter text-center" 
            />
            {/* Optimized Orb */}
            <motion.div 
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[60vw] h-[60vw] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"
               animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.2, 0.5, 0.2] }}
               transition={{ duration: 8, repeat: Infinity }}
            />
          </div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="w-full max-w-lg h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent mt-8 mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-lg md:text-xl font-light max-w-3xl mx-auto text-gray-300 leading-relaxed px-4"
          >
            Bachiller en Ingeniería Informática. Orientado a resultados, optimización de procesos y soluciones técnicas avanzadas.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-12 flex gap-4"
          >
             <button onClick={() => scrollToSection('work')} className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-blue-400 transition-colors" data-hover="true">Ver Proyectos</button>
             <button onClick={() => scrollToSection('contact')} className="px-8 py-3 border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors" data-hover="true">Contactar</button>
          </motion.div>
        </motion.div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
            <Code2 className="absolute top-[20%] left-[10%] text-white/5 w-24 h-24 rotate-12" />
            <Database className="absolute bottom-[20%] right-[10%] text-white/5 w-32 h-32 -rotate-12" />
        </div>
      </header>

      {/* WORK SECTION */}
      <section id="work" className="relative z-10 py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-4">
             <div>
                <span className="text-blue-400 font-mono text-sm tracking-widest uppercase mb-2 block">Portafolio</span>
                <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase leading-none">
                  Proyectos <br/> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Recientes</span>
                </h2>
             </div>
             <p className="md:max-w-md text-right text-gray-400 mt-6 md:mt-0">
               Una selección de desarrollos web, móviles y gestión de certificaciones aplicados a entornos corporativos reales.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / STACK SECTION */}
      <section id="about" className="relative z-10 py-24 md:py-32 bg-[#0a0f1e] border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 leading-tight">
                Perfil <br/> <GradientText text="PROFESIONAL" className="text-5xl md:text-6xl" />
              </h2>
              <div className="space-y-6 text-lg text-gray-300 font-light leading-relaxed">
                <p>
                  Soy Adrian Hinojosa, Bachiller en Ingeniería Informática. Poseo competencias avanzadas en programación, investigación y análisis de problemas técnicos.
                </p>
                <p>
                  Busco contribuir al éxito empresarial mediante la optimización de procesos y soluciones tecnológicas eficientes, creciendo profesionalmente en entornos colaborativos y desafiantes.
                </p>
              </div>
              
              {/* Experience Mini-Timeline */}
              <div className="mt-12">
                 <h4 className="font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2 text-blue-400">
                    <Briefcase className="w-4 h-4" /> Experiencia Laboral
                 </h4>
                 <div className="space-y-6 border-l border-white/10 pl-6 ml-2">
                    {EXPERIENCIA.map((exp, idx) => (
                      <div key={idx} className="relative">
                        <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-[#0a0f1e]" />
                        <h5 className="text-xl font-bold text-white">{exp.role}</h5>
                        <div className="flex items-center gap-2 text-sm text-blue-300 font-mono mb-2">
                           <span>{exp.company}</span>
                           <span>•</span>
                           <span>{exp.period}</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                          {exp.desc}
                        </p>
                      </div>
                    ))}
                 </div>
              </div>

               {/* Education Section */}
              <div className="mt-12">
                 <h4 className="font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2 text-blue-400">
                    <GraduationCap className="w-4 h-4" /> Educación
                 </h4>
                 <div className="space-y-6 border-l border-white/10 pl-6 ml-2">
                    <div className="relative">
                        <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-[#0a0f1e]" />
                        <h5 className="text-xl font-bold text-white">Ingeniería Informática</h5>
                        <div className="flex items-center gap-2 text-sm text-blue-300 font-mono mb-2">
                           <span>Universidad Ricardo Palma, Perú</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                          Bachiller.
                        </p>
                      </div>
                 </div>
              </div>

            </div>

            <div className="space-y-12">
               {/* Skills Chart */}
              <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-blue-400" /> Habilidades Técnicas
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {SKILLS.map((skill) => (
                          <div key={skill.name} className="bg-white/5 p-4 border border-white/5 rounded-lg hover:border-blue-500/30 transition-colors">
                              <div className="flex justify-between mb-2 text-sm font-bold text-gray-200">
                                  <span>{skill.name}</span>
                                  <span className="text-blue-400 font-mono">{skill.level}%</span>
                              </div>
                              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                    className="h-full bg-blue-500" 
                                  />
                              </div>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Badges Grid */}
              <div className="relative bg-[#162036] border border-white/10 rounded-2xl p-8 md:p-10">
                   <div className="grid grid-cols-2 gap-4">
                      {[
                        { icon: Globe, label: 'Web', color: 'text-cyan-400', tech: 'Vue / HTML' },
                        { icon: Layers, label: 'Systems', color: 'text-rose-400', tech: '.NET / C#' },
                        { icon: BarChart3, label: 'Data', color: 'text-amber-400', tech: 'Python / BI' },
                        { icon: Code2, label: 'Mobile', color: 'text-emerald-400', tech: 'React Native' },
                      ].map((item, i) => (
                        <div key={i} className="bg-black/20 rounded-xl flex flex-col items-center justify-center gap-3 p-6 border border-white/5 hover:bg-white/5 transition-colors group">
                           <item.icon className={`w-10 h-10 ${item.color} group-hover:scale-110 transition-transform duration-300`} />
                           <div className="text-center">
                              <div className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-1">{item.label}</div>
                              <div className="text-xs font-bold text-white">{item.tech}</div>
                           </div>
                        </div>
                      ))}
                   </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="relative z-10 py-24 md:py-32 px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-12">
             <h2 className="text-5xl md:text-9xl font-heading font-bold opacity-10 text-white select-none">
               HABLEMOS
             </h2>
             <p className="text-blue-400 font-mono uppercase tracking-widest -mt-4 md:-mt-8 relative z-10 text-lg">
               Iniciemos un Proyecto
             </p>
          </div>
          
          <h3 className="text-3xl md:text-5xl font-bold mb-12 max-w-3xl mx-auto leading-tight">
            ¿Interesado en colaborar? <br/>
            <span className="text-gray-400">Contruyamos algo extraordinario.</span>
          </h3>

          <div className="flex flex-wrap justify-center gap-6">
             <a href="tel:966401791" className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest overflow-hidden" data-hover="true">
                <span className="relative z-10 flex items-center gap-2"><Phone className="w-4 h-4" /> 966-401-791</span>
                <div className="absolute inset-0 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
             </a>
             <a href="mailto:contact@adrian.com" className="group relative px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest overflow-hidden hover:border-white" data-hover="true">
                <span className="relative z-10 flex items-center gap-2"><Mail className="w-4 h-4" /> Enviar Correo</span>
             </a>
          </div>

          <footer className="mt-24 text-white/30 text-xs font-mono tracking-widest uppercase">
            © {new Date().getFullYear()} Adrian Hinojosa. All rights reserved.
          </footer>
        </div>
      </section>
    </div>
  );
};

export default App;
