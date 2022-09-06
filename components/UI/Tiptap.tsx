import { Box, HStack, IconButton } from '@chakra-ui/react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import Heading from '@tiptap/extension-heading';
import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
// load all highlight.js languages
import { lowlight } from 'lowlight/lib/common';
import {
  RiBold,
  RiCodeSSlashLine,
  RiH1,
  RiH2,
  RiItalic,
  RiListUnordered,
  RiStrikethrough,
} from 'react-icons/ri';
import { FC } from 'react';

const Tiptap: FC = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2],
      }),
      BulletList,
      ListItem,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'js',
      }),
    ],
    content: '',
  });

  return (
    <>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <HStack bg='gray.900' spacing={1} p={1} rounded='md'>
            <IconButton
              aria-label='Bold'
              icon={<RiBold />}
              onClick={() => editor.chain().focus().toggleBold().run()}
              bg={editor?.isActive('bold') ? 'gray.100' : ''}
              variant='ghost'
              size='sm'
              colorScheme={'gray'}
              color={!editor?.isActive('bold') ? 'white' : 'gray.900'}
              _hover={{
                color: 'gray.900',
                bg: 'gray.100',
              }}
            />
            <IconButton
              aria-label='Italic'
              icon={<RiItalic />}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              bg={editor?.isActive('italic') ? 'gray.100' : ''}
              variant='ghost'
              size='sm'
              colorScheme={'gray'}
              color={!editor?.isActive('italic') ? 'white' : 'gray.900'}
              _hover={{
                color: 'gray.900',
                bg: 'gray.100',
              }}
            />
            <IconButton
              aria-label='Strike'
              icon={<RiStrikethrough />}
              onClick={() => editor.chain().focus().toggleStrike().run()}
              bg={editor?.isActive('strike') ? 'gray.100' : ''}
              variant='ghost'
              size='sm'
              colorScheme={'gray'}
              color={!editor?.isActive('strike') ? 'white' : 'gray.900'}
              _hover={{
                color: 'gray.900',
                bg: 'gray.100',
              }}
            />
            <IconButton
              aria-label='H1'
              icon={<RiH1 />}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              bg={editor?.isActive('heading', { level: 1 }) ? 'gray.100' : ''}
              variant='ghost'
              size='sm'
              colorScheme={'gray'}
              color={
                !editor?.isActive('heading', { level: 1 })
                  ? 'white'
                  : 'gray.900'
              }
              _hover={{
                color: 'gray.900',
                bg: 'gray.100',
              }}
            />

            <IconButton
              aria-label='H2'
              icon={<RiH2 />}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              bg={editor?.isActive('heading', { level: 2 }) ? 'gray.100' : ''}
              variant='ghost'
              size='sm'
              colorScheme={'gray'}
              color={
                !editor?.isActive('heading', { level: 2 })
                  ? 'white'
                  : 'gray.900'
              }
              _hover={{
                color: 'gray.900',
                bg: 'gray.100',
              }}
            />
            <IconButton
              aria-label='BulletList'
              icon={<RiListUnordered />}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              bg={editor.isActive('bulletList') ? 'gray.100' : ''}
              variant='ghost'
              size='sm'
              colorScheme={'gray'}
              color={!editor.isActive('bulletList') ? 'white' : 'gray.900'}
              _hover={{
                color: 'gray.900',
                bg: 'gray.100',
              }}
            />
            <IconButton
              aria-label='CodeBlock'
              icon={<RiCodeSSlashLine />}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              bg={editor.isActive('codeBlock') ? 'gray.100' : ''}
              variant='ghost'
              size='sm'
              colorScheme={'gray'}
              color={!editor.isActive('codeBlock') ? 'white' : 'gray.900'}
              _hover={{
                color: 'gray.900',
                bg: 'gray.100',
              }}
            />
          </HStack>
        </BubbleMenu>
      )}
      <Box
        w='full'
        borderColor={'gray.300'}
        borderWidth='2px'
        rounded={'5px'}
        fontWeight='500'
      >
        <EditorContent editor={editor} />
      </Box>
    </>
  );
};

export default Tiptap;
