import GroupListBar from "../../components/group-list-bar/group-list-bar.component";
import FriendListBar from "../../components/friend-list-bar/friend-list-bar.component";
import ContentFeed from "../../components/content-feed/content-feed.component";
import "./home.styles.scss";

const Home = () => {
    return (
        <div className="home-container">
            <GroupListBar/>
            <FriendListBar/>
            <ContentFeed/>
        </div>
    );
};

export default Home;