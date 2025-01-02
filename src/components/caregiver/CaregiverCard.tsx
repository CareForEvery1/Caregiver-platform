import { Star, MapPin, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Caregiver } from '../../types/caregiver';
import { ProfileImage } from '../common/ProfileImage';

interface CaregiverCardProps {
  caregiver: Caregiver;
}

export const CaregiverCard = ({ caregiver }: CaregiverCardProps) => {
  return (
    <Link to={`/caregiver/${caregiver.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
        <div className="flex items-center space-x-4">
          <ProfileImage
            src={caregiver.profile_image}
            alt={caregiver.name}
            size="sm"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{caregiver.name}</h3>
            <div className="flex items-center mt-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-gray-600">
                {caregiver.average_rating?.toFixed(1)} ({caregiver.review_count} reviews)
              </span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {caregiver.years_experience} years experience
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            Available in your area
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSign className="w-4 h-4 mr-2" />
            ${caregiver.hourly_rate}/hour
          </div>
        </div>

        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
          View Profile
        </button>
      </div>
    </Link>
  );
};