
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
}

const PageHeader = ({ title, description, icon }: PageHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-dyslexai-blue-50 to-dyslexai-green-50 py-8 mb-8 rounded-xl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-4">
          {icon && <div className="mr-4 text-dyslexai-blue-500">{icon}</div>}
          <h1 className="text-3xl sm:text-4xl font-bold text-dyslexai-blue-800">{title}</h1>
        </div>
        {description && (
          <p className="text-xl text-gray-600 max-w-3xl">{description}</p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
