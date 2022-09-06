const styles = {
  global: {
    'html, body': {
      scrollBehavior: 'smooth',
      fontFeatureSettings: `"cv02","cv03","cv04","cv11"`,
    },
    a: {
      textDecoration: 'none !important',
    },
    '.ProseMirror': {
      padding: '12px',
      color: 'gray.700',
    },

    '.ProseMirror[contenteditable=true]': {
      minH: '140px',
    },

    '.ProseMirror p': {
      fontSize: 'sm',
      mb: 4,
    },
    '.ProseMirror h1': {
      fontSize: 'lg',
      fontWeight: 'bold',
      mb: 3,
    },
    '.ProseMirror h2': {
      fontSize: 'md',
      fontWeight: 'bold',
      mb: 3,
    },
    '.ProseMirror ul': {
      pl: '18px',
    },
    '.ProseMirror pre': {
      fontSize: '13px',
    },
    '.ProseMirror li p': {
      // pb: 0,
      margin: 0,
    },
  },
};

export default styles;
