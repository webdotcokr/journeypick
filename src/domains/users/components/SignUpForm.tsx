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

const signUpSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  role: z.enum(['tourist', 'planner']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      role: 'tourist',
    },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    setError(null);

    const { error } = await signUp({
      email: data.email,
      password: data.password,
      full_name: data.full_name,
      role: data.role,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push('/auth/signin');
      }, 2000);
    }
  };

  if (success) {
    return (
      <div className='text-center space-y-4'>
        <div className='p-4 bg-green/10 text-green rounded-md'>
          Account created successfully! Please check your email to verify your account.
        </div>
        <p className='text-warm-gray'>
          Redirecting to sign in page...
        </p>
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormItem>
        <FormLabel htmlFor='full_name'>Full Name</FormLabel>
        <Input
          id='full_name'
          type='text'
          placeholder='Enter your full name'
          {...register('full_name')}
        />
        {errors.full_name && <FormMessage>{errors.full_name.message}</FormMessage>}
      </FormItem>

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
        <FormLabel>I want to join as</FormLabel>
        <div className='flex gap-4'>
          <label className='flex items-center gap-2 cursor-pointer'>
            <input
              type='radio'
              value='tourist'
              {...register('role')}
              className='text-primary focus:ring-primary'
            />
            <span className='text-sm'>Tourist (Book experiences)</span>
          </label>
          <label className='flex items-center gap-2 cursor-pointer'>
            <input
              type='radio'
              value='planner'
              {...register('role')}
              className='text-primary focus:ring-primary'
            />
            <span className='text-sm'>Planner (Create experiences)</span>
          </label>
        </div>
        {errors.role && <FormMessage>{errors.role.message}</FormMessage>}
      </FormItem>

      <FormItem>
        <FormLabel htmlFor='password'>Password</FormLabel>
        <Input
          id='password'
          type='password'
          placeholder='Create a password'
          {...register('password')}
        />
        {errors.password && <FormMessage>{errors.password.message}</FormMessage>}
      </FormItem>

      <FormItem>
        <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
        <Input
          id='confirmPassword'
          type='password'
          placeholder='Confirm your password'
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && <FormMessage>{errors.confirmPassword.message}</FormMessage>}
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
        {isLoading ? 'Creating Account...' : `Sign Up as ${selectedRole === 'tourist' ? 'Tourist' : 'Planner'}`}
      </Button>
    </Form>
  );
}