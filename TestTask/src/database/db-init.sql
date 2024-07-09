CREATE TABLE books(
    id numeric not null primary key, 
    title varchar(128) not null, 
    genre varchar(128) not null, 
    publicationDate DATE not null,
    author varchar(128) not null
)
