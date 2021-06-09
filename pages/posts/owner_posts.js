import Cookies from "js-cookie";

export async function getServerSideProps(context) {

  const cookies = context.req.headers.cookie

  const res = await fetch('http://localhost:3000/owner', {
    method: "get",
    headers: {
      'Authorization': `${Cookies.get('token')}`,
      'Content-type': 'application/json'
    }});
  const data = await res.json()

  return { props: { data } }
}

function OwnerPosts({ data }) {

  return(
    <div>Des articles</div>
  )
}

export default OwnerPosts;