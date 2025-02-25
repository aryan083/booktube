import React from 'react';

type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
};

const Label: React.FC<LabelProps> = ({ htmlFor, children }) => {
  return <label htmlFor={htmlFor} className="text-gray-300">{children}</label>;
};

export default Label;
