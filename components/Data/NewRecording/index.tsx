import { Box } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { CustomFolderData } from '../../../utils/GeneralProps';
import Stage1 from './Stage1';
import Stage2 from './Stage2';

export const NewRecording: FC<{
  currentFolder: CustomFolderData;
}> = ({ currentFolder }) => {
  const [currentStage, setCurrentStage] = useState('1');

  const [blobData, setBlob] = useState();
  const [duration, setDuration] = useState('');

  return (
    <Box px='24px'>
      {currentStage === '1' && (
        <Stage1
          setCurrentStage={setCurrentStage}
          setBlob={setBlob}
          setDuration={setDuration}
        />
      )}

      {currentStage === '2' && (
        <Stage2
          setCurrentStage={setCurrentStage}
          blobData={blobData}
          currentFolder={currentFolder}
          duration={duration}
        />
      )}
    </Box>
  );
};
