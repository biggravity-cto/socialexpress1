
import React from 'react';
import { motion } from 'framer-motion';
import CalendarView from '@/components/dashboard/CalendarView';

const Calendar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-resort-800 mb-1">Content Calendar</h1>
        <p className="text-resort-500">Plan and schedule your content across platforms</p>
      </div>
      
      <div className="w-full overflow-x-hidden">
        <CalendarView />
      </div>
    </motion.div>
  );
};

export default Calendar;
