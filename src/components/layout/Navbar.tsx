
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, BookOpen, Home, CheckSquare, BrainCircuit, FileText, PenTool, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-dyslexai-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <BrainCircuit className="h-8 w-8 text-dyslexai-blue-500" />
              <span className="ml-2 text-2xl font-bold text-dyslexai-blue-600">DyslexAI</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLinks mobile={false} closeMenu={closeMenu} />
          </div>
          
          <div className="flex md:hidden items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-dyslexai-blue-500" />
              ) : (
                <Menu className="h-6 w-6 text-dyslexai-blue-500" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white`}>
        <div className="pt-2 pb-4 space-y-1">
          <NavLinks mobile={true} closeMenu={closeMenu} />
        </div>
      </div>
    </nav>
  );
};

type NavLinksProps = {
  mobile: boolean;
  closeMenu: () => void;
};

const NavLinks = ({ mobile, closeMenu }: NavLinksProps) => {
  const navItems = [
    { to: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
    { to: "/what-is-dyslexia", label: "What is Dyslexia", icon: <BookOpen className="h-5 w-5" /> },
    { to: "/how-tests-work", label: "How Tests Work", icon: <FileText className="h-5 w-5" /> },
    { to: "/handwriting-analysis", label: "Handwriting Analysis", icon: <PenTool className="h-5 w-5" /> },
    { to: "/checklist", label: "Checklist", icon: <CheckSquare className="h-5 w-5" /> },
    { to: "/cognitive-tests", label: "Cognitive Tests", icon: <BrainCircuit className="h-5 w-5" /> },
    { to: "/results", label: "Results", icon: <Percent className="h-5 w-5" /> },
  ];

  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={closeMenu}
          className={`${
            mobile
              ? 'block py-3 px-4 text-base font-medium hover:bg-dyslexai-blue-50 hover:text-dyslexai-blue-600'
              : 'inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-dyslexai-blue-600'
          } transition-colors duration-200`}
        >
          <span className={`${mobile ? 'mr-3 inline-flex' : 'mr-2'}`}>{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </>
  );
};

export default Navbar;
