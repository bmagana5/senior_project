import "./friend-list.styles.scss";
import FriendItem from "../friend-item/friend-item.component";

const FriendList = ({ friendsList }) => {
    return (
        <div className="friend-list-container">
            {friendsList.map(friend => <FriendItem key={friend.user_id} friendItem={friend}/>)}
        </div>
    );
};

export default FriendList;