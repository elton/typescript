import { HiHome } from 'react-icons/hi';
import { TiArrowBack } from 'react-icons/ti';
import { Link } from 'react-router-dom';

const BackTo = (url: Path) => {
  return (
    <div className='flex items-center space-x-1 mt-4 text-neutral-500  hover:text-sky-600'>
      {url.pathname === '/' ? <HiHome /> : <TiArrowBack />}

      <Link to={url.pathname} className='underline'>
        {url.pathname === '/'
          ? 'Back to home'
          : 'Back to ' + url.pathname.replace('/', '')}
      </Link>
    </div>
  );
};

export default BackTo;
