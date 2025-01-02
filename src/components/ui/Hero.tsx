import { Heart } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center mb-4">
        <Heart className="w-12 h-12 text-blue-600" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Find Your Perfect Caregiver
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Connect with qualified and compassionate caregivers in your area who match your specific needs and preferences.
      </p>
    </div>
  );
};