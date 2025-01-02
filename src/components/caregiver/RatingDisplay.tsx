import { Star } from 'lucide-react';

interface RatingDisplayProps {
  rating?: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const RatingDisplay = ({ rating, reviewCount, size = 'sm' }: RatingDisplayProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  if (!rating) return null;

  return (
    <div className="flex items-center">
      <Star className={`${sizeClasses[size]} text-yellow-400 fill-current`} />
      <span className="ml-1 text-gray-600">
        {rating.toFixed(1)} {reviewCount && `(${reviewCount} reviews)`}
      </span>
    </div>
  );
};