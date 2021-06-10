import React from "react";
import { useSelector } from "react-redux";
import styles from '../styles/Home.module.css'

const SearchBar = (props) => {

    const [owner, setOwner] = React.useState({});
    const userToken = useSelector(state => state.token);

    React.useEffect(
        () => {
            if (!userToken) { return }
            else {
                let myHeaders = new Headers();
                myHeaders.append("Authorization", `${userToken}`);

                let requestOptions = {
                    method: 'GET',
                    headers: myHeaders
                };

                fetch(`http://localhost:3000/users/${props.owner}`, requestOptions)
                    .then(response => response.json())
                    .then(result => setOwner(result))
                    .catch(error => console.log('error', error));
            }
        }
        , []
    )

    return (

        <div class="card-body">
            <label class="checkbox-btn"> <input type="checkbox" name="team" onclick="onlyOne(this)" /> <span class="btn btn-light"> Paris </span> </label>
            <label class="checkbox-btn"> <input type="checkbox" name="team" onclick="onlyOne(this)" /> <span class="btn btn-light"> Marseille </span> </label>
            <label class="checkbox-btn"> <input type="checkbox" name="team" onclick="onlyOne(this)" /> <span class="btn btn-light"> Lyon</span> </label>
        </div>
    )
}

export default SearchBar;


