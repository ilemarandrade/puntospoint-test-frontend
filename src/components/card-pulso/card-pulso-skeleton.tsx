import type React from 'react';
import { Card } from '@mui/material';

interface IProps {
  className?: string;
}

const CardPulsoSkeleton: React.FC<IProps> = ({ className }) => {
  return (
    <Card
      className={`px-5 pt-2 pb-5 w-full space-y-2 rounded-2xl min-w-64 ${className}`}
    >
      <div className="h-6 bg-gray-200 rounded animate-pulse mb-4" />

      {[...Array(9)].map((_, index) => (
        <div key={index} className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
        </div>
      ))}
    </Card>
  );
};

export default CardPulsoSkeleton;
