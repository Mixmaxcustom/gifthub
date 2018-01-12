-- Local Database
DROP DATABASE IF EXISTS `gifthub_db`;
CREATE DATABASE `gifthub_db`;
USE `gifthub_db`;


-- TABLES

-- users
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
  user_photo varchar(255) default "img/user-avatar.png",
  createdAt datetime,
  updatedAt datetime,
  PRIMARY KEY(user_id)
);



-- gift categories

CREATE TABLE categories (
  category_id int auto_increment,
  category_name varchar(255),
  -- tag is an alias to another tag (ie "movies" -> "entertainment")
  category_description mediumtext,
  category_age_limit int default 0,
  createdAt datetime,
  updatedAt datetime,
  PRIMARY KEY(category_id)
);


-- gifts

CREATE TABLE gifts (
  gift_id int auto_increment,
  gift_name varchar(255),
  gift_description mediumtext,
  gift_model_num varchar(255),
  gift_photo varchar(255),
  gift_price decimal(10,2) default 0,
  gift_url varchar(255),
  createdAt datetime,
  updatedAt datetime,
  PRIMARY KEY(gift_id)
);


-- saved user searches

CREATE TABLE saved_searches (
  search_id int auto_increment,
  search_name varchar(255) not null,
  search_description mediumtext,
  createdAt datetime,
  updatedAt datetime,
  PRIMARY KEY(search_id)
);


-- vendors

CREATE TABLE vendors (
  vendor_id int auto_increment,
  vendor_name varchar(255),
  vendor_description mediumtext,
  vendor_url varchar(255),
  createdAt datetime,
  updatedAt datetime,
  PRIMARY KEY(vendor_id)
);

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


-- map gift -> vendor
CREATE TABLE vendor_mapping (
  vendor_map_id int auto_increment,
  vendor_id int not null,
  gift_id int not null,
  PRIMARY KEY(vendor_map_id)
) COMMENT='Map vendors to products';


-- map user -> visitor/user

CREATE TABLE relationship_mapping (
  rel_map_id int auto_increment,
  user_id int not null,
  other_id int not null,
  -- ie "aunt", "uncle", "wife"
  other_relationship varchar(255),
  PRIMARY KEY(rel_map_id)
) COMMENT='Map users to other users';



CREATE TABLE search_mapping (
  search_map_id int auto_increment,
  user_id int not null,
  search_id int not null,
  PRIMARY KEY(search_map_id)
);



-- SEEDS


-- dummy users
INSERT INTO users (user_firstname, user_lastname, user_password, user_is_admin, user_email, user_birthday, user_bio, user_city, user_state)
VALUES ("Admin", "User", "cGFzc3dvcmQ=", true, "admin@gifthub.com", "1995-05-03",
"Just your average database admin", "Portsmouth", "NH");


INSERT INTO users (user_firstname, user_lastname, user_password, user_is_admin, user_email, user_birthday, user_city, user_state)
VALUES ("Tom", "Foley", "cGFzc3dvcmQ=", false, "tfoley@gmail.com", "1995-05-03", "Santa Barbara", "CA");


INSERT INTO users (user_firstname, user_lastname, user_password, user_is_admin, user_email, user_birthday, user_city, user_state)
VALUES ("Ally", "Walker", "cGFzc3dvcmQ=", false, "awalker@gmail.com", "1986-02-21", "Seattle", "WA");


INSERT INTO users (user_firstname, user_lastname, user_password, user_is_admin, user_email, user_birthday, user_city, user_state)
VALUES ("Terrance", "Hardy", "cGFzc3dvcmQ=", false, "thardy@yahoo.com", "1979-04-07", "Boston", "MA");


INSERT INTO users (user_firstname, user_lastname, user_password, user_is_admin, user_email, user_birthday, user_city, user_state)
VALUES ("Kelly", "Velazquez", "cGFzc3dvcmQ=", false, "kelly.velazquez@gmail.com", "1992-01-21", "San Diego", "CA");


INSERT INTO users (user_firstname, user_lastname, user_password, user_is_admin, user_email, user_birthday, user_city, user_state)
VALUES ("Janet", "Thomas", "cGFzc3dvcmQ=", false, "jthomas@gmail.com", "1988-12-02", "Chicago", "IL");


INSERT INTO users (user_firstname, user_lastname, user_password, user_is_admin, user_email, user_birthday, user_city, user_state)
VALUES ("Kevin", "Allen", "cGFzc3dvcmQ=", false, "kallen@yahoo.com", "1994-10-18", "Boston", "MA");




-- dummy tags

INSERT INTO categories (category_name, category_description)
VALUES ("art", "Art supplies, artwork and photography");


INSERT INTO categories (category_name, category_description)
VALUES ("electronics", "Electronic devices, including appliances and automotive appliances.");

INSERT INTO categories (category_name, category_description)
VALUES ("entertainment", "Books, movies, televisions and games");

INSERT INTO categories (category_name, category_description)
VALUES ("sports", "Sports equipment, books, clothing and memorabilia");

-- alias entertainment
INSERT INTO categories (category_name, category_description)
VALUES ("video games", "Video games, game consoles and books");

-- alias entertainment
INSERT INTO categories (category_name, category_description)
VALUES ("movies", "DVDs, blurays and streaming");

-- alias entertainment
INSERT INTO categories (category_name, category_description)
VALUES ("television", "TV Shows, streaming and HDTVs");

-- alias sports

INSERT INTO categories (category_name, category_description)
VALUES ("camping", "Camping supplies & gear");


-- vendors


INSERT INTO vendors (vendor_name, vendor_description, vendor_url)
VALUES ("RNVlights", "Provide high quality infrared night vision components and systems", "https://www.rolaidsnightvision.com");


INSERT INTO vendors (vendor_name, vendor_description, vendor_url)
VALUES ("DOMU Brands LLC", "A UK Company focused on delivering a broad range of functional, practical & innovative products.", "http://www.domubrands.com");


INSERT INTO vendors (vendor_name, vendor_description, vendor_url)
VALUES ("Nintendo", "Video game manufacturer.", "https://www.nintendo.com");


INSERT INTO vendors (vendor_name, vendor_description, vendor_url)
VALUES ("Amazon.com", "The largest online retailer.", "https://www.amazon.com");

-- gifts


-- https://www.rolaidsnightvision.com/
INSERT INTO gifts (gift_name, gift_model_num, gift_description, gift_photo, gift_price, gift_url)
VALUES ("Tactical Led Flashlight", "B06XYM4JXF",
"You can get a strong and comfortable flashlight that will accompany you when needed, with a matching holster and other accessories",
"https://images-na.ssl-images-amazon.com/images/I/81WamepB-OL._SL1500_.jpg", 17.90,
"https://www.amazon.com/Tactical-Flashlight-Waterproof-rechargeable-RNVlights/dp/B06XYM4JXF");



-- http://www.domubrands.com, ASIN
INSERT INTO gifts (gift_name, gift_model_num, gift_description, gift_photo, gift_price, gift_url)
VALUES ("Very Small Utility Tool Storage Box", "B01AC3Y63Q",
"Versatile 2 in 1 utility box with storage drawers",
"https://images-na.ssl-images-amazon.com/images/I/81NdpsS3P-L._SL1500_.jpg", 21.95,
"https://www.amazon.com/VonHaus-Very-Small-Utility-Storage/dp/B01AC3Y63Q");



INSERT INTO gifts (gift_name, gift_model_num, gift_description, gift_photo, gift_price, gift_url)
VALUES ("Super NES Classic", "B0721GGGS9",
"The Super NES Classic Edition system has the original look and feel of the ’90s home console, only smaller.",
"https://images-na.ssl-images-amazon.com/images/I/51kpDq7MmZL.jpg", 119.89,
"https://www.amazon.com/Nintendo-CLVSSNSG-Super-NES-Classic/dp/B0721GGGS9");



INSERT INTO gifts (gift_name, gift_model_num, gift_description, gift_photo, gift_price, gift_url)
VALUES ("Amazon Echo Plus", "B075RPT9WT",
"Echo Plus is a hands-free speaker you control with your voice, with a built-in smart home hub.",
"https://images-na.ssl-images-amazon.com/images/G/01/kindle/merch/2017/ECHO/FSCompProd/FS-ra-125x85._CB515626475_.png", 149.99,
"https://www.amazon.com/dp/B06XCM9LJ4");



INSERT INTO gifts (gift_name, gift_model_num, gift_description, gift_photo, gift_price, gift_url)
VALUES ("Coffee Sleeve Pumpkin Spice Latte Heart Applique", "B075RPT9WT",
"Perfect to wrap up your favorite drink. This sleeve is reusable and thus eco-friendly, so throw out those card board covers and carry your cup with style.",
"https://images-na.ssl-images-amazon.com/images/I/71ckq0R6%2ByL._SY500_.jpg", 10.95,
"https://www.amazon.com/dp/B01KWGXXF0");



INSERT INTO gifts (gift_name, gift_model_num, gift_description, gift_photo, gift_price, gift_url)
VALUES ("Exploding Kittens Card Game", "B010TQY7A8",
"Exploding Kittens is a card game for people who are into kittens and explosions and laser beams and sometimes goats.",
"https://images-na.ssl-images-amazon.com/images/I/91mSHaL6oEL._SL1500_.jpg", 19.99,
"https://www.amazon.com/gp/product/B010TQY7A8");


-- item category mapping

INSERT INTO gift_category_mapping (gift_id, category_id)
VALUES (3, 2);

INSERT INTO gift_category_mapping (gift_id, category_id)
VALUES (3, 3);

INSERT INTO gift_category_mapping (gift_id, category_id)
VALUES (3, 5);


-- admin user interest mapping

INSERT INTO user_category_mapping (user_id, category_id)
VALUES (1, 3);

INSERT INTO user_category_mapping (user_id, category_id)
VALUES (1, 5);

INSERT INTO user_category_mapping (user_id, category_id)
VALUES (1, 6);
