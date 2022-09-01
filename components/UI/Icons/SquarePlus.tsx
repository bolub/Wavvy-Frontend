import React, { FC } from 'react';

const SquarePlus: FC = (props) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M3 9.4C3 7.15979 3 6.03968 3.43597 5.18404C3.81947 4.43139 4.43139 3.81947 5.18404 3.43597C6.03968 3 7.15979 3 9.4 3H14.6C16.8402 3 17.9603 3 18.816 3.43597C19.5686 3.81947 20.1805 4.43139 20.564 5.18404C21 6.03968 21 7.15979 21 9.4V14.6C21 16.8402 21 17.9603 20.564 18.816C20.1805 19.5686 19.5686 20.1805 18.816 20.564C17.9603 21 16.8402 21 14.6 21H9.4C7.15979 21 6.03968 21 5.18404 20.564C4.43139 20.1805 3.81947 19.5686 3.43597 18.816C3 17.9603 3 16.8402 3 14.6V9.4Z'
        fill='#2A4157'
        fillOpacity='0.24'
      />
      <path d='M12 8L12 16' stroke='#222222' strokeLinejoin='round' />
      <path d='M16 12L8 12' stroke='#222222' strokeLinejoin='round' />
    </svg>
  );
};

export default SquarePlus;
