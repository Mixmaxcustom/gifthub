-- empty all tables before seeding
-- USE `pbtid0lyjykvxit5`;

USE `gifthub_db`;

TRUNCATE TABLE categories;
TRUNCATE TABLE event_recipient_mapping;
TRUNCATE TABLE gift_category_mapping;
TRUNCATE TABLE gift_recipient_mapping;
TRUNCATE TABLE gifts;
TRUNCATE TABLE recipient_mapping;
TRUNCATE TABLE recipients;
TRUNCATE TABLE saved_searches;
TRUNCATE TABLE search_mapping;
TRUNCATE TABLE user_category_mapping;
TRUNCATE TABLE user_event_mapping;
TRUNCATE TABLE user_events;
TRUNCATE TABLE user_interest_mapping;
TRUNCATE TABLE user_interests;
TRUNCATE TABLE users;



-- Users

INSERT INTO  users  ( user_id, user_firstname, user_lastname, user_password, user_is_admin, user_email, user_birthday, user_bio, user_city, user_state, user_photo, createdAt, updatedAt )
VALUES (1, 'Michael', 'Fessenden', 'cGFzc3dvcmQ=', 1, 'michael.fessenden@gmail.com', '1980-02-19', NULL, 'Portsmouth', 'NH', '/img/avatars/avatar-12.png', '2018-01-12 01:44:57', '2018-01-12 01:44:57');

INSERT INTO  users  ( user_id, user_firstname, user_lastname, user_password, user_is_admin, user_email, user_birthday, user_bio, user_city, user_state, user_photo, createdAt, updatedAt )
VALUES (2, 'Elizah', 'Hulseman', 'aHVzcw==', 0, 'ehulseman@gmail.com', '1990-11-01', NULL, 'Portsmouth', 'NH', '/img/avatars/avatar-14.png', '2018-01-12 01:44:57', '2018-01-12 01:44:57');

INSERT INTO  users  ( user_id, user_firstname, user_lastname, user_password, user_is_admin, user_email, user_birthday, user_bio, user_city, user_state, user_photo, createdAt, updatedAt )
VALUES (3, 'Jacob', 'Letourneau', 'M0lmNEEkI3JyNE1k', 0, 'mntypython74@gmail.com', '1992-06-03', NULL, 'Dover', 'NH', '/img/avatars/avatar-13.png', '2018-01-12 01:46:54', '2018-01-12 01:46:54');

INSERT INTO  users  ( user_id, user_firstname, user_lastname, user_password, user_is_admin, user_email, user_birthday, user_bio, user_city, user_state, user_photo, createdAt, updatedAt )
VALUES (4, 'Mike', 'Sherman', 'UXdlcnR5XzEyMw==', 0, 'msherman83@gmail.com', '1983-05-01', NULL, 'Portsmouth', 'NH', '/img/avatars/avatar-12.png', '2018-01-12 02:16:39', '2018-01-12 02:16:39');

INSERT INTO  users  ( user_id, user_firstname, user_lastname, user_password, user_is_admin, user_email, user_birthday, user_bio, user_city, user_state, user_photo, createdAt, updatedAt )
VALUES (5, 'James', 'Roth', 'cGFzc3dvcmQ=', 1, 'jkltroth@gmail.com', '1991-10-30', NULL, 'Danville', 'NH', '/img/avatars/avatar-11.png', '2018-01-12 02:18:21', '2018-01-12 02:18:21');


-- Categories


INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('All', 'All Departments', 'play_circle_filled', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Appliances', 'Appliances', 'play_circle_filled', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('ArtsAndCrafts', 'Arts, Crafts & Sewing', 'brush', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Automotive', 'Automotive', 'directions_car', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Baby', 'Baby', 'child_friendly', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Beauty', 'Beauty', 'play_circle_filled', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Books', 'Books', 'book', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Collectibles', 'Collectibles & Fine Arts', 'palette', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Electronics', 'Electronics', 'power', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Fashion', 'Clothing, Shoes & Jewelry', 'play_circle_filled', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('FashionBaby', 'Clothing, Shoes & Jewelry - Baby', 'play_circle_filled', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('FashionBoys', 'Clothing, Shoes & Jewelry - Boys', 'play_circle_filled', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('FashionGirls', 'Clothing, Shoes & Jewelry - Girls', 'play_circle_filled', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('FashionMen', 'Clothing, Shoes & Jewelry - Men', 'play_circle_filled', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('FashionWomen', 'Clothing, Shoes & Jewelry - Women', 'play_circle_filled', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('GiftCards', 'Gift Cards', 'card_giftcard', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Grocery', 'Grocery & Gourmet Food', 'play_circle_filled', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Handmade', 'Handmade', 'play_circle_filled', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('HealthPersonalCare', 'Health & Personal Care', 'directions_bike', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('HomeGarden', 'Home & Kitchen', 'play_circle_filled', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Industrial', 'Industrial & Scientific', 'location_city', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('KindleStore', 'Kindle Store', 'play_circle_filled', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('LawnAndGarden', 'Patio, Lawn & Garden', 'play_circle_filled', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Luggage', 'Luggage & Travel Gear', 'card_travel', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Magazines', 'Magazine Subscriptions', 'bookmark', 0);


INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('MobileApps', 'Apps & Games', 'phone_iphone', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Movies', 'Movies & TV', 'local_movies', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('MP3Downloads', 'Digital Music', 'library_music', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Music', 'CDs & Vinyl', 'music_note', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('MusicalInstruments', 'Musical Instruments', 'queue_music', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('OfficeProducts', 'Office Products', 'local_printshop', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Pantry', 'Prime Pantry', 'local_dining', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('PCHardware', 'Computers', 'computer', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('PetSupplies', 'Pet Supplies', 'pets', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Software', 'Software', 'play_circle_filled', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Tools', 'Tools & Home Improvement', 'play_circle_filled', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Toys', 'Toys & Games', 'play_circle_filled', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('UnboxVideo', 'Amazon Instant Video', 'play_circle_filled', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Vehicles', 'Vehicles', 'play_circle_filled', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('VideoGames', 'Video Games', 'play_circle_filled', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Wine', 'Wine', 'play_circle_filled', 0);

INSERT INTO categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Wireless', 'Cell Phones & Accessories', 'play_circle_filled', 0);


-- Recipients
/*
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
*/

INSERT INTO recipients (recipient_title, recipient_firstname, recipient_lastname, recipient_email, recipient_max_budget, recipient_birthday, recipient_bio, recipient_city, recipient_state, recipient_photo)
VALUES (null, 'Samantha', null, null,  75.00, '1989-01-30', "Need to get her something better for her head...", 'Boston', 'MA', '/img/recipients/woman.jpg');


INSERT INTO recipients (recipient_title, recipient_firstname, recipient_lastname, recipient_email, recipient_max_budget, recipient_birthday, recipient_bio, recipient_city, recipient_state, recipient_photo)
VALUES (null, 'Peter', 'Stewart', null,  100.00, '1981-11-03', 'my favorite cousin', 'Bowling Green', 'KY', '/img/recipients/glasses-guy.png');

INSERT INTO recipients (recipient_title, recipient_firstname, recipient_lastname, recipient_email, recipient_max_budget, recipient_birthday, recipient_bio, recipient_city, recipient_state, recipient_photo)
VALUES ('Great Aunt Susan', null, null, null,  200.00, '1941-03-09', "She's kind of grumpy, but she makes the best moonshine so remember her birthday!", 'Los Angeles', 'CA', '/img/recipients/grandma.jpg');

INSERT INTO recipients (recipient_title, recipient_firstname, recipient_lastname, recipient_email, recipient_max_budget, recipient_birthday, recipient_bio, recipient_city, recipient_state, recipient_photo)
VALUES ('Aunt Fran', 'Fran', 'Lebowski', null,  100.00, '1947-10-29', "She's still got that mustache problem...perhaps haircare and grooming products?", 'Dorchester', 'MA', '/img/recipients/fran.jpg');

INSERT INTO recipients (recipient_title, recipient_firstname, recipient_lastname, recipient_email, recipient_max_budget, recipient_birthday, recipient_bio, recipient_city, recipient_state, recipient_photo)
VALUES ('Fred from Work', 'Fred', 'Farmer', 'fred@farmer.com',  50.00, '1987-04-18', "likes Widow Jane bourbon", 'Seattle', 'WA', null);


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

INSERT INTO gifts (gift_name, gift_description, gift_asin, gift_part_num, gift_photo, gift_price, gift_url)
VALUES ('Art That Changed the World',
'Art That Changed the World tells the story of every major art style, movement by movement, giving art lovers a visual timeline showing key paintings that sparked each transition and explaining major events that shaped their evolution..',
'1465414355', null, 'https://images-na.ssl-images-amazon.com/images/I/61Y1UqLcEYL._SX420_BO1,204,203,200_.jpg', 2821, 'https://www.amazon.com/dp/1465414355');


INSERT INTO gift_category_mapping (gift_id, category_id)
VALUES (1, 3);

INSERT INTO gift_category_mapping (gift_id, category_id)
VALUES (1, 7);



INSERT INTO gifts (gift_name, gift_description, gift_asin, gift_part_num, gift_photo, gift_price, gift_url)
VALUES ('Kat Von D Shade + Light Glimmer Eye Palette', 'An eye contouring palette with 12 neutral shades in a range of glimmer finishes.',
'B073WJ24TN', '816657022117', 'https://images-na.ssl-images-amazon.com/images/I/41OU%2Bavm7CL.jpg', 6199, 'https://www.amazon.com/dp/B073WJ24TN');

INSERT INTO gift_category_mapping (gift_id, category_id)
VALUES (2, 6);

INSERT INTO gift_category_mapping (gift_id, category_id)
VALUES (2, 19);



INSERT INTO gifts (gift_name, gift_description, gift_asin, gift_part_num, gift_photo, gift_price, gift_url)
VALUES ('9Greenbox Best Gift Bonsai Juniper Tree, 4 Pound', 'Bonsai is popularized by Japanese people as an art of growing ornamental, dwarf trees.',
'B00HG9SIO8', '797734699852', 'https://images-na.ssl-images-amazon.com/images/I/413GVvTH6UL.jpg', 1279, 'https://www.amazon.com/dp/B00HG9SIO8');


INSERT INTO gift_category_mapping (gift_id, category_id)
VALUES (3, 17);

INSERT INTO gift_category_mapping (gift_id, category_id)
VALUES (3, 23);



INSERT INTO gifts (gift_name, gift_description, gift_asin, gift_part_num, gift_photo, gift_price, gift_url)
VALUES ('Perler Beads 80-42935 Secret Life of Pets Fused Bead Bucket', 'The Perler Secret lives of pets fused bead bucket includes: 6000 beads, 3 small square pegboards, pattern sheet, ironing paper, and easy instructions.',
'B01H4Y4528', '80-42935', 'https://images-na.ssl-images-amazon.com/images/I/71wdrsjhL2L._SL1200_.jpg', 1126, 'https://www.amazon.com/dp/B01H4Y4528');


INSERT INTO gift_category_mapping (gift_id, category_id)
VALUES (4, 3);

INSERT INTO gift_category_mapping (gift_id, category_id)
VALUES (4, 39);


INSERT INTO gifts (gift_name, gift_description, gift_asin, gift_part_num, gift_photo, gift_price, gift_url)
VALUES ('Phone Holder for Car - Air Vent Magnetic Car Phone Mount', 'Holds most smartphones with or without a case, MP3 players & GPS devices.',
'B00UZBMUK2', 'MG136', 'https://images-na.ssl-images-amazon.com/images/I/61PLpHFfJGL._SL1080_.jpg', 895, 
'https://www.amazon.com/Phone-Holder-Car-Magna-Snap-Universal/dp/B00UZBMUK2');

INSERT INTO gift_category_mapping (gift_id, category_id)
VALUES (5, 4);

INSERT INTO gift_category_mapping (gift_id, category_id)
VALUES (5, 9);

INSERT INTO gift_category_mapping (gift_id, category_id)
VALUES (5, 39);

INSERT INTO gift_category_mapping (gift_id, category_id)
VALUES (5, 72);


INSERT INTO gifts (gift_name, gift_description, gift_asin, gift_part_num, gift_photo, gift_price, gift_url)
VALUES ('KitchenAid 8-Quart Stand Mixer with Bowl Lift', "The KitchenAid 8-Quart Stand Mixer is a large capacity baker's essential equipped to handle more than 8 pounds of dough for the perfect batch of cookies, bread, or crust in a single bowl.",
'B00L2EZIP0', 'KSM8990NP', 'https://images-na.ssl-images-amazon.com/images/I/81ERKuqTYXL._SL1500_.jpg', 55999,
'https://www.amazon.com/KitchenAid-KSM8990NP-8-Quart-Stand-Nickel/dp/B00L2EZIP0');


INSERT INTO gift_category_mapping (gift_id, category_id)
VALUES (6, 2);


INSERT INTO gifts (gift_name, gift_description, gift_asin, gift_part_num, gift_photo, gift_price, gift_url)
VALUES ('Starburst Cherry - 1 Pound', "Approximately 85-90 pieces of Cherry Starburst.",
'B00JYK73G6', null, 'https://pixel.nymag.com/imgs/daily/strategist/2016/12/15/25-gifts/Starburst-only-cherry.w540.h356.jpg', 1500,
'https://www.amazon.com/Starburst-Cherry-1-Pound/dp/B00JYK73G6');


INSERT INTO gift_category_mapping (gift_id, category_id)
VALUES (7, 17);



-- User Events
INSERT INTO user_events (event_name, event_description, event_date)
VALUES ('Christmas', 'Christmas 2018', '2018-12-25');

INSERT INTO user_event_mapping (user_id, event_id)
VALUES (1, 1);

INSERT INTO user_events (event_name, event_description, event_date)
VALUES ('Easter', 'Easter 2018', '2018-04-11');

INSERT INTO user_event_mapping (user_id, event_id)
VALUES (1, 2);



/*
CREATE TABLE user_interests (
  interest_id int auto_increment,
  interest_name varchar(255) not null,
  -- tag is an alias to another tag (ie "movies" -> "entertainment")
  interest_description mediumtext,
  createdAt datetime,
  updatedAt datetime,
  PRIMARY KEY(interest_id)
*/

-- user interests

INSERT INTO user_interests (interest_name, interest_description, createdAt)
VALUES ('Art', 'Arts & Crafts', now());

INSERT INTO user_interests (interest_name, interest_description, createdAt)
VALUES ('Boozy', 'Libations and breathilizers', now());

INSERT INTO user_interests (interest_name, interest_description, createdAt)
VALUES ('BDSM', 'Ummm...', '2017-11-09 01:28:19');
