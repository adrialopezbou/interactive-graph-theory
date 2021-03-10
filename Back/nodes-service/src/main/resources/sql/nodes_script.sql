GRANT ALL PRIVILEGES ON igt_nodes.* TO 'adrialopezbou'@'localhost';
DROP SCHEMA IF EXISTS igt_nodes;
CREATE SCHEMA igt_nodes;
USE igt_nodes;

CREATE TABLE graph (
	id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    directed BOOLEAN NOT NULL,
    weighted BOOLEAN NOT NULL,
    binary_tree BOOLEAN NOT NULL,
    user_id BIGINT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE node(
	id BIGINT NOT NULL AUTO_INCREMENT,
    is_root BOOLEAN NOT NULL,
    x_pos INT NOT NULL,
    y_pos INT NOT NULL,
    graph_id BIGINT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(graph_id) REFERENCES graph(id)
);

CREATE TABLE node_connection(
	id BIGINT NOT NULL AUTO_INCREMENT,
	start_node BIGINT NOT NULL,
    end_node BIGINT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(start_node) REFERENCES node(id)
);

SELECT * FROM graph;
SELECT * FROM node;
SELECT * FROM node_connection;