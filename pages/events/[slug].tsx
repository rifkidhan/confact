import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Layout } from '@components/common'
import { Button, Input, Loading, RichTextExtensions } from '@components/ui'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR, { SWRConfig, useSWRConfig } from 'swr'
import dynamic from 'next/dynamic'
import { useEditor } from '@tiptap/react'
import { getSession, useSession } from 'next-auth/react'

const RichText = dynamic(() => import('@components/ui/RichText/RichText'), {
  ssr: false,
})

const fetcher = async (url: string) =>
  await fetch(url).then((res) => res.json())
const API = (slug: string) => `${process.env.WEBSITE_URL}/api/events/${slug}`

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug as string
  const res = await fetcher(API(slug))
  return {
    props: {
      fallback: {
        [API(slug)]: res,
      },
    },
  }
}

const BodyEvents = () => {
  const router = useRouter()
  const { data: events, isValidating } = useSWR(
    `/api/events/${router.query.slug}`,
    fetcher
  )
  const { mutate } = useSWRConfig()
  const { data: session } = useSession()

  const [loading, setLoading] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const [data, setData] = useState<{
    title: string
    date: string
  }>({
    title: '',
    date: '',
  })
  const [description, setDescription] = useState<string>('')

  useEffect(() => {
    if (events) {
      setDescription(events?.description)
      setData({
        title: events?.title,
        date: new Date(events?.date).toLocaleDateString('en-CA'),
      })
    }
  }, [events])

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

  const handleEdit = async () => {
    setLoading(true)

    try {
      await fetch(`/api/events/${router.query.slug}`, {
        method: 'PUT',
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
    mutate(`/api/events/${router.query.slug}`)
    setLoading(false)
    router.push('/events')
  }

  const handleDelete = async () => {
    setLoading(true)

    try {
      await fetch(`/api/events/${router.query.slug}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.error(error)
    }
    mutate(`/api/events`)
    setLoading(false)
    router.push('/events')
  }

  useEffect(() => {
    if (editor?.isEmpty && description) {
      editor?.commands.insertContent(description)
    }
    if (editor?.isEmpty) {
      setDescription('')
    }
  }, [editor, description])

  if (isValidating && !events) {
    return <Loading />
  }

  return (
    <div className="container mx-auto flex flex-col gap-5">
      {edit ? (
        <>
          {events && (
            <form>
              <Input
                type="text"
                name="title"
                placeholder="add title here"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                required
              />
              <Input
                type="date"
                name="date"
                placeholder="add date here"
                value={data.date}
                onChange={(e) => setData({ ...data, date: e.target.value })}
                required
              />
              <RichText editor={editor} />

              <div className="flex flex-row gap-5">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setEdit(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  name="submit new form"
                  aria-label="submit button"
                  disabled={
                    loading || !data.title || !data.date || !description
                  }
                  onClick={async () => await handleEdit()}
                >
                  Save
                </Button>
                <Button type="button" variant="crayola" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            </form>
          )}
        </>
      ) : (
        <>
          <div>
            <h1>{events?.title}</h1>
            <p>{events?.date}</p>
            <div
              dangerouslySetInnerHTML={{ __html: events?.description }}
              className="prose w-full max-w-none"
            />
          </div>
          {session && (
            <Button type="button" onClick={() => setEdit(true)}>
              Edit Event
            </Button>
          )}
        </>
      )}
    </div>
  )
}

const EventDetail = ({
  fallback,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <SWRConfig value={{ fallback }}>
      <BodyEvents />
    </SWRConfig>
  )
}

EventDetail.Layout = Layout

export default EventDetail
