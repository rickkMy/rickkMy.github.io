import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { Download } from 'lucide-react';
import { CV_PDF_URL } from '../constants';

const CVPage: React.FC = () => {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Curriculum Vitae - Myrick Wang";
    fetch('data/cv.md')
      .then(response => response.text())
      .then(text => setContent(text))
      .catch(error => console.error('Error fetching CV markdown:', error));
  }, []);

  if (!content) {
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
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-neutral-100 dark:selection:text-neutral-900 print:bg-white print:text-black transition-colors duration-300">
      <Header />
      
      <main className="max-w-[720px] mx-auto px-6 md:px-12 pt-28 pb-24 print:pt-0 print:px-0 print:max-w-none">
        
        {/* Toolbar - Hidden when printing */}
        <div className="flex justify-between items-baseline mb-12 border-b border-neutral-100 dark:border-neutral-800 pb-4 print:hidden transition-colors">
            <span className="text-[11px] font-sans text-neutral-400 dark:text-neutral-500 uppercase tracking-widest font-medium">Curriculum Vitae</span>
            <div className="flex gap-6">
                <a 
                    href={CV_PDF_URL}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[11px] font-sans text-neutral-400 dark:text-neutral-500 uppercase tracking-widest hover:text-neutral-900 dark:hover:text-neutral-200 flex items-center gap-2 transition-colors font-medium"
                    title="Open formal PDF CV"
                >
                    <Download size={12} />
                    Download PDF
                </a>
            </div>
        </div>

        {/* Content Area */}
        <MarkdownRenderer content={content} />
        
        <div className="mt-20 pt-8 border-t border-neutral-100 dark:border-neutral-800 text-center print:hidden transition-colors">
            <p className="text-[10px] text-neutral-400 dark:text-neutral-600 font-sans font-medium">Last updated: {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric'})}</p>
        </div>
      </main>

      <style>{`
        @media print {
            header, footer, button, a[href*="pdf"] { display: none !important; }
            body { background: white !important; color: black !important; }
            main { margin-top: 0; padding-top: 2rem; max-width: 100%; }
            /* Force light mode variables for print if using CSS variables, but here we override classes */
            .dark { color: black !important; background: white !important; }
        }
      `}</style>
    </div>
  );
};

export default CVPage;