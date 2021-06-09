import Navbar from "./Navbar";
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/actions/userActions';
import Cookies from 'js-cookie';

const Layout = ({ children }) => {
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const userToken = useSelector(state => state.token);
    const dispatch = useDispatch();
    const signOut = () => {
        dispatch(logOut());
        Cookies.remove('token');
        Cookies.remove('isLoggedIn');
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `${userToken}`);

        let requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`${process.env.url}/users/sign_out`, requestOptions)
        .catch(error => console.log('error', error));
            }

    let navbarElements;
    !isLoggedIn ? navbarElements =
        <>
            <Link href='/signup'>
                <a className={styles.navbarLink}>
                    S'inscrire
            </a>
            </Link>
            <Link href='/login'>
                <a className={styles.navbarLink}>
                    Se connecter
            </a>
            </Link>
        </>
        :
        navbarElements =
        <>
            <Link href='/profile'>
                <a className={styles.navbarLink}>
                    Mon profil
            </a>
            </Link>
            <Link href='/posts'>
                <a className={styles.navbarLink}>
                    Mes annonces
            </a>
            </Link>
            <Link href='/'>
                <a onClick={signOut} className={styles.navbarLink}>
                    Se déconnecter
            </a>
            </Link>
        </>
        ;
    return (
        <>
            <Navbar navbarElements={navbarElements}/>         
            {children}
        </>
    )
}

export default Layout

   