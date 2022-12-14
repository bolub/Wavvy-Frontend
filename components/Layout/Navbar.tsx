import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  chakra,
  Container,
  Avatar,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
// import { useRef } from 'react';
import { logout } from '../../utils/functions';
import Burger from '../UI/Icons/Burger';
import Left from './Left';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <chakra.nav bg='blue.500' h='46px'>
        <Container maxW='7xl' display='flex' alignItems={'center'} h='46px'>
          <IconButton
            aria-label='Menu'
            icon={<Burger />}
            // variant='ghost'
            size='sm'
            colorScheme={''}
            my='auto'
            mr={2}
            display={{ md: 'none' }}
            onClick={onOpen}
          />

          <chakra.svg
            width='28px'
            height='28px'
            viewBox='0 0 28 28'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clipPath='url(#clip0_87_5767)'>
              <path
                d='M14 0C6.2854 0 0 6.2854 0 14C0 21.7146 6.2854 28 14 28C21.7146 28 28 21.7146 28 14C28 6.2854 21.7146 0 14 0ZM14 2.93489C19.9404 2.93489 24.7609 7.57325 25.0512 13.4393C23.9507 13.1314 22.805 12.5335 21.5257 11.9295C20.1297 11.2704 18.514 10.5926 16.6607 10.5926C14.8073 10.5926 13.1914 11.2704 11.7954 11.9295C10.4067 12.5852 9.17529 13.2345 7.98835 13.5125C6.75324 13.8017 5.4159 13.733 4.21695 13.3187C3.79682 13.1735 3.39022 12.9832 3.00433 12.7561C3.61919 7.21724 8.29228 2.93489 14 2.93489ZM16.6607 13.5275C17.7683 13.5275 18.9912 13.9783 20.2727 14.5834C21.5615 15.1919 22.9678 15.973 24.6638 16.3701C24.7108 16.3811 24.7579 16.3915 24.8049 16.4018C24.7068 16.8483 24.5818 17.2845 24.4317 17.7087C23.5198 17.3781 22.5669 16.8901 21.5257 16.3985C20.1297 15.7394 18.514 15.0616 16.6607 15.0616C14.8073 15.0616 13.1914 15.7394 11.7954 16.3985C10.4067 17.0542 9.17529 17.7036 7.98835 17.9815C6.75324 18.2708 5.4159 18.202 4.21695 17.7877C3.97022 17.7024 3.72831 17.6013 3.49222 17.4869C3.3379 17.0191 3.21399 16.5373 3.12249 16.0438C3.16771 16.0603 3.21285 16.0769 3.25837 16.0926C4.99096 16.6914 6.87262 16.7881 8.65745 16.3701C10.3535 15.973 11.7598 15.1919 13.0486 14.5834C14.3301 13.9783 15.553 13.5275 16.6607 13.5275ZM16.6607 17.9965C17.7683 17.9965 18.9912 18.4473 20.2727 19.0524C21.1374 19.4607 22.0554 19.9461 23.0779 20.3416C22.8539 20.6622 22.6138 20.9706 22.3579 21.2649C22.086 21.1345 21.8098 21.0017 21.5257 20.8676C20.1297 20.2084 18.514 19.5307 16.6607 19.5307C14.8073 19.5307 13.1914 20.2084 11.7954 20.8676C10.4067 21.5233 9.17529 22.1726 7.98835 22.4506C7.67305 22.5244 7.35101 22.5746 7.02638 22.602C6.45197 22.1363 5.92499 21.6146 5.45472 21.0441C6.52243 21.1522 7.60668 21.0852 8.65745 20.8392C10.3535 20.442 11.7598 19.6609 13.0486 19.0524C14.3301 18.4473 15.553 17.9965 16.6607 17.9965V17.9965ZM16.6607 22.4656C17.6657 22.4656 18.7662 22.8383 19.9188 23.3591C18.2089 24.4399 16.18 25.0651 14 25.0651C12.8791 25.0651 11.7984 24.8993 10.7802 24.5919C11.5912 24.2448 12.3379 23.857 13.0486 23.5215C14.3301 22.9164 15.553 22.4656 16.6607 22.4656V22.4656Z'
                fill='#EDF2F7'
              />
            </g>
            <defs>
              <clipPath id='clip0_87_5767'>
                <rect width='28' height='28' fill='white' />
              </clipPath>
            </defs>
          </chakra.svg>

          {/* Logout */}
          <Menu autoSelect={false}>
            <MenuButton
              as={Button}
              variant='unstyled'
              rounded='full'
              w='fit-content'
              size='sm'
              ml='auto'
              _focus={{
                border: '2px solid white',
                boxShadow: '',
              }}
              _active={{
                border: '2px solid white',
              }}
            >
              <Avatar size={'xs'} />
            </MenuButton>
            <MenuList fontSize={'sm'} color='gray.700'>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Container>
      </chakra.nav>

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody pt={16}>
            <Left
              linkOnClick={() => {
                onClose();
              }}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
