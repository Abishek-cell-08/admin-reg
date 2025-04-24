'use client'
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>About ShelfSpace | Modern Library Management</title>
        <meta name="description" content="Learn about ShelfSpace and our mission to revolutionize library management." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation (Same as Home) */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-800">ShelfSpace</h1>
              </div>
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                <Link href="/" className="text-gray-500 hover:text-gray-700 font-medium px-1 pt-1">Home</Link>
                <Link href="/features" className="text-gray-500 hover:text-gray-700 font-medium px-1 pt-1">Features</Link>
                <Link href="/about" className="text-blue-800 font-medium border-b-2 border-blue-800 px-1 pt-1">About</Link>
                <Link href="/contact" className="text-gray-500 hover:text-gray-700 font-medium px-1 pt-1">Contact</Link>
              </div>
            </div>
            <div className="flex items-center">
              <Link 
                href="/reg" 
                className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 text-sm font-medium transition-colors duration-200"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-blue-800">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About ShelfSpace
          </h1>
          <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
            Revolutionizing library management with modern technology and a passion for education.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-800 font-semibold tracking-wide uppercase">Our Mission</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Empowering libraries to thrive in the digital age
            </p>
            <div className="mt-10 max-w-2xl text-xl text-gray-500 lg:mx-auto text-left space-y-6">
              <p>
                ShelfSpace with a simple goal: to transform how libraries operate by providing intuitive, scalable, and affordable management tools.
              </p>
              <p>
                We believe libraries are the heart of communities, and our platform ensures they can focus on what matters most—connecting people with knowledge.
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* Values Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-blue-800 font-semibold tracking-wide uppercase">Our Values</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What drives us every day
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Value 1 */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="h-12 w-12 rounded-md bg-blue-800 text-white flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Innovation</h3>
              <p className="mt-2 text-gray-500">
                We constantly evolve to meet the changing needs of libraries and their patrons.
              </p>
            </div>
            {/* Value 2 */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="h-12 w-12 rounded-md bg-blue-800 text-white flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Security</h3>
              <p className="mt-2 text-gray-500">
                Patron data privacy and system integrity are our top priorities.
              </p>
            </div>
            {/* Value 3 */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="h-12 w-12 rounded-md bg-blue-800 text-white flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Community</h3>
              <p className="mt-2 text-gray-500">
                We build tools that strengthen the bond between libraries and their communities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section (Same as Home) */}
      <div className="bg-blue-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to join the future of libraries?</span>
            <span className="block text-blue-200">Start your free trial today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link href="/reg" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-800 bg-white hover:bg-blue-50">
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer (Same as Home) */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap justify-center space-x-6">
            <Link href="/about" className="text-base text-gray-500 hover:text-gray-900">
              About
            </Link>
            <Link href="/features" className="text-base text-gray-500 hover:text-gray-900">
              Features
            </Link>
            <Link href="/privacy" className="text-base text-gray-500 hover:text-gray-900">
              Privacy
            </Link>
            <Link href="/terms" className="text-base text-gray-500 hover:text-gray-900">
              Terms
            </Link>
            <Link href="/contact" className="text-base text-gray-500 hover:text-gray-900">
              Contact
            </Link>
          </nav>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} ShelfSpace. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}