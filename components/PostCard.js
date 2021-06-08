const PostCard = (props) => {

return (
  <div>
    <h2>{props.data.title}</h2>
    <p>{props.data.content}</p>
  </div>
)}

export default PostCard;
