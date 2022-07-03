import { Layout } from '@components/common'
import { Input, Button, RichTextExtensions } from '@components/ui'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useEditor } from '@tiptap/react'

const RichText = dynamic(() => import('@components/ui/RichText/RichText'), {
  ssr: false,
})

const AddEvent = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<{
    title: string
    date: string
  }>({
    title: '',
    date: '',
  })
  const [description, setDescription] = useState<string>('')

  const editor = useEditor({
    extensions: RichTextExtensions,
    content: description,
    editorProps: {
      attributes: {
        class: 'richtext-content',
      },
    },
    onUpdate(ctx) {
      setDescription(ctx.editor.getHTML())
    },
  })

  const handleAdd = async () => {
    setLoading(true)

    try {
      await fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify({
          title: data.title,
          date: new Date(data.date).toDateString(),
          description: description,
          slug: data.title
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, ''),
        }),
      })
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
    router.push('/events')
  }

  useEffect(() => {
    if (editor?.isEmpty) {
      setDescription('')
    }
  }, [editor, description])

  return (
    <div>
      <form>
        <Input
          type="text"
          name="title"
          placeholder="add title here"
          onChange={(e) => setData({ ...data, title: e.target.value })}
          required
        />
        <Input
          type="date"
          name="date"
          placeholder="add date here"
          onChange={(e) => setData({ ...data, date: e.target.value })}
          required
        />

        <RichText editor={editor} />

        <Button
          type="button"
          name="submit new form"
          aria-label="submit button"
          disabled={loading || !data.title || !description || !data.date}
          onClick={async () => await handleAdd()}
        >
          Save
        </Button>
      </form>
    </div>
  )
}

AddEvent.Layout = Layout

export default AddEvent
