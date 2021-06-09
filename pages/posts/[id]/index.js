import PostCard from "../../../components/PostCard";

export const getServerSidePaths = async () => {

    const res = await fetch(`${process.env.url}/posts`)
    const data = await res.json();

    const paths = data.map(post => {
        return {
            params: {id: post.id.toString()}
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getServerSideProps = async (context) => {
    const id = context.params.id;
    const res = await fetch(`${process.env.url}/posts/` + id);
    const data = await res.json();
    return {
        props: {post: data}
    }
}

const Post = ({post}) => {
    return (
      <PostCard title={post.title} content={post.content} price={post.price} owner={post.owner} images={post.images}/>
    )
}

export default Post
