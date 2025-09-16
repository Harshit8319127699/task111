import { User } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-sm border-b border-gray-200/60 shadow-sm flex items-center justify-between px-8 z-50">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <div className="text-gray-900 font-bold text-xl tracking-tight" data-testid="logo">rategen</div>
        </div>
        <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
      </div>
      
      <nav className="flex items-center space-x-8">
        <a 
          href="#" 
          className="text-blue-600 font-medium hover:text-blue-700 transition-colors relative group"
          data-testid="nav-whatsapp"
        >
          WhatsApp
          <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full scale-x-100"></div>
        </a>
        <a 
          href="#" 
          className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
          data-testid="nav-rates"
        >
          Rates
        </a>
        <a 
          href="#" 
          className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
          data-testid="nav-queries"
        >
          Queries
        </a>
        <a 
          href="#" 
          className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
          data-testid="nav-playground"
        >
          Playground
        </a>
        <a 
          href="#" 
          className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
          data-testid="nav-docs"
        >
          Docs
        </a>
        <a 
          href="/pricing" 
          className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
          data-testid="nav-pricing"
        >
          Pricing
        </a>
        <a 
          href="/dashboard" 
          className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
          data-testid="nav-dashboard"
        >
          Dashboard
        </a>
      </nav>
      
      <div className="flex items-center space-x-3">
        <button 
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
          data-testid="button-usage"
        >
          Usage
        </button>
        <button 
          className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
          data-testid="button-user"
        >
          <User className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </header>
  );
}
