import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const items = useSelector((state: RootState) => state.items.items)

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1>Books</h1>
        {items.map((item, i) => (
          <div key={i}>
            <h2>{item.name}</h2>
            <p>{item.price}</p>
            <p>{item.category}</p>
          </div>
        ))}
      </main>
    </>
  )
}
