GRANT ALL PRIVILEGES ON igt_user.* TO 'adrialopezbou'@'localhost';
DROP SCHEMA IF EXISTS igt_user;
CREATE SCHEMA igt_user;
USE igt_user;


CREATE TABLE user (
	id BIGINT NOT NULL AUTO_INCREMENT,
	username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
  id BIGINT AUTO_INCREMENT NOT NULL,
  name VARCHAR(255),
  user_id BIGINT,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);

INSERT INTO user(username, password) VALUES
	('adrialopezbou', '$2a$10$dz8UweMKVwR8bFtOUL1TIu5820gb/VbGqV6gsK7Lva8Z2Jk36DYIe'),
    ('user', '$2a$10$dz8UweMKVwR8bFtOUL1TIu5820gb/VbGqV6gsK7Lva8Z2Jk36DYIe'),
    ('premium', '$2a$10$dz8UweMKVwR8bFtOUL1TIu5820gb/VbGqV6gsK7Lva8Z2Jk36DYIe')
;

INSERT INTO role(name, user_id) VALUES
	('ADMIN', 1),
    ('USER', 2),
    ('PREMIUM', 3)
;

SELECT * FROM user;
SELECT * FROM role;