import React, { FC } from 'react';

const ChevronRight: FC = (props) => {
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
        d='M15 12L15.3536 11.6464L15.7071 12L15.3536 12.3536L15 12ZM9.35355 5.64645L15.3536 11.6464L14.6464 12.3536L8.64645 6.35355L9.35355 5.64645ZM15.3536 12.3536L9.35355 18.3536L8.64645 17.6464L14.6464 11.6464L15.3536 12.3536Z'
        fill='#222222'
      />
    </svg>
  );
};

export default ChevronRight;
