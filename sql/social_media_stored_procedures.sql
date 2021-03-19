delimiter //
create procedure insertFriend(in User1 int, in User2 int)
begin
	declare chatID int unsigned;
	insert into friend (user1_id, user2_id) value (least(User1, User2), greatest(User1, User2));
	insert into chatthread (chatthread_name) value ("Direct Messaging");
	set chatID = LAST_INSERT_ID();
	insert into user_chat_join (chatthread_id, user_id) value (chatID, User1);
	insert into user_chat_join (chatthread_id, user_id) value (chatID, User2);
end //
delimiter ;

delimiter //
create procedure updateFriend(in User1 int, in User2 int)
begin
	declare chatID int unsigned;
	-- insert into friend (user1_id, user2_id) value (least(User1, User2), greatest(User1, User2));
    insert into chatthread (chatthread_name) value ("Direct Messaging");
    set chatID = LAST_INSERT_ID();
    insert into user_chat_join (chatthread_id, user_id) value (chatID, User1);
    insert into user_chat_join (chatthread_id, user_id) value (chatID, User2);
end //
delimiter ;

delimiter //
create procedure getFriends(in myID int)
begin
	select user_id, username, full_name, pfp_id, image_name from user as u inner join image as i on u.pfp_id = i.image_id 
    where u.user_id in (select user1_id from friend where user2_id = myID) 
    or u.user_id in (select user2_id from friend where user1_id = myID) order by full_name;
end //
delimiter ;

delimiter //
create procedure getChatThread(in myID int, in friendID int)
begin
	select temp.* from 
		(select c.chatthread_id, c.chatthread_name from chatthread as c inner join user_chat_join as u 
		on c.chatthread_id = u.chatthread_id where u.user_id = myID and c.chatthread_name = "Direct Messaging") as temp 
        inner join user_chat_join as us on temp.chatthread_id = us.chatthread_id where us.user_id = friendID;
end //
delimiter ;

delimiter //
create procedure getUserPasswordInfo (in UserField varchar(64))
begin
	select user_id, username, email_address, pwd_hash from user inner join password on user_passwd_id = pwd_id where (username in (UserField) or email_address in (UserField));
end //
delimiter ;

delimiter //
create procedure getUsername (in UserField varchar(64))
begin
	select username from user where username in (UserField);
end //
delimiter ;

delimiter //
create procedure getEmailAddress (in UserField varchar(64))
begin
	select email_address from user where email_address in (UserField);
end //
delimiter ;