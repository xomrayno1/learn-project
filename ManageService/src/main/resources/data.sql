INSERT INTO  brand(`id`,`active_flag`,`create_date`,`update_date`,`address`,`email`,`name`,`phone`)VALUES(1,1,"2021-06-13","2021-06-13","Quy nhơn, Bình định","redstart@gmail.com","Red Start","");

INSERT INTO category (`id`,`active_flag`,`create_date`,`update_date`,`description`,`name`) VALUES (1,1,"2021-06-13","2021-06-13","Cám gà","Cám gà");
INSERT INTO category (`id`,`active_flag`,`create_date`,`update_date`,`description`,`name`) VALUES (2,1,"2021-06-13","2021-06-13","Cám vịt","Cám vịt");
INSERT INTO category (`id`,`active_flag`,`create_date`,`update_date`,`description`,`name`) VALUES (3,1,"2021-06-13","2021-06-13","Cám heo","Cám heo");

INSERT INTO product (`id`,`active_flag`,`create_date`,`update_date`,`brand_id`,`category_id`,`code`,`img_url`,`name`,`price`,`weight`) VALUES (1,1,"2021-06-13","2021-06-13",1,1,"V220","","Gà thịt từ 22 - 42 ngày",282870.00,25);
INSERT INTO product (`id`,`active_flag`,`create_date`,`update_date`,`brand_id`,`category_id`,`code`,`img_url`,`name`,`price`,`weight`) VALUES (2,1,"2021-06-13","2021-06-13",1,1,"V210","","Gà thịt từ 10 - 22 ngày",292870.00,25);
INSERT INTO product (`id`,`active_flag`,`create_date`,`update_date`,`brand_id`,`category_id`,`code`,`img_url`,`name`,`price`,`weight`) VALUES (3,1,"2021-06-13","2021-06-13",1,2,"V456S","","Vịt đẻ thương phẩm",374552.00,40);
INSERT INTO product(`id`,`active_flag`,`create_date`,`update_date`,`brand_id`,`category_id`,`code`,`img_url`,`name`,`price`,`weight`) VALUES (4,1,"2021-06-13","2021-06-13",1,3,"V882R","","Hỗn hợp heo thịt từ 15 - 30kg",308833.00,25);