import React from 'react';
import { Header } from '../layout/Header';
import { Hero } from './Hero';
import { Features } from './Features';
import { Testimonials } from './Testimonials';
import { Footer } from './Footer';

interface LandingPageProps {
  onSelectTool: (tool: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectTool }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero onSelectTool={onSelectTool} />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
};