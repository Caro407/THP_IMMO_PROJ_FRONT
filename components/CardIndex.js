import Link from "next/link";
import Image from 'next/image';
import styles from '../styles/Home.module.css'

const CardIndex = (props) => {
    return (
      <div className="rounded p-4 m-4 bg-red-100">
        {props.images[0] ? <Image src={props.images[0]} width={500} height={500} /> : <p></p>}
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
