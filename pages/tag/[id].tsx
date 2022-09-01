import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { fetchRecordings } from '../../API/recordings';
import { List } from '../../components/Data';
import { tagsState } from '../../recoil/tags';

const SingleTag = () => {
  const currentTagdata = useRecoilValue(tagsState);

  const { query } = useRouter();

  const { data } = useQuery(['tags', query.uId], () =>
    // @ts-ignore
    fetchRecordings(query.uId, 'tags')
  );

  return (
    <Box mb={32}>
      <List
        title={currentTagdata?.attributes?.title || query?.id}
        data={data}
      />
    </Box>
  );
};

export default SingleTag;
