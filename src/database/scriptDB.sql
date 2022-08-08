/*creación de DataBase*/
CREATE database g8db;
/*Selección de DB*/
USE g8db;

/*creación de tabla products*/
CREATE TABLE products
(
    product_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(50),
    decription TEXT,
    image VARCHAR(100),
    price DECIMAL,
    discount INT,
    category_id INT NOT NULL
);

/*creación de tabla users*/
CREATE TABLE users
(
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    user_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    avatar VARCHAR(100),
    is_admin TINYINT DEFAULT 0
);

/*creación de tabla products_users*/
CREATE TABLE products_users
(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    user_id INT NOT NULL,
    product_id INT NOT NULL
);

/*creación de tabla categories*/
CREATE TABLE categories
(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(50) NOT NULL
);