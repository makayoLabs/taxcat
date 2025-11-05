'use client';

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What services does EKBooks offer?",
    answer: "We offer comprehensive accounting services including tax preparation (T1, T2, T3, T5013), bookkeeping, payroll processing, and CFO services. All our services are tailored to meet the unique needs of Canadian businesses and individuals."
  },
  {
    question: "How much do your services cost?",
    answer: "Our pricing varies based on your specific needs. We offer transparent pricing with no hidden fees. Starter plans begin at $299/month for basic bookkeeping and tax services. Contact us for a personalized quote based on your business requirements."
  },
  {
    question: "Are you CRA-certified?",
    answer: "Yes, our team includes CRA-certified tax professionals with extensive experience in Canadian tax law and compliance. We stay current with all regulatory changes to ensure your filings are accurate and compliant."
  },
  {
    question: "How quickly can you process my tax return?",
    answer: "Most tax returns are completed within 5-7 business days of receiving all necessary documentation. For urgent requests, we offer expedited processing. Complex corporate returns may require additional time."
  },
  {
    question: "Do you offer support throughout the year?",
    answer: "Absolutely! We provide year-round support for all our clients. Whether you have questions about tax planning, bookkeeping, or financial strategy, our team is available via email and phone during business hours."
  },
  {
    question: "Can you help with CRA audits?",
    answer: "Yes, we provide audit support and representation. Our Professional and Enterprise plans include comprehensive audit protection, and we can assist with CRA inquiries, reviews, and audits to ensure the best possible outcome."
  },
  {
    question: "What makes EKBooks different from other accounting firms?",
    answer: "We combine traditional accounting expertise with modern technology and transparent pricing. Our client-focused approach means personalized service, clear communication, and a commitment to maximizing your financial success without surprise fees."
  },
  {
    question: "How do I get started with EKBooks?",
    answer: "Getting started is easy! Simply contact us through our website or call us directly. We'll schedule a free consultation to understand your needs, then provide a customized service plan and transparent pricing quote."
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="ws-section ws-section-primary">
      <div className="ws-container">
        <div className="ws-grid">
          <div className="ws-col-12 md:ws-col-5">
            <h2 className="ws-display-md ws-balance sticky top-8">
              FAQs
            </h2>
          </div>

          <div className="ws-col-12 md:ws-col-7">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full py-4 lg:py-6 flex items-start justify-between text-left group"
                    aria-expanded={openIndex === index}
                  >
                    <h3 className="ws-text-lg lg:ws-text-xl font-semibold pr-8 group-hover:text-brand-primary transition-colors">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0 mt-1">
                      <svg
                        className={`w-5 h-5 lg:w-6 lg:h-6 transition-transform duration-200 ${
                          openIndex === index ? 'rotate-45' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? 'max-h-96 pb-4 lg:pb-6' : 'max-h-0'
                    }`}
                  >
                    <p className="ws-text-lg ws-color-muted leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;