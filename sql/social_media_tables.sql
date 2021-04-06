create database socialmedia;
use socialmedia;

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
    image_name varchar(255) not null
);

create table user (
    user_id int(10) unsigned primary key auto_increment, 
    username varchar(64) not null unique,
    full_name varchar(64) not null,
	user_passwd_id int(10) unsigned not null unique,
    email_address varchar(64) not null unique,
    date_joined timestamp default current_timestamp,
    pfp_id int unsigned unique, 
    profile_bio text, 
    foreign key(pfp_id) references image(image_id) on delete cascade,
    foreign key(user_passwd_id) references password(pwd_id) on delete cascade
);

create table friend (
	user1_id int (12) unsigned not null,
    user2_id int (12) unsigned not null,
    friend_time timestamp default current_timestamp,
    foreign key(user1_id) references user(user_id),
    foreign key(user2_id) references user(user_id),
    unique (user1_id, user2_id),
    constraint chk_not_same_user check (user1_id != user2_id) 
);

create table post (
	post_id int(12) unsigned primary key auto_increment,
    user_id int(10) unsigned not null, 
    post_body varchar(1000),
    post_picture_id int(10) unsigned,
    upvote_count int unsigned default 0,
    downvote_count int unsigned default 0,
    post_create_time timestamp default current_timestamp,
    foreign key(user_id) references user(user_id),
    foreign key(post_picture_id) references image(image_id) on delete cascade
);

create table comment (
	comment_id int(12) unsigned primary key auto_increment,
    user_id int unsigned not null, 
    post_id int unsigned not null,
    comment_body varchar(500) not null,
    upvote_count int unsigned default 0,
    downvote_count int unsigned default 0,
	time_created timestamp default current_timestamp,
    foreign key(user_id) references user(user_id),
    foreign key(post_id) references post(post_id)
);

create table comment_child (
	parent_comment_id int unsigned not null,
    child_comment_id int unsigned not null,
    foreign key(parent_comment_id) references comment(comment_id),
    foreign key(child_comment_id) references comment(comment_id) on delete cascade,
    unique(parent_comment_id, child_comment_id),
    constraint chk_comment_not_both_parent_child check (parent_comment_id != child_comment_id)
);

create table comment_image (
	comment_id int unsigned not null unique,
    comment_image_id int unsigned not null unique,
    foreign key(comment_id) references comment(comment_id),
    foreign key(comment_image_id) references image(image_id) on delete cascade
);

create table message (
	message_id int(14) unsigned primary key auto_increment,
    message_owner_id int(10) unsigned not null,
    chatthread_id int(12) unsigned not null, -- each message will belong to a chat thread 
    message_body varchar(500),
    message_time timestamp default current_timestamp,
    is_edited bool default false,
    foreign key(message_owner_id) references user(user_id),
    foreign key(chatthread_id) references chatthread(chatthread_id)
);

create table message_image (
	message_id int unsigned not null unique,
    message_image_id int unsigned not null unique,
    foreign key(message_id) references message(message_id),
    foreign key(message_image_id) references image(image_id) on delete cascade
);

create table user_chat_join (
    chatthread_id int(12) unsigned not null,
    user_id int(10) unsigned not null,
    unique(chatthread_id, user_id), 
    foreign key(user_id) references user(user_id),
    foreign key(chatthread_id) references chatthread(chatthread_id)
);

create table chatthread_admin (
	chatthread_id int(12) unsigned not null,
    user_admin_id int(10) unsigned not null,
    unique(chatthread_id, user_admin_id), 
    foreign key(user_admin_id) references user(user_id),
    foreign key(chatthread_id) references chatthread(chatthread_id)
);

create table interest (
	interest_id int unsigned primary key,
    interest_name varchar(50) not null,
    unique(interest_name)
);

create table user_interest (
	user_id int unsigned not null,
    interest_id int unsigned not null,
    unique(user_id, interest_id),
    foreign key(user_id) references user(user_id),
    foreign key(interest_id) references interest(interest_id)
);

create table category (
	category_id int unsigned primary key,
    category_name varchar(50) not null,
    unique(category_name)
);

create table interest_category (
	category_id int unsigned not null,
    interest_id int unsigned not null,
    unique (category_id, interest_id),
    foreign key(category_id) references category(category_id),
    foreign key(interest_id) references interest(interest_id)
);