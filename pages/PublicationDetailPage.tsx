import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { ArrowLeft, Download } from 'lucide-react';
import { createSlug } from '../utils/helpers';

interface PubItem {
  title: string;
  slug: string;
  content: string;
  category: string;
  pdf?: string;
}

const PublicationDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<PubItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('data/publications.md')
      .then(response => response.text())
      .then(text => {
        const cleanText = text.replace(/^#\s+.+\n/, '');
        const sectionParts = cleanText.split(/^##\s+(.+)$/gm);
        
        for (let i = 1; i < sectionParts.length; i += 2) {
          const sectionTitle = sectionParts[i].trim();
          const sectionBody = sectionParts[i+1];
          const itemParts = sectionBody.split(/^###\s+(.+)$/gm);
          
          for (let j = 1; j < itemParts.length; j += 2) {
            const title = itemParts[j].trim();
            const currentSlug = createSlug(title);
            
            if (currentSlug === slug) {
                const rawContent = itemParts[j+1].trim();
                const lines = rawContent.split('\n');
                
                let pdfUrl: string | undefined = undefined;
                const contentLines = lines.filter(line => {
                    if (line.trim().startsWith('PDF:')) {
                        pdfUrl = line.replace('PDF:', '').trim();
                        return false;
                    }
                    return true;
                });

                setItem({
                    title: title,
                    slug: currentSlug,
                    content: contentLines.join('\n'),
                    category: sectionTitle,
                    pdf: pdfUrl
                });
                setLoading(false);
                return;
            }
          }
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching publication details:', error);
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
            <div className="mb-8 text-neutral-500 dark:text-neutral-400">Publication not found.</div>
            <button onClick={() => navigate('/publications')} className="text-sm underline text-neutral-900 dark:text-neutral-200">Back to Publications</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-neutral-100 dark:selection:text-neutral-900 transition-colors duration-300">
      <Header />
      <main className="max-w-[720px] mx-auto px-6 md:px-12 pt-28 pb-32">
        <div className="mb-12 border-b border-neutral-100 dark:border-neutral-800 pb-4 sticky top-20 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-sm z-10 flex justify-between items-baseline transition-colors">
             <div className="flex flex-col">
                 <h1 className="text-[11px] font-sans text-neutral-400 dark:text-neutral-500 uppercase tracking-widest font-medium truncate pr-4 max-w-[200px] md:max-w-none">
                    {item.category}
                 </h1>
             </div>
             <button 
                onClick={() => navigate('/publications')}
                className="text-[11px] font-sans text-neutral-400 dark:text-neutral-500 uppercase tracking-widest hover:text-neutral-900 dark:hover:text-neutral-200 flex items-center gap-2 transition-colors font-medium shrink-0"
            >
                <ArrowLeft size={12} />
                Back
            </button>
        </div>
        
        <div className="animate-in fade-in duration-500 slide-in-from-bottom-4">
             <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 mb-8 leading-tight">
                {item.title}
            </h1>
            <MarkdownRenderer content={item.content} />

            {item.pdf && (
                <div className="mt-16 pt-8 border-t border-neutral-100 dark:border-neutral-800 transition-colors">
                    <div className="flex justify-between items-baseline mb-6">
                        <h3 className="text-[11px] font-sans text-neutral-400 dark:text-neutral-500 uppercase tracking-widest font-medium">Original Document</h3>
                        <a 
                            href={item.pdf} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[11px] font-sans text-neutral-400 dark:text-neutral-500 uppercase tracking-widest hover:text-neutral-900 dark:hover:text-neutral-200 flex items-center gap-2 transition-colors font-medium"
                        >
                            <Download size={12} />
                            Download
                        </a>
                    </div>
                    <div className="w-full h-[800px] bg-neutral-50 dark:bg-neutral-900 rounded-sm border border-neutral-100 dark:border-neutral-800 overflow-hidden transition-colors">
                        <object data={item.pdf} type="application/pdf" className="w-full h-full">
                            <div className="flex flex-col items-center justify-center h-full text-neutral-500 dark:text-neutral-400 gap-4">
                                <p>Unable to display PDF directly.</p>
                                <a href={item.pdf} target="_blank" rel="noopener noreferrer" className="text-neutral-900 dark:text-neutral-200 underline">Download File</a>
                            </div>
                        </object>
                    </div>
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default PublicationDetailPage;