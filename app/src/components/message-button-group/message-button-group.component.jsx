import "./message-button-group.styles.scss";

const MessageButtonGroup = ({ messageId }) => {
    return (
        <div className="message-button-container">
            <div className="reaction-dropdown-container">
                <button type="dropdown-button">
                    <div className="tooltip-text">
                        Add Reaction&nbsp;
                    </div>
                    <i className="fas fa-laugh-beam"></i>
                </button>
                <div className="dropdown">
                    <button>Button test</button>
                    <button>Button test</button>
                    <button>Button test</button>
                    <button>Button test</button>
                </div>
            </div>
            <button className="edit-button button-item">
                <div className="button-text">
                    Edit&nbsp;
                </div>
                <i className="fas fa-pen"></i>
            </button>
            <div className="more-options-container button-item">
                <button className="dropdown-button">
                    <div className="button-text">
                        More Options&nbsp;
                    </div>
                    <i className="fas fa-ellipsis-h"></i>
                </button>
                <div className="dropdown">
                    <button className="dropdown-button">
                        Edit Message&nbsp;
                        <i className="fas fa-pen"></i>
                    </button>
                    <button className="dropdown-button">
                        Reply&nbsp;
                        <i className="fas fa-reply"></i>
                    </button>
                    <button className="dropdown-button-danger">
                        Delete Message&nbsp;
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessageButtonGroup;