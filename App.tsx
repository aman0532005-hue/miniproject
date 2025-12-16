import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'chat'>('landing');

  return (
    <div className="min-h-screen">
      {currentView === 'landing' ? (
        <LandingPage onStartChat={() => setCurrentView('chat')} />
      ) : (
        <ChatInterface onBack={() => setCurrentView('landing')} />
      )}
    </div>
  );
};

export default App;
