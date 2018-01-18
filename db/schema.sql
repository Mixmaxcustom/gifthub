-- Heroku
DROP DATABASE IF EXISTS `pbtid0lyjykvxit5`;
CREATE DATABASE `pbtid0lyjykvxit5`;
USE `pbtid0lyjykvxit5`;

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


CREATE TABLE recipients (
  recipient_id int auto_increment,
  recipient_title varchar(255),
  recipient_firstname varchar(255),
  recipient_lastname varchar(255),
  recipient_email varchar(255),
  recipient_max_price decimal(10, 2) default 0,
  recipient_birthday date,
  recipient_bio mediumtext,
  recipient_city varchar(255),
  recipient_state varchar(255),
  recipient_photo varchar(255) default "img/user-avatar.png",
  createdAt datetime,
  updatedAt datetime,
  PRIMARY KEY(recipient_id)
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


-- gift categories

CREATE TABLE categories (
  category_id int auto_increment,
  category_name varchar(255) not null,
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
  gift_asin varchar(255),
  gift_upc varchar(255),
  gift_photo varchar(255),
  gift_price decimal(10,2) default 0,
  gift_url varchar(255),
  createdAt datetime,
  updatedAt datetime,
  PRIMARY KEY(gift_id)
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



CREATE TABLE search_mapping (
  search_map_id int auto_increment,
  user_id int not null,
  search_id int not null,
  PRIMARY KEY(search_map_id)
) COMMENT='Map users to saved searches';


-- Users

INSERT INTO  users  ( user_id, user_firstname, user_lastname, user_password, user_is_admin, user_email, user_birthday, user_bio, user_city, user_state, user_photo, createdAt, updatedAt ) 
VALUES (1, 'Michael', 'Fessenden', 'cGFzc3dvcmQ=', 1, 'michael.fessenden@gmail.com', '1980-02-19', NULL, 'Portsmouth', 'NH', 'img/user-avatar.png', '2018-01-12 01:44:57', '2018-01-12 01:44:57');

INSERT INTO  users  ( user_id, user_firstname, user_lastname, user_password, user_is_admin, user_email, user_birthday, user_bio, user_city, user_state, user_photo, createdAt, updatedAt ) 
VALUES (2, 'Elizah', 'Hulseman', 'aHVzcw==', 0, 'ehulseman@gmail.com', '1990-11-01', NULL, 'Portsmouth', 'NH', 'img/user-avatar.png', '2018-01-12 01:44:57', '2018-01-12 01:44:57');

INSERT INTO  users  ( user_id, user_firstname, user_lastname, user_password, user_is_admin, user_email, user_birthday, user_bio, user_city, user_state, user_photo, createdAt, updatedAt ) 
VALUES (3, 'Jacob', 'Letourneau', 'M0lmNEEkI3JyNE1k', 0, 'mntypython74@gmail.com', '1992-06-03', NULL, 'Dover', 'NH', 'img/user-avatar.png', '2018-01-12 01:46:54', '2018-01-12 01:46:54');

INSERT INTO  users  ( user_id, user_firstname, user_lastname, user_password, user_is_admin, user_email, user_birthday, user_bio, user_city, user_state, user_photo, createdAt, updatedAt ) 
VALUES (4, 'Mike', 'Sherman', 'UXdlcnR5XzEyMw==', 0, 'msherman83@gmail.com', '1983-05-01', NULL, 'Portsmouth', 'NH', 'img/user-avatar.png', '2018-01-12 02:16:39', '2018-01-12 02:16:39');

INSERT INTO  users  ( user_id, user_firstname, user_lastname, user_password, user_is_admin, user_email, user_birthday, user_bio, user_city, user_state, user_photo, createdAt, updatedAt ) 
VALUES (5, 'James', 'Roth', 'cGFzc3dvcmQ=', 1, 'jkltroth@gmail.com', '1991-10-30', NULL, 'Danville', 'NH', 'img/user-avatar.png', '2018-01-12 02:18:21', '2018-01-12 02:18:21');


-- Categories


INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('All', 'All Departments', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('Appliances', 'Appliances', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('ArtsAndCrafts', 'Arts, Crafts & Sewing', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('Automotive', 'Automotive', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('Baby', 'Baby', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('Beauty', 'Beauty', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('Books', 'Books', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('Collectibles', 'Collectibles & Fine Arts', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('Electronics', 'Electronics', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('Fashion', 'Clothing, Shoes & Jewelry', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('FashionBaby', 'Clothing, Shoes & Jewelry - Baby', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('FashionBoys', 'Clothing, Shoes & Jewelry - Boys', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('FashionGirls', 'Clothing, Shoes & Jewelry - Girls', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('FashionMen', 'Clothing, Shoes & Jewelry - Men', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('FashionWomen', 'Clothing, Shoes & Jewelry - Women', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('GiftCards', 'Gift Cards', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('Grocery', 'Grocery & Gourmet Food', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('Handmade', 'Handmade', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('HealthPersonalCare', 'Health & Personal Care', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('HomeGarden', 'Home & Kitchen', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('Industrial', 'Industrial & Scientific', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('KindleStore', 'Kindle Store', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('LawnAndGarden', 'Patio, Lawn & Garden', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('Luggage', 'Luggage & Travel Gear', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('Magazines', 'Magazine Subscriptions', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('Marketplace', NULL, 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('Merchants', NULL, 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('MobileApps', 'Apps & Games', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('Movies', 'Movies & TV', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('MP3Downloads', 'Digital Music', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('Music', 'CDs & Vinyl', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('MusicalInstruments', 'Musical Instruments', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('OfficeProducts', 'Office Products', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('Pantry', 'Prime Pantry', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('PCHardware', 'Computers', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('PetSupplies', 'Pet Supplies', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('Software', 'Software', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('Tools', 'Tools & Home Improvement', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('Toys', 'Toys & Games', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('UnboxVideo', 'Amazon Instant Video', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('Vehicles', 'Vehicles', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('VideoGames', 'Video Games', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('Wine', 'Wine', 0);

INSERT INTO categories (category_name, category_description, category_age_limit)
VALUES ('Wireless', 'Cell Phones & Accessories', 0);


-- Recipients

INSERT INTO recipients (recipient_title, recipient_firstname, recipient_lastname, recipient_email, recipient_birthday, recipient_bio, recipient_city, recipient_state, recipient_photo)
VALUES (null, 'Samantha', null, null, null, "don't worry, she has other hats", 'Boston', 'MA', '/img/recipients/woman.jpg');


INSERT INTO recipients (recipient_title, recipient_firstname, recipient_lastname, recipient_email, recipient_birthday, recipient_bio, recipient_city, recipient_state, recipient_photo)
VALUES (null, 'Peter', 'Stewart', null, null, 'my favorite cousin', 'Bowling Green', 'KY', '/img/recipients/glasses-guy.png');



INSERT INTO recipients (recipient_title, recipient_firstname, recipient_lastname, recipient_email, recipient_birthday, recipient_bio, recipient_city, recipient_state, recipient_photo)
VALUES ('Great Aunt Susan', null, null, null, null, 'had some trouble taking this photo', 'Los Angeles', 'CA', '/img/recipients/grandma.jpg');



INSERT INTO recipient_mapping (user_id,recipient_id)
VALUES (1, 2);


INSERT INTO recipient_mapping (user_id,recipient_id)
VALUES (2, 2);


INSERT INTO recipient_mapping (user_id,recipient_id)
VALUES (3, 2);


INSERT INTO recipient_mapping (user_id,recipient_id)
VALUES (4, 2);


INSERT INTO recipient_mapping (user_id,recipient_id)
VALUES (5, 2);


-- Gifts

INSERT INTO gifts (gift_name, gift_description, gift_asin, gift_upc, gift_photo, gift_price, gift_url)
VALUES ('Art That Changed the World', 
'Art That Changed the World tells the story of every major art style, movement by movement, giving art lovers a visual timeline showing key paintings that sparked each transition and explaining major events that shaped their evolution..',
'1465414355', null, 'https://images-na.ssl-images-amazon.com/images/I/61Y1UqLcEYL._SX420_BO1,204,203,200_.jpg', 28.21, 'https://www.amazon.com/dp/1465414355');


INSERT INTO gift_category_mapping (gift_id, category_id)
VALUES (1, 3);

INSERT INTO gift_category_mapping (gift_id, category_id)
VALUES (1, 7);



INSERT INTO gifts (gift_name, gift_description, gift_asin, gift_upc, gift_photo, gift_price, gift_url)
VALUES ('Kat Von D Shade + Light Glimmer Eye Palette', 'An eye contouring palette with 12 neutral shades in a range of glimmer finishes.',
'B073WJ24TN', '816657022117', 'https://images-na.ssl-images-amazon.com/images/I/41OU%2Bavm7CL.jpg', 61.99, 'https://www.amazon.com/dp/B073WJ24TN');

INSERT INTO gift_category_mapping (gift_id, category_id)
VALUES (2, 6);

INSERT INTO gift_category_mapping (gift_id, category_id)
VALUES (2, 19);



INSERT INTO gifts (gift_name, gift_description, gift_asin, gift_upc, gift_photo, gift_price, gift_url)
VALUES ('9Greenbox Best Gift Bonsai Juniper Tree, 4 Pound', 'Bonsai is popularized by Japanese people as an art of growing ornamental, dwarf trees.',
'B00HG9SIO8', '797734699852', 'https://images-na.ssl-images-amazon.com/images/I/413GVvTH6UL.jpg', 12.79, 'https://www.amazon.com/dp/B00HG9SIO8');


INSERT INTO gift_category_mapping (gift_id, category_id)
VALUES (3, 17);

INSERT INTO gift_category_mapping (gift_id, category_id)
VALUES (3, 23);



INSERT INTO gifts (gift_name, gift_description, gift_asin, gift_upc, gift_photo, gift_price, gift_url)
VALUES ('Perler Beads 80-42935 Secret Life of Pets Fused Bead Bucket', 'The Perler Secret lives of pets fused bead bucket includes: 6000 beads, 3 small square pegboards, pattern sheet, ironing paper, and easy instructions.',
'B01H4Y4528', '80-42935', 'https://images-na.ssl-images-amazon.com/images/I/71wdrsjhL2L._SL1200_.jpg', 11.26, 'https://www.amazon.com/dp/B01H4Y4528');


INSERT INTO gift_category_mapping (gift_id, category_id)
VALUES (4, 3);

INSERT INTO gift_category_mapping (gift_id, category_id)
VALUES (4, 39);



