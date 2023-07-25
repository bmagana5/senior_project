const ChatMessage = ({ messageObj, editingMessage, saveMessageEdit, cancelMessageEdit, ...props }) => {
    const chatMessage = {
        borderBottomStyle: 'dotted',
        borderBottomColor: 'var(--medium)',
    };

    const chatMessagePfp = {
        height: '3.5rem',
        width: '3.5rem',
        borderRadius: '50%',
    };

    const chatMessageUser = {
        fontSize: '1.1rem',
    };

    const chatMessageUserLink = {
        color: 'cornflowerblue',
        fontSize: '.85rem',
        cursor: 'pointer',
    };

    const chatMessageDate = {
        fontSize: '.75rem',
    };

    const chatMessageBody = {
        color: 'gray'
    };

    return (
        <div className="position-relative d-flex align-items-center user-select-none w-100 mw-100 my-1 p-2 shadow chat-message" 
            style={chatMessage} name={`message-id-${messageObj.message_id}`} 
            onMouseEnter={() => {document.getElementById(`options-btn-group-${messageObj.message_id}`).style.display = 'block'}}
            onMouseLeave={() => {document.getElementById(`options-btn-group-${messageObj.message_id}`).style.display = 'none'}}>
            {/* message options button group */}
            {props.children}
            <img className="position-relative col-2 ms-auto" style={chatMessagePfp} src={messageObj.image_name} name={`image-id-${messageObj.image_id}`} alt={`${messageObj.friend}`}/>
            <div className="position-relative col-10 mx-auto ps-2">
                <div className="d-flex w-100 align-items-center text-white-50 fw-bold" style={chatMessageUser}>
                    {messageObj.full_name} |
                    <div className="mx-1 chat-message-user-link" style={chatMessageUserLink} name={`message-owner-id-${messageObj.user_id}`}>
                        @{messageObj.username}
                    </div>
                    <div className="text-white-50 fw-normal" style={chatMessageDate}>
                        {messageObj.message_time}
                    </div>
                </div>
                {messageObj.message_id === editingMessage 
                    ? <textarea className="w-100 mw-100" value={messageObj.message_body}>

                    </textarea> 
                    : <div className="w-100 mw-100 text-white" style={chatMessageBody}>
                        {messageObj.message_body}
                    </div>
                }

            </div>
        </div>
    );
};

const MessageButtonGroup = ({ messageId, toggleMessageEdit, replyToMessage, deleteMessage }) => {

    const messageButtonGroup = {
        display: 'none', 
        zIndex: '1'
    };

    const addReactionMenu = {
        backgroundColor: 'var(--dark)',
        textColor: 'var(--light)',
    };

    const moreOptionsMenu = {
        backgroundColor: 'var(--dark)',
        textColor: 'var(--light)',
    };

    return (
        <div className="position-absolute btn-group top-0 end-0 translate-middle-y chat-message-options-button-group" 
            style={messageButtonGroup} role="group" aria-label="message-options" id={`options-btn-group-${messageId}`}
            onMouseEnter={() => document.getElementById(`options-btn-group-${messageId}`).style.boxShadow = '-1px 3px 5px var(--medium)'}
            onMouseLeave={() => document.getElementById(`options-btn-group-${messageId}`).style.boxShadow = ''}>
            <div className="btn-group dropdown dropstart">
                {/* Add Reaction button */}
                <button type="button" className="btn border border-dark py-1 px-2 chat-message-options-button tooltip-target" data-bs-toggle="dropdown">
                    <span className="position-absolute bottom-50 start-50 translate-middle mb-2 py-1 px-2 rounded-3 text-white text-opacity-75 text-nowrap tooltiptext overflow-visible">
                        Add Reaction
                    </span>
                    <i className={`text-white-50 fs-6 fas fa-laugh-beam`}></i>
                </button>
                <div className="dropdown-menu p-2" style={addReactionMenu} id={`add-reaction-menu-${messageId}`}>
                    <button className="dropdown-item btn text-white text-opacity-75" style={{ zIndex: '6!important' }}>Button test</button>
                    <button className="dropdown-item btn text-white text-opacity-75" style={{ zIndex: '6!important' }}>Button test</button>
                    <button className="dropdown-item btn text-white text-opacity-75" style={{ zIndex: '6!important' }}>Button test</button>
                    <button className="dropdown-item btn text-white text-opacity-75" style={{ zIndex: '6!important' }}>Button test</button>
                </div>
            </div>
            {/* Edit Button */}
            <button type="button" className="btn border border-dark py-1 px-2 chat-message-options-button tooltip-target"
                onClick={() => toggleMessageEdit(messageId)}>
                <span className="position-absolute bottom-50 start-50 translate-middle mb-2 py-1 px-2 rounded-3 text-white text-opacity-75 text-nowrap tooltiptext">
                    Edit
                </span>
                <i className={`text-white-50 fs-6 fas fa-pen`}></i>
            </button>
            {/* More Options */}
            <div className="btn-group dropdown dropstart">
                <button type="button" className="border border-dark py-1 px-2 chat-message-options-button tooltip-target" data-bs-toggle="dropdown">
                    <span className="position-absolute bottom-100 end-0 mb-2 ms-n3 py-1 px-2 rounded-3 text-white text-opacity-75 text-nowrap tooltiptext-end">
                        More Options
                    </span>
                    <i className={`text-white-50 fs-6 fas fa-ellipsis-h`}></i>
                </button>
                <div className="dropdown-menu p-2" style={moreOptionsMenu} id={`more-options-menu-${messageId}`}>
                    <button className="w-100 dropdown-item d-flex align-items-center text-nowrap text-white text-opacity-75 p-2" style={{ backgroundColor: 'inherit', border: '0', color: 'var(--light)'}} onClick={() => toggleMessageEdit(messageId)}>
                        Edit Message
                        <i className="ms-auto fas fa-pen"></i>
                    </button>
                    <button className="w-100 dropdown-item d-flex align-items-center text-nowrap text-white text-opacity-75 p-2" style={{ backgroundColor: 'inherit', border: '0', color: 'var(--light)'}} onClick={() => replyToMessage(messageId)}>
                        Reply
                        <i className="ms-auto fas fa-reply"></i>
                    </button>
                    <button className="w-100 dropdown-item d-flex align-items-center text-nowrap text-danger p-2" style={{ backgroundColor: 'inherit', border: '0', color: 'var(--light)'}} onClick={() => { deleteMessage(messageId) }}>
                        Delete Message
                        <i className="ms-3 fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export { ChatMessage, MessageButtonGroup };