import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { ArrowLeft } from 'lucide-react';
import { createSlug } from '../utils/helpers';

interface ZenItem {
  title: string;
  slug: string;
  content: string;
}

const ZenDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<ZenItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('data/zen.md')
      .then(response => response.text())
      .then(text => {
        const cleanText = text.replace(/^#\s+.+\n/, '');
        const parts = cleanText.split(/^##\s+(.+)$/gm);
        
        for (let i = 1; i < parts.length; i += 2) {
          const title = parts[i].trim();
          const itemSlug = createSlug(title);
          
          if (itemSlug === slug) {
            const rawContent = parts[i + 1].trim();
            setItem({
              title: title,
              slug: itemSlug,
              content: rawContent,
            });
            break;
          }
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching zen details:', error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
     return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans transition-colors duration-300">
        <Header />
        <div className="pt-32 text-center text-[10px] font-sans text-neutral-400 dark:text-neutral-600 uppercase tracking-widest font-medium">Loading...</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans transition-colors duration-300">
        <Header />
        <div className="pt-32 max-w-[720px] mx-auto px-6 text-center">
            <div className="mb-8 text-neutral-500 dark:text-neutral-400">Post not found.</div>
            <button onClick={() => navigate('/zen')} className="text-sm underline text-neutral-900 dark:text-neutral-200">Back to Zen Land</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-neutral-100 dark:selection:text-neutral-900 transition-colors duration-300">
      <Header />
      <main className="max-w-[720px] mx-auto px-6 md:px-12 pt-28 pb-32">
        <div className="mb-12 border-b border-neutral-100 dark:border-neutral-800 pb-4 sticky top-20 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-sm z-10 flex justify-between items-baseline transition-colors">
             <h1 className="text-[11px] font-sans text-neutral-400 dark:text-neutral-500 uppercase tracking-widest font-medium truncate pr-4 max-w-[70%]">
                {item.title}
             </h1>
             <button 
                onClick={() => navigate('/zen')}
                className="text-[11px] font-sans text-neutral-400 dark:text-neutral-500 uppercase tracking-widest hover:text-neutral-900 dark:hover:text-neutral-200 flex items-center gap-2 transition-colors font-medium shrink-0"
            >
                <ArrowLeft size={12} />
                Back
            </button>
        </div>
        
        <div className="animate-in fade-in duration-500 slide-in-from-bottom-4">
            <h1 className="text-3xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 mb-8">{item.title}</h1>
            <MarkdownRenderer content={item.content} />
        </div>
      </main>
    </div>
  );
};

export default ZenDetailPage;