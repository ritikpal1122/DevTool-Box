import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/landing/LandingPage';
import { JsonFormatter } from './components/tools/JsonFormatter';
import { RegexTester } from './components/tools/RegexTester';
import { Base64Tool } from './components/tools/Base64Tool';
import { HashGenerator } from './components/tools/HashGenerator';
import { JwtDecoder } from './components/tools/JwtDecoder';
import { CodeSnippets } from './components/tools/CodeSnippets';
import { CurlGenerator } from './components/tools/CurlGenerator';
import { ColorConverter } from './components/tools/ColorConverter';
import { CronBuilder } from './components/tools/CronBuilder';
import { SqlFormatter } from './components/tools/SqlFormatter';
import { supabase } from './lib/supabase';

function App() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      // if (!session?.user && selectedTool) {
      //   setSelectedTool(null); // Return to landing page on sign out
      // }
    });

    return () => subscription.unsubscribe();
  }, [selectedTool]);

  const renderTool = () => {
    switch (selectedTool) {
      case 'json':
        return <JsonFormatter />;
      case 'regex':
        return <RegexTester />;
      case 'base64':
        return <Base64Tool />;
      case 'hash':
        return <HashGenerator />;
      case 'jwt':
        return <JwtDecoder />;
      case 'snippets':
        return <CodeSnippets />;
      case 'curl':
        return <CurlGenerator />;
      case 'color':
        return <ColorConverter />;
      case 'cron':
        return <CronBuilder />;
      case 'sql':
        return <SqlFormatter />;
      default:
        return <LandingPage onSelectTool={setSelectedTool} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-dark font-grotesk overflow-x-hidden">
      {selectedTool && <Sidebar selectedTool={selectedTool} onSelectTool={setSelectedTool} />}
      <main className={`flex-1 ${!selectedTool && 'w-full'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTool || 'landing'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full"
          >
            {renderTool()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;