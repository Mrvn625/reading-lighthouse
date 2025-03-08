
import { BrainCircuit } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-dyslexai-blue-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center mb-6">
            <BrainCircuit className="h-7 w-7 text-dyslexai-blue-500" />
            <span className="ml-2 text-2xl font-bold text-dyslexai-blue-600">DyslexAI</span>
          </div>
          
          <div className="max-w-2xl mx-auto mb-4 py-3 px-6 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 italic">
              Disclaimer: This tool is for educational purposes only and is not intended to replace professional medical advice, diagnosis, or treatment.
            </p>
          </div>
          
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} DyslexAI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
