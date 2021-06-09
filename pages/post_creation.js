import Router from 'next/router';
import { useRef } from "react";
import { useSelector } from "react-redux";

function PostCreation () {

  const userToken = useSelector(state => state.token);

  const titleRef = useRef();
  const contentRef = useRef();
  const priceRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/posts", {
      method: "post",
      headers: {
        "Authorization": `${userToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify( {"post": {
        "title": `${titleRef.current.value}`,
        "content": `${contentRef.current.value}`,
        "price": `${priceRef.current.value}`
      }})
    })
      .then(response => {
        if(response.ok){
          Router.push('/')
        }else (alert('Erreur !'));
      })
      .catch(error => console.log('error', error));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Titre de l'annonce.
          <input name="title" type="text" ref={titleRef} placeholder="Donnez un nom à votre annonce..." />
        </label>
        <label>Contenu de l'annonce.
          <textarea name="content" ref={contentRef} placeholder="Descrivez votre annonce en quelques mots" />
        </label>
        <label>Prix du bien.
          <input name="price" type="number" ref={priceRef} />
        </label>
      </div>
      <input type="submit" value="Publier" />
    </form>
  )
}

export default PostCreation