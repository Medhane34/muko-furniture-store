import BodyText from "./BodyText";
import MainHeadline from "./MainHeadline";

// components/atoms/SectionHeading.tsx
interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
}

export function SectionHeading({ 
  title, 
  subtitle, 
  level = 'h2', 
  className = '' 
}: SectionHeadingProps) {
  const HeadingTag = level;
  
  return (
    <div className={`space-y-2 ${className}`}>
        <MainHeadline>{title}</MainHeadline>
     {/*  <HeadingTag className="font-sans text-heading font-bold text-gray-900 dark:text-gray-100">
        {title}
      </HeadingTag> */}
      {subtitle && (
        <BodyText>
          {subtitle}
        </BodyText>
      )}
    </div>
  );
}