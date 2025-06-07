'use client';

import { cn } from '@/lib/utils';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './menu-bar';

interface TiptapProps {
  content: string;
  onChange: (content: string) => void;
  className?: string;
}

export default function Tiptap({ content, onChange, className }: TiptapProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc ml-3',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal ml-3',
          },
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
      Placeholder.configure({
        placeholder: 'Your description goes here',
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: cn(
          'min-h-[156px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm prose dark:prose-invert',
          '[&>p.is-editor-empty:first-child::before]:text-muted-foreground [&>p.is-editor-empty:first-child::before]:float-left [&>p.is-editor-empty:first-child::before]:h-0 [&>p.is-editor-empty:first-child::before]:pointer-events-none [&>p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]',
          className,
        ),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <MenuBar editor={editor} />
      <EditorContent className="flex w-full justify-center" editor={editor} />
    </div>
  );
}
