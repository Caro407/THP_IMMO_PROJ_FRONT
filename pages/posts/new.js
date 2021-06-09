import Cookies from "js-cookie";
import Router from 'next/router';
import { useRef, useState } from "react";

function PostCreation () {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      console.log(i);
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const titleRef = useRef();
  const contentRef = useRef();
  const priceRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    fetch(`${process.env.url}/posts`, {
      method: "post",
      headers: {
        "Authorization": `${Cookies.get('token')}`
      },
      body: data
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
        <img src={createObjectURL} />
        <label>Images :
          <input name="image" type="file" onChange={uploadToClient} />
        </label>
      </div>
      <input type="submit" value="Publier" />
    </form>
  )
}

export default PostCreation
