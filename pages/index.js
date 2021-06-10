import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react';
import Link from 'next/link'
import CardIndex from '../components/CardIndex';
import SearchBar from '../components/SearchBar'

export default function Home() {
  const [posts, setPosts] = React.useState([])
  const [allPosts, setAllPosts] = React.useState([])

  const fetchPosts = () => {

    fetch(`${process.env.url}/posts`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        setPosts(response);
        setAllPosts(response);
      })
      .catch(err => console.log(err))
  }

  const filter = (cityname) => {

    setPosts( allPosts.filter(post => post.city.name === cityname))
  }
 
  React.useEffect(() => { fetchPosts() }, [])

  return (
    <div>
      <Head>
        <title>Immo Coin</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id={styles.jumbotron_banner} className="relative hero-image bg-right-bottom bg-cover flex" >
        <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
        <div className="absolute container bottom-10 mx-auto flex items-center justify-center z-10">
          <div className="content text-center p-4">
            <div className="text-5xl leading-normal text-gray-200">Bienvenue sur Immo Coin !</div>
            <div className="text-lg leading-normal mt-0 mb-2 text-gray-200 font-bold uppercase">Le leader de l'immobilier entre particuliers</div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.title}>Nos annonces</div>
        <div className="card-body">
          <label className="checkbox-btn"> <input type="checkbox" name="city" onClick = {() => filter(`Paris`)} /> <span className="btn btn-light"> Paris </span> </label>
          <label className="checkbox-btn"> <input type="checkbox" name="city" onClick = {() => filter(`Marseille`)} /> <span className="btn btn-light"> Marseille </span> </label>
          <label className="checkbox-btn"> <input type="checkbox" name="city" onClick = {() => filter(`Lyon`)} /> <span className="btn btn-light"> Lyon</span> </label>
        </div>
        <div className="grid md:grid-cols-3 mt-6">
          {posts.map(post =>
            <div key={post.id} className="container md:mx-auto justify-content">
              <CardIndex title={post.title} content={post.content} id={post.id} />
            </div>
          )
          }
        </div>
      </div>
    </div>
  )
}
