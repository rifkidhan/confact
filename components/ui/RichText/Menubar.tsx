import { EditorContentProps } from '@tiptap/react'
import {
  BoldIcon,
  ItalicIcon,
  ParagraphIcon,
  HeadingThreeIcon,
  HeadingFourIcon,
  HeadingFiveIcon,
  HeadingSixIcon,
  BulletListIcon,
  OrderListIcon,
  CodeBlockIcon,
  CodeIcon,
  QuoteBlockIcon,
  UndoIcon,
  RedoIcon,
  StrikethoughIcon,
} from '@components/icons'
import { FC } from 'react'

import s from './RichText.module.css'

const Menubar: FC<EditorContentProps> = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className={s.menu}>
      <div className={s.menuContainer}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? s.buttonActive : ''}
        >
          <BoldIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? s.buttonActive : ''}
        >
          <ItalicIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? s.buttonActive : ''}
        >
          <StrikethoughIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? s.buttonActive : ''}
        >
          <CodeIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? s.buttonActive : ''}
        >
          <ParagraphIcon />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive('heading', { level: 3 }) ? s.buttonActive : ''
          }
        >
          <HeadingThreeIcon />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive('heading', { level: 4 }) ? s.buttonActive : ''
          }
        >
          <HeadingFourIcon />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive('heading', { level: 5 }) ? s.buttonActive : ''
          }
        >
          <HeadingFiveIcon />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive('heading', { level: 6 }) ? s.buttonActive : ''
          }
        >
          <HeadingSixIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? s.buttonActive : ''}
        >
          <BulletListIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? s.buttonActive : ''}
        >
          <OrderListIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? s.buttonActive : ''}
        >
          <CodeBlockIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? s.buttonActive : ''}
        >
          <QuoteBlockIcon />
        </button>
      </div>
      <div className={s.menuContainer}>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <UndoIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <RedoIcon />
        </button>
      </div>
    </div>
  )
}

export default Menubar
