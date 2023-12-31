import React from 'react';
import { Link } from 'react-router-dom';
function Entry() {
  return (
    <div>
      <div className="hero min-h-screen bg-slate-900" style={{backgroundImage: 'url(https://www.nist.gov/sites/default/files/images/2022/01/24/22ITL001_PIV-secure-FIPS-stylized.gif)'}}>
        <div className="hero-overlay bg-gradient-to-b from-violet-600/[.15] via-transparent"></div>
        <div className="hero-content text-center text-neutral-content">

          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">

            <div className="flex justify-center">
              <a className="group inline-block bg-white/[.05] hover:bg-white/[.1] border border-white/[.05] p-1 ps-4 rounded-full shadow-md" href="../figma.html">
                <p className="me-2 inline-block text-white text-sm">
                  Accessed only by entering the unique access code provided.
                </p>
                <span className="group-hover:bg-white/[.1] py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-white/[.075] font-semibold text-white text-sm">
                  <svg className="flex-shrink-0 w-4 h-4" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
              </a>
            </div>

            <div className="max-w-3xl text-center mx-auto">
              <h1 className="block font-medium text-gray-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                Welcome to NZBRay
              </h1>
            </div>

            <div className="max-w-3xl text-center mx-auto">
              <p className="text-lg text-gray-400">
                Revolutionizing Usenet Exploration with its Comprehensive Search Engine and Streamlined Download Experience
              </p>
            </div>

            <div className="text-center">
              <Link className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800" to='/signin'>
                Get started
                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Entry;
