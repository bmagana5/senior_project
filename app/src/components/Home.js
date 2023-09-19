const Home = ({ logout, ...props }) => {
    // consult old files to see how it works. 
    // this may need to be split up into separate components
    // grab the CSS first. worry about JS logic later
    const thinBarLeft = {
        backgroundColor: 'var(--dark)',
        boxSizing: 'border-box'
    };
    
    const contentFeed = {
        backgroundColor: 'var(--light)',
    };

    const navBar = {
        height: '7%',
        border: '1px groove var(--dark)'
    };

    const signOutBtn = {
        border: 'none',
        outline: 'none',
        color: 'gray',
        padding: '2px 8px',
        fontSize: '1em',
        cursor: 'pointer',
    };

    const postFeedContainer = {
        height: '93%'
    };

    const friendStatusList = {
        backgroundColor: 'var(--medium)',
    };

    return (
        <div className="d-flex h-100">
            {/* Group column */}
            <div className="col-1 h-100" style={thinBarLeft}></div>
            {/* Friend List column */}
            {/* <div className="col-2 h-100 py-3" style={friendListBar} id="friend-list-bar">
                <div className="h-100 w-100 px-2 d-flex flex-column">
                    <input className="mb-2 p-2 w-100" style={friendFilterInput} type="text" id="friend-filter-input" onKeyUp={null} placeholder="Filter friends..."/>
                    {props.children.find(prop => prop.key === 'FriendList')}
                </div>
            </div> */}
            <div className="col-9 d-flex flex-column h-100" style={contentFeed}>
                {/* Navbar row */}
                <div className="d-flex align-items-center w-100" style={navBar}>
                    {/*<div className="menu-icon" onclick="this.classList.toggle("change")">
                        <div className="menu-bar1"></div>
                        <div className="menu-bar2"></div>
                        <div className="menu-bar3"></div>
                    </div>*/}
                    <button className="ms-auto py-1 px-2 me-3 rounded" style={signOutBtn} id="sign-out-btn" onClick={logout}>
                        <i className="fa fa-sign-out"></i>
                    </button>
                </div>
                {/* Content Feed row */}
                <div className="d-flex w-100" style={postFeedContainer} id="post-feed-container">
                    {/* Post Feed column */}
                    {/* this should be turned into a component and 
                        used to render the general post feed, or message 
                        lists between friends or group chats */}
                    {props.children.find(prop => prop.key === 'FeedArea')}
                    {/* Friend Online Status Column */}
                    <div className="col-3 h-100" style={friendStatusList} id="friend-status-list"></div>
                </div> 
            </div>
        </div>
    );
};

export default Home;