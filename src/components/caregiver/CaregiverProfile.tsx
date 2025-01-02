import { Star, Award, Languages, Clock, DollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import type { Caregiver, Review, ReviewCategory } from '../../types/caregiver';
import { ProfileImage } from '../common/ProfileImage';

export const CaregiverProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [caregiver, setCaregiver] = useState<Caregiver | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [categories, setCategories] = useState<ReviewCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [caregiverData, reviewsData, categoriesData] = await Promise.all([
          supabase.from('caregivers').select('*').eq('id', id).single(),
          supabase.from('reviews').select('*').eq('caregiver_id', id),
          supabase.from('review_categories').select('*')
        ]);

        if (caregiverData.data) {
          setCaregiver(caregiverData.data);
        }
        if (reviewsData.data) {
          setReviews(reviewsData.data);
        }
        if (categoriesData.data) {
          setCategories(categoriesData.data);
        }
      } catch (error) {
        console.error('Error fetching caregiver data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading profile...</div>;
  }

  if (!caregiver) {
    return <div className="text-center py-8">Caregiver not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:underline"
      >
        ← Back to search results
      </button>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-6">
          <ProfileImage
            src={caregiver.profile_image}
            alt={caregiver.name}
            size="lg"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{caregiver.name}</h1>
            <div className="flex items-center mt-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-2 text-gray-600">
                {caregiver.average_rating?.toFixed(1)} ({caregiver.review_count} reviews)
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {caregiver.languages.filter(Boolean).map((lang, index) => (
                <span
                  key={`${lang}-${index}`}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-blue-600 mr-2" />
            <div>
              <div className="font-medium">Experience</div>
              <div className="text-gray-600">{caregiver.years_experience} years</div>
            </div>
          </div>
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
            <div>
              <div className="font-medium">Hourly Rate</div>
              <div className="text-gray-600">${caregiver.hourly_rate}/hour</div>
            </div>
          </div>
          <div className="flex items-center">
            <Award className="w-5 h-5 text-blue-600 mr-2" />
            <div>
              <div className="font-medium">Background Check</div>
              <div className="text-gray-600">
                {caregiver.background_check_verified ? 'Verified' : 'Pending'}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">About Me</h2>
          <p className="text-gray-600">{caregiver.bio}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-6">
                <p className="text-gray-600 mb-2">{review.positive_feedback}</p>
                <div className="text-sm text-gray-500">
                  {new Date(review.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Book Now
        </button>
      </div>
    </div>
  );
};