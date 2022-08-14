import { GoArrowSmallRight } from 'react-icons/go';
import { Link } from 'react-router-dom';

const Component = () => {
  return (
    <div className='container mx-auto my-2'>
      <h2 className='text-2xl mb-2'>Component</h2>

      <nav>
        <div className='flex items-center'>
          <GoArrowSmallRight className='text-pink-500' />
          <Link to='props' className='underline text-sky-600'>
            Component Props
          </Link>
        </div>
        <div className='flex items-center'>
          <GoArrowSmallRight className='text-pink-500' />
          <Link to='states-mgt' className='underline text-sky-600'>
            Component State
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Component;
