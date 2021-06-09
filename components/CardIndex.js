import Link from "next/link";
import styles from '../styles/Home.module.css'

const CardIndex = (props) => {
    return (
      <div className="rounded p-4 m-4 bg-red-100">
        <h2 className="font-bold text-lg text-red-500 capitalize text-center">{props.title}</h2>
        <p className="m-4">{props.content}</p>
        <Link key={props.id} href={`/posts/` + props.id}>
          <button className={styles.buttonPink}>
            Détails
          </button>
        </Link>
      </div>
    )}
    
    export default CardIndex;
    