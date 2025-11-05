'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, CheckCircle } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30"></div>
      </div>

      <div className="container-max section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-taxcat-blue/20"
              >
                <span className="text-taxcat-blue text-sm font-medium">
                  🇨🇦 The Smart Choice for Canadian Taxes
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              >
                Expert Tax Filing <span className="text-taxcat-blue">Without the </span>
                <span className="relative">
                  Corporate Hassle
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 100 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 10 Q 25 0, 50 10 T 100 10"
                      stroke="#f59e0b"
                      strokeWidth="4"
                      fill="none"
                    />
                  </svg>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-taxcat-gray max-w-lg"
              >
                Professional tax expertise meets modern simplicity. Get the maximum refund without
                the corporate complexity.
              </motion.p>
            </div>

            {/* Trust Points */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-4 py-6"
            >
              {['CRA Authorized', 'Maximum Refund', 'AI-Powered', 'Expert Support'].map(
                (feature, ___index) => (
                  <div key={___index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-taxcat-success" />
                    <span className="text-taxcat-gray font-medium">{feature}</span>
                  </div>
                )
              )}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="bg-taxcat-blue text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 w-full sm:w-auto">
                Start Filing Now
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="bg-white text-taxcat-blue border-2 border-taxcat-blue/20 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-blue-50 hover:border-taxcat-blue/30 w-full sm:w-auto">
                Calculate Refund
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-8 pt-8 border-t border-gray-200"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-taxcat-blue">15 min</div>
                <div className="text-sm text-taxcat-gray">Average Filing Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-taxcat-success">$1,250</div>
                <div className="text-sm text-taxcat-gray">Avg. Refund</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-taxcat-blue">24/7</div>
                <div className="text-sm text-taxcat-gray">Expert Support</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image/Visual Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://placehold.co/1200x600/1e40af/ffffff?text=Smart+Tax+Filing"
                alt="TaxCat Smart Filing Interface"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-taxcat-blue/20 to-transparent"></div>
            </div>

            {/* Floating Elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-taxcat-blue rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">CRA Certified</div>
                  <div className="text-sm text-taxcat-gray">Authorized Service</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="text-taxcat-success text-xl">⚡</div>
                <div className="text-sm font-medium text-gray-900">AI-Powered for Speed</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
