const PostCard = (props) => {

return (
  <div className="border rounded p-2 m-2">
    <h2 className="font-bold text-lg text-red-500 capitalize text-left">{props.title}</h2>
    <p className="mt-2">{props.content}</p>
    <p className="mt-2">Prix: {props.price} €</p>
  </div>
)}

export default PostCard;
