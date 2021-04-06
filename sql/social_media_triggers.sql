delimiter //
create trigger delete_admins_messages_userchat_joins_on_chatthread_deletion
	before delete
    on chatthread for each row
begin
	-- delete chat thread admins and all messages associated with that post
	delete from chatthread_admin as ca where ca.chatthread_id = OLD.chatthread_id;
    delete from message as m where m.chatthread_id = OLD.chatthread_id;
    delete from user_chat_join as ucj where ucj.chatthread_id = OLD.chatthread_id;
end //
delimiter ;

delimiter //
create trigger delete_message_image_message_deletion
	before delete
    on message for each row
begin
	delete from message_image as mi where mi.message_id = OLD.message_id;
end //
delimiter ;

-- delete all posts that belong to deleted user.
-- delete all 'friend' rows that contain this user as user1 or user2
delimiter $$
create trigger delete_dependent_table_rows_on_user_deletion
	before delete
    on user for each row
begin
	delete from post as p where p.user_id = OLD.user_id;
	delete from user_chat_join as ucj where ucj.user_id = OLD.user_id;
	delete from friend as f where f.user1_id = OLD.user_id or f.user2_id = OLD.user_id;
end $$
delimiter ;

-- we can do an update on any group chats that the deleted user was an admin of.
-- instead of deleting chatthread_admin that the deleted user was associated with, 
-- we can simply update it to be another user if there are more than two users remaining. 
-- Otherwise, we can delete the chatthread_admin row.
delimiter $$
create trigger update_user_ownership_of_messages_and_comments
	before delete
    on user for each row
begin
	-- update chatthread_admin, select count() from 
    
end $$
    delimiter ;

-- delete all comments that belong to a post that is to be deleted
delimiter $$
create trigger delete_comments_on_post_deletion
	before delete
    on post for each row
begin
	delete from comment as c where c.post_id = OLD.post_id;
end $$
delimiter ;

-- delete all child comments and images belonging to comments to be deleted
delimiter $$
create trigger delete_child_comments_images_on_comment_deletion
	before delete
    on comment for each row
begin
	delete from comment_child as cc where cc.parent_comment_id = OLD.comment_id;
    delete from comment_image as ci where ci.comment_id = OLD.comment_id;
end $$
delimiter ;