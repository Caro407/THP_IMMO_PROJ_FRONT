import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react';
import Link from 'next/link'
import CardIndex from '../components/CardIndex';
import { useSelector } from 'react-redux';


export default function Home() {
  const userToken = useSelector(state => state.token);
  const [posts, setPosts] = React.useState([])

  const fetchPosts = () => {

    fetch(`${process.env.url}/posts`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        setPosts(response);
      })
      .catch(err => console.log(err))
  }

  React.useEffect(() => { fetchPosts() }, [])

  return (
    <div>
      <Head>
        <title>Immo Coin</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.title}>Bienvenue sur Immo Coin !</h1>
      <div className="grid md:grid-cols-3 mx-12">
        {posts.map(post =>
          <div class="container md:mx-auto justify-content">
            <CardIndex title={post.title} content={post.content}/>
            <Link key={post.id} href={`/posts/` + post.id}>
              <div class="flex content-center items-center padding-left-auto padding-right-auto pr-12">
                <button class="bg-red-300 hover:bg-red-600 text-white font-bold py-2 px-2 ml-48 rounded">
                  Détails
                </button>
              </div>
            </Link>
          </div>
        )
        }
      </div>
    </div>
  )
}
