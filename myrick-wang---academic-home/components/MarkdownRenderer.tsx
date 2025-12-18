import React, { useState } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { X, ZoomIn } from 'lucide-react';

// Isolated Image Component with Lightbox logic
const MarkdownImage: React.FC<any> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <span className="block my-10 group relative cursor-zoom-in" onClick={() => setIsOpen(true)}>
          <img 
            className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-500 rounded-sm border border-neutral-100 dark:border-neutral-800 dark:opacity-90 dark:group-hover:opacity-100" 
            {...props} 
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
             <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm border border-neutral-100 dark:border-neutral-700">
                <ZoomIn size={14} className="text-neutral-600 dark:text-neutral-300" />
                <span className="text-[10px] font-medium text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">View</span>
             </div>
          </div>
          {props.title && <span className="block text-left text-[10px] text-neutral-400 dark:text-neutral-500 mt-3 font-mono uppercase tracking-wide font-medium">{props.title}</span>}
      </span>

      {/* Simple Lightbox Overlay */}
      {isOpen && (
        <div 
            className="fixed inset-0 z-[100] bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out animate-in fade-in duration-200"
            onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
            }}
        >
            <button 
                className="absolute top-6 right-6 p-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full transition-colors"
                onClick={() => setIsOpen(false)}
            >
                <X size={20} className="text-neutral-900 dark:text-neutral-100" />
            </button>
            <img 
                src={props.src} 
                alt={props.alt} 
                className="max-w-full max-h-full object-contain shadow-2xl rounded-sm" 
            />
        </div>
      )}
    </>
  );
};

const MarkdownComponents: Components = {
  h1: ({node, ...props}) => (
    <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 mb-8 mt-4 font-sans" {...props} />
  ),
  h2: ({node, ...props}) => (
    <h2 className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-500 mt-16 mb-8 font-mono border-b border-neutral-100 dark:border-neutral-800 pb-2" {...props} />
  ),
  h3: ({node, ...props}) => (
    <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-200 mt-10 mb-3 leading-snug font-sans tracking-tight" {...props} />
  ),
  h4: ({node, ...props}) => (
    <h4 className="text-[15px] font-semibold text-neutral-900 dark:text-neutral-200 mt-6 mb-2 font-sans" {...props} />
  ),
  p: ({node, ...props}) => (
    <p className="text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400 mb-5 font-sans" {...props} />
  ),
  ul: ({node, ...props}) => (
    <ul className="mb-8 space-y-1.5 pl-0 list-none" {...props} />
  ),
  ol: ({node, ...props}) => (
    <ol className="mb-8 space-y-1.5 pl-0 list-none counter-reset-item" {...props} />
  ),
  li: ({node, children, ...props}) => (
    <li className="flex items-baseline gap-3 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400 group" {...props}>
        <span className="shrink-0 text-neutral-300 dark:text-neutral-600 select-none font-sans text-sm transform translate-y-[-1px]">–</span>
        <div className="flex-1 block font-sans">
            {children}
        </div>
    </li>
  ),
  strong: ({node, ...props}) => (
    <strong className="font-medium text-neutral-900 dark:text-neutral-100" {...props} />
  ),
  em: ({node, ...props}) => (
    <em className="italic text-neutral-500 dark:text-neutral-400 font-serif" {...props} />
  ),
  a: ({node, ...props}) => (
    <a 
      className="text-neutral-900 dark:text-neutral-200 border-b border-neutral-300 dark:border-neutral-600 hover:border-neutral-900 dark:hover:border-neutral-100 transition-colors pb-px decoration-0 font-medium cursor-pointer" 
      target="_blank" 
      rel="noopener noreferrer" 
      {...props} 
    />
  ),
  blockquote: ({node, ...props}) => (
    <blockquote className="border-l-2 border-neutral-100 dark:border-neutral-800 pl-5 my-8 italic text-neutral-500 dark:text-neutral-400 text-[15px] font-sans" {...props} />
  ),
  pre: ({node, ...props}) => (
    <pre className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-lg p-4 overflow-x-auto mb-8 text-[13px] font-mono leading-relaxed text-neutral-700 dark:text-neutral-300" {...props} />
  ),
  code: ({node, className, children, ...props}: any) => {
     const isMultiLine = typeof children === 'string' && children.includes('\n');
     
     if (isMultiLine) {
        return <code className="text-neutral-800 dark:text-neutral-200" {...props}>{children}</code>;
     }

     return <code className={`bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 px-1.5 py-0.5 rounded text-[12px] font-mono tracking-wide ${className || ''}`} {...props}>{children}</code>;
  },
  hr: ({node, ...props}) => (
    <hr className="border-t border-neutral-100 dark:border-neutral-800 my-12" {...props} />
  ),
  img: ({node, ...props}) => (
    <MarkdownImage {...props} />
  ),
};

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="font-sans antialiased max-w-none transition-colors duration-300">
      <ReactMarkdown components={MarkdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;