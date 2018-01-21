-- USE `pbtid0lyjykvxit5`;  /* Heroku */
USE `gifthub_db`;

-- MAPPINGS

-- map users -> interests
CREATE TABLE user_category_mappingss (
    ucmap_id int auto_increment,
    user_id int,
    category_id int,
    PRIMARY KEY(ucmap_id)
) COMMENT='Map users to interests';



-- map gifts -> interests
CREATE TABLE gift_category_mappingss (
    gift_category_id int auto_increment,
    gift_id int,
    category_id int,
    PRIMARY KEY(gift_category_id)
) COMMENT='Map gifts to interests';


-- map gifts -> recipients
CREATE TABLE gift_recipient_mappingss (
    rec_gift_id int auto_increment,
    gift_id int,
    recipient_id int,
    PRIMARY KEY(rec_gift_id)
) COMMENT='Map gifts to recipients';



-- map user -> recipient

CREATE TABLE recipient_mappingss (
  rmap_id int auto_increment,
  user_id int not null,
  recipient_id int not null,
  PRIMARY KEY(rmap_id)
) COMMENT='Map users to recipients';


-- map user -> saved search

CREATE TABLE search_mappingss (
  search_map_id int auto_increment,
  user_id int not null,
  search_id int not null,
  PRIMARY KEY(search_map_id)
) COMMENT='Map users to saved searches';


-- map event -> recipient

CREATE TABLE event_recipient_mappingss (
  er_map_id int auto_increment,
  event_id int not null,
  recipient_id int not null,
  PRIMARY KEY(er_map_id)
) COMMENT='Map saved events to recipients';


-- map user -> event

CREATE TABLE user_event_mappings (
  uevent_map_id int auto_increment,
  user_id int not null,
  event_id int not null,
  PRIMARY KEY(uevent_map_id)
) COMMENT='Map users to saved events';




-- map user -> user interest

CREATE TABLE user_interest_mappings (
  uint_map_id int auto_increment,
  -- this is really recipient
  -- user_id int default -1,
  recipient_id int not null,
  interest_id int not null,
  PRIMARY KEY(uint_map_id)
) COMMENT='Map recipients to interests.';
