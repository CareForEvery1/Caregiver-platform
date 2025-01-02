import { Search, MapPin, Calendar, Languages, Award, DollarSign } from 'lucide-react';
import { useState } from 'react';

export const SearchForm = () => {
  const [location, setLocation] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [qualifications, setQualifications] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([20, 100]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center text-gray-700 font-medium">
            <MapPin className="w-4 h-4 mr-2" />
            Location
          </label>
          <input
            type="text"
            placeholder="Enter city or zip code"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-gray-700 font-medium">
            <Calendar className="w-4 h-4 mr-2" />
            Care Type
          </label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => setServices([...e.target.selectedOptions].map(opt => opt.value))}
            multiple
          >
            <option value="elderly">Elderly Care</option>
            <option value="child">Child Care</option>
            <option value="special">Special Needs Care</option>
            <option value="medical">Medical Care</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-gray-700 font-medium">
            <Award className="w-4 h-4 mr-2" />
            Qualifications
          </label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => setQualifications([...e.target.selectedOptions].map(opt => opt.value))}
            multiple
          >
            <option value="cpr">CPR Certified</option>
            <option value="firstaid">First Aid</option>
            <option value="nursing">Nursing License</option>
            <option value="therapy">Therapy Certification</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-gray-700 font-medium">
            <Languages className="w-4 h-4 mr-2" />
            Languages
          </label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => setLanguages([...e.target.selectedOptions].map(opt => opt.value))}
            multiple
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="mandarin">Mandarin</option>
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="flex items-center text-gray-700 font-medium">
            <DollarSign className="w-4 h-4 mr-2" />
            Hourly Rate Range (${priceRange[0]} - ${priceRange[1]})
          </label>
          <div className="flex gap-4">
            <input
              type="range"
              min="20"
              max="100"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
              className="flex-1"
            />
            <input
              type="range"
              min="20"
              max="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        <Search className="w-5 h-5" />
        Find Caregivers
      </button>
    </form>
  );
};