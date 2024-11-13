import Link from 'next/link';
import Header from '../../components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      {/* Main content with proper spacing from fixed header */}
      <main className="pt-16">
      
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-slate-100 sm:text-5xl md:text-6xl">
              <span className="block">Create Your Professional</span>
              <span className="block text-sky-400">Resume in Minutes</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-slate-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Build a stunning resume that stands out with our easy-to-use resume builder. 
              Choose from professional templates and customize your resume in minutes.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  href="/create-resume"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-sky-500 hover:bg-sky-600 transition-colors md:py-4 md:text-lg md:px-10"
                >
                  Get Started
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link
                  href="/templates"
                  className="w-full flex items-center justify-center px-8 py-3 border border-slate-600 text-base font-medium rounded-md text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors md:py-4 md:text-lg md:px-10"
                >
                  View Templates
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-sky-400 font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-100 sm:text-4xl">
                Everything you need to create a perfect resume
              </p>
            </div>
            {/* Add feature cards/content here */}
          </div>
        </section>

      </main>
    </div>
  );
} 