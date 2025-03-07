
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type PageLayoutProps = {
  children: ReactNode;
  className?: string;
};

const PageLayout = ({ children, className = "" }: PageLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-grow ${className}`}>{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
