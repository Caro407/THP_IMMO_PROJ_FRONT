import React from "react";
import { useSelector } from "react-redux";
import styles from '../styles/Home.module.css';
import PostPictures from './PostPictures'

const PostCard = (props) => {

  const userToken = useSelector(state => state.token);

  return (
  <div className={styles.container}>
    {(props.images) ? <PostPictures images={props.images}/> : <p></p>}
    <div className="border rounded p-10">
      <h2 className="font-bold text-4xl text-red-500 capitalize mb-4">{props.title}</h2>
      <p className="m-6">{props.content}</p>
      <p className="m-6 text-3xl font-bold">{props.price} €</p>
      <p>Contact : <span>{userToken ? <a className="text-red-500 font-bold hover:text-red-800" href={`mailto:${props.owner.email}`}>{props.owner.first_name} {props.owner.last_name}</a> : <span className="text-gray-600 italic">Connectez-vous pour voir les coordonnées du ou de la propriétaire !</span>}</span></p>
    </div>
  </div>

)}

export default PostCard;
