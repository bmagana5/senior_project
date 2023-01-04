const FeedArea = (props) => {
    return (
        <div className="col-9 h-100 thread-area" id="thread-area">
        {props.children}
        </div>
    );
};

const FriendChat = ({ friendChatData }) => {
    return (
        <div>
            mushroom kingdom, here I come!
        </div>
    )
};

export { FeedArea, FriendChat };