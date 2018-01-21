-- USE `pbtid0lyjykvxit5`;  /* Heroku */
USE `gifthub_db`;

TRUNCATE TABLE event_recipient_mappings;
TRUNCATE TABLE gift_category_mappings;
TRUNCATE TABLE gift_recipient_mappings;
TRUNCATE TABLE recipient_mappings;
TRUNCATE TABLE search_mappings;
TRUNCATE TABLE user_category_mappings;
TRUNCATE TABLE user_event_mappings;
TRUNCATE TABLE user_interest_mappings;



INSERT INTO recipient_mappings (user_id,recipient_id)
VALUES (1, 2);


INSERT INTO recipient_mappings (user_id,recipient_id)
VALUES (2, 2);


INSERT INTO recipient_mappings (user_id,recipient_id)
VALUES (3, 2);


INSERT INTO recipient_mappings (user_id,recipient_id)
VALUES (4, 2);


INSERT INTO recipient_mappings (user_id,recipient_id)
VALUES (5, 2);


INSERT INTO gift_category_mappings (gift_id, category_id)
VALUES (1, 3);

INSERT INTO gift_category_mappings (gift_id, category_id)
VALUES (1, 7);

INSERT INTO gift_category_mappings (gift_id, category_id)
VALUES (2, 6);

INSERT INTO gift_category_mappings (gift_id, category_id)
VALUES (2, 19);

INSERT INTO gift_category_mappings (gift_id, category_id)
VALUES (3, 17);

INSERT INTO gift_category_mappings (gift_id, category_id)
VALUES (3, 23);

INSERT INTO gift_category_mappings (gift_id, category_id)
VALUES (4, 3);

INSERT INTO gift_category_mappings (gift_id, category_id)
VALUES (4, 39);

INSERT INTO gift_category_mappings (gift_id, category_id)
VALUES (5, 4);

INSERT INTO gift_category_mappings (gift_id, category_id)
VALUES (5, 9);

INSERT INTO gift_category_mappings (gift_id, category_id)
VALUES (5, 39);

INSERT INTO gift_category_mappings (gift_id, category_id)
VALUES (5, 72);


INSERT INTO gift_category_mappings (gift_id, category_id)
VALUES (6, 2);


INSERT INTO gift_category_mappings (gift_id, category_id)
VALUES (7, 17);


INSERT INTO Events (event_name, event_description, event_date)
VALUES ('Christmas', 'Christmas 2018', '2018-12-25');


INSERT INTO user_event_mappings (user_id, event_id)
VALUES (1, 1);

INSERT INTO Events (event_name, event_description, event_date)
VALUES ('Easter', 'Easter 2018', '2018-04-11');

INSERT INTO user_event_mappings (user_id, event_id)
VALUES (1, 2);


INSERT INTO Interests (interest_name, interest_description, createdAt)
VALUES ('Art', 'Arts & Crafts', now());

INSERT INTO Interests (interest_name, interest_description, createdAt)
VALUES ('Boozy', 'Libations and breathilizers', now());

INSERT INTO Interests (interest_name, interest_description, createdAt)
VALUES ('BDSM', 'Ummm...', '2017-11-09 01:28:19');
