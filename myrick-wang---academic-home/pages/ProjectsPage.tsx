import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { createSlug, getPreview } from '../utils/helpers';

interface ProjectItem {
  title: string;
  slug: string;
  metadata: string;
  preview: string;
}

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [intro, setIntro] = useState<string>("");
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Projects - Myrick Wang";
    fetch('data/projects.md')
      .then(response => response.text())
      .then(text => {
        const cleanText = text.replace(/^#\s+.+\n/, '');
        const parts = cleanText.split(/^##\s+(.+)$/gm);
        
        const introText = parts[0].replace(/---/g, '').trim(); 
        
        const parsedItems: ProjectItem[] = [];
        for (let i = 1; i < parts.length; i += 2) {
          const title = parts[i].trim();
          const rawContent = parts[i + 1].trim();
          
          const lines = rawContent.split('\n').filter(l => l.trim() !== '');
          let metadata = '';
          let body = rawContent;

          if (lines.length > 0) {
             metadata = lines[0].replace(/[*_]/g, ''); 
             body = lines.slice(1).join('\n');
          }

          parsedItems.push({
            title: title,
            slug: createSlug(title),
            metadata: metadata,
            preview: getPreview(body)
          });
        }

        setIntro(introText);
        setItems(parsedItems);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching projects markdown:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans transition-colors duration-300">
        <Header />
        <div className="pt-32 text-center text-[10px] font-sans text-neutral-400 dark:text-neutral-600 uppercase tracking-widest font-medium">
            Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-neutral-100 dark:selection:text-neutral-900 transition-colors duration-300">
      <Header />
      
      <main className="max-w-[800px] mx-auto px-6 md:px-12 pt-28 pb-32">
        
        <div className="mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-8 transition-colors">
            <h1 className="text-3xl md:text-4xl font-medium text-neutral-900 dark:text-neutral-100 tracking-tight mb-4">
                Selected Works
            </h1>
            {intro && (
                <div className="[&_p]:text-base [&_p]:md:text-lg [&_p]:text-neutral-500 [&_p]:dark:text-neutral-400 [&_p]:leading-relaxed [&_p]:max-w-2xl [&_p]:mb-0">
                    <MarkdownRenderer content={intro} />
                </div>
            )}
        </div>

        <div className="flex flex-col">
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <Link
                        to={`/projects/${item.slug}`}
                        className="group block -mx-6 px-6 py-8 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors duration-300"
                    >
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <h2 className="text-xl md:text-2xl font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                                    {item.title}
                                </h2>
                                <ArrowUpRight size={20} className="text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                            </div>
                            
                            {item.metadata && (
                                <div className="text-[11px] font-mono uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                                    {item.metadata}
                                </div>
                            )}

                            <p className="text-base text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-prose mt-1 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                                {item.preview}
                            </p>
                        </div>
                    </Link>
                    {index < items.length - 1 && (
                        <div className="border-t border-neutral-100 dark:border-neutral-800 mx-1" />
                    )}
                </React.Fragment>
            ))}
            
            {items.length === 0 && (
                 <div className="text-neutral-400 dark:text-neutral-600 text-sm py-8">No projects found.</div>
            )}
        </div>

      </main>
    </div>
  );
};

export default ProjectsPage;