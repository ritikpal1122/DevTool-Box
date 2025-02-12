import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Hash,
  KeyRound,
  FileJson,
  Binary,
  BookMarked,
  Settings,
  Terminal,
  Palette,
  Clock,
  Database,
  LogIn,
  LogOut,
  User,
  MenuIcon,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { AuthModal } from './auth/AuthModal';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useWindowSize } from '@/hooks/useWindow';


interface SidebarProps {
  selectedTool: string | null;
  onSelectTool: (tool: string) => void;
}

const tools = [
  { id: 'json', name: 'JSON Formatter', icon: FileJson },
  { id: 'regex', name: 'Regex Tester', icon: Code2 },
  { id: 'base64', name: 'Base64 Tool', icon: Binary },
  { id: 'hash', name: 'Hash Generator', icon: Hash },
  { id: 'jwt', name: 'JWT Decoder', icon: KeyRound },
  { id: 'snippets', name: 'Code Snippets', icon: BookMarked },
  { id: 'curl', name: 'cURL Generator', icon: Terminal },
  { id: 'color', name: 'Color Converter', icon: Palette },
  { id: 'cron', name: 'Cron Builder', icon: Clock },
  { id: 'sql', name: 'SQL Formatter', icon: Database },
];

export const Sidebar: React.FC<SidebarProps> = ({ selectedTool, onSelectTool }) => {
  const [user, setUser] = React.useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [isToolMenuVisible, setIsToolMenuVisible] = React.useState<boolean>(false)

  const window = useWindowSize();

  const [isSmaller, setIsSmaller] = useState<boolean>(window.width>768?false:true)

  useEffect(()=>{

    if(window.width>768){
      setIsSmaller(false)
    }
    else {
      setIsSmaller(true)
    }

  },[window.width])

  useEffect(()=>{
    if(!isSmaller){
      setIsToolMenuVisible(false)
    }

  },[isSmaller])

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    

  };
  
  function handleSidebarClick() {
    onSelectTool("")
  }
  return (
    <>
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className=" hidden w-full md:w-72 bg-dark-light border-r border-primary/10 md:h-screen md:flex flex-col"
      >
        <div className="p-6 border-b border-primary/10">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={handleSidebarClick}>
            <Settings className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-white">DevToolbox</h1>
            <button className='md:hidden flex-1 flex justify-end' onClick={()=>setIsToolMenuVisible(val=>!val)}>
              <MenuIcon/>
            </button>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.button
                key={tool.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectTool(tool.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  selectedTool === tool.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'text-gray-300 hover:bg-dark-lighter hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tool.name}</span>
              </motion.button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-primary/10">
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-dark-lighter">
                <User className="w-4 h-4 text-primary" />
                <span className="text-sm text-gray-300 truncate">{user.email}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSignOut}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsAuthModalOpen(true)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </motion.button>
          )}
        </div>
      </motion.div>

      <Sheet open={isToolMenuVisible}>
      {/* <Sheet> */}
        <motion.div
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className=" md:hidden w-full md:w-72 bg-dark-light border-r border-primary/10 md:h-screen flex flex-col"
        >
          <div className="p-6 border-b border-primary/10">
            <div className="flex items-center space-x-3">
              <Settings className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold text-white">DevToolbox</h1>
              <SheetTrigger className=' flex-1 flex justify-end z-50' onClick={()=>setIsToolMenuVisible(val=>!val)}>
                <MenuIcon/>
              </SheetTrigger>
            </div>
          </div>
          
          <motion.div>
            <SheetContent 
            side={"top"} 
            className=' bg-dark-light top-16 '
            onPointerDownOutside={()=>setIsToolMenuVisible(val=>!val)}
            >
              <SheetTitle hidden={true}>Navigation Bar</SheetTitle>
              <SheetDescription hidden={true}>Navigation Bar to navigate through tools</SheetDescription>
              <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <motion.button
                      key={tool.id}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {onSelectTool(tool.id); setIsToolMenuVisible(val=>!val)} }
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        selectedTool === tool.id
                          ? 'bg-primary text-white shadow-lg shadow-primary/20'
                          : 'text-gray-300 hover:bg-dark-lighter hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tool.name}</span>
                    </motion.button>
                  );
                })}
              </nav>
              <div className="p-4 border-t border-primary/10">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-dark-lighter">
                      <User className="w-4 h-4 text-primary" />
                      <span className="text-sm text-gray-300 truncate">{user.email}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSignOut}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </motion.button>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsAuthModalOpen(true)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </motion.button>
                )}
              </div>
            </SheetContent>
          </motion.div>
        </motion.div>
      </Sheet>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};