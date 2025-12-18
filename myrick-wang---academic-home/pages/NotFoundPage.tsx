import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans transition-colors duration-300">
      <Header />
      <main className="max-w-screen-xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-8xl font-bold text-neutral-100 dark:text-neutral-900 mb-6 transition-colors">404</h1>
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-4">Page not found</h2>
        <p className="text-neutral-500 dark:text-neutral-400 text-center max-w-md mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
            to="/" 
            className="text-[11px] font-mono uppercase tracking-widest text-neutral-900 dark:text-neutral-200 border-b border-neutral-900 dark:border-neutral-200 hover:opacity-60 transition-opacity pb-0.5"
        >
            Return Home
        </Link>
      </main>
    </div>
  );
};

export default NotFoundPage;