    CREATE TABLE IF NOT EXISTS users(
        user_id SERIAL PRIMARY KEY,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS goods(
        id SERIAL PRIMARY KEY,
        nameOfGood VARCHAR(100) NOT NULL UNIQUE,
        typeOfGood VARCHAR(100) NOT NULL,
        price decimal,
        count int,
        photo VARCHAR(100),
        info VARCHAR(100),
        refPath VARCHAR(100)
    );

    DROP TABLE IF EXISTS goods;
