CREATE TABLE IF NOT EXISTS users (
                                     id INT NOT NULL AUTO_INCREMENT,
                                     name VARCHAR(100) NOT NULL,
                                     email VARCHAR(150) NOT NULL UNIQUE,
                                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                     PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS photos (
                                      id INT NOT NULL AUTO_INCREMENT,
                                      userid INT NOT NULL,
                                      src VARCHAR(255) NOT NULL,
                                      uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                      PRIMARY KEY (id),
                                      FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
);
