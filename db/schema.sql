-- Heroku
/*
DROP DATABASE IF EXISTS `pbtid0lyjykvxit5`;
CREATE DATABASE `pbtid0lyjykvxit5`;
USE `pbtid0lyjykvxit5`;
*/

-- Local Database
DROP DATABASE IF EXISTS `gifthub_db`;
CREATE DATABASE `gifthub_db`;
USE `gifthub_db`;

/*
categories
gift_category_mapping
gift_recipient_mapping
gifts
recipient_mapping
recipients
saved_searches
search_mapping
user_category_mapping
user_events
*/

/*
remove:

user_event_mapping
recipient_mapping (unless we want to share?)
*/

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
  createdAt datetime,
  updatedAt datetime,
  PRIMARY KEY(user_id)
);

-- friends & relatives of users

CREATE TABLE recipients (
  recipient_id int auto_increment,
  recipient_title varchar(255),
  recipient_firstname varchar(255),
  recipient_lastname varchar(255),
  recipient_email varchar(255),
  recipient_max_budget decimal(10, 2) default 0,
  recipient_birthday date,
  recipient_bio mediumtext,
  recipient_city varchar(255),
  recipient_state varchar(255),
  recipient_photo varchar(255) default "/img/user-avatar.png",
  createdAt datetime,
  updatedAt datetime,
  PRIMARY KEY(recipient_id)
);



-- gift(amazon) categories

CREATE TABLE categories (
  category_id int auto_increment,
  category_name varchar(255) not null,
  -- tag is an alias to another tag (ie "movies" -> "entertainment")
  category_description mediumtext,
  category_icon varchar(255) default 'play_circle_filled',
  category_age_limit int default 0,
  createdAt datetime,
  updatedAt datetime,
  PRIMARY KEY(category_id)
) COMMENT='Gift categories/user interests';


-- user interests

CREATE TABLE user_interests (
  interest_id int auto_increment,
  interest_name varchar(255) not null,
  -- tag is an alias to another tag (ie "movies" -> "entertainment")
  interest_description mediumtext,
  createdAt datetime,
  updatedAt datetime,
  PRIMARY KEY(interest_id)
) COMMENT='User interests';




-- saved gift ideas for recipients

CREATE TABLE gifts (
  gift_id int auto_increment,
  gift_name varchar(255),
  gift_description mediumtext,
  gift_asin varchar(255),
  gift_upc varchar(255),
  gift_photo varchar(255),
  gift_price decimal(10,2) default 0,
  gift_purchased boolean default 0,
  gift_url varchar(255),
  createdAt datetime,
  updatedAt datetime,
  PRIMARY KEY(gift_id)
) COMMENT='Saved gift ideas for friends & relatives';



-- saved user searches

CREATE TABLE saved_searches (
  search_id int auto_increment,
  search_name varchar(255) not null,
  search_description mediumtext,
  createdAt datetime,
  updatedAt datetime,
  PRIMARY KEY(search_id)
) COMMENT='Saved user searches';


-- saved user events

CREATE TABLE user_events (
  event_id int auto_increment,
  event_name varchar(255) not null,
  event_description mediumtext,
  event_date date,
  event_budget decimal(10, 2) default 0,
  createdAt datetime,
  updatedAt datetime,
  PRIMARY KEY(event_id)
) COMMENT='Saved user events';


-- MAPPINGS


-- map users -> interests
CREATE TABLE user_category_mapping (
    ucmap_id int auto_increment,
    user_id int,
    category_id int,
    PRIMARY KEY(ucmap_id)
) COMMENT='Map users to interests';



-- map gifts -> interests
CREATE TABLE gift_category_mapping (
    gift_category_id int auto_increment,
    gift_id int,
    category_id int,
    PRIMARY KEY(gift_category_id)
) COMMENT='Map gifts to interests';


-- map gifts -> recipients
CREATE TABLE gift_recipient_mapping (
    rec_gift_id int auto_increment,
    gift_id int,
    recipient_id int,
    PRIMARY KEY(rec_gift_id)
) COMMENT='Map gifts to recipients';



-- map user -> recipient

CREATE TABLE recipient_mapping (
  rmap_id int auto_increment,
  user_id int not null,
  recipient_id int not null,
  PRIMARY KEY(rmap_id)
) COMMENT='Map users to recipients';


-- map user -> saved search

CREATE TABLE search_mapping (
  search_map_id int auto_increment,
  user_id int not null,
  search_id int not null,
  PRIMARY KEY(search_map_id)
) COMMENT='Map users to saved searches';


-- map user -> event

CREATE TABLE user_event_mapping (
  uevent_map_id int auto_increment,
  user_id int not null,
  event_id int not null,
  PRIMARY KEY(uevent_map_id)
) COMMENT='Map users to saved events';


-- map event -> recipient

CREATE TABLE event_recipient_mapping (
  er_map_id int auto_increment,
  event_id int not null,
  recipient_id int not null,
  PRIMARY KEY(er_map_id)
) COMMENT='Map saved events to recipients';


-- map user -> user interest

CREATE TABLE user_interest_mapping (
  uint_map_id int auto_increment,
  -- this is really recipient
  user_id int default -1,
  recipient_id int not null,
  interest_id int not null,
  PRIMARY KEY(uint_map_id)
) COMMENT='Map recipients to interests.';
