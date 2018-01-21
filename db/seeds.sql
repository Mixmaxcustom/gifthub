
-- USE `pbtid0lyjykvxit5`;  /* Heroku */
USE `gifthub_db`;


-- empty all tables before seeding
TRUNCATE TABLE Users;
TRUNCATE TABLE Categories;
TRUNCATE TABLE Events;
TRUNCATE TABLE Gifts;
TRUNCATE TABLE Interests;
TRUNCATE TABLE Recipients;
TRUNCATE TABLE Searches;


-- Users

INSERT INTO  Users  ( user_id, user_firstname, user_lastname, user_password, user_is_admin, user_email, user_birthday, user_bio, user_city, user_state, user_photo, createdAt, updatedAt )
VALUES (1, 'Michael', 'Fessenden', 'cGFzc3dvcmQ=', 1, 'michael.fessenden@gmail.com', '1980-02-19', NULL, 'Portsmouth', 'NH', '/img/avatars/avatar-12.png', '2018-01-12 01:44:57', '2018-01-12 01:44:57');

INSERT INTO  Users  ( user_id, user_firstname, user_lastname, user_password, user_is_admin, user_email, user_birthday, user_bio, user_city, user_state, user_photo, createdAt, updatedAt )
VALUES (2, 'Elizah', 'Hulseman', 'aHVzcw==', 0, 'ehulseman@gmail.com', '1990-11-01', NULL, 'Portsmouth', 'NH', '/img/avatars/avatar-14.png', '2018-01-12 01:44:57', '2018-01-12 01:44:57');

INSERT INTO  Users  ( user_id, user_firstname, user_lastname, user_password, user_is_admin, user_email, user_birthday, user_bio, user_city, user_state, user_photo, createdAt, updatedAt )
VALUES (3, 'Jacob', 'Letourneau', 'M0lmNEEkI3JyNE1k', 0, 'mntypython74@gmail.com', '1992-06-03', NULL, 'Dover', 'NH', '/img/avatars/avatar-13.png', '2018-01-12 01:46:54', '2018-01-12 01:46:54');

INSERT INTO  Users  ( user_id, user_firstname, user_lastname, user_password, user_is_admin, user_email, user_birthday, user_bio, user_city, user_state, user_photo, createdAt, updatedAt )
VALUES (4, 'Mike', 'Sherman', 'UXdlcnR5XzEyMw==', 0, 'msherman83@gmail.com', '1983-05-01', NULL, 'Portsmouth', 'NH', '/img/avatars/avatar-12.png', '2018-01-12 02:16:39', '2018-01-12 02:16:39');

INSERT INTO  Users  ( user_id, user_firstname, user_lastname, user_password, user_is_admin, user_email, user_birthday, user_bio, user_city, user_state, user_photo, createdAt, updatedAt )
VALUES (5, 'James', 'Roth', 'cGFzc3dvcmQ=', 1, 'jkltroth@gmail.com', '1991-10-30', NULL, 'Danville', 'NH', '/img/avatars/avatar-11.png', '2018-01-12 02:18:21', '2018-01-12 02:18:21');


-- Categories


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('All', 'All Departments', 'play_circle_filled', 0);

INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Appliances', 'Appliances', 'play_circle_filled', 0);

INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('ArtsAndCrafts', 'Arts, Crafts & Sewing', 'brush', 0);

INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Automotive', 'Automotive', 'directions_car', 0);

INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Baby', 'Baby', 'child_friendly', 0);

INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Beauty', 'Beauty', 'play_circle_filled', 0);

INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Books', 'Books', 'book', 0);

INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Collectibles', 'Collectibles & Fine Arts', 'palette', 0);

INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Electronics', 'Electronics', 'power', 0);

INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Fashion', 'Clothing, Shoes & Jewelry', 'play_circle_filled', 0);

INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('FashionBaby', 'Clothing, Shoes & Jewelry - Baby', 'play_circle_filled', 0);

INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('FashionBoys', 'Clothing, Shoes & Jewelry - Boys', 'play_circle_filled', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('FashionGirls', 'Clothing, Shoes & Jewelry - Girls', 'play_circle_filled', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('FashionMen', 'Clothing, Shoes & Jewelry - Men', 'play_circle_filled', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('FashionWomen', 'Clothing, Shoes & Jewelry - Women', 'play_circle_filled', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('GiftCards', 'Gift Cards', 'card_giftcard', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Grocery', 'Grocery & Gourmet Food', 'play_circle_filled', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Handmade', 'Handmade', 'play_circle_filled', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('HealthPersonalCare', 'Health & Personal Care', 'directions_bike', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('HomeGarden', 'Home & Kitchen', 'play_circle_filled', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Industrial', 'Industrial & Scientific', 'location_city', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('KindleStore', 'Kindle Store', 'play_circle_filled', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('LawnAndGarden', 'Patio, Lawn & Garden', 'play_circle_filled', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Luggage', 'Luggage & Travel Gear', 'card_travel', 0);

INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Magazines', 'Magazine Subscriptions', 'bookmark', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('MobileApps', 'Apps & Games', 'phone_iphone', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Movies', 'Movies & TV', 'local_movies', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('MP3Downloads', 'Digital Music', 'library_music', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Music', 'CDs & Vinyl', 'music_note', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('MusicalInstruments', 'Musical Instruments', 'queue_music', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('OfficeProducts', 'Office Products', 'local_printshop', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Pantry', 'Prime Pantry', 'local_dining', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('PCHardware', 'Computers', 'computer', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('PetSupplies', 'Pet Supplies', 'pets', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Software', 'Software', 'play_circle_filled', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Tools', 'Tools & Home Improvement', 'play_circle_filled', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Toys', 'Toys & Games', 'play_circle_filled', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('UnboxVideo', 'Amazon Instant Video', 'play_circle_filled', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Vehicles', 'Vehicles', 'play_circle_filled', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('VideoGames', 'Video Games', 'play_circle_filled', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Wine', 'Wine', 'play_circle_filled', 0);


INSERT INTO Categories (category_name, category_description, category_icon, category_age_limit)
VALUES ('Wireless', 'Cell Phones & Accessories', 'play_circle_filled', 0);


-- Recipients

INSERT INTO Recipients (recipient_title, recipient_firstname, recipient_lastname, recipient_email, recipient_budget, recipient_birthday, recipient_bio, recipient_city, recipient_state, recipient_photo)
VALUES (null, 'Samantha', null, null,  7500, '1989-01-30', "Need to get her something better for her head...", 'Boston', 'MA', '/img/recipients/woman.jpg');


INSERT INTO Recipients (recipient_title, recipient_firstname, recipient_lastname, recipient_email, recipient_budget, recipient_birthday, recipient_bio, recipient_city, recipient_state, recipient_photo)
VALUES (null, 'Peter', 'Stewart', null,  10000, '1981-11-03', 'my favorite cousin', 'Bowling Green', 'KY', '/img/recipients/glasses-guy.png');


INSERT INTO Recipients (recipient_title, recipient_firstname, recipient_lastname, recipient_email, recipient_budget, recipient_birthday, recipient_bio, recipient_city, recipient_state, recipient_photo)
VALUES ('Great Aunt Susan', null, null, null,  20000, '1941-03-09', "She's kind of grumpy, but she makes the best moonshine so remember her birthday!", 'Los Angeles', 'CA', '/img/recipients/grandma.jpg');


INSERT INTO Recipients (recipient_title, recipient_firstname, recipient_lastname, recipient_email, recipient_budget, recipient_birthday, recipient_bio, recipient_city, recipient_state, recipient_photo)
VALUES ('Aunt Fran', 'Fran', 'Lebowski', null,  10000, '1947-10-29', "She's still got that mustache problem...perhaps haircare and grooming products?", 'Dorchester', 'MA', '/img/recipients/fran.jpg');


INSERT INTO Recipients (recipient_title, recipient_firstname, recipient_lastname, recipient_email, recipient_budget, recipient_birthday, recipient_bio, recipient_city, recipient_state, recipient_photo)
VALUES ('Fred from Work', 'Fred', 'Farmer', 'fred@farmer.com',  5000, '1987-04-18', "likes Widow Jane bourbon", 'Seattle', 'WA', null);


INSERT INTO Recipients (recipient_title, recipient_firstname, recipient_lastname, recipient_email, recipient_budget, recipient_birthday, recipient_bio, recipient_city, recipient_state, recipient_photo)
VALUES ('Cousin It', null, null, 'cousinit@adaams.com',  5000, '1956-10-31', "he's pretty dmn hairy", null, null, "http://images2.fanpop.com/images/photos/5600000/Addams-Family-Cousin-Itt-addams-family-5684028-356-288.jpg");

-- Gifts

INSERT INTO Gifts (gift_name, gift_description, gift_asin, gift_part_num, gift_photo, gift_price, gift_url)
VALUES ('Art That Changed the World',
'Art That Changed the World tells the story of every major art style, movement by movement, giving art lovers a visual timeline showing key paintings that sparked each transition and explaining major events that shaped their evolution..',
'1465414355', null, 'https://images-na.ssl-images-amazon.com/images/I/61Y1UqLcEYL._SX420_BO1,204,203,200_.jpg', 2821, 'https://www.amazon.com/dp/1465414355');


INSERT INTO Gifts (gift_name, gift_description, gift_asin, gift_part_num, gift_photo, gift_price, gift_url)
VALUES ('Kat Von D Shade + Light Glimmer Eye Palette', 'An eye contouring palette with 12 neutral shades in a range of glimmer finishes.',
'B073WJ24TN', '816657022117', 'https://images-na.ssl-images-amazon.com/images/I/41OU%2Bavm7CL.jpg', 6199, 'https://www.amazon.com/dp/B073WJ24TN');


INSERT INTO Gifts (gift_name, gift_description, gift_asin, gift_part_num, gift_photo, gift_price, gift_url)
VALUES ('9Greenbox Best Gift Bonsai Juniper Tree, 4 Pound', 'Bonsai is popularized by Japanese people as an art of growing ornamental, dwarf trees.',
'B00HG9SIO8', '797734699852', 'https://images-na.ssl-images-amazon.com/images/I/413GVvTH6UL.jpg', 1279, 'https://www.amazon.com/dp/B00HG9SIO8');


INSERT INTO Gifts (gift_name, gift_description, gift_asin, gift_part_num, gift_photo, gift_price, gift_url)
VALUES ('Perler Beads 80-42935 Secret Life of Pets Fused Bead Bucket', 'The Perler Secret lives of pets fused bead bucket includes: 6000 beads, 3 small square pegboards, pattern sheet, ironing paper, and easy instructions.',
'B01H4Y4528', '80-42935', 'https://images-na.ssl-images-amazon.com/images/I/71wdrsjhL2L._SL1200_.jpg', 1126, 'https://www.amazon.com/dp/B01H4Y4528');


INSERT INTO Gifts (gift_name, gift_description, gift_asin, gift_part_num, gift_photo, gift_price, gift_url)
VALUES ('Phone Holder for Car - Air Vent Magnetic Car Phone Mount', 'Holds most smartphones with or without a case, MP3 players & GPS devices.',
'B00UZBMUK2', 'MG136', 'https://images-na.ssl-images-amazon.com/images/I/61PLpHFfJGL._SL1080_.jpg', 895,
'https://www.amazon.com/Phone-Holder-Car-Magna-Snap-Universal/dp/B00UZBMUK2');


INSERT INTO Gifts (gift_name, gift_description, gift_asin, gift_part_num, gift_photo, gift_price, gift_url)
VALUES ('KitchenAid 8-Quart Stand Mixer with Bowl Lift', "The KitchenAid 8-Quart Stand Mixer is a large capacity baker's essential equipped to handle more than 8 pounds of dough for the perfect batch of cookies, bread, or crust in a single bowl.",
'B00L2EZIP0', 'KSM8990NP', 'https://images-na.ssl-images-amazon.com/images/I/81ERKuqTYXL._SL1500_.jpg', 55999,
'https://www.amazon.com/KitchenAid-KSM8990NP-8-Quart-Stand-Nickel/dp/B00L2EZIP0');


INSERT INTO Gifts (gift_name, gift_description, gift_asin, gift_part_num, gift_photo, gift_price, gift_url)
VALUES ('Starburst Cherry - 1 Pound', "Approximately 85-90 pieces of Cherry Starburst.",
'B00JYK73G6', null, 'https://pixel.nymag.com/imgs/daily/strategist/2016/12/15/25-Gifts/Starburst-only-cherry.w540.h356.jpg', 1500,
'https://www.amazon.com/Starburst-Cherry-1-Pound/dp/B00JYK73G6');
