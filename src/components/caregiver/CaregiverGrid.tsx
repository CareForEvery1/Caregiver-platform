import { CaregiverCard } from './CaregiverCard';
import type { Caregiver } from '../../types/caregiver';

interface CaregiverGridProps {
  caregivers: Caregiver[];
  loading?: boolean;
}

export const CaregiverGrid = ({ caregivers, loading }: CaregiverGridProps) => {
  if (loading) {
    return <div className="text-center py-8">Loading caregivers...</div>;
  }

  if (caregivers.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600">
        No caregivers found matching your criteria.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {caregivers.map((caregiver) => (
        <CaregiverCard key={caregiver.id} caregiver={caregiver} />
      ))}
    </div>
  );
};