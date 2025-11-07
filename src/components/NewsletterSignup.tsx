import React from 'react'

const NewsletterSignup = (): JSX.Element => {
  return (
    <section className="py-16 bg-white">
      <div className="container-max">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-3">Meet TLDR</h3>
          <p className="text-gray-600 mb-6">Our weekly, non-boring newsletter about money, taxes, and more.</p>
          <form className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-auto flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg">
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-3">By subscribing, you consent to receive communications. You can unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSignup










