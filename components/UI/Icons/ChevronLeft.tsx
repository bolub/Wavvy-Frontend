import React, { FC } from 'react';

const ChevronLeft: FC = (props) => {
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
        d='M9 12L8.64645 11.6464L8.29289 12L8.64645 12.3536L9 12ZM14.6464 5.64645L8.64645 11.6464L9.35355 12.3536L15.3536 6.35355L14.6464 5.64645ZM8.64645 12.3536L14.6464 18.3536L15.3536 17.6464L9.35355 11.6464L8.64645 12.3536Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default ChevronLeft;
