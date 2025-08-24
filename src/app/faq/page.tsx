'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const faqData = [
  {
    id: 1,
    question: "What should I do after I pay for an item?",
    answer: "Once you have completed payment for the desired experience, you will need to communicate with planner about the detailed schedule and meeting place. Check the phone number on the profile of the planner in charge of the product and communicate via WhatsApp."
  },
  {
    id: 2,
    question: "What should I do if I can't contact the planner?",
    answer: "If you are unable to contact the planner after payment, you may be contacted again after a certain period of time. Be sure to enter a valid personal phone number. If you are unable to contact them continuously, please contact our customer sensor."
  },
  {
    id: 3,
    question: "How do I cancel my reservation and get a refund?",
    answer: "It varies depending on the product’s cancellation policy. Please see below. Free cancellation possible You can cancel your reservation directly by following the steps below until the time specified in the cancellation policy. 1. Go to the reservation history page. 2. Find the reservation you want to cancel and click ‘More’. 3. Select ‘Request for refund’ at the bottom of the order details."
  }
];

export default function FAQPage() {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section with Placeholder Background */}
      <div 
        className='relative bg-gradient-to-r from-orange-400 to-orange-500 py-30 px-4'
        style={{
          backgroundImage: 'url("/faq-bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        
        <div className='relative container mx-auto max-w-6xl'>
          <div className='flex items-center justify-between'>
              <h1 className='text-3xl font-bold text-white mb-4'>
                How can we help you?
              </h1>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className='container mx-auto px-4 py-16'>
        <div className='max-w-4xl mx-auto'>
          <div className='mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-8'>FAQ</h2>
            
            <div className='space-y-4'>
              {faqData.map((item) => {
                const isExpanded = expandedItems.includes(item.id);
                
                return (
                  <div key={item.id} className='border border-gray-200 rounded-lg overflow-hidden'>
                    <button
                      onClick={() => toggleItem(item.id)}
                      className='w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors'
                    >
                      <span className='font-medium text-gray-900 pr-4'>
                        {item.question}
                      </span>
                      <div className='flex-shrink-0'>
                        {isExpanded ? (
                          <Minus className='w-5 h-5 text-gray-500' />
                        ) : (
                          <div className='w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center'>
                            <Plus className='w-4 h-4 text-white' />
                          </div>
                        )}
                      </div>
                    </button>
                    
                    {isExpanded && (
                      <div className='px-6 pb-4 text-gray-600'>
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Section */}
          <div className='border border-orange-300 rounded-lg p-8 bg-orange-50'>
            <h3 className='text-xl font-semibold text-orange-600 mb-2'>
              Is there any question you're looking for?
            </h3>
            <p className='text-gray-600 mb-6'>
              JourneyPick can help you.
            </p>
            
            <Button 
              className='bg-gray-500 hover:bg-gray-600 text-white px-8 py-2 rounded-md'
            >
              Inquiry
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}