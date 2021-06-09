import React from "react";
import { useSelector } from "react-redux";
import styles from '../styles/Home.module.css'

const PostCard = (props) => {

  const [owner, setOwner] = React.useState({});
  const userToken = useSelector(state => state.token);

  React.useEffect(
    () => {
      if (!userToken) { return }
      else
      {let myHeaders = new Headers();
      myHeaders.append("Authorization", `${userToken}`);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders
      };

      fetch(`http://localhost:3000/users/${props.owner}`, requestOptions)
      .then(response => response.json())
      .then(result=> setOwner(result))
      .catch(error => console.log('error', error));}
    }
    , []
  )

  return (
  <div className={styles.container}>
    <div className="border rounded p-10">
      <h2 className="font-bold text-4xl text-red-500 capitalize mb-4">{props.title}</h2>
      <p className="m-6">{props.content}</p>
      <p className="m-6 text-3xl font-bold">{props.price} €</p>
      <p>Contact : <span>{userToken ? <a className="text-red-500 font-bold hover:text-red-800" href={`mailto:${owner.email}`}>{owner.first_name} {owner.last_name}</a> : <span className="text-gray-600 italic">Connectez-vous pour voir les coordonnées du ou de la propriétaire !</span>}</span></p>
    </div> 
  </div>

)}

export default PostCard;
