CREATE DATABASE IF NOT EXISTS unicorn_customization;
USE unicorn_customization;

CREATE TABLE IF NOT EXISTS Companies (
    ID int NOT NULL AUTO_INCREMENT,
    NAME varchar(255) NOT NULL UNIQUE,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS Socks (
    ID int NOT NULL AUTO_INCREMENT,
    NAME varchar(255) NOT NULL,
    PRICE decimal(5,2) NOT NULL,
    PRIMARY KEY (ID)
);
CREATE TABLE IF NOT EXISTS Horns (
    ID int NOT NULL AUTO_INCREMENT,
    NAME varchar(255) NOT NULL,
    PRICE decimal(5,2) NOT NULL,
    PRIMARY KEY (ID)
);
CREATE TABLE IF NOT EXISTS Glasses (
    ID int NOT NULL AUTO_INCREMENT,
    NAME varchar(255) NOT NULL,
    PRICE decimal(5,2) NOT NULL,
    PRIMARY KEY (ID)
);
CREATE TABLE IF NOT EXISTS Capes (
    ID int NOT NULL AUTO_INCREMENT,
    NAME varchar(255) NOT NULL,
    PRICE decimal(5,2) NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS Custom_Unicorns (
    ID int NOT NULL AUTO_INCREMENT,
    NAME varchar(255) NOT NULL,
    -- AD INT NOT NULL,
    COMPANY  INT NOT NULL,
    IMAGEURL varchar(255) NOT NULL,
    SOCK INT NOT NULL,
    HORN INT NOT NULL,
    GLASSES INT NOT NULL,
    CAPE INT NOT NULL,
    -- FOREIGN KEY (AD) REFERENCES Ads(ID),
    FOREIGN KEY (COMPANY) REFERENCES Companies(ID),
    FOREIGN KEY (SOCK) REFERENCES Socks(ID),
    FOREIGN KEY (HORN) REFERENCES Horns(ID),
    FOREIGN KEY (GLASSES) REFERENCES Glasses(ID),
    FOREIGN KEY (CAPE) REFERENCES Capes(ID),
    PRIMARY KEY (ID)
);


INSERT INTO Socks (NAME,PRICE) VALUES
    ("Basic", 0.00),
    ("Branded", 1.00);

INSERT INTO Horns (NAME,PRICE) VALUES
    ("White", 0.00),
    ("Red", 1.00),
    ("Blue", 1.00),
    ("Purple", 1.00),
    ("Green", 1.00),
    ("Yellow", 1.00),
    ("Silver", 2.00),
    ("Gold", 3.00);

INSERT INTO Glasses (NAME,PRICE) VALUES
    ("Basic", 1.00),
    ("Elvis Presley style", 2.50),
    ("John Lennon style", 2.50),
    ("Kanye West style",2.50),
    ("Hearts", 2.00),
    ("Stars", 2.00),
    ("Butterfly", 2.00);

INSERT INTO Capes (NAME,PRICE) VALUES
    ("White", 0.00),
    ("Rainbow", 2.00),
    ("Branded on White", 3.00),
    ("Branded on Rainbow", 4.00);

INSERT INTO Companies (NAME) VALUES ("Placeholder company");


/*

INSERT INTO Custom_Unicorns (NAME, COMPANY, IMAGEURL, SOCK, HORN, GLASSES, CAPE) VALUES ("Cool new phone",1, "https://mybucket.s3.amazonaws.com/myimage", 2,1,2,4);

SELECT * FROM Custom_Unicorns;

*/