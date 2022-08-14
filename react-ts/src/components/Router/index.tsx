import React from 'react';
import { GoArrowSmallRight } from 'react-icons/go';
import { Link, Outlet } from 'react-router-dom';

const Router = () => {
  return (
    <div className='container mx-auto my-2'>
      <h2 className='text-2xl mb-2'>Router</h2>
      <nav>
        <div className='flex items-center'>
          <GoArrowSmallRight className='text-pink-500' />
          <Link to='params/1' className='underline text-sky-600'>
            Reading Parameters
          </Link>
        </div>
        <div className='flex items-center'>
          <GoArrowSmallRight className='text-pink-500' />
          <Link to='navigation' className='underline text-sky-600'>
            Navigation
          </Link>
        </div>
      </nav>

   
    </div>
  );
};

export default Router;
