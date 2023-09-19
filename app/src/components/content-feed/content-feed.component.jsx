import FeedArea from "../feed-area/feed-area.component";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import './content-feed.styles.scss';

const ContentFeed = () => {
    const { logout } = useContext(UserContext);

    return (
        <div className="contend-feed-container">
            {/* Navbar row */}
            <div className="nav-bar">
                {/*<div className="menu-icon" onclick="this.classList.toggle("change")">
                    <div className="menu-bar1"></div>
                    <div className="menu-bar2"></div>
                    <div className="menu-bar3"></div>
                </div>*/}
                <button className="sign-out" onClick={logout}>
                    <i className="fa fa-sign-out"></i>
                </button>
            </div>
            {/* Content Feed row */}
            <div className="post-feed-container" id="post-feed-container">
                {/* Post Feed column */}
                {/* this should be turned into a component and 
                    used to render the general post feed, or message 
                    lists between friends or group chats */}
                <FeedArea/>
                {/* Friend Online Status Column */}
                <div className="friend-status-list-container col-3 h-100" id="friend-status-list"></div>
            </div> 
        </div>
    );
};

export default ContentFeed;