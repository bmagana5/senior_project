-- drop database socialmedia;
create database socialmedia;
use socialmedia;

-- run this commented code below if PHP, through Apache server at least, cannot access the database
-- ================================================================================================
-- alter user 'root'@'localhost' identified with mysql_native_password by 'insert_password_here';
-- flush privileges;

create table chatthread (
	chatthread_id int(12) unsigned primary key auto_increment, 
    chatthread_name varchar(64)
);

create table password (
	pwd_id int(10) unsigned primary key auto_increment,
    pwd_hash varchar(64) not null
);

create table image (
	image_id int(12) unsigned primary key auto_increment,
    image_name varchar(50),
    image_content mediumblob
);

create table user (
    user_id int(10) unsigned primary key auto_increment, 
    username varchar(64) not null unique,
    full_name varchar(64) not null,
	user_passwd_id int(10) unsigned not null,
    email_address varchar(64) not null unique,
    date_joined timestamp default current_timestamp,
    pfp_id int unsigned, 
    profile_bio text, 
    foreign key(pfp_id) references image(image_id) on delete cascade,
    foreign key(user_passwd_id) references password(pwd_id) on delete cascade
);

create table friend (
	user1_id int (12) unsigned not null,
    user2_id int (12) unsigned not null,
    friend_time timestamp default current_timestamp,
    foreign key(user1_id) references user(user_id) on delete cascade,
    foreign key(user2_id) references user(user_id) on delete cascade
);

create table post (
	post_id int(12) unsigned primary key auto_increment,
    user_id int(10) unsigned not null, 
    post_body text,
    post_picture_id int(10) unsigned,
    upvote_count int default 0,
    downvote_count int default 0,
    post_create_time timestamp default current_timestamp,
    foreign key(user_id) references user(user_id),
    foreign key(post_picture_id) references image(image_id) on delete cascade
);

create table comment (
	comment_id int(12) unsigned primary key auto_increment,
    user_id int unsigned not null, 
    post_id int unsigned not null,
    comment_parent_id int unsigned, 
    comment_body text,
    comment_image_id int(12) unsigned,
    upvote_count int default 0,
    downvote_count int default 0,
	time_created timestamp default current_timestamp,
    foreign key(user_id) references user(user_id),
    foreign key(post_id) references post(post_id),
    foreign key(comment_parent_id) references comment(comment_id),
    foreign key(comment_image_id) references image(image_id) on delete cascade
);

create table message (
	message_id int(14) unsigned primary key auto_increment,
    message_owner_id int(10) unsigned not null,
    chatthread_id int(12) unsigned not null, -- each message will belong to a chat thread 
    message_body text,
    message_image_id int(12) unsigned,
    message_time timestamp default current_timestamp,
    is_edited bool default false,
    foreign key(message_owner_id) references user(user_id),
    foreign key(chatthread_id) references chatthread(chatthread_id),
    foreign key(message_image_id) references image(image_id) on delete cascade
);

-- when user is deleted, delete all user_chat_join rows that have that user's id
-- when chatthread is deleted, delete all user_chat_join that have that chatthread's id
create table user_chat_join (
    chatthread_id int(12) unsigned,
    user_id int(10) unsigned,
    foreign key(user_id) references user(user_id),
    foreign key(chatthread_id) references chatthread(chatthread_id)
);

-- when chatthread is delete, delete chatthread_admin row that has that chatthread's id
create table chatthread_admin (
	chatthread_id int(12) unsigned not null,
    user_admin_id int(10) unsigned not null,
    foreign key(user_admin_id) references user(user_id),
    foreign key(chatthread_id) references chatthread(chatthread_id)
);






-- some triggers here; there might be a better way to do this



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

delimiter $$
create trigger delete_posts_and_user_chat_joins_on_user_deletion
	before delete
    on user for each row
begin
	delete from post as p where p.user_id = OLD.user_id;
	delete from user_chat_join as ucj where ucj.user_id = OLD.user_id;
end $$
delimiter ;

delimiter $$
create trigger update_user_ownership_of_messages_and_comments
	before delete
    on user for each row
begin
	
end $$
    delimiter ;

delimiter $$
create trigger delete_comments_on_post_deletion
	before delete
    on post for each row
begin
	delete from comment as c where c.post_id = OLD.post_id;
end $$
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

-- test query to get users below
-- =============================
-- select * from user inner join password on user_passwd_id=pwd_id;