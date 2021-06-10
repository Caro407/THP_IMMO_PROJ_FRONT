import { useSelector } from "react-redux";
import useSWR from "swr";
// import styles from '../styles/Home.module.css'


async function fetcher(...args) {
  const [url, token] = args;

  const res = await fetch(url, {
    method: "get",
    headers: {
      'Authorization': `${token}`,
      'Content-type': 'application/json'
    }});

  return res.json()
}

function OwnerPosts() {

  const userToken = useSelector(state => state.token);

  const { data, error } = useSWR([`${process.env.url}/owner`, userToken], fetcher);

  if(error) return <div>Une erreur est survenue</div>
  if (!data) return <div>Chargement des informations...</div>

  const handleDelete = (index) => {
    fetch(`${process.env.url}/posts/${index}`, {
      method: "delete",
      headers: {
        'Authorization': `${userToken}`,
        'Content-type': 'application/json'
      }})
      .then(() => {window.location = "/posts/owner_posts"})
      .catch(error => console.log(error))
  }

  const handleEdit = (index) => {
    window.location = `/posts/${index}/edit`
  }

  return(
    <div>Voici vos articles :
    {
      data.map((post, index) => (
        <div key={index}>
          <div className="border rounded p-10">
            <h2 className="font-bold text-4xl text-red-500 capitalize mb-4">{post.title}</h2>
            <p className="m-6">{post.content}</p>
            <p className="m-6 text-3xl font-bold">{post.price} €</p>
            <button onClick={(e) => {handleDelete(post.id)}}>Supprimer</button>
            <button onClick={(e) => {handleEdit(post.id)}}>Editer</button>
          </div> 
        </div>
      ))
    }
    </div>
  )
}

export default OwnerPosts;