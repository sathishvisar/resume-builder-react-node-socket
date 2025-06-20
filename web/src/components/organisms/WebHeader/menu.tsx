import React from 'react';
import { Navigation } from './../../atoms/Typography';
import { useNavigate } from 'react-router-dom';

const manu = [
  { link: '/', name: 'Home' },
  { link: '/about-us', name: 'About us' },
  { link: '/contact', name: 'Contact' },
];

interface Props {
  classname?: string;
  direction?: string;
}

const Menu: React.FC<Props> = ({classname, direction}) => {
  const navigate = useNavigate();

  return (
    <nav className={classname}>
      <ul className={`flex ${direction === 'col' ? 'flex-col space-y-4' : 'flex-row gap-x-16'}`}>
        {manu.map((item, index) => (
          <li key={index}>
            <Navigation onClick={() => navigate(item.link, {replace: true})} className='text-gray-800'>{item.name}</Navigation>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;