
import React from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import { motion } from 'framer-motion';
import CalendarView from '@/components/dashboard/CalendarView';

const Calendar = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-resort-50 to-white">
      <Sidebar />
      
      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 ml-0 md:ml-20 lg:ml-64 transition-all duration-300">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-resort-800 mb-1">Content Calendar</h1>
          <p className="text-resort-500">Plan and schedule your content across platforms</p>
        </motion.div>
        
        <CalendarView />
      </main>
    </div>
  );
};

export default Calendar;
