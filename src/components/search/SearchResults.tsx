import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { CaregiverGrid } from '../caregiver/CaregiverGrid';
import type { Caregiver } from '../../types/caregiver';

interface SearchResultsProps {
  searchParams: {
    location?: string;
    services?: string[];
    qualifications?: string[];
    languages?: string[];
    priceRange?: [number, number];
  };
}

export const SearchResults = ({ searchParams }: SearchResultsProps) => {
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    const fetchCaregivers = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from('caregivers')
          .select('*')
          .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1);

        if (searchParams.priceRange) {
          query = query
            .gte('hourly_rate', searchParams.priceRange[0])
            .lte('hourly_rate', searchParams.priceRange[1]);
        }

        if (searchParams.languages?.length) {
          query = query.contains('languages', searchParams.languages);
        }

        const { data, error } = await query;

        if (error) throw error;
        setCaregivers(data || []);
      } catch (error) {
        console.error('Error fetching caregivers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaregivers();
  }, [searchParams, page]);

  return (
    <div className="mt-8">
      <CaregiverGrid caregivers={caregivers} loading={loading} />
      
      <div className="mt-8 flex justify-center space-x-2">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page}</span>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={caregivers.length < ITEMS_PER_PAGE}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};