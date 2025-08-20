import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SignInForm } from '@/domains/users/components/SignInForm';

export default function SignInPage() {
  return (
    <div className='min-h-screen flex items-center justify-center px-4 py-8' style={{backgroundColor: '#FFF4EA20'}}>
      <div className='w-full'>
        <Card className='shadow-lg'>
          <CardHeader className='text-center pb-6 px-8'>
            <Link href='/' className='inline-block mb-6'>
              <span className='text-2xl font-bold' style={{color: '#FF5B00'}}>JourneyPick</span>
            </Link>
            <CardTitle className='text-xl mb-2'>Welcome Back</CardTitle>
            <CardDescription className='text-sm px-2'>
              Sign in to your account to continue exploring Korean cultural experiences
            </CardDescription>
          </CardHeader>
          <CardContent className='pt-0 px-8 pb-8'>
            <SignInForm />
            <div className='mt-6 text-center text-sm'>
              <span style={{color: '#666666'}}>Don&apos;t have an account? </span>
              <Link href='/auth/signup' className='font-medium hover:underline' style={{color: '#FF5B00'}}>
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}