import { notFound } from 'next/navigation';
import { ExperienceService } from '@/domains/products/services/experienceService';
import { ProductDetailClient } from '@/domains/products/components/ProductDetailClient';
import { Metadata } from 'next';

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getExperience(id: string) {
  try {
    const experience = await ExperienceService.getExperienceById(id);
    return experience;
  } catch (error) {
    console.error('Error fetching experience:', error);
    return null;
  }
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const experience = await getExperience(id);

  if (!experience) {
    return {
      title: 'Experience Not Found | 저니픽',
    };
  }

  return {
    title: `${experience.title} | 저니픽`,
    description: experience.description,
    keywords: `${experience.title}, Korean experience, ${experience.category?.name}, ${experience.location_text}`,
    openGraph: {
      title: experience.title,
      description: experience.description,
      images: experience.thumbnail_url ? [
        {
          url: experience.thumbnail_url,
          width: 1200,
          height: 630,
          alt: experience.title,
        }
      ] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: experience.title,
      description: experience.description,
      images: experience.thumbnail_url ? [experience.thumbnail_url] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const experience = await getExperience(id);

  if (!experience) {
    notFound();
  }

  // Fetch related experiences (same category, different experience)
  const relatedExperiences = experience.category_id ? 
    await ExperienceService.getExperiences(
      { category: experience.category_id.toString() }, 
      1, 
      4
    ).then(data => data.experiences.filter(exp => exp.id !== experience.id)) : 
    [];

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductDetailClient 
        experience={experience} 
        relatedExperiences={relatedExperiences}
      />
    </div>
  );
}