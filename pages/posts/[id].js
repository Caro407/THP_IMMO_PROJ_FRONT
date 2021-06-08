import React from 'react';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import PostCard from '../../components/PostCard'

export const getStaticPaths = async () => {
    const res = await fetch(`${process.env.url}/posts`)
    const data = await res.json();
    console.log(data)

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

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await fetch(`${process.env.url}/posts/` + id);
    const data = await res.json();
    return {
        props: {post: data}
    }
}

const Post = ({post}) => {

   
    return (

        <PostCard title = {post.title} content= {post.content} price={post.price}/>

    )
}

export default Post
