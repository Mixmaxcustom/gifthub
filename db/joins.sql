use gifthub_db;

SELECT users.user_id, users.user_firstname, users.user_lastname, users.user_email, users.user_password, users.user_birthday, users.user_bio, users.user_city, users.user_state,
GROUP_CONCAT(DISTINCT categories.category_name SEPARATOR ',') as user_interests
FROM users 


LEFT JOIN user_category_mapping
ON user_category_mapping.user_id = users.user_id


LEFT JOIN categories
ON categories.category_id = user_category_mapping.category_id


GROUP BY users.user_id, users.user_firstname, users.user_lastname, users.user_email, users.user_password, users.user_birthday, users.user_bio, users.user_city, users.user_state




-- 

use gifthub_db;

SELECT gifts.gift_id, gifts.gift_name, gifts.gift_description,
GROUP_CONCAT(DISTINCT categories.category_id SEPARATOR ',') as gift_category_ids,
GROUP_CONCAT(DISTINCT categories.category_name SEPARATOR ',') as gift_categories

FROM gifts 


LEFT JOIN gift_category_mapping
ON gift_category_mapping.gift_id = gifts.gift_id


LEFT JOIN categories
ON gift_category_mapping.category_id = categories.category_id


GROUP BY gifts.gift_id, gifts.gift_name, gifts.gift_description