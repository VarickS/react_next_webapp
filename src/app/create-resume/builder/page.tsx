'use client'
import * as pdfjsLib from 'pdfjs-dist';
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';

// Set worker path
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

//pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// Dynamically import react-pdf components
const Document = dynamic(() => import('react-pdf').then(mod => mod.Document), {
  ssr: false
})
const Page = dynamic(() => import('react-pdf').then(mod => mod.Page), {
  ssr: false
})

interface Job {
  company: string;
  title: string;
  years: string;
}

type TemplateKey = 'company1' | 'title1' | 'years1';
const TEMPLATE_MAPPINGS: Record<TemplateKey, { x: number; y: number }> = {
  company1: { x: 50, y: 200 },
  title1: { x: 50, y: 220 },
  years1: { x: 50, y: 240 },
  // Add more mappings as needed
};

export default function ResumeBuilder() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string>('/path-to-your-template.pdf');
  const [scale, setScale] = useState(1.0);

  // Function to handle PDF rendering
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    // Handle successful load
  };

  // Add a function to add new jobs
  const addJob = (job: Job) => {
    setJobs(prevJobs => [...prevJobs, job]);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <main className="max-w-6xl mx-auto pt-16">
        <div className="grid md:grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
          {/* Left side - Terminal (keep existing code) */}
          
          {/* Right side - PDF Preview */}
          <div className="bg-white rounded-lg p-6 overflow-auto relative">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Resume Preview</h2>
            
            {/* PDF Display */}
            <div className="relative">
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                className="resume-document"
              >
                <Page 
                  pageNumber={1} 
                  scale={scale}
                  className="resume-page"
                />
              </Document>

              {/* Overlay div for user inputs */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                {jobs.map((job, index) => (
                  <div key={index}>
                    <div style={{ 
                      position: 'absolute',
                      left: TEMPLATE_MAPPINGS[`company${index + 1}` as keyof typeof TEMPLATE_MAPPINGS].x,
                      top: TEMPLATE_MAPPINGS[`company${index + 1}` as keyof typeof TEMPLATE_MAPPINGS].y,
                    }}>
                      {job.company}
                    </div>
                    <div style={{
                      position: 'absolute',
                      left: TEMPLATE_MAPPINGS[`title${index + 1}` as keyof typeof TEMPLATE_MAPPINGS].x,
                      top: TEMPLATE_MAPPINGS[`title${index + 1}` as keyof typeof TEMPLATE_MAPPINGS].y,
                    }}>
                      {job.title}
                    </div>
                    <div style={{
                      position: 'absolute',
                      left: TEMPLATE_MAPPINGS[`years${index + 1}` as keyof typeof TEMPLATE_MAPPINGS].x,
                      top: TEMPLATE_MAPPINGS[`years${index + 1}` as keyof typeof TEMPLATE_MAPPINGS].y,
                    }}>
                      {job.years}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}