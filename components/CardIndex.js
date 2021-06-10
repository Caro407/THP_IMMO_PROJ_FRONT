import Link from "next/link";
import Image from 'next/image';
import styles from '../styles/Home.module.css'

const CardIndex = (props) => {
    return (
      <div className="m-8 w-80">      
        {props.images[0] ? <Image src={props.images[0]} width={500} height={500} className="w-full object-cover object-center rounded-lg shadow-md" /> : <img src="https://via.placeholder.com/500?text=Pas+d%27image+disponible " className="w-full object-cover object-center rounded-lg shadow-md"></img> }
        <div className="relative px-4 -mt-16  ">
          <div className="bg-white p-6 rounded-lg shadow-xl">
          <div class="flex justify-center">
            <div class="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
              {props.cityName}
            </div>  
          </div>
            <h4 className="mt-1 text-red-500 text-xl font-semibold uppercase leading-tight">{props.title}</h4>      
            <div className="mt-1 truncate">
              {props.content}          
            </div>
            <div className="mt-4">
              <Link key={props.id} href={`/posts/` + props.id}>
                <button className={styles.buttonPink}>
                  Détails
                </button>
              </Link>
            </div>  
          </div>
        </div>
      </div>        
    )}

    export default CardIndex;

