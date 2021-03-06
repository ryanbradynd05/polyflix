
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE movies (
    id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    createdAt datetime,
    updatedAt datetime,
    title varchar(255),
    themoviedbid int(11),
    PRIMARY KEY(id)
);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE movies;
