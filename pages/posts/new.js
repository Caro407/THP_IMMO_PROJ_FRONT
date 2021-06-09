import Cookies from "js-cookie";
import Router from 'next/router';
import { useRef } from "react";

function PostCreation () {

  const titleRef = useRef();
  const contentRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(Cookies.get('token'));
    fetch(`${process.env.url}/posts`, {
      method: "post",
      headers: {
        "Authorization": `${Cookies.get('token')}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify( {"post": {
        "title": `${titleRef.current.value}`,
        "content": `${contentRef.current.value}`,
        "price": `${priceRef.current.value}`,
        "image": `${imageRef.current.value}`
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
        <label>Titre de l'annonce :
          <input name="title" type="text" ref={titleRef} placeholder="Donnez un nom à votre annonce..." />
        </label>
        <label>Contenu de l'annonce :
          <textarea name="content" ref={contentRef} placeholder="Descrivez votre annonce en quelques mots" />
        </label>
        <label>Prix du bien :
          <input name="price" type="number" ref={priceRef} />
        </label>
        <label>Images :
          <input name="image" type="file" ref={imageRef} />
        </label>
      </div>
      <input type="submit" value="Publier" />
    </form>
  )
}

export default PostCreation
