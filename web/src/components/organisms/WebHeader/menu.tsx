import React from 'react';
import { Navigation } from './../../atoms/Typography';

const manu = [
  { link: '/', name: 'Home' },
  { link: '/pricing', name: 'Pricing' },
  { link: '/docs', name: 'Docs' },
  { link: '/contact', name: 'Contact' },
];

interface Props {
  classname?: string;
  direction?: string;
}

const Menu: React.FC<Props> = ({classname, direction}) => {
  return (
    <nav className={classname}>
      <ul className={`flex ${direction === 'col' ? 'flex-col space-y-4' : 'flex-row space-x-4'}`}>
        {manu.map((item, index) => (
          <li key={index}>
            <Navigation href={item.link} className='text-gray-800'>{item.name}</Navigation>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;