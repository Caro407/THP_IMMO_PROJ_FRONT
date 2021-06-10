import { useRef } from "react";
import { useSelector } from "react-redux";

export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(`${process.env.url}/posts/` + id);
  const data = await res.json();
  return {
      props: {post: data}
  }
}

const EditPost = ({post}) => {

  const userToken = useSelector(state => state.token);

  const titleRef = useRef();
  const contentRef = useRef();
  const priceRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/posts", {
      method: "patch",
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
          Router.push('/posts/owner_posts')
        }else (alert('Erreur !'));
      })
      .catch(error => console.log('error', error));
  }

  return (
    <form onSubmit={handleSubmit}>
    <div>
      <label>Titre de l'annonce.
        <input name="title" type="text" ref={titleRef} placeholder={post.title} />
      </label>
      <label>Contenu de l'annonce.
        <textarea name="content" ref={contentRef} placeholder={post.content} />
      </label>
      <label>Prix du bien.
        <input name="price" type="number" ref={priceRef} placeholder={post.price} />
      </label>
    </div>
    <input type="submit" value="Publier" />
  </form>
  )
}

export default EditPost;