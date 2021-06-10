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
  const cityRef = useRef();

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
    <div className={styles.container}>
      <div className={styles.title}>Créer une nouvelle annonce</div>
      <form onSubmit={handleSubmit} className="bg-white w-3/4 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Titre de l'annonce (10 caractères minimum) :
        </label>
        <input name="title" type="text" ref={titleRef} placeholder="Donnez un nom à votre annonce..." required="required" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"/>
        <label className="block text-gray-700 text-sm font-bold mb-2">Contenu de l'annonce (50 caractères minimum) :
        </label>
        <textarea name="content" ref={contentRef} placeholder="Décrivez votre annonce en quelques mots" required="required" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"/>
        <div>
          <label className="inline text-gray-700 text-sm font-bold mb-2 mr-2">Prix du bien :
          </label>
          <input name="price" type="number" ref={priceRef} required="required" className="inline shadow appearance-none border rounded w-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"/>
        </div>
        <div className="mb-5">
          <label className="inline text-gray-700 text-sm font-bold mb-2 mr-2">Localisation du bien :
          </label>
          <select ref={cityRef} id="city" name="city">
            <option value="Paris">Paris</option>
            <option value="Marseille">Marseille</option>
            <option value="Le Conquet">Le Conquet</option>
          </select>
        </div>
        <img src={createObjectURL} />
        <label className="block text-gray-700 text-sm font-bold mb-6">Images :
          <input name="images[]" type="file" multiple={true} onChange={uploadToClient} />
        </label>
      </div>
      <input type="submit" value="Publier" className={styles.buttonPink}/>
    </form>
    </div>    
  )
}

export default PostCreation
