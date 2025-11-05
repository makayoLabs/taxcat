import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { motion } from 'framer-motion';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo,
  Redo,
} from 'lucide-react';

interface WYSIWYGEditorProps {
  content: string;
  onChange: (___content: string) => void;
}

const WYSIWYGEditor = ({ content, onChange }: WYSIWYGEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({ onClick, isActive, icon, label }: any) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`p-2 rounded-md transition-colors ${
        isActive ? 'bg-taxcat-blue text-white' : 'hover:bg-gray-100'
      }`}
      title={label}
    >
      {icon}
    </motion.button>
  );

  const addLink = (): void => {
    const url = window.prompt('Enter URL');
    if (_url) =>
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const addImage = (): void => {
    const url = window.prompt('Enter image URL');
    if (_url) =>
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-gray-50">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          icon={<Bold className="w-4 h-4" />}
          label="Bold"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          icon={<Italic className="w-4 h-4" />}
          label="Italic"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          icon={<Underline className="w-4 h-4" />}
          label="Underline"
        />

        <div className="w-px h-6 bg-gray-300 mx-2" />

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          icon={<AlignLeft className="w-4 h-4" />}
          label="Align Left"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          icon={<AlignCenter className="w-4 h-4" />}
          label="Align Center"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          icon={<AlignRight className="w-4 h-4" />}
          label="Align Right"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          isActive={editor.isActive({ textAlign: 'justify' })}
          icon={<AlignJustify className="w-4 h-4" />}
          label="Justify"
        />

        <div className="w-px h-6 bg-gray-300 mx-2" />

        <ToolbarButton
          onClick={addLink}
          isActive={editor.isActive('link')}
          icon={<LinkIcon className="w-4 h-4" />}
          label="Add Link"
        />
        <ToolbarButton
          onClick={addImage}
          isActive={editor.isActive('image')}
          icon={<ImageIcon className="w-4 h-4" />}
          label="Add Image"
        />

        <div className="w-px h-6 bg-gray-300 mx-2" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          icon={<List className="w-4 h-4" />}
          label="Bullet List"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          icon={<ListOrdered className="w-4 h-4" />}
          label="Numbered List"
        />

        <div className="w-px h-6 bg-gray-300 mx-2" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          icon={<Quote className="w-4 h-4" />}
          label="Quote"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          icon={<Code className="w-4 h-4" />}
          label="Code Block"
        />

        <div className="flex-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          isActive={false}
          icon={<Undo className="w-4 h-4" />}
          label="Undo"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          isActive={false}
          icon={<Redo className="w-4 h-4" />}
          label="Redo"
        />
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="prose max-w-none p-4 min-h-[200px] focus:outline-none"
      />
    </div>
  );
};

export default WYSIWYGEditor;
