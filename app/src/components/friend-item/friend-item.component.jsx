import { useContext } from "react";
import "./friend-item.styles.scss";
import { FriendsContext } from "../../contexts/friends.context";

const FriendItem = ({ friendItem }) => {
    const { openChat } = useContext(FriendsContext);

    const onClickHandler = () => {
        openChat(friendItem.username);
    };

    return (
        <div className="friend-item-container" id={friendItem.username} onClick={onClickHandler}>
            <img className="friend-image" src={friendItem.image_name} alt={friendItem.username}></img>
            <div className="name-container">
                <div className="friend-username" name={friendItem.username}>
                    @{friendItem.username}
                </div>
                <div className="friend-fullname fw-bold" name={friendItem.full_name}>
                    {friendItem.full_name}
                </div>
            </div>
        </div>
    );
};

export default FriendItem;