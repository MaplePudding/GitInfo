import React, {useState} from 'react'
import darkmodeImg from '../img/darkmode.png'
import lightmodeImg from '../img/lightmode.png'
import githubDarkImg from '../img/githubDark.png'
import githubLightImg from '../img/githubLight.png'
import status from '../status/backgroundStatus'
import "../publicStyle/lightMode.css"
import "../publicStyle/darkMode.css"
import "./changeStyleCpt.css"

function ChangeStyleCpt(props) {

    let [mode, setMode] = useState(status.getMode());

    function changeMode(){
        status.changeMode();
        props.setMode(status.getMode());
    }

    return(
        <div id="changeStyleCpt">
            <img src={status.getMode() === "light" ? githubLightImg : githubDarkImg}/>
            <div className={status.getMode() === "light" ? "changeStyleCptLightColor" : "changeStyleCptDarkColor"}>GITSTALK</div>
            <img src={status.getMode() === "light" ? lightmodeImg : darkmodeImg} onClick={changeMode}/>
        </div>
    )
}

export default ChangeStyleCpt;