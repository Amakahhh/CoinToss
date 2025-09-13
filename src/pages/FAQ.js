import React from 'react';

const FAQ = () => {
  const faqs = [
    {
      question: "What currencies can i use?",
      answer: "We Currently support BTC, ETH, and USDT"
    },
    {
      question: "How are Payouts Calculated?",
      answer: "Payouts are based on stake multiplied by odds at the time of your prediction"
    },
    {
      question: "Is this platform secure?",
      answer: "Yes we use advanced encryption and follow best practices for wallet and transactions safely"
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container max-w-4xl">
        <h1 className="text-5xl font-bold text-white text-center mb-16">
          Frequently Asked Questions
        </h1>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="card">
              <h3 className="text-xl font-semibold text-blue mb-4">
                {faq.question}
              </h3>
              <p className="text-gray-300">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;