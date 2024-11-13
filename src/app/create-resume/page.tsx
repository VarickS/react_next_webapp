import Link from 'next/link';

export default function CreateResume() {
  return (
    <div className="min-h-screen bg-slate-900">
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-100 text-center mb-12">
            Choose How to Create Your Resume
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Upload Documents Option */}
            <div className="bg-slate-800 rounded-lg p-8 hover:bg-slate-700 transition-colors">
              <Link href="/create-resume/upload" className="block text-center">
                <div className="h-16 w-16 mx-auto mb-4">
                  <i className="fas fa-file-upload text-5xl text-sky-400"></i>
                </div>
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                  Upload Documents
                </h2>
                <p className="text-slate-300 mb-4">
                  Upload your existing resume or documents and we'll help you transform them into a professional format.
                </p>
                <span className="inline-block text-sky-400 font-medium">
                  Get started with upload →
                </span>
              </Link>
            </div>

            {/* Create from Scratch Option */}
            <div className="bg-slate-800 rounded-lg p-8 hover:bg-slate-700 transition-colors">
              <Link href="/create-resume/builder" className="block text-center">
                <div className="h-16 w-16 mx-auto mb-4">
                  <i className="fas fa-pencil-alt text-5xl text-sky-400"></i>
                </div>
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                  Create from Scratch
                </h2>
                <p className="text-slate-300 mb-4">
                  Start with a blank canvas and build your resume step by step using our intuitive builder.
                </p>
                <span className="inline-block text-sky-400 font-medium">
                  Start building →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 