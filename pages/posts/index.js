import React from 'react';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import PostCard from '../../components/PostCard'

const Post = () => {
    const [post, setPost] = React.useState({});
    const router = useRouter()
    const { pid } = router.query
    let slug = window.location.hash.substring(1).split("/")[1]
    console.log(slug)

    React.useEffect(
        () => {
            let requestOptions = {
                method: 'GET',
            };

            fetch(`http://localhost:3000/posts/${slug}`, requestOptions)
                .then(response => response.json())
                .then(result => setPost(result))
                .catch(error => console.log('error', error));
        }
        , []
    )
    return (
        <PostCard title = {post.title} content= {post.content}/>

    )
}

export default Post
