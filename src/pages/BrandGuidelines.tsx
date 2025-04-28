
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
          <h1 className="text-4xl font-bold mb-12 font-display text-space-dark">Brand Guidelines</h1>
          
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-space-dark">Typography</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-space-dark">Primary Font: Space Grotesk</h3>
                <p className="font-display text-3xl tracking-[0.2em] mb-4 text-space-dark">BIG GRAVITY</p>
                <p className="text-gray-700">Used for our logo and main headings. Features a modern, geometric design that embodies our technological focus.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-space-dark">Secondary Font: Plus Jakarta Sans</h3>
                <p className="font-display text-xl mb-2 text-space-dark">Professional Display Text</p>
                <p className="text-gray-700">Used for subheadings and important display text.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-space-dark">Body Font: Inter</h3>
                <p className="font-sans text-gray-700">Clean, modern and highly readable for all body text.</p>
              </div>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-space-dark">Colors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-space-dark">Primary Colors</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-brand-green rounded-lg shadow-md"></div>
                    <div>
                      <p className="font-medium text-space-dark">Brand Green</p>
                      <p className="text-sm text-gray-700">#3BFFCB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-brand-primary rounded-lg shadow-md"></div>
                    <div>
                      <p className="font-medium text-space-dark">Brand Primary</p>
                      <p className="text-sm text-gray-700">#95D4E3</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-space-dark">Space Theme Colors</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-space-dark rounded-lg shadow-md"></div>
                    <div>
                      <p className="font-medium text-space-dark">Space Dark</p>
                      <p className="text-sm text-gray-700">#0A0E1C</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-space-dark">Logo Usage</h2>
            <div className="space-y-6">
              <div className="p-8 bg-white border rounded-lg shadow-sm">
                <span className="font-display text-3xl tracking-[0.2em] text-space-dark">BIG GRAVITY</span>
              </div>
              <div className="p-8 bg-space-dark rounded-lg shadow-md">
                <span className="font-display text-3xl tracking-[0.2em] text-white">BIG GRAVITY</span>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 text-space-dark">Guidelines</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
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
