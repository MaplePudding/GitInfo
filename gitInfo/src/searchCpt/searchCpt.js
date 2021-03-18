import React, {useState} from "react";
import Axios from 'axios'

import '../publicStyle/darkMode.css'
import '../publicStyle/lightMode.css'
import './searchCpt.css'
import status from "../status/backgroundStatus"

function SearchCpt(props){

    let [userName, setUserName] =useState("");
    let userInfo = {};

    function changeUserName(userName){
        setUserName(userName)
    }

    function search(){
        if(userName != ""){
            Axios.all([
                Axios.get(`/test/users/${userName}`),
                Axios.get(`/test/users/${userName}/events?per_page=20`),
                Axios.get(`/test/users/${userName}/repos?per_page=100`)
            ]).then(
                Axios.spread((userProfile, activity, repo) =>{
                    userInfo.avator = userProfile.data["avatar_url"];
                    userInfo.userName = userProfile.data.name;
                    userInfo.followers = userProfile.data.followers;
                    userInfo.following = userProfile.data.following;
                    userInfo.blog = userProfile.data.blog;
                    userInfo.joined = userProfile.data["created_at"];
                    userInfo.location = userProfile.data.location;
                    userInfo.lastUpdate = userProfile.data["updated_at"]
                    userInfo.activity = activity.data;

                    userInfo.repo = repo.data;

                    if(props.history){
                        props.history.push({
                            pathname: 'info',
                            state: userInfo
                        })
                    }else{
                        props.setUserInfo(userInfo);
                    }

                })
            )
        }
    }

    return(
        <div id="searchCpt">
            <div id="searchCptTip" className={status.getMode() === "light" ? "searchCptLightColor" : "searchCptDarkColor"}>github.com/</div>
            <input placeholder="  Enter Github Username" id="searchCptInput" onChange={(e) => changeUserName(e.target.value)} className={status.getMode() === "light" ? "searchCptInputLight" : "searchCptInputDark"}/>
            <button id="searchCptButton" onClick={search}>Search</button>
        </div>
    )
}

export default SearchCpt