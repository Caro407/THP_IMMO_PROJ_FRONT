import Image from 'next/image';
import { useState } from 'react';

const PostPictures = (props) => {
  const [pictures, setPictures] = useState(props.images)

  return (
    <div>
    {pictures.map(picture =>
      <Image src={picture} alt="photos de l'annonce" width={500} height={500} />
    )}
    </div>
  )
}

export default PostPictures;
