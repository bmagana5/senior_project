import { useContext } from "react";
import { FriendsContext } from "../../contexts/friends.context";
import "./feed-area.styles.scss";

import FriendChat from "../friend-chat/friend-chat.component";

const FeedArea = () => {
    const { activeFriendChatThreadDataRef } = useContext(FriendsContext);

    return (
        <div className="feed-area-component thread-area" id="thread-area">
            {
                activeFriendChatThreadDataRef.current ?
                    <FriendChat/>
                    : null
            }
        </div>
    );
};

export default FeedArea;