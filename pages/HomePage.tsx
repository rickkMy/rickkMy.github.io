import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO, PROJECTS, SOCIAL_LINKS, ICON_MAP, RESEARCH_INTERESTS, CAREER_OBJECTIVES, TECHNICAL_SKILLS, NEWS } from '../constants';
import NetworkVis from '../components/NetworkVis';
import CircuitVis from '../components/CircuitVis';
import { ArrowUpRight, User, Clock } from 'lucide-react';
import Header from '../components/Header';
import { BuildingIcon, MapPinIcon } from '../components/Icons';

// Use GitHub profile picture
const AVATAR_URL = "https://github.com/rickkwang.png";

// Animation wrapper
const FadeInSection: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setIsVisible(true);
      });
    }, { threshold: 0.1 });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <h2 className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-500 sticky top-24 font-sans bg-white/90 dark:bg-neutral-950/90 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none py-2 md:py-0 w-full z-10 md:z-0 transition-colors">
        {title}
    </h2>
);

const HomePage: React.FC = () => {
  const [times, setTimes] = useState({ uk: '', cn: '' });

  useEffect(() => {
    document.title = `${PERSONAL_INFO.name} - Academic Home`;

    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
      };
      
      setTimes({
        uk: now.toLocaleTimeString('en-GB', { ...options, timeZone: 'Europe/London' }),
        cn: now.toLocaleTimeString('en-GB', { ...options, timeZone: 'Asia/Shanghai' })
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 10000); 
    return () => clearInterval(interval);
  }, []);

  // Shared Social Icons Component
  const SocialIcons = ({ className = "" }) => (
    <div className={`flex flex-wrap gap-3.5 items-center ${className}`}>
        {SOCIAL_LINKS.map((link) => {
        const Icon = ICON_MAP[link.icon || 'Mail'];
        return (
            <a 
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
            title={link.platform}
            aria-label={link.platform}
            >
                <Icon size={18} strokeWidth={1.5} className="transition-transform group-hover:scale-110"/>
            </a>
        );
        })}
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-neutral-100 dark:selection:text-neutral-900 font-sans transition-colors duration-300">
      <Header />

      <main className="max-w-screen-xl mx-auto px-6 md:px-12">
        
        {/* HERO SECTION */}
        <section className="pt-28 pb-12 md:pt-36 md:pb-16 border-b border-neutral-100 dark:border-neutral-800 transition-colors">
          <FadeInSection>
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-x-10 gap-y-10 items-start">
              
              {/* Left Column: Sidebar (Avatar + Metadata) */}
              <div className="md:col-span-1">
                 
                 {/* --- MOBILE LAYOUT (Compact Row) --- */}
                 <div className="flex md:hidden flex-row gap-5 items-center mb-2">
                     {/* Avatar */}
                     <div className="w-32 aspect-square bg-neutral-50 dark:bg-neutral-900 rounded-sm overflow-hidden shrink-0 transition-colors ring-1 ring-neutral-100 dark:ring-neutral-800">
                         <img 
                            src={AVATAR_URL}
                            alt="Myrick Wang" 
                            className="w-full h-full object-cover dark:opacity-90"
                         />
                     </div>
                     {/* Compact Info */}
                     <div className="flex flex-col gap-1.5 min-w-0">
                        <div className="font-medium text-neutral-900 dark:text-neutral-50 text-lg leading-tight">{PERSONAL_INFO.name}</div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400 leading-tight truncate">{PERSONAL_INFO.institution}</div>
                        <SocialIcons className="mt-1" />
                     </div>
                 </div>
                 
                 {/* Mobile Metadata (Secondary Line) */}
                 <div className="flex md:hidden items-center gap-3 text-[11px] text-neutral-400 dark:text-neutral-500 mt-4 border-t border-dashed border-neutral-200 dark:border-neutral-800 pt-3 flex-wrap transition-colors">
                    <span className="flex items-center gap-1.5 shrink-0">
                        <MapPinIcon size={12} /> {PERSONAL_INFO.location.split('/')[0].trim()}
                    </span>
                    <span className="text-neutral-300 dark:text-neutral-700 hidden sm:inline">•</span>
                    <span className="flex items-center gap-1.5 font-mono shrink-0">
                        LDN {times.uk} <span className="text-neutral-300 dark:text-neutral-700">/</span> BJS {times.cn}
                    </span>
                 </div>


                 {/* --- DESKTOP LAYOUT (Stacked) --- */}
                 <div className="hidden md:flex flex-col gap-6">
                     <div className="w-48 aspect-square relative group transition-colors">
                         <img 
                            src={AVATAR_URL}
                            alt="Myrick Wang" 
                            className="w-full h-full object-cover rounded-sm transition-all duration-500 dark:opacity-90 drop-shadow-sm"
                         />
                     </div>

                     <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2.5">
                            <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                                <User size={14} strokeWidth={1.5} className="text-neutral-400 dark:text-neutral-600 shrink-0" />
                                <span className="leading-snug">{PERSONAL_INFO.name}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                                <BuildingIcon size={14} className="text-neutral-400 dark:text-neutral-600 shrink-0" />
                                <span className="leading-snug">{PERSONAL_INFO.institution}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                                <MapPinIcon size={14} className="text-neutral-400 dark:text-neutral-600 shrink-0" />
                                <span className="leading-snug">{PERSONAL_INFO.location}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                                <Clock size={14} strokeWidth={1.5} className="text-neutral-400 dark:text-neutral-600 shrink-0" />
                                <span className="leading-snug">
                                    <span className="text-neutral-400 dark:text-neutral-500">LDN</span> {times.uk} <span className="text-neutral-300 dark:text-neutral-700 mx-1">/</span> <span className="text-neutral-400 dark:text-neutral-500">BJS</span> {times.cn}
                                </span>
                            </div>
                        </div>
                        <SocialIcons />
                     </div>
                 </div>
              </div>

              {/* Right Column: Main Info + News */}
              <div className="md:col-span-4 flex flex-col gap-10">
                {/* Intro */}
                <div className="flex flex-col gap-5">
                    <h1 className="text-2xl md:text-3xl font-medium text-neutral-900 dark:text-neutral-50 leading-tight">
                      Electrical & Electronic Engineering <span className="text-neutral-300 dark:text-neutral-700 px-1.5 font-light">/</span> University of Bristol
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-4xl">
                       Specializing in semiconductor physics, analog & digital circuit design, communication systems, signal processing, and power conversion technologies.
                    </p>
                </div>

                {/* Latest News */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-mono uppercase tracking-wide text-neutral-400 dark:text-neutral-500 mb-2">Latest News</h3>
                    <div className="space-y-3">
                        {NEWS.map((item, index) => (
                            <div key={index} className="flex flex-col md:flex-row gap-1 md:gap-6 text-base items-start md:items-baseline group">
                                <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs shrink-0 w-20">{item.date}</span>
                                {item.link ? (
                                    <a 
                                        href={item.link} 
                                        className="text-neutral-600 dark:text-neutral-400 leading-relaxed border-b border-transparent group-hover:border-neutral-300 dark:group-hover:border-neutral-600 transition-colors"
                                    >
                                        {item.content}
                                    </a>
                                ) : (
                                    <span className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.content}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
              </div>

            </div>
          </FadeInSection>
        </section>

        {/* FOCUS AREAS SECTION */}
        <section className="py-12 md:py-16 border-b border-neutral-100 dark:border-neutral-800 transition-colors">
          <FadeInSection>
             <div className="grid grid-cols-1 md:grid-cols-5 gap-x-10 gap-y-6">
                <div className="md:col-span-1">
                    <SectionHeader title="Focus Areas" />
                </div>
                <div className="md:col-span-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                        {RESEARCH_INTERESTS.map((interest, index) => (
                            <div key={index} className="flex items-baseline gap-4 group cursor-default py-0.5">
                                <span className="text-[10px] font-mono text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-900 dark:group-hover:text-neutral-50 transition-colors">
                                    {(index + 1).toString().padStart(2, '0')}
                                </span>
                                <span className="text-[15px] text-neutral-700 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors">
                                    {interest}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
             </div>
          </FadeInSection>
        </section>

        {/* SKILLS SECTION */}
        <section className="py-12 md:py-16 border-b border-neutral-100 dark:border-neutral-800 transition-colors">
          <FadeInSection>
             <div className="grid grid-cols-1 md:grid-cols-5 gap-x-10 gap-y-6">
                <div className="md:col-span-1">
                    <SectionHeader title="Proficiency" />
                </div>
                <div className="md:col-span-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        {TECHNICAL_SKILLS.map((group, index) => (
                            <div key={index} className="flex flex-col gap-4">
                                <h3 className="text-[10px] font-mono uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
                                    {group.category}
                                </h3>
                                <div className="flex flex-col gap-4">
                                    {group.items.map((skill, i) => (
                                        <div key={i} className="flex flex-col gap-0.5">
                                            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                                                {skill.name}
                                            </span>
                                            <span className="text-[13px] text-neutral-500 dark:text-neutral-400 leading-normal max-w-[85%] block">
                                                {skill.details}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
             </div>
          </FadeInSection>
        </section>

        {/* PROJECTS SECTION */}
        <section className="py-12 md:py-16 border-b border-neutral-100 dark:border-neutral-800 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-x-10 gap-y-10">
            <div className="md:col-span-1">
                <FadeInSection>
                    <SectionHeader title="Selected Works" />
                </FadeInSection>
            </div>
            
            <div className="md:col-span-4 space-y-12">
              {PROJECTS.map((project, index) => (
                <FadeInSection key={project.id} delay={index * 100}>
                    <div className="group grid grid-cols-1 md:grid-cols-9 gap-x-6 gap-y-6 items-start">
                        
                        <div className="flex flex-col md:col-span-6">
                            <div className="flex items-baseline gap-3 mb-3">
                                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                                    {project.title}
                                </h3>
                                <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-600 uppercase tracking-widest translate-y-[-1px]">
                                    {project.year}
                                </span>
                            </div>
                            
                            <p className="text-sm leading-6 text-neutral-500 dark:text-neutral-400 mb-5 max-w-[90%]">
                                {project.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-5">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-neutral-500 dark:text-neutral-400 text-[10px] font-mono uppercase tracking-wide border border-neutral-200 dark:border-neutral-800 px-2 py-1 rounded-sm transition-colors hover:text-neutral-900 dark:hover:text-neutral-200 hover:border-neutral-400 dark:hover:border-neutral-600 bg-transparent select-none cursor-default">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {project.link && (
                                <a href={project.link} className="inline-flex items-center text-xs font-medium text-neutral-900 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400 w-max transition-colors mt-auto">
                                    View Documentation <ArrowUpRight className="ml-1 w-3 h-3" />
                                </a>
                            )}
                        </div>

                        <div className="w-full md:col-span-3">
                            <div className="aspect-[4/3] relative grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100">
                                {project.id === 'network-sim' ? (
                                    <NetworkVis />
                                ) : project.id === 'lamp-post' ? (
                                    <CircuitVis />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center border border-neutral-100 dark:border-neutral-800 rounded-sm">
                                        <div className="text-xs font-sans text-neutral-300 dark:text-neutral-700">NO PREVIEW</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* OBJECTIVES SECTION */}
        <section className="pt-12 md:pt-16 pb-8 md:pb-10">
          <FadeInSection>
             <div className="grid grid-cols-1 md:grid-cols-5 gap-x-10 gap-y-6">
                <div className="md:col-span-1">
                    <SectionHeader title="Objectives" />
                </div>
                <div className="md:col-span-4">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                      {CAREER_OBJECTIVES.map((obj, i) => (
                          <div key={i} className="flex flex-col border-l border-neutral-200 dark:border-neutral-800 pl-5 py-0.5 group">
                              <h3 className="text-[15px] font-medium text-neutral-900 dark:text-neutral-200 leading-snug mb-2 group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition-colors">
                                  {obj.title}
                              </h3>
                              <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                                  {obj.subtitle}
                              </span>
                          </div>
                      ))}
                   </div>
                </div>
             </div>
          </FadeInSection>
        </section>

        <footer className="py-6 border-t border-neutral-100 dark:border-neutral-800 transition-colors">
           <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-1 text-[10px] text-neutral-400 dark:text-neutral-500 font-mono uppercase tracking-wide">
                 M. Wang © {new Date().getFullYear()}
              </div>
              <div className="md:col-span-4 text-[10px] text-neutral-300 dark:text-neutral-600 font-mono uppercase tracking-wide text-right">
                 University of Bristol
              </div>
           </div>
        </footer>

      </main>
    </div>
  );
};

export default HomePage;