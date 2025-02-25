import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-gray-800 border border-gray-700 rounded-lg shadow-md p-4 ${className}`}> 
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({ children }) => (
  <div className="border-b border-gray-700 pb-2 mb-2">{children}</div>
);

export const CardContent: React.FC<CardProps> = ({ children }) => (
  <div className="mb-2">{children}</div>
);

export const CardFooter: React.FC<CardProps> = ({ children }) => (
  <div className="border-t border-gray-700 pt-2 mt-2">{children}</div>
);

export const CardTitle: React.FC<CardProps> = ({ children }) => (
  <h2 className="text-lg font-bold">{children}</h2>
);

export const CardDescription: React.FC<CardProps> = ({ children }) => (
  <p className="text-gray-400">{children}</p>
);

export default Card;
