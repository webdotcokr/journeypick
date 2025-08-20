'use client';

import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExperienceGrid } from '@/domains/products/components/ExperienceGrid';
import { useFeaturedExperiences } from '@/domains/products/hooks/useExperiences';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { experiences, isLoading } = useFeaturedExperiences();
  return (
    <div className='min-h-screen flex flex-col'>
      <main className='flex-1'>
        {/* Hero Section */}
        <section className='bg-gradient-to-br from-secondary to-white py-20'>
          <div className='container mx-auto px-4 text-center'>
            <h1 className='text-4xl md:text-5xl font-bold text-charcoal mb-6'>
              Discover Authentic Korean Cultural Experiences
            </h1>
            <p className='text-lg text-warm-gray mb-8 max-w-2xl mx-auto'>
              Connect with local planners and immerse yourself in Korea's rich culture 
              through unique experiences, classes, and tours.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/products'>
                <Button size='lg' className='text-lg px-8'>
                  Explore Experiences
                </Button>
              </Link>
              <Link href='/auth/signup'>
                <Button variant='secondary' size='lg' className='text-lg px-8'>
                  Become a Planner
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold text-center text-charcoal mb-12'>
              Why Choose JourneyPick?
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              <Card className='text-center hover:shadow-lg transition-shadow'>
                <CardHeader>
                  <div className='mx-auto w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4'>
                    <Search className='h-6 w-6 text-primary' />
                  </div>
                  <CardTitle>Easy Discovery</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Find the perfect cultural experience with our intuitive search and filtering system.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className='text-center hover:shadow-lg transition-shadow'>
                <CardHeader>
                  <div className='mx-auto w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4'>
                    <Users className='h-6 w-6 text-primary' />
                  </div>
                  <CardTitle>Local Planners</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Connect directly with verified local planners who know Korea best.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className='text-center hover:shadow-lg transition-shadow'>
                <CardHeader>
                  <div className='mx-auto w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4'>
                    <Calendar className='h-6 w-6 text-primary' />
                  </div>
                  <CardTitle>Flexible Booking</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Book experiences that fit your schedule with real-time availability.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className='text-center hover:shadow-lg transition-shadow'>
                <CardHeader>
                  <div className='mx-auto w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4'>
                    <MapPin className='h-6 w-6 text-primary' />
                  </div>
                  <CardTitle>Authentic Experiences</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Discover genuine Korean culture through carefully curated experiences.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Experiences Section */}
        <section className='py-16 bg-white'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-charcoal mb-4'>
                Featured Experiences
              </h2>
              <p className='text-lg text-warm-gray max-w-2xl mx-auto'>
                Discover our most popular and highly-rated cultural experiences
              </p>
            </div>
            
            <ExperienceGrid experiences={experiences} loading={isLoading} />
            
            <div className='text-center mt-8'>
              <Link href='/products'>
                <Button variant='secondary' size='lg'>
                  View All Experiences
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='bg-primary py-16'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-3xl font-bold text-white mb-4'>
              Ready to Start Your Korean Adventure?
            </h2>
            <p className='text-lg text-white/90 mb-8 max-w-2xl mx-auto'>
              Join thousands of travelers who have discovered authentic Korean culture through our platform.
            </p>
            <Link href='/products'>
              <Button variant='secondary' size='lg' className='text-lg px-8 bg-white text-primary hover:bg-white/90'>
                Get Started Today
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
