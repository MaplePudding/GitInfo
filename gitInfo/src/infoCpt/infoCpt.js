import React, {useState} from "react";
import {HashRouter as Router, Route} from 'react-router-dom'
import lodash from 'lodash'
import status from '../status/backgroundStatus'
import './infoCpt.css'
import '../publicStyle/darkMode.css'
import '../publicStyle/lightMode.css'
import SearchCpt from "../searchCpt/searchCpt";
import ChangeStyleCpt from "../changeStyleCpt/changeStyleCpt";
import createImg from "../img/create.png"
import deleteImg from "../img/delete.png"
import starImg from "../img/star.png"
import branchImg from "../img/branches.png"
import {unstable_batchedUpdates} from "react-dom";

function getLanguages(repoArr){
    let languageArr = [];

    for(let repo in repoArr){
        if(repoArr[repo].language && languageArr.indexOf(repoArr[repo].language) === -1){
            languageArr.push(repoArr[repo].language);
        }
    }

    return languageArr;
}

function getLanguageCpt(languages){
    let result = [];

    for(let lag in languages){
        result.push(<div className={status.getMode() === "light" ? "languageItem languageItemLight" : "languageItem languageItemDark"}>{languages[lag]}</div>)
    }

    return result;
}

function getStarsNum(repoArr){
    let result = 0;

    for(let repo in repoArr){
        result += repoArr[repo]["stargazers_count"];
    }

    return result;
}

function getForkNum(repoArr){
    let result = 0;

    for(let repo in repoArr){
        result += repoArr[repo]["forks"];
    }

    return result;
}

function getSimpleTime(dateStr){
    let date = new Date(dateStr);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDay();
    return `${year}年 ${month}月 ${day}日`;
}

function getActivities(activityArr){
    let result = [];
    for(let aty in activityArr){
        let tempAtyObj = {};

        tempAtyObj.url = activityArr[aty].repo.url;
        tempAtyObj.time = activityArr[aty]["created_at"];
        tempAtyObj.repoName = activityArr[aty].repo.name;

        if(activityArr[aty].type === "CreateEvent"){
            if(activityArr[aty].payload["ref_type"] === "branch"){
                tempAtyObj.img = branchImg;
                tempAtyObj.activityContent = "Created a branch "
                tempAtyObj.target = activityArr[aty].payload.ref;
                tempAtyObj.action = "branch"
            }else if(activityArr[aty].payload["ref_type"] === "repository"){
                tempAtyObj.img = createImg;
                tempAtyObj.activityContent = "Created a repository "
                tempAtyObj.action = "repository"
            }else if(activityArr[aty].payload["ref_type"] === "tag"){
                tempAtyObj.img = createImg;
                tempAtyObj.activityContent = "Created a tag ";
                tempAtyObj.action = "createTag"
            }
        }else if(activityArr[aty].type === "WatchEvent"){
            if(activityArr[aty].payload.action === "started"){
                tempAtyObj.img = starImg;
                tempAtyObj.activityContent = "Starred a repo ";
                tempAtyObj.action = "star";
            }
        }else if(activityArr[aty].type === "ReleaseEvent"){
            if(activityArr[aty].payload.action === "published"){
                tempAtyObj.img = createImg;
                tempAtyObj.activityContent = "Pushed 1 commit to"
                tempAtyObj.target = activityArr[aty].payload.release["target_commitish"];
                tempAtyObj.action = "publish"
            }
        }else if(activityArr[aty].type === "PushEvent"){
            tempAtyObj.img = createImg;
            tempAtyObj.activityContent = "Pushed 1 commit to"
            tempAtyObj.target = activityArr[aty].payload.ref.substring(activityArr[aty].payload.ref.lastIndexOf("/") + 1);
            tempAtyObj.action = "publish"
        }else if(activityArr[aty].type === "PushEvent"){
            tempAtyObj.img = createImg;
            tempAtyObj.activityContent = "Pushed 1 commit to"
            tempAtyObj.action = "publish"
            tempAtyObj.target = activityArr[aty].payload.ref.substring(activityArr[aty].payload.ref.lastIndexOf("/"));
        }else if(activityArr[aty].payload.action === "closed"){
            tempAtyObj.img = deleteImg;
            if(activityArr[aty].type === "PullRequestEvent"){
                tempAtyObj.activityContent = "Closed a ";
                tempAtyObj.target = "pull request";
                tempAtyObj.action = "closePullRequest";
            }else if(activityArr[aty].type === "IssuesEvent"){
                tempAtyObj.activityContent = "Closed an ";
                tempAtyObj.target = "issue"
                tempAtyObj.action = "closeIssue";
            }
        }
        result.push(tempAtyObj);
    }
    return result;
}

function getActivitiesList(activities){
    let activityList = [];
    for(let activity in activities){
        if(activities[activity].action === "star"){
            activityList.push(
                <div className={status.getMode() === "light" ? "activityListItemLight activityListItem" : "activityListItemDark activityListItem"}>
                    <div className={status.getMode() === "light" ? "activityListItemFront activityListItemFrontLight" : "activityListItemFront activityListItemFrontDark"}>
                        <img className="activityListItemImg" src={activities[activity].img}/>
                        <div className="activityListItemContent">{activities[activity].activityContent}&nbsp;</div>
                        <div className="transitionItem">
                            <a href={activities[activity].url}>{activities[activity].repoName}</a>
                            <div className="transitionItemBottom"></div>
                        </div>

                    </div>
                    <div className="activityListItemTime">
                        {getSimpleTime(activities[activity].time).substring(6)}
                    </div>
                </div>
            );
        }else if(activities[activity].action === "createTag"){
            activityList.push(
                <div className="activityListItem" className={status.getMode() === "light" ? "activityListItemLight activityListItem" : "activityListItemDark activityListItem"}>
                    <div className={status.getMode() === "light" ? "activityListItemFront activityListItemFrontLight" : "activityListItemFront activityListItemFrontDark"}>
                        <img className="activityListItemImg" src={activities[activity].img}/>
                        <div className="activityListItemContent">{activities[activity].activityContent}&nbsp;</div>
                        <div className="transitionItem">
                            <a href={activities[activity].url}>{activities[activity].repoName}</a>
                            <div className="transitionItemBottom"></div>
                        </div>

                    </div>
                    <div className="activityListItemTime">
                        {getSimpleTime(activities[activity].time).substring(6)}
                    </div>
                </div>
            )
        }else if(activities[activity].action === "branch"){
            activityList.push(
                <div className="activityListItem" className={status.getMode() === "light" ? "activityListItemLight activityListItem" : "activityListItemDark activityListItem"}>
                    <div className={status.getMode() === "light" ? "activityListItemFront activityListItemFrontLight" : "activityListItemFront activityListItemFrontDark"}>
                        <img className="activityListItemImg" src={activities[activity].img}/>
                        <div className="activityListItemContent">{activities[activity].activityContent}&nbsp;</div>
                        <div className="transitionItem">
                            <a href={activities[activity].url}>{activities[activity].target}</a>
                            <div className="transitionItemBottom"></div>
                        </div>
                        <div> in&nbsp;</div>
                        <div className="transitionItem">
                            <a href={activities[activity].url}>{activities[activity].repoName}</a>
                            <div className="transitionItemBottom"></div>
                        </div>

                    </div>
                    <div className="activityListItemTime">
                        {getSimpleTime(activities[activity].time).substring(6)}
                    </div>
                </div>
            );
        }else if(activities[activity].action === "repository"){
            activityList.push(
                <div className="activityListItem" className={status.getMode() === "light" ? "activityListItemLight activityListItem" : "activityListItemDark activityListItem"}>
                    <div className={status.getMode() === "light" ? "activityListItemFront activityListItemFrontLight" : "activityListItemFront activityListItemFrontDark"}>
                        <img className="activityListItemImg" src={activities[activity].img}/>
                        <div className="activityListItemContent">{activities[activity].activityContent}&nbsp;</div>
                        <div className="transitionItem">
                            <a href={activities[activity].url}>{activities[activity].repoName}</a>
                            <div className="transitionItemBottom"></div>
                        </div>
                    </div>
                    <div className="activityListItemTime">
                        {getSimpleTime(activities[activity].time).substring(6)}
                    </div>
                </div>
            )
        }else if(activities[activity].action === "create"){
            activityList.push(
                <div className="activityListItem" className={status.getMode() === "light" ? "activityListItemLight activityListItem" : "activityListItemDark activityListItem"}>
                    <div className={status.getMode() === "light" ? "activityListItemFront activityListItemFrontLight" : "activityListItemFront activityListItemFrontDark"}>
                        <img className="activityListItemImg" src={activities[activity].img}/>
                        <div className="activityListItemContent">{activities[activity].activityContent}&nbsp;</div>
                        <div className="activityListItemTarget">{activities[activity].target}</div>
                        <div> in&nbsp;</div>
                        <div className="transitionItem">
                            <a href={activities[activity].url}>{activities[activity].repoName}</a>
                            <div className="transitionItemBottom"></div>
                        </div>
                    </div>
                    <div className="activityListItemTime">
                        {getSimpleTime(activities[activity].time).substring(6)}
                    </div>
                </div>
            );
        }else if(activities[activity].action === "closePullRequest" || activities[activity].action === "closeIssue"){
            activityList.push(
                <div className="activityListItem" className={status.getMode() === "light" ? "activityListItemLight activityListItem" : "activityListItemDark activityListItem"}>
                    <div className={status.getMode() === "light" ? "activityListItemFront activityListItemFrontLight" : "activityListItemFront activityListItemFrontDark"}>
                        <img className="activityListItemImg" src={activities[activity].img}/>
                        <div className="activityListItemContent">{activities[activity].activityContent}&nbsp;</div>
                        <div className="transitionItem">
                            <a href={activities[activity].url}>{activities[activity].target}</a>
                            <div className="transitionItemBottom"></div>
                        </div>
                        <div>&nbsp;in&nbsp;</div>
                        <div className="transitionItem">
                            <a href={activities[activity].url}>{activities[activity].repoName}</a>
                            <div className="transitionItemBottom"></div>
                        </div>
                    </div>
                    <div className="activityListItemTime">
                        {getSimpleTime(activities[activity].time).substring(6)}
                    </div>
                </div>);
        }else if(activities[activity].action === "publish"){
            activityList.push(
                <div className="activityListItem" className={status.getMode() === "light" ? "activityListItemLight activityListItem" : "activityListItemDark activityListItem"}>
                    <div className={status.getMode() === "light" ? "activityListItemFront activityListItemFrontLight" : "activityListItemFront activityListItemFrontDark"}>
                        <img className="activityListItemImg" src={activities[activity].img}/>
                        <div className="activityListItemContent">{activities[activity].activityContent}&nbsp;</div>
                        <div className="transitionItem">
                            <a href={activities[activity].url}>{activities[activity].target}</a>
                            <div className="transitionItemBottom"></div>
                        </div>
                        <div>&nbsp;in&nbsp;</div>
                        <div className="transitionItem">
                            <a href={activities[activity].url}>{activities[activity].repoName}</a>
                            <div className="transitionItemBottom"></div>
                        </div>
                    </div>
                    <div className="activityListItemTime">
                        {getSimpleTime(activities[activity].time).substring(6)}
                    </div>
                </div>);
        }
    }
    return activityList;
}

function InfoCpt(props){

    let [userInfo, setUserInfo] = useState({});
    let [mode, setMode] = useState(status.getMode());
    console.log(1);

    if(props.location.state && !lodash.isEqual(userInfo, props.location.state)){
        setUserInfo(props.location.state);
    }

    let languages = getLanguages(userInfo.repo);

    let languageCpt = getLanguageCpt(languages);
    return(
        <div id="infoCpt" className={status.getMode() === "light" ? "infoCptLightBackground" : "infoCptDarkBackground"}>
            <div id="userInfoTopBar">
                <ChangeStyleCpt setMode={setMode}/>
                <div id="infoCptSearchCptOuter">
                    <SearchCpt setUserInfo={setUserInfo}/>
                </div>
            </div>

            <div id="userInfo">
                <div id="userInfoInner">
                    <div id="userInfoInnerLeft" className={status.getMode() === "light" ? "infoCptInnerLeftLight" : "infoCptInnerLeftDark"}>
                        <div id="userProfile">
                            <div id="profileItem">
                                <img src={userInfo.avator}/>
                                <div>
                                    <div id="profileName" className={status.getMode() === "light" ? "profileNameLight" : "profileNameDark"}>
                                        {userInfo.userName}
                                    </div>
                                    <div id="profileBlog">
                                            <a href={userInfo.blog}>{userInfo.blog ? userInfo.blog.substring(7) : ""}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="userInfoFlw" className={status.getMode() === "light" ? "userInfoFlwLight" : "userInfoFlwDark"}>
                            <div>
                                <div>Followers</div>
                                <div>{userInfo.followers}</div>
                            </div>
                            <div>
                                <div>Following</div>
                                <div>{userInfo.following}</div>
                            </div>
                            <div>
                                <div>Stars Received</div>
                                <div>{getStarsNum(userInfo.repo)}</div>
                            </div>
                            <div>
                                <div>Forks by users</div>
                                <div>{getForkNum(userInfo.repo)}</div>
                            </div>
                        </div>

                        <div id="userLanguage">
                            {languageCpt}
                        </div>
                        <div id="otherInfo">
                            <div id="joined" className={status.getMode() === "light" ? "joinedLight" : "joinedDark"}>
                                <div>Joined</div>
                                {getSimpleTime(userInfo.joined)}
                            </div>
                            <div id="location" className={status.getMode() === "light" ? "locationLight" : "locationDark"}>
                                <div>Location</div>
                                {userInfo.location}
                            </div>
                            <div id="lastUpdate" className={status.getMode() === "light" ? "lastUpdateLight" : "lastUpdateDark"}>
                                Last Updated on {getSimpleTime(userInfo.lastUpdate)}
                            </div>
                        </div>
                    </div>
                    <div id="userInfoInnerRight" className={status.getMode() === "light" ? "infoCptInnerRightLight" : "infoCptInnerRightDark"}>
                        <div id="userInfoInnerRightTopBar" className={status.getMode() === "light" ? "userInfoInnerRightTopBarLight" : "userInfoInnerRightTopBarDark"}>
                            LATEST ACTIVITIES
                        </div>
                        <div id="latestActivities" className={status.getMode() === "light" ? "latestActivitiesLight" : "latestActivitiesDark"}>
                            {getActivitiesList(getActivities(userInfo.activity))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default InfoCpt