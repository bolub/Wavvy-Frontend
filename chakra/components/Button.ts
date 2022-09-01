import { ComponentStyleConfig } from '@chakra-ui/react';

export const Button: ComponentStyleConfig = {
  // The styles all button have in common
  baseStyle: {
    fontWeight: 'semibold',
    borderRadius: '8px',
  },
  // Two sizes: sm and md
  sizes: {
    md: {
      height: '38px',
      fontSize: 'sm',
      px: 6,
    },
  },
  // Two variants: outline and solid
  variants: {},
  // The default size and variant values
  defaultProps: {},
};
