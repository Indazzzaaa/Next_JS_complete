import Image from 'next/image'
import Link from 'next/link'
import ProductCard from './components/ProductCard/ProductCard'
import myPicture from "@/public/images/WIN_20230602_11_46_15_Pro.jpg"
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <main>
      <h1>Hello {session && <span>{session.user!.name}</span>}</h1>
      <Link href="/users">Users</Link>
      <ProductCard />

      <section className='relative h-screen mt-2'>
        <Image

          src={myPicture}
          alt='my picture'
          fill  // default falue is true so we leave it that way
          className='object-cover'
          // we want image to full screen for mobile , half for tables and 1/3 for bigger then tablet screens
          sizes='(max-width:480) 100vw , (max-width:768px) 50vw, 33vw'  // this will make image size responsive according to screen size to see this in effect use grid with three columns
          quality={100} // default is 75
          priority



        />

      </section>
    </main>
  )
}
