import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-slate-800 shadow-lg h-[50px]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-center ">
        <div className="">
            <Link href="/" className="p-2 hover:bg-slate-700 rounded-full transition-colors">
              <i className="fas fa-home text-slate-200 text-xl"></i>
            </Link>
            
            <div className="flex space-x-4">
              <Link 
                href="/create" 
                className="px-4 py-2 rounded-md text-slate-200 hover:bg-slate-700 transition-colors"
              >
                Create Resume
              </Link>
              <Link 
                href="/pricing" 
                className="px-4 py-2 rounded-md text-slate-200 hover:bg-slate-700 transition-colors"
              >
                Pricing
              </Link>
              <Link 
                href="/about" 
                className="px-4 py-2 rounded-md text-slate-200 hover:bg-slate-700 transition-colors"
              >
                About
              </Link>
            </div>
          </div>
      
      </nav>
    </header>
  )
}

export default Header
