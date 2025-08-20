import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SignUpForm } from '@/domains/users/components/SignUpForm';

export default function SignUpPage() {
  return (
    <div className='min-h-screen flex items-center justify-center px-4 py-8' style={{backgroundColor: '#FFF4EA20'}}>
      <div className='w-full'>
        <Card className='shadow-lg'>
          <CardHeader className='text-center pb-6 px-8'>
            <Link href='/' className='inline-block mb-6'>
              <span className='text-2xl font-bold' style={{color: '#FF5B00'}}>JourneyPick</span>
            </Link>
            <CardTitle className='text-xl mb-2'>Join JourneyPick</CardTitle>
            <CardDescription className='text-sm px-2'>
              Create your account to start exploring or sharing Korean cultural experiences
            </CardDescription>
          </CardHeader>
          <CardContent className='pt-0 px-8 pb-8'>
            <SignUpForm />
            <div className='mt-6 text-center text-sm'>
              <span style={{color: '#666666'}}>Already have an account? </span>
              <Link href='/auth/signin' className='font-medium hover:underline' style={{color: '#FF5B00'}}>
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}