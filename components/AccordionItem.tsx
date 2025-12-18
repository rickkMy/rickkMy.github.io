import React from 'react';
import { Plus } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, isOpen, onToggle, children }) => {
  return (
    <div className="border-b border-neutral-100">
      <button 
        onClick={onToggle}
        className="w-full py-5 flex justify-between items-start text-left group select-none"
      >
        <span className={`text-lg md:text-xl font-medium transition-colors duration-200 pr-8 leading-snug ${isOpen ? 'text-neutral-900' : 'text-neutral-900 hover:text-neutral-600'}`}>
          {title}
        </span>
        <span className={`text-neutral-400 transform transition-transform duration-300 shrink-0 mt-1 ${isOpen ? 'rotate-45 text-neutral-900' : 'rotate-0'}`}>
          <Plus size={20} strokeWidth={1.5} />
        </span>
      </button>
      
      <div 
        className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="pb-8 pt-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;