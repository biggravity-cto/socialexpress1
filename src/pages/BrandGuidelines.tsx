
import React from 'react';
import { motion } from 'framer-motion';

const BrandGuidelines = () => {
  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-12 font-display text-space-dark tracking-wide">Brand Guidelines</h1>
          
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-space-dark">Typography</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-space-dark">Primary Font: Space Grotesk</h3>
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm mb-4">
                  <p className="font-display text-3xl tracking-[0.2em] mb-4 text-space-dark">BIG GRAVITY</p>
                </div>
                <p className="text-gray-700">Used for our logo and main headings. Features a modern, geometric design that embodies our technological focus.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-space-dark">Secondary Font: Inter</h3>
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm mb-4">
                  <p className="font-sans text-xl mb-2 text-space-dark">Professional Body Text</p>
                </div>
                <p className="text-gray-700">Clean, modern and highly readable for all body text and UI elements.</p>
              </div>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-space-dark">Primary Colors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="p-12 rounded-lg shadow-md bg-brand-green"></div>
                <div>
                  <p className="font-medium text-space-dark">Brand Green</p>
                  <p className="text-sm text-gray-700">#3BFFCB</p>
                  <p className="text-sm text-gray-600 mt-1">Used for accents, highlights, and CTAs</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-12 rounded-lg shadow-md bg-brand-primary"></div>
                <div>
                  <p className="font-medium text-space-dark">Brand Primary Blue</p>
                  <p className="text-sm text-gray-700">#95D4E3</p>
                  <p className="text-sm text-gray-600 mt-1">Used in gradients and secondary elements</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-12 rounded-lg shadow-md bg-brand-secondary"></div>
                <div>
                  <p className="font-medium text-space-dark">Brand Secondary</p>
                  <p className="text-sm text-gray-700">#3EDBB2</p>
                  <p className="text-sm text-gray-600 mt-1">Used for buttons and interactive elements</p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-space-dark">Dark Theme Colors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="p-12 rounded-lg shadow-md bg-space-dark"></div>
                <div>
                  <p className="font-medium text-space-dark">Space Dark</p>
                  <p className="text-sm text-gray-700">#0A0E1C</p>
                  <p className="text-sm text-gray-600 mt-1">Primary dark background</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-12 rounded-lg shadow-md bg-space-darker"></div>
                <div>
                  <p className="font-medium text-space-dark">Space Darker</p>
                  <p className="text-sm text-gray-700">#05070E</p>
                  <p className="text-sm text-gray-600 mt-1">Used for darker sections and footer</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-12 rounded-lg shadow-md bg-space-blue"></div>
                <div>
                  <p className="font-medium text-space-dark">Space Blue</p>
                  <p className="text-sm text-gray-700">#1C2444</p>
                  <p className="text-sm text-gray-600 mt-1">Used for cosmic blue accents</p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-space-dark">Gradients</h2>
            
            <div className="grid grid-cols-1 gap-6 mb-8">
              <div className="space-y-4">
                <div className="h-24 rounded-lg shadow-md bg-gradient-to-r from-brand-green to-brand-primary"></div>
                <div>
                  <p className="font-medium text-space-dark">Primary Brand Gradient</p>
                  <p className="text-sm text-gray-700">From #3BFFCB to #95D4E3</p>
                  <p className="text-sm text-gray-600 mt-1">Used for buttons, CTAs, and important UI elements</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="h-24 rounded-lg shadow-md bg-gradient-radial from-brand-green/20 via-space-dark to-space-darker"></div>
                <div>
                  <p className="font-medium text-space-dark">Cosmic Radial Gradient</p>
                  <p className="text-sm text-gray-700">Radial gradient with brand colors</p>
                  <p className="text-sm text-gray-600 mt-1">Used for cosmic themed backgrounds</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="h-24 rounded-lg shadow-md bg-gradient-to-br from-space-blue via-space-purple to-space-dark"></div>
                <div>
                  <p className="font-medium text-space-dark">Space Background Gradient</p>
                  <p className="text-sm text-gray-700">From #1C2444 via #2D1B4E to #0A0E1C</p>
                  <p className="text-sm text-gray-600 mt-1">Used for dark themed sections</p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-space-dark">Logo Usage</h2>
            <div className="space-y-6">
              <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm flex justify-center">
                <span className="font-display text-3xl tracking-[0.2em] text-space-dark">BIG GRAVITY</span>
              </div>
              <div className="p-8 bg-space-dark rounded-lg shadow-md flex justify-center">
                <span className="font-display text-3xl tracking-[0.2em] text-white">BIG GRAVITY</span>
              </div>
              <div className="p-8 bg-gradient-to-r from-brand-green to-brand-primary rounded-lg shadow-md flex justify-center">
                <span className="font-display text-3xl tracking-[0.2em] text-space-dark">BIG GRAVITY</span>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 text-space-dark">Logo Guidelines</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Always use the Space Grotesk font for the logo</li>
                <li>Maintain the tracking (letter-spacing) of 0.2em</li>
                <li>Always use all capitals for the logotype</li>
                <li>Ensure adequate contrast with the background</li>
                <li>Maintain clear space around the logo equal to the height of the "G"</li>
                <li>Do not stretch, distort, or alter the logo's proportions</li>
                <li>The logo should be either white on dark backgrounds or dark on light backgrounds</li>
                <li>The "b<sup>g</sup>" superscript logo can be used as a standalone icon</li>
              </ul>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-space-dark">Effect Styles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="p-8 rounded-lg shadow-glow bg-space-dark mb-4 flex justify-center items-center">
                  <span className="text-brand-green text-xl">Glow Effect</span>
                </div>
                <p className="text-gray-700">Used for highlighting important UI elements with a subtle glow.</p>
              </div>
              <div>
                <div className="p-8 rounded-lg glass-dark mb-4 flex justify-center items-center">
                  <span className="text-white text-xl">Glass Morphism</span>
                </div>
                <p className="text-gray-700">Used for creating depth and layering in dark interfaces.</p>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default BrandGuidelines;
