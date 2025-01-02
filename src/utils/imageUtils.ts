// Generate a random Unsplash profile image URL
export const getRandomProfileImage = (seed: number): string => {
  const imageIds = [
    'rDEOVtE7vOs',
    'ILip77SbmOE',
    'QXevDflbl8A',
    'O3ymvT7Wf9U',
    'WNoLnJo7tS8',
    'QdAAasrZhdk',
    'C8Ta0gwPbQg',
    'JS9fxEjP5Mk',
    'i2hoD-C2RUA',
    'IF9TK5Uy-KI'
  ];
  
  // Use seed to consistently get the same image for the same caregiver
  const index = seed % imageIds.length;
  return `https://images.unsplash.com/photo-${imageIds[index]}?w=400&h=400&fit=crop&crop=faces`;
};