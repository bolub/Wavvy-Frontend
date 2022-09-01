import React, { FC } from 'react';

const Plus: FC = (props) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M12 6L12 18' stroke='#222222' strokeLinecap='round' />
      <path d='M18 12L6 12' stroke='#222222' strokeLinecap='round' />
    </svg>
  );
};

export default Plus;
