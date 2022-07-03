import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { signOut } from 'next-auth/react'
import { Layout } from '@components/common'
import useSWR, { SWRConfig } from 'swr'
import { useRouter } from 'next/router'
import { LoadImage } from '@components/ui'
import { Button } from '@components/ui'

const fetcher = async (url: string) =>
  await fetch(url).then((res) => res.json())

const API = (username: string) => `${process.env.WEBSITE_URL}/api/${username}`

export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.params?.username as string
  const res = await fetcher(API(username))
  return {
    props: {
      fallback: {
        [API(username)]: res,
      },
    },
  }
}

const ProfileIndex = () => {
  const router = useRouter()

  const { data: user, isValidating } = useSWR(
    `/api/${router.query.username}`,
    fetcher
  )

  if (isValidating && !user) {
    return <p>loading....</p>
  }
  return (
    <div className="container mx-auto flex flex-col items-center gap-5">
      <div className="w-1/4 justify-center overflow-hidden rounded-3xl">
        <LoadImage src={user.image} className="h-full w-full object-cover" />
      </div>
      <div>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
      <Button variant="crayola" onClick={() => signOut()}>
        Keluar laah
      </Button>
    </div>
  )
}

const Profile = ({
  fallback,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <SWRConfig value={{ fallback }}>
      <ProfileIndex />
    </SWRConfig>
  )
}

Profile.Layout = Layout

export default Profile
