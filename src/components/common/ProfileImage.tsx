import { User } from 'lucide-react';

interface ProfileImageProps {
  src?: string | null;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProfileImage = ({ src, alt, size = 'md', className = '' }: ProfileImageProps) => {
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-40 h-40'
  };

  if (!src) {
    return (
      <div className={`${sizeClasses[size]} ${className} bg-gray-200 rounded-full flex items-center justify-center`}>
        <User className="w-1/2 h-1/2 text-gray-400" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${sizeClasses[size]} ${className} rounded-full object-cover`}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(alt)}&background=random`;
      }}
    />
  );
};