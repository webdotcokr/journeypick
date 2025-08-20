'use client';

import Link from 'next/link';
import { Search, User, Menu, LogOut, Settings, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/domains/users/hooks/useAuth';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export function Header() {
  const { user, profile, signOut, loading } = useAuth();

  return (
    <header className='sticky top-0 z-50 w-full bg-white border-b border-light-gray shadow-sm'>
      <div className='container mx-auto px-4'>
        <div className='flex h-18 items-center justify-between' style={{height: '72px'}}>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-2'>
            <span className='text-2xl font-bold text-primary'>JourneyPick</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className='hidden md:flex flex-1 max-w-md mx-8'>
            <div className='relative w-full'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-warm-gray' />
              <Input 
                type='search'
                placeholder='Search experiences...'
                className='pl-10'
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <div className='hidden md:flex items-center space-x-4'>
            {loading ? (
              <div className='flex items-center space-x-4'>
                <div className='h-8 w-16 bg-light-gray animate-pulse rounded'></div>
                <div className='h-8 w-16 bg-light-gray animate-pulse rounded'></div>
              </div>
            ) : user && profile ? (
              <div className='flex items-center space-x-4'>
                {profile.role === 'planner' && (
                  <Link href='/planner/dashboard'>
                    <Button variant='tertiary' size='sm'>
                      Dashboard
                    </Button>
                  </Link>
                )}
                
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <Button variant='tertiary' size='sm' className='flex items-center space-x-2'>
                      <User className='h-4 w-4' />
                      <span>{profile.full_name}</span>
                    </Button>
                  </DropdownMenu.Trigger>
                  
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className='min-w-[200px] bg-white rounded-md p-2 shadow-lg border border-light-gray'
                      align='end'
                      sideOffset={5}
                    >
                      <DropdownMenu.Item asChild>
                        <Link
                          href='/my-page'
                          className='flex items-center space-x-2 px-3 py-2 text-sm rounded hover:bg-secondary cursor-pointer'
                        >
                          <Settings className='h-4 w-4' />
                          <span>My Page</span>
                        </Link>
                      </DropdownMenu.Item>
                      
                      <DropdownMenu.Item asChild>
                        <Link
                          href='/my-page/bookings'
                          className='flex items-center space-x-2 px-3 py-2 text-sm rounded hover:bg-secondary cursor-pointer'
                        >
                          <Calendar className='h-4 w-4' />
                          <span>My Bookings</span>
                        </Link>
                      </DropdownMenu.Item>
                      
                      <DropdownMenu.Separator className='h-px bg-light-gray my-1' />
                      
                      <DropdownMenu.Item
                        onClick={signOut}
                        className='flex items-center space-x-2 px-3 py-2 text-sm rounded hover:bg-secondary cursor-pointer text-red'
                      >
                        <LogOut className='h-4 w-4' />
                        <span>Sign Out</span>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>
            ) : (
              <div className='flex items-center space-x-4'>
                <Link href='/auth/signin'>
                  <Button variant='tertiary' size='sm'>
                    Sign In
                  </Button>
                </Link>
                <Link href='/auth/signup'>
                  <Button size='sm'>
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button variant='tertiary' size='sm' className='md:hidden'>
            <Menu className='h-4 w-4' />
          </Button>
        </div>

        {/* Mobile Search Bar */}
        <div className='md:hidden pb-4'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-warm-gray' />
            <Input 
              type='search'
              placeholder='Search experiences...'
              className='pl-10'
            />
          </div>
        </div>
      </div>
    </header>
  );
}