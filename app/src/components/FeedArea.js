const FeedArea = (props) => {
    return (
        <div className="col-9 h-100 thread-area" id="thread-area">
        {props.children}
        </div>
    );
};

const Chat = () => {
    return (
        <div>

        </div>
    )
};

export { FeedArea, Chat };