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
    username varchar(32) not null unique,
    full_name varchar(64) not null,
	user_passwd_id int(10) unsigned not null,
    email_address varchar(64) not null unique,
    date_joined timestamp default current_timestamp,
    pfp_id int unsigned, 
    profile_bio text, 
    foreign key(pfp_id) references image(image_id),
    foreign key(user_passwd_id) references password(pwd_id)
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
    foreign key(post_picture_id) references image(image_id)
);

create table comment (
	comment_id int primary key auto_increment,
    user_id int unsigned not null, 
    post_id int unsigned not null,
    comment_body text,
    comment_image_id int(12) unsigned,
    upvote_count int default 0,
    downvote_count int default 0,
	time_created timestamp default current_timestamp,
    foreign key(user_id) references user(user_id),
    foreign key(post_id) references post(post_id),
    foreign key(comment_image_id) references image(image_id)
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
    foreign key(message_image_id) references image(image_id)
);

create table user_chat_join (
    chatthread_id int(12) unsigned,
    user_id int(10) unsigned,
    foreign key(user_id) references user(user_id),
    foreign key(chatthread_id) references chatthread(chatthread_id)
);

create table chatthread_admin (
	chatthread_id int(12) unsigned,
    user_admin_id int(10) unsigned,
    foreign key(user_admin_id) references user(user_id),
    foreign key(chatthread_id) references chatthread(chatthread_id)
);

delimiter $$
create trigger delete_all_posts_upon_user_deletion
	before delete
    on user for each row
begin
	delete from post as p where p.user_id = OLD.user_id;
	-- user
	-- 		post: delete post that belongs to user to be deleted
    -- 			comment: delete comment that belongs to post to be deleted
    -- 				nested-comment: delete all nested comments that belong to the comment to be deleted
    -- 		user_chat_join: delete every row that joins a user and a chatthread for the user to be deleted
    -- 		implement some sort of check for deleting chatthreads where count of user_chat_join amounts to 2 and user to be
    -- 			deleted belongs to one of them. If it's a chatthread with multiple users and the user to be deleted is the admin, 
    -- 			make a different user in the chatthread the admin.
end $$
delimiter ;

delimiter $$
create trigger delete_all_comments_upon_post_deletion
	before delete
    on post for each row
begin
	delete from comment as c where c.post_id = OLD.post_id;
end $$
delimiter ;

delimiter $$
create trigger delete_all_nested_comments_upon_parent_comment_deletion
	before delete
    on comment for each row
begin
	delete from comment as c where c.comment_parent_id = OLD.comment_id;
end $$
delimiter ;