
import { ReactNode } from "react";

interface SectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const Section = ({ title, children, className = "" }: SectionProps) => {
  return (
    <section className={`dyslexai-section ${className}`}>
      {title && <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-dyslexai-blue-700">{title}</h2>}
      <div>{children}</div>
    </section>
  );
};

export default Section;
