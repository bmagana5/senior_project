const FriendList = ({ friendList, openChat }) => {
    return (
        <div className="d-flex flex-column w-100" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
            {friendList.map(friend => <FriendItem key={friend.user_id} friendItem={friend} openChat={openChat}/>)}
        </div>
    );
};

const FriendItem = ({ friendItem, openChat }) => {
    const listItemContainer = {
        cursor: 'pointer'
    };

    const imageStyling = {
        height: '2.5rem',
        width: '2.5rem',
        minHeight: '2.5rem',
        minWidth: '2.5rem',
        borderRadius: '50%'
    };

    const nameContainerStyle = {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    };

    return (
        <div className="mb-2 p-1 d-flex align-items-center friend-list-item" style={listItemContainer} id={friendItem.username} onClick={() => openChat(friendItem.username)}>
            <img className="friend-image me-2" style={imageStyling} src={friendItem.image_name} alt={friendItem.username}></img>
            <div className="d-flex flex-column justify-content-center overflow-hidden">
                <div className="friend-username" style={nameContainerStyle} name={friendItem.username}>
                    @{friendItem.username}
                </div>
                <div className="friend-fullname fw-bold" style={nameContainerStyle} name={friendItem.full_name}>
                    {friendItem.full_name}
                </div>
            </div>
        </div>
    );
}

export default FriendList;