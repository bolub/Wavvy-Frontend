import {
  Container,
  Flex,
  HStack,
  IconButton,
  Tooltip,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Box,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import {
  RiSkipBackLine,
  RiSkipForwardLine,
  RiVolumeDownLine,
  RiVolumeMuteLine,
} from 'react-icons/ri';
import Pause from '../UI/Icons/Pause';
import { useAudio } from 'react-use';
import Play from '../UI/Icons/Play';
import { useRecoilState, useRecoilValue } from 'recoil';
import { allFolderRecordingsForPlayerState } from '../../recoil/folder';

const BottomPlayer = () => {
  const [allFolderRecordingsForPlayer, setAllFolderRecordingsForPlayer] =
    useRecoilState(allFolderRecordingsForPlayerState);

  const { index: playingIndex, recordings } = allFolderRecordingsForPlayer;

  const audioToPlay = useMemo(() => {
    return recordings[playingIndex ?? 0];
  }, [recordings, playingIndex]);

  const [audio, state, controls] = useAudio({
    src: `${audioToPlay?.attributes?.audio?.data?.attributes?.url}`,
    autoPlay: false,
  });

  return (
    <Flex
      pt={6}
      pb={4}
      bg='white'
      w='full'
      pos='fixed'
      bottom={0}
      flexDir='column'
    >
      {audio}
      <Slider
        w='full'
        onChange={(val) => {
          controls.seek(val);
        }}
        aria-label='slider-ex-1'
        value={state?.time}
        max={
          audioToPlay
            ? JSON?.parse(audioToPlay?.attributes?.durationJson)?.seconds
            : 0
        }
        mb={0}
        mt={-2}
        step={0.0001}
        isDisabled={!audioToPlay}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb
          border='1px'
          ml='10px'
          borderColor={'blue.500'}
          boxSize={5}
        />
      </Slider>

      <Flex w='full' mx='auto' maxW={'7xl'}>
        <Flex my='auto' ml='auto' flexDir={'column'}>
          <Text
            textAlign={'center'}
            mx='auto'
            fontSize={'sm'}
            mb={3}
            mt={1}
            color='gray.700'
            fontWeight={'semibold'}
          >
            {audioToPlay?.attributes?.title}
          </Text>
          <HStack spacing={'38px'} w='fit-content'>
            <IconButton
              aria-label='Previous'
              icon={<RiSkipBackLine />}
              rounded='full'
              // size={'lg'}
              fontSize='xl'
              colorScheme={'gray'}
              variant='ghost'
              isDisabled={playingIndex <= 0 || !audioToPlay}
              onClick={() => {
                setAllFolderRecordingsForPlayer({
                  ...allFolderRecordingsForPlayer,
                  index: playingIndex - 1,
                });
              }}
            />

            <IconButton
              aria-label='Pause'
              icon={state.paused ? <Play /> : <Pause />}
              rounded='full'
              size={'lg'}
              onClick={() => {
                if (state.paused) {
                  controls.play();
                }

                if (state.playing) {
                  controls.pause();
                }
              }}
              isDisabled={!audioToPlay}
            />

            <IconButton
              aria-label='Next'
              icon={<RiSkipForwardLine />}
              rounded='full'
              // size={'lg'}
              fontSize='xl'
              colorScheme={'gray'}
              variant='ghost'
              isDisabled={
                playingIndex === recordings?.length - 1 || !audioToPlay
              }
              onClick={() => {
                setAllFolderRecordingsForPlayer({
                  ...allFolderRecordingsForPlayer,
                  index: playingIndex + 1,
                });
              }}
            />
          </HStack>
        </Flex>

        <IconButton
          ml='auto'
          mt={9}
          onClick={() => {
            if (state.muted) {
              controls.unmute();
            } else {
              controls.mute();
            }
          }}
          aria-label='Next'
          icon={state?.muted ? <RiVolumeDownLine /> : <RiVolumeMuteLine />}
          rounded='full'
          fontSize='xl'
          colorScheme={'gray'}
          variant='ghost'
        />
      </Flex>
    </Flex>
  );
};

export default BottomPlayer;
