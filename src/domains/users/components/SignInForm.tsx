'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '../hooks/useAuth';

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    setError(null);

    const { error } = await signIn(data);

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      router.push('/');
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormItem>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Input
          id='email'
          type='email'
          placeholder='Enter your email'
          {...register('email')}
        />
        {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
      </FormItem>

      <FormItem>
        <FormLabel htmlFor='password'>Password</FormLabel>
        <Input
          id='password'
          type='password'
          placeholder='Enter your password'
          {...register('password')}
        />
        {errors.password && <FormMessage>{errors.password.message}</FormMessage>}
      </FormItem>

      {error && (
        <FormMessage>{error}</FormMessage>
      )}

      <Button
        type='submit'
        size='lg'
        className='w-full'
        disabled={isLoading}
        style={{
          backgroundColor: '#FF5B00',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          fontSize: '16px',
          fontWeight: '600',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.5 : 1
        }}
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </Form>
  );
}