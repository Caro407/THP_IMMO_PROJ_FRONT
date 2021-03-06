import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react';
import CardIndex from '../components/CardIndex';

export default function Home() {
  const [posts, setPosts] = React.useState([])
  const [allPosts, setAllPosts] = React.useState([])
  const [cities, setCities] = React.useState([])

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

  const fetchCities = () => {

    fetch(`${process.env.url}/cities`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        setCities(response);
      })
      .catch(err => console.log(err))
  }

  const toggleFilter = (cityname) => {
    const cityId = cities.filter(city => city.name === cityname)[0].id;
    if (posts.length === allPosts.length)
    { setPosts(allPosts.filter(post => post.city_id === cityId)) }
    else {setPosts(allPosts)}
  }
 
  React.useEffect(() => { fetchPosts(); fetchCities() }, [])

  return (
    <div>
      <Head>
        <title>Immo Coin</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id={styles.jumbotron_banner} className="relative hero-image bg-right-bottom bg-cover flex" >
        <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
        <div className="relative container mx-auto mb-6 flex items-end justify-center z-10">
          <div className="content text-center p-4">
            <div className="text-5xl leading-normal text-gray-200">Bienvenue sur Immo Coin !</div>
            <div className="text-lg leading-normal mt-0 mb-2 text-gray-200 font-bold uppercase">Le leader de l'immobilier entre particuliers</div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.title}>Nos annonces</div>
        <div className="flex items-center">
          <label className="checkbox-btn mx-6"> <input type="checkbox" key="city1" onClick = {() => toggleFilter(`Paris`)} /> <span className="btn btn-light"> Paris </span> </label>
          <label className="checkbox-btn mx-6"> <input type="checkbox" key="city2" onClick = {() => toggleFilter(`Marseille`)} /> <span className="btn btn-light"> Marseille </span> </label>
          <label className="checkbox-btn mx-6"> <input type="checkbox" key="city3" onClick = {() => toggleFilter(`Le Conquet`)} /> <span className="btn btn-light"> Le Conquet</span> </label>
        </div>
        <div className="grid xl:grid-cols-3 mt-6">
          {posts.sort((a,b) => new Date(b.created_at) - new Date(a.created_at)).map(post =>
            <div key={post.id} className="container md:mx-auto justify-content">
              <CardIndex title={post.title} content={post.content} id={post.id} images={post.images} cityName={cities.filter(city => city.id === post.city_id)[0].name} />
            </div>
          )
          }
        </div>
      </div>
    </div>
  )
}
