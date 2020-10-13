import React, {useState} from "react";
import Axios from 'axios'

import '../publicStyle/darkMode.css'
import '../publicStyle/lightMode.css'
import './searchCpt.css'

function SearchCpt(){

    let [userName, setUserName] =useState("");

    function changeUserName(userName){
        setUserName(userName)
    }

    function search(){
        if(userName != ""){
            Axios.get(`/api/${userName}`)
                .then(res =>{console.log(res)});
        }
    }

    return(
        <div id="searchCpt">
            <div id="searchCptTip">github.com/</div>
            <input placeholder="  Enter Github Username" id="searchCptInput" onChange={(e) => changeUserName(e.target.value)}/>
            <button id="searchCptButton" onClick={search}>Search</button>
        </div>
    )
}

export default SearchCpt