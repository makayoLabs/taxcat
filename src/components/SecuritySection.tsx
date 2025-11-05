import React from 'react'
import { ShieldCheck, Lock, Key, FileCheck } from 'lucide-react'

const SecuritySection = (): JSX.Element => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Bank‑level security</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your data is protected with industry-standard encryption, strict access controls, and continuous monitoring.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Encryption in transit & at rest</h3>
            <p className="text-gray-600 text-sm">All sensitive data uses modern TLS and strong at-rest encryption.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Lock className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Multi‑factor authentication</h3>
            <p className="text-gray-600 text-sm">Protect your account with optional MFA and session safeguards.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Key className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Role‑based access control</h3>
            <p className="text-gray-600 text-sm">Strict least‑privilege access for our staff and systems.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <FileCheck className="h-5 w-5 text-amber-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Compliance‑ready logging</h3>
            <p className="text-gray-600 text-sm">Detailed audit logs and monitoring to keep your data safe.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SecuritySection








