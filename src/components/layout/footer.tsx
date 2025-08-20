import Link from 'next/link';

export function Footer() {
  return (
    <footer className='bg-white border-t border-light-gray mt-auto'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Logo and Description */}
          <div className='col-span-1 md:col-span-2'>
            <Link href='/' className='flex items-center space-x-2'>
              <span className='text-xl font-bold text-primary'>JourneyPick</span>
            </Link>
            <p className='mt-2 text-sm text-warm-gray max-w-md'>
              Connect with local Korean cultural experiences. Discover authentic tours, 
              classes, and activities with trusted local planners.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='font-semibold text-charcoal mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='/about' className='text-sm text-warm-gray hover:text-primary'>
                  About Us
                </Link>
              </li>
              <li>
                <Link href='/faq' className='text-sm text-warm-gray hover:text-primary'>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href='/contact' className='text-sm text-warm-gray hover:text-primary'>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className='font-semibold text-charcoal mb-4'>Legal</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='/terms' className='text-sm text-warm-gray hover:text-primary'>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href='/privacy' className='text-sm text-warm-gray hover:text-primary'>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className='mt-8 pt-8 border-t border-light-gray'>
          <p className='text-center text-sm text-warm-gray'>
            © 2024 JourneyPick. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}