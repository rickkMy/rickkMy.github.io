import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CVPage from './pages/CVPage';
import ProjectsPage from './pages/ProjectsPage';
import PublicationsPage from './pages/PublicationsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import PublicationDetailPage from './pages/PublicationDetailPage';
import ZenPage from './pages/ZenPage';
import ZenDetailPage from './pages/ZenDetailPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cv" element={<CVPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="/publications/:slug" element={<PublicationDetailPage />} />
        <Route path="/zen" element={<ZenPage />} />
        <Route path="/zen/:slug" element={<ZenDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;