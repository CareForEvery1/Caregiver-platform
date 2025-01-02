import { Users, Award, Clock, Star } from 'lucide-react';

export const Stats = () => {
  const stats = [
    {
      icon: Users,
      value: '10,000+',
      label: 'Caregivers',
    },
    {
      icon: Award,
      value: '95%',
      label: 'Certified',
    },
    {
      icon: Clock,
      value: '24/7',
      label: 'Support',
    },
    {
      icon: Star,
      value: '4.8/5',
      label: 'Rating',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="flex justify-center mb-2">
            <stat.icon className="w-8 h-8 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          <div className="text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};