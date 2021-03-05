delimiter //
create procedure insertFriend(in User1 int, in User2 int)
begin 
	insert into friend (user1_id, user2_id) value (least(User1, User2), greatest(User1, User2));
end //
delimiter ;

delimiter //
create procedure getFriends(in myID int)
begin
	select username, full_name, pfp_id, image_name from user as u inner join image as i on u.pfp_id = i.image_id 
    where u.user_id in (select user1_id from friend where user2_id = myID) 
    or u.user_id in (select user2_id from friend where user1_id = myID) order by full_name;
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