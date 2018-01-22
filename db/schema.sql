-- Heroku
/*
DROP DATABASE IF EXISTS pbtid0lyjykvxit5;
CREATE DATABASE pbtid0lyjykvxit5;
USE pbtid0lyjykvxit5;
*/

-- Local Database
DROP DATABASE IF EXISTS gifthub_db;
CREATE DATABASE gifthub_db;
USE `gifthub_db`;


-- TABLES


-- account holders

CREATE TABLE users (
  user_id int auto_increment,
  user_firstname varchar(255) not null,
  user_lastname varchar(255),
  user_password varchar(255) not null,
  user_is_admin boolean default 0,
  user_email varchar(255) not null,
  user_birthday date not null,
  user_bio mediumtext,
  user_city varchar(255),
  user_state varchar(255),
  user_photo varchar(255) default "/img/user-avatar.png",
  created_at datetime,
  updated_at datetime,
  PRIMARY KEY(user_id)
);


-- gift(amazon) categories

CREATE TABLE categories (
  category_id int auto_increment,
  category_name varchar(255) not null,
  -- tag is an alias to another tag (ie "movies" -> "entertainment")
  category_description mediumtext,
  category_icon varchar(255) default 'play_circle_filled',
  category_age_limit int default 0,
  created_at datetime,
  updated_at datetime,
  PRIMARY KEY(category_id)
) COMMENT='Gift categories/user interests';


-- saved user events

CREATE TABLE events (
  event_id int auto_increment,
  event_name varchar(255) not null,
  event_description mediumtext,
  event_date date,
  event_budget integer default 0,
  created_at datetime,
  updated_at datetime,
  PRIMARY KEY(event_id)
) COMMENT='Saved user events';



-- saved gift ideas for recipients

CREATE TABLE gifts (
  gift_id int auto_increment,
  gift_name varchar(255),
  gift_description mediumtext,
  gift_asin varchar(255),
  gift_part_num varchar(255),
  gift_photo varchar(255),
  gift_price integer default 0,
  gift_purchased boolean default 0,
  gift_url varchar(255),
  created_at datetime,
  updated_at datetime,
  PRIMARY KEY(gift_id)
) COMMENT='Saved gift ideas for friends & relatives';


-- user interests

CREATE TABLE interests (
  interest_id int auto_increment,
  interest_name varchar(255) not null,
  -- tag is an alias to another tag (ie "movies" -> "entertainment")
  interest_description mediumtext,
  interest_icon varchar(255),
  interest_age_min integer default 0,
  interest_female boolean default 0,
  created_at datetime,
  updated_at datetime,
  PRIMARY KEY(interest_id)
) COMMENT='User interests';




-- friends & relatives of users

CREATE TABLE recipients (
  recipient_id int auto_increment,
  recipient_title varchar(255),
  recipient_firstname varchar(255),
  recipient_lastname varchar(255),
  recipient_email varchar(255),
  recipient_budget integer default 0,
  recipient_birthday date,
  recipient_bio mediumtext,
  recipient_city varchar(255),
  recipient_state varchar(255),
  recipient_photo varchar(255) default "/img/user-avatar.png",
  created_at datetime,
  updated_at datetime,
  PRIMARY KEY(recipient_id)
);


-- saved user searches

CREATE TABLE searches (
  search_id int auto_increment,
  search_name varchar(255) not null,
  search_description mediumtext,
  created_at datetime,
  updated_at datetime,
  PRIMARY KEY(search_id)
) COMMENT='Saved user searches';




-- Sequelize

/*
CREATE TABLE user_recipient_mappings (
  created_at datetime not null,
  updated_at datetime not null,
  recipient_recipient_id int(11) not null,
  user_user_id int(11) not null,
  PRIMARY KEY (recipient_recipient_id,user_user_id), KEY user_user_id (user_user_id),
  CONSTRAINT user_recipient_mappings_ibfk_1 FOREIGN KEY (recipient_recipient_id) REFERENCES recipients (recipient_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT user_recipient_mappings_ibfk_2 FOREIGN KEY (user_user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;*/
