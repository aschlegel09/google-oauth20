DROP DATABASE IF EXISTS demodb;
CREATE DATABASE demodb;

USE demodb;

CREATE TABLE demo (
	
    id INT NOT NULL AUTO_INCREMENT,
    
    username VARCHAR(200) NOT NULL,
    
    loginStatus BOOLEAN DEFAULT false,
    
    PRIMARY KEY (id)
);

