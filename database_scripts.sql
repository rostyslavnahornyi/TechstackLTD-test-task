CREATE DATABASE bikerental;

CREATE TABLE total_sum(
    value INTEGER
);

CREATE TABLE bikes(
    id_bike SERIAL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    price DECIMAL NOT NULL,
    rented BOOLEAN NOT NULL
);

INSERT INTO total_sum(value) VALUES(0);
INSERT INTO bikes(name, type, price, rented) VALUES('Bonnie', 'Mountain', 11.90, true);
INSERT INTO bikes(name, type, price, rented) VALUES('Bumblebee', 'Electric', 12, false);
INSERT INTO bikes(name, type, price, rented) VALUES('Stiletto', 'Electric', 15, false);
INSERT INTO bikes(name, type, price, rented) VALUES('Pegasus', 'Roadrace', 4.5, true);
INSERT INTO bikes(name, type, price, rented) VALUES('Zeus', 'Mountain', 12.45, false);

