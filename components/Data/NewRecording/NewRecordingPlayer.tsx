import React, { FC } from 'react';

import { Center, Icon, chakra } from '@chakra-ui/react';
import { useAudio } from 'react-use';
import Play from '../../UI/Icons/Play';
import Pause from '../../UI/Icons/Pause';

const NewRecordingPlayer: FC<any> = ({ url }) => {
  const [audio, state, controls] = useAudio({
    src: url,
    autoPlay: false,
    id: 'newAudio',
  });

  return (
    <>
      {audio}
      <chakra.button
        // w='162px'
        // h='162px'
        rounded={'full'}
        borderWidth='1px'
        borderColor={'blue.500'}
        bg='white'
        onClick={() => {
          if (state.paused) {
            controls.play();
          }

          if (state.playing) {
            controls.pause();
          }
        }}
        display='flex'
        justifyContent={'center'}
        alignItems='center'
      >
        <Center
          w='150px'
          h='150px'
          rounded={'full'}
          borderWidth='1px'
          bg={'blue.500'}
          color='white'
        >
          {/* Play recording */}
          {state.paused && <Icon as={Play} fontSize='35px' />}

          {/* Pause recording */}
          {state.playing && <Icon as={Pause} fontSize='48px' />}
        </Center>
      </chakra.button>
    </>
  );
};

export default NewRecordingPlayer;
