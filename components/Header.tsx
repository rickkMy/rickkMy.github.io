import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  activeSection?: string;
}

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const menuRef = useRef<HTMLDivElement>(null);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleNav = (target: string) => {
    navigate(target);
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  const navLinks = [
    { label: 'CV', path: '/cv' },
    { label: 'Projects', path: '/projects' },
    { label: 'Publications', path: '/publications' },
    { label: 'Zen Land 🎐', path: '/zen' },
  ];

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-sm border-b border-neutral-100 dark:border-neutral-800 h-20 transition-colors duration-300"
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 h-full flex items-center justify-between relative">
        {/* Logo */}
        <div 
          onClick={() => handleNav('/')} 
          className="font-bold text-neutral-900 dark:text-neutral-50 tracking-tight cursor-pointer hover:opacity-70 transition-opacity text-lg"
        >
          Myrick Wang
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 ml-4">
          <nav className="flex gap-8 items-center">
            {navLinks.map((link) => (
              <button 
                key={link.path}
                onClick={() => handleNav(link.path)} 
                className={`font-medium uppercase tracking-[0.15em] text-[11px] transition-colors duration-200 ${
                  isActive(link.path) 
                    ? 'text-neutral-900 dark:text-neutral-50' 
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
          
          {/* Desktop Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2" ref={menuRef}>
            {/* Mobile Theme Toggle */}
            <button
                onClick={toggleTheme}
                className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors rounded-full active:bg-neutral-100 dark:active:bg-neutral-800"
                aria-label="Toggle theme"
            >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-900 dark:text-neutral-50 p-2 -mr-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-full transition-colors active:scale-95"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>

            {/* Mobile Popover Menu */}
            <div 
                className={`absolute top-full right-0 mt-2 w-48 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl shadow-xl py-2 transform origin-top-right transition-all duration-200 ease-out ${
                    isMenuOpen 
                    ? 'opacity-100 scale-100 translate-y-0 visible' 
                    : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'
                }`}
            >
                <div className="flex flex-col">
                    {navLinks.map((link) => (
                        <button 
                            key={link.path}
                            onClick={() => handleNav(link.path)} 
                            className={`text-left px-5 py-3 text-[13px] font-medium tracking-wide transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800 ${
                                isActive(link.path) 
                                    ? 'text-neutral-900 dark:text-neutral-50 bg-neutral-50/50 dark:bg-neutral-800/50' 
                                    : 'text-neutral-500 dark:text-neutral-400'
                            }`}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;