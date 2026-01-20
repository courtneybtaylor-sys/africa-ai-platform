import type { Metadata } from 'next';
import { countries } from '@/lib/data/countries';
import { CountryClient } from './country-client';

interface PageProps {
  params: Promise<{ code: string }>;
}

export async function generateStaticParams() {
  return countries.map((country) => ({
    code: country.code.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  const country = countries.find((c) => c.code.toLowerCase() === code.toLowerCase());
  
  if (!country) {
    return { title: 'Country Not Found | AfriTrek' };
  }

  return {
    title: `${country.name} Travel Guide | AfriTrek`,
    description: `Explore ${country.name}: ${country.description} Capital: ${country.capital}. Get visa info, cost of living, safety guides and AI-powered trip planning.`,
    keywords: [
      `${country.name} travel`,
      `${country.name} visa`,
      `${country.name} relocation`,
      `${country.capital}`,
      `${country.region}`,
      'Africa travel',
      'African diaspora',
    ],
    openGraph: {
      title: `${country.name} Travel Guide | AfriTrek`,
      description: country.description,
      type: 'article',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${country.name} Travel Guide | AfriTrek`,
      description: country.description,
    },
  };
}

export default async function CountryPage({ params }: PageProps) {
  const { code } = await params;
  return <CountryClient code={code} />;
}
