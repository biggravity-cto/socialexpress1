
import React from 'react';
import { motion } from 'framer-motion';

const BrandGuidelines = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-12 font-display">Brand Guidelines</h1>
          
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Typography</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Primary Font: Space Grotesk</h3>
                <p className="font-display text-3xl tracking-[0.2em] mb-4">BIG GRAVITY</p>
                <p className="text-gray-600">Used for our logo and main headings. Features a modern, geometric design that embodies our technological focus.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Secondary Font: Plus Jakarta Sans</h3>
                <p className="font-display text-xl mb-2">Professional Display Text</p>
                <p className="text-gray-600">Used for subheadings and important display text.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Body Font: Inter</h3>
                <p className="font-sans">Clean, modern and highly readable for all body text.</p>
              </div>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Colors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Primary Colors</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-brand-green rounded-lg"></div>
                    <div>
                      <p className="font-medium">Brand Green</p>
                      <p className="text-sm text-gray-600">#3BFFCB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-brand-primary rounded-lg"></div>
                    <div>
                      <p className="font-medium">Brand Primary</p>
                      <p className="text-sm text-gray-600">#95D4E3</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Space Theme Colors</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-space-dark rounded-lg"></div>
                    <div>
                      <p className="font-medium">Space Dark</p>
                      <p className="text-sm text-gray-600">#0A0E1C</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Logo Usage</h2>
            <div className="space-y-6">
              <div className="p-8 bg-white border rounded-lg">
                <span className="font-display text-3xl tracking-[0.2em]">BIG GRAVITY</span>
              </div>
              <div className="p-8 bg-space-dark rounded-lg">
                <span className="font-display text-3xl tracking-[0.2em] text-white">BIG GRAVITY</span>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Guidelines</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Always maintain the tracking (letter-spacing) when displaying the logo</li>
                <li>Use all capitals for the logotype</li>
                <li>Maintain adequate clear space around the logo</li>
                <li>Do not stretch, distort, or alter the logo's proportions</li>
              </ul>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default BrandGuidelines;
