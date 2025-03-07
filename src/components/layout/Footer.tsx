
import { Link } from "react-router-dom";
import { BrainCircuit } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-dyslexai-blue-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <BrainCircuit className="h-6 w-6 text-dyslexai-blue-500" />
            <span className="ml-2 text-xl font-bold text-dyslexai-blue-600">DyslexAI</span>
          </div>
          
          <div className="flex flex-wrap justify-center space-x-4 mb-4 md:mb-0">
            <Link to="/" className="text-gray-600 hover:text-dyslexai-blue-600">
              Home
            </Link>
            <Link to="/what-is-dyslexia" className="text-gray-600 hover:text-dyslexai-blue-600">
              What is Dyslexia
            </Link>
            <Link to="/how-tests-work" className="text-gray-600 hover:text-dyslexai-blue-600">
              How Tests Work
            </Link>
          </div>
          
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} DyslexAI. All rights reserved.
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Disclaimer: This tool is for educational purposes only and is not intended to replace professional medical advice, diagnosis, or treatment.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
