import React from 'react';

const CTASection: React.FC = () => {
  return (
    <section className="ws-section-lg ws-section-accent">
      <div className="ws-container">
        <div className="text-center">
          <h2 className="ws-display-lg ws-balance mb-6">
            Your financial success awaits
          </h2>
          <p className="ws-text-xl ws-color-muted mb-8 lg:mb-12 leading-relaxed">
            Join hundreds of Canadian businesses who trust EKBooks for expert accounting, tax preparation, and financial guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="ws-button ws-button-primary ws-button-lg">
              Schedule consultation
            </button>
            <button className="ws-button ws-button-secondary ws-button-lg">
              Call (123) 456-7890
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;