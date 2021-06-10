import Cookies from "js-cookie";
import Router from 'next/router';
import { useRef, useState } from "react";
import styles from '../../styles/Home.module.css'

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
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Titre de l'annonce :
        </label>
        <input name="title" type="text" ref={titleRef} placeholder="Donnez un nom à votre annonce..." required="required" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        <label className="block text-gray-700 text-sm font-bold mb-2">Contenu de l'annonce :
        </label>
        <textarea name="content" ref={contentRef} placeholder="Décrivez votre annonce en quelques mots" required="required" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        <div>
          <label className="inline text-gray-700 text-sm font-bold mb-2 mr-2">Prix du bien :
          </label>
          <input name="price" type="number" ref={priceRef} required="required" className="inline shadow appearance-none border rounded w-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <img src={createObjectURL} />
        <label className="block text-gray-700 text-sm font-bold mb-2">Images :
          <input name="images[]" type="file" multiple="true" onChange={uploadToClient} />
        </label>
      </div>
      <input type="submit" value="Publier" className={styles.buttonPink}/>
    </form>
  )
}

export default PostCreation
