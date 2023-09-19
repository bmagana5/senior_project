import "./friend-list-bar.styles.scss";
import { useContext } from "react";
import { FriendsContext } from "../../contexts/friends.context";
import FriendList from "../friend-list/friend-list.component";

const FriendListBar = () => {
    const { friendsList } = useContext(FriendsContext);
    
    return(
        <div className="friend-list-bar-container" id="friend-list-bar">
            <div className="friend-filter-container">
                <input className="filter-input" type="text" id="friend-filter-input" onKeyUp={null} placeholder="Filter friends..."/>
            </div>
            <FriendList friendsList={friendsList}/>
        </div>
    );
};

export default FriendListBar;