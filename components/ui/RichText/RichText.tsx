import { FC } from 'react'
import { EditorContent, Editor } from '@tiptap/react'
import Menubar from './Menubar'
import cn from 'clsx'
import s from './RichText.module.css'

interface RichTextProps {
  editor: Editor | null
  className?: string
}

const RichText: FC<RichTextProps> = (props) => {
  const { editor, className } = props
  if (!editor) {
    return null
  }

  const rootCN = cn(s.root, className)

  return (
    <div className={rootCN}>
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default RichText
