interface LanguagesListProps {
  languages: (string | null)[];
  className?: string;
}

export const LanguagesList = ({ languages, className = '' }: LanguagesListProps) => {
  const validLanguages = languages.filter(Boolean);
  
  if (validLanguages.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {validLanguages.map((lang, index) => (
        <span
          key={`${lang}-${index}`}
          className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
        >
          {lang}
        </span>
      ))}
    </div>
  );
};