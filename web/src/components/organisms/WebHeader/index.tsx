import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Menu from './menu';
import { Button } from '../../atoms/Button';
import { Icon } from './../../Icon';
import { Heading } from '@/components/atoms/Typography';
import { useBreakpoint } from '@/hooks/useBreakpoint';

const WebHeader: React.FC = () => {
  const [mobileMenu, toggleMobileMenu] = useState(false);

  const bp = useBreakpoint();

  const isDesktop = bp === 'xl' || bp === '2xl';

useEffect(() => {
  if (isDesktop && mobileMenu) {
    toggleMobileMenu(false);
  }
}, [isDesktop, mobileMenu]);

  return (
    <header className={clsx('container mx-auto py-4 flex justify-between')}>
        <div className={clsx('flex items-center gap-x-12')}>
          <Icon name="Logo" className="w-[44] h-auto" />
          <Menu classname='hidden xl:flex' />
        </div>
        <div className={clsx('flex items-center gap-x-4 md:gap-x-8')}>
          <div className={clsx('flex gap-x-4 hidden xl:flex')}>
            <Button size="small" shape="rounded" color="secondary" className='gap-1'><Icon name='SignIn'/> Sign in</Button>  
            <Button size="small" shape="rounded" color="blue" className='gap-1'><Icon name='User' /> Sign up</Button>  
          </div>
          <Button color='transparent' className='xl:!hidden' onClick={()=>{toggleMobileMenu(!mobileMenu)}}>
            <span className="
              flex w-8 h-0.5 bg-gray-700 relative 
              before:content-[''] before:flex before:w-8 before:h-0.5 before:bg-gray-700 before:absolute before:top-2
              after:content-[''] after:flex after:w-8 after:h-0.5 after:bg-gray-700 after:absolute after:bottom-2
              " />
          </Button>
        </div>
        { mobileMenu &&(
          <div className='fixed inset-0 bg-black bg-opacity-50 z-[1040] transition-opacity duration-300'>
            <div className='h-full w-[300px] bg-white float-right p-4'>
                <div className='flex justify-between mb-8'>
                  <Heading variant='h3'>Menu</Heading>
                  <Icon name='IconX' className='w-[30px] h-auto cursor-pointer' onClick={()=>{toggleMobileMenu(false)}}/>
                </div>
                <div className='mb-8'>
                    <Menu direction='col' />
                </div>
            </div>
          </div>
        )}
    </header>
  );
};

export default WebHeader;
