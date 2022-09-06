import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { fetchRecordings } from '../../API/recordings';
import { List } from '../../components/Data';
import {
  allFolderRecordingsForPlayerState,
  folderState,
} from '../../recoil/folder';

const SingleFolder = () => {
  const currentFolderData = useRecoilValue(folderState);

  const [allFolderRecordingsForPlayer, setFolderRecordingsForPlayerState] =
    useRecoilState(allFolderRecordingsForPlayerState);

  const [allRec, setAllRec] = useState([]);

  const { query } = useRouter();

  const { data } = useQuery(
    ['recordings', query.uId],
    () =>
      // @ts-ignore
      fetchRecordings(query.uId, 'folder'),
    {
      onSuccess(data) {
        setAllRec(data);
        setFolderRecordingsForPlayerState({
          ...allFolderRecordingsForPlayer,
          recordings: data,
        });
      },
    }
  );

  const firstElement: any = allRec[0];
  const title =
    allRec?.length > 0
      ? firstElement?.attributes?.custom_folder?.data?.attributes?.name
      : '';

  return (
    <Box mb={32}>
      <List title={currentFolderData?.attributes?.name || title} data={data} />
    </Box>
  );
};

export default SingleFolder;
