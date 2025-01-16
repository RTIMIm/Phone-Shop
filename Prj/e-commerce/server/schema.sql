   CREATE TABLE categories (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       description TEXT
   );

   CREATE TABLE products (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       description TEXT,
       price DECIMAL(10, 2) NOT NULL,
       stock INT NOT NULL,
       image VARCHAR(1000),
       category_id INT,
       FOREIGN KEY (category_id) REFERENCES categories(id)
   );
   
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(255) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL UNIQUE
   );
   INSERT INTO products (name, description, price, stock, image) VALUES
(
    'iPhone 14 Pro Max',
    'Latest Apple flagship with A16 Bionic chip, 48MP camera system, and Dynamic Island.',
    1099.99,
    50,
    'https://khadraouitek.tn/6797-large_default/smartphone-apple-iphone-14-pro-max-128-go-violet.jpg'
),
(
    'Samsung Galaxy S23 Ultra',
    'Premium Android device with S Pen support, 200MP camera, and Snapdragon 8 Gen 2.',
    1199.99,
    45,
    'https://i5.walmartimages.com/seo/Samsung-Galaxy-S23-Ultra-5G-Dual-S918B-512GB-12GB-RAM-GSM-Unlocked-Green_d2290cc8-3f71-479c-b9d7-1ba520897afe.80616f3a06fe5be8483e0662ac4d2c7d.jpeg'
),
(
    'Google Pixel 7 Pro',
    'Google flagship with Tensor G2 chip and advanced AI photography capabilities.',
    899.99,
    30,
    'https://m.media-amazon.com/images/I/51OFxuD1GgL.jpg'
),
(
    'OnePlus 11',
    'Flagship killer with Snapdragon 8 Gen 2 and Hasselblad camera system.',
    699.99,
    40,
    'https://m.media-amazon.com/images/I/71K84j2O8wL.jpg'
),
(
    'Xiaomi 13 Pro',
    'Premium device with Leica optics and Snapdragon 8 Gen 2 processor.',
    899.99,
    35,
    'https://m.media-amazon.com/images/I/61RvCwjI7dL.jpg'
),
(
    'Nothing Phone (2)',
    'Unique transparent design with Glyph interface and flagship performance.',
    699.99,
    25,
    'https://m.media-amazon.com/images/I/71hsuRTQ29L.jpg'
),
(
    'Sony Xperia 1 V',
    'Professional-grade camera capabilities with 4K 120Hz display.',
    1299.99,
    20,
    'https://m.media-amazon.com/images/I/71+MxqLwqEL._AC_SL1500_.jpg'
),
(
    'ASUS ROG Phone 7',
    'Ultimate gaming phone with 165Hz display and gaming triggers.',
    999.99,
    30,
    'https://m.media-amazon.com/images/I/51ZyJ6EEQcL._AC_SL1280_.jpg'
),
(
    'Motorola Edge 40 Pro',
    'Flagship with curved display and 125W fast charging.',
    799.99,
    35,
    'https://m.media-amazon.com/images/I/71hVkWzI8gL._AC_SL1500_.jpg'
),
(
    'Huawei P60 Pro',
    'Advanced camera system with XMAGE imaging technology.',
    999.99,
    25,
    'https://m.media-amazon.com/images/I/617tZOVUc8L._AC_SL1200_.jpg'
);