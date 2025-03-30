
import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the AI content generation work?",
    answer: "Our AI is trained on hospitality-specific content to generate posts that resonate with your audience. It learns your brand voice and creates content that matches your style while saving you hours of work."
  },
  {
    question: "Can I connect all my social media accounts?",
    answer: "Yes! BG Social Express integrates with all major social platforms including Instagram, Facebook, Twitter, LinkedIn, Pinterest, and TikTok, allowing you to manage everything from one dashboard."
  },
  {
    question: "How does the approval workflow function?",
    answer: "Content can be assigned to team members for creation, then routed to managers for approval before publishing. You can customize the workflow to match your organization's structure and needs."
  },
  {
    question: "Do you offer custom reporting?",
    answer: "Yes, our analytics platform allows you to create custom reports focusing on the metrics that matter most to your business. Reports can be scheduled and automatically sent to stakeholders."
  },
  {
    question: "Is there a limit to how many posts I can schedule?",
    answer: "This depends on your plan. Basic plans include up to 50 scheduled posts per month, while our Pro and Enterprise plans offer unlimited scheduling capabilities."
  },
  {
    question: "Do you offer training and onboarding?",
    answer: "Absolutely! All plans include access to our knowledge base and video tutorials. Pro and Enterprise plans also include personalized onboarding sessions and dedicated support."
  }
];

const FaqSection = () => {
  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="inline-block bg-resort-50 text-resort-600 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Common Questions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-resort-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-resort-600 max-w-3xl mx-auto">
            Find answers to common questions about BG Social Express and how it can help your hospitality business.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium text-lg text-resort-800 hover:text-ocean-600">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-resort-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
