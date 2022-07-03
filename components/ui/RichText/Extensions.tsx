import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

export const Extensions = [
  StarterKit.configure({
    heading: { levels: [3, 4, 5, 6] },
  }),
  Placeholder.configure({
    placeholder: 'My Custom Placeholder',
  }),
]

export default Extensions
