import {
  Center,
  HStack,
  Icon,
  IconButton,
  Text,
  chakra,
  Tooltip,
} from '@chakra-ui/react';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { BsStopFill } from 'react-icons/bs';
import Checkmark from '../../UI/Icons/Checkmark';
import Play from '../../UI/Icons/Play';
import Reload from '../../UI/Icons/Reload';
import useMediaRecorder from '@wmik/use-media-recorder';
import Pause from '../../UI/Icons/Pause';
import NewRecordingPlayer from './NewRecordingPlayer';
import { useStopwatch } from 'react-timer-hook';

interface durationProps {
  text: string;
  json: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}
interface Props {
  setCurrentStage: Dispatch<SetStateAction<string>>;
  setBlob: any;
  setDuration: Dispatch<SetStateAction<durationProps>>;
}

const Stage1: FC<Props> = ({ setCurrentStage, setBlob, setDuration }) => {
  let {
    status,
    mediaBlob,
    stopRecording,
    clearMediaStream,
    clearMediaBlob,
    startRecording,
    pauseRecording,
    resumeRecording,
  } = useMediaRecorder({
    recordScreen: false,
    blobOptions: { type: 'audio/wav' },
    mediaStreamConstraints: { audio: true },
  });

  const { seconds, minutes, hours, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  return (
    <Center py='74px' pb='82px' textAlign={'center'} flexDir='column'>
      {/* Audio */}
      {status === 'stopped' && mediaBlob ? (
        <NewRecordingPlayer url={URL?.createObjectURL(mediaBlob)} />
      ) : (
        <chakra.button
          rounded={'full'}
          borderWidth='1px'
          borderColor={'blue.500'}
          bg='white'
          // @ts-ignore
          onClick={() => {
            if (status === 'idle' || status === 'stopped') {
              startRecording();
              start();
            }

            if (status === 'paused') {
              resumeRecording();
              start();
            }

            if (status === 'recording') {
              pauseRecording();
              pause();
            }
          }}
          display='flex'
          justifyContent={'center'}
          alignItems='center'
          className={status === 'recording' ? 'Rec' : ''}
        >
          <Center
            w='150px'
            h='150px'
            rounded={'full'}
            borderWidth='1px'
            bg={'blue.500'}
            color='white'
            // className=''
          >
            {(status === 'idle' || status === 'stopped') && (
              <svg
                width='172'
                height='172'
                viewBox='0 0 172 172'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle
                  cx='86'
                  cy='86'
                  r='85.5'
                  fill='#3182CE'
                  stroke='#F2F2F2'
                />
                <rect
                  x='66.75'
                  y='57.375'
                  width='37.5'
                  height='50'
                  rx='17'
                  stroke='#F2F2F2'
                  strokeWidth='5'
                  strokeLinejoin='round'
                />
                <path
                  d='M86 116.75V107.375'
                  stroke='#F2F2F2'
                  strokeWidth='5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M78.25 88.625H68.875'
                  stroke='#F2F2F2'
                  strokeWidth='5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M102.25 88.625H96'
                  stroke='#F2F2F2'
                  strokeWidth='5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M77.25 76.125H67.875'
                  stroke='#F2F2F2'
                  strokeWidth='5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M102.25 76.125H96'
                  stroke='#F2F2F2'
                  strokeWidth='5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <rect
                  x='48.5'
                  y='48.5'
                  width='74'
                  height='74'
                  stroke='#3182CE'
                />
              </svg>
            )}

            {/* Play recording */}
            {status === 'paused' && <Icon as={Play} fontSize='35px' />}

            {/* Pause recording */}
            {status === 'recording' && <Icon as={Pause} fontSize='48px' />}
          </Center>
        </chakra.button>
      )}

      {/* Timer */}
      <Text fontWeight={'bold'} color='gray.700' fontSize={'3xl'} mt='24px'>
        <span>
          {hours < 10 && 0}
          {hours}
        </span>
        :
        <span>
          {minutes < 10 && 0}
          {minutes}
        </span>
        :
        <span>
          {seconds < 10 && 0}
          {seconds}
        </span>
      </Text>

      {/* buttons */}
      <HStack spacing={'38px'} mt='34px'>
        <Tooltip fontSize={'xs'} label='Clear Recording'>
          <IconButton
            aria-label='Stop'
            icon={<Reload />}
            rounded='full'
            size={'lg'}
            colorScheme='gray'
            variant={'ghost'}
            // @ts-ignore
            isDisabled={!mediaBlob}
            onClick={() => {
              clearMediaStream();
              clearMediaBlob();

              reset();
              pause();
            }}
          />
        </Tooltip>

        <Tooltip fontSize={'xs'} label='Stop Recording'>
          <IconButton
            aria-label='Stop'
            icon={<BsStopFill size='24px' />}
            rounded='full'
            size={'lg'}
            onClick={() => {
              stopRecording();
              pause();
              clearMediaStream();
            }}
          />
        </Tooltip>

        <Tooltip fontSize={'xs'} label='Finish Recording'>
          <IconButton
            aria-label='Finish'
            icon={<Checkmark />}
            rounded='full'
            size={'lg'}
            colorScheme='gray'
            variant={'ghost'}
            // @ts-ignore
            isDisabled={!mediaBlob}
            onClick={() => {
              const duration = `${hours < 10 ? 0 : ''}${hours}:${
                minutes < 10 ? 0 : ''
              }${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;

              stopRecording();
              clearMediaStream();
              setCurrentStage('2');
              setBlob(mediaBlob);
              setDuration({
                text: duration,
                json: {
                  hours,
                  minutes,
                  seconds,
                },
              });
            }}
          />
        </Tooltip>
      </HStack>
    </Center>
  );
};

export default Stage1;
