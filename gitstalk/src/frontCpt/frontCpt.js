import React, {useState} from 'react'

import SearchCpt from '../searchCpt/searchCpt'
import status from '../status/backgroundStatus'
import githubLightImg from '../img/githubLight.png'
import githubDarkImg from '../img/githubDark.png'
import './frontCpt.css'
import '../publicStyle/darkMode.css'
import '../publicStyle/lightMode.css'

function FrontCpt(){
    let [mode, setMode] = useState(status.getMode())
    let [userName, setUserName] = useState("");

    return(
        <div id="frontCpt" className={mode === "light" ? "frontCptLightBackground" : "frontCptLightBackground"}>
            <div id="frontCptTitle">
                <img src={mode === "light" ? githubLightImg : githubDarkImg} id="frontCptLogo"/>
                <div id="frontCptTitleStr" className={mode === "light" ? "fontColorLight" : "fontColorDark"}>
                    GITSTALK
                </div>
            </div>
            <div id="frontCptSubtitle" className={mode === "light" ? "fontColorLight" : "fontColorDark"}>
                Discover who's upto what...
            </div>
            <SearchCpt/>
            <div id="frontCptRandom">
                Randomise User?
                <div id="frontCptRandomBottom">d</div>
            </div>
        </div>
    )
}

export default FrontCpt