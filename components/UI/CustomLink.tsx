import Link from 'next/link';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';

interface Props {
  href: string;
  containerProps?: LinkProps;
  children: ReactElement;
}

const CustomLink: FC<Props> = ({ href, children, containerProps }) => {
  return (
    <Link href={href} passHref>
      <ChakraLink {...containerProps} borderBottom='0'>
        {children}
      </ChakraLink>
    </Link>
  );
};

export default CustomLink;
