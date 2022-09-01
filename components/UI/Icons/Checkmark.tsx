import React, { FC } from 'react';

const Checkmark: FC = (props) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M5 14L9 17L18 6' stroke='currentColor' strokeWidth='2' />
    </svg>
  );
};

export default Checkmark;
