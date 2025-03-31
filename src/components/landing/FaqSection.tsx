
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
    answer: "Our AI is trained on hospitality-specific content to generate posts that resonate with your audience. It creates captions, hashtag suggestions, and content ideas based on your brand voice. The Basic plan includes 12 posts and 2 video concepts per month, while Pro increases this to 60 posts per month."
  },
  {
    question: "What's the difference between Basic and Pro plans?",
    answer: "The Basic plan ($399/mo) is designed for teams who plan content ahead but post manually. It includes a content calendar, library, and limited AI assistance. The Pro plan ($699/mo) adds direct connections to social platforms, automated publishing, performance analytics, and a unified social inbox, plus higher usage limits."
  },
  {
    question: "Do you support Korean language content?",
    answer: "Yes! All plans include basic support for multiple languages. The Pro plan includes specialized AI assistance for Korean language content, while the Enterprise plan offers full Korean market features including Naver/Kakao platform support and deep cultural AI understanding."
  },
  {
    question: "How does the approval workflow function?",
    answer: "Content can be assigned to team members for creation, then routed to managers for approval before publishing. The Basic plan includes simple approval workflows for 2 users, while Pro and Enterprise plans offer more sophisticated team collaboration with up to 5 users (Pro) or unlimited users (Enterprise)."
  },
  {
    question: "What does 'unified social inbox' mean?",
    answer: "This feature (available in Pro and Enterprise plans) consolidates all comments and direct messages from your social platforms into one inbox, allowing you to respond without switching between apps. Note that full functionality depends on platform API approvals from social networks."
  },
  {
    question: "Do you offer training and onboarding?",
    answer: "All plans include access to our knowledge base and video tutorials. Pro plans include setup assistance, while Enterprise plans feature personalized onboarding and a dedicated account manager to ensure your team's success."
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
