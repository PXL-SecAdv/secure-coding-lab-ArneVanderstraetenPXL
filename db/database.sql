create database pxldb;
\c pxldb

create user secadv with password 'ilovesecurity';
grant all privileges on database pxldb to secadv;
BEGIN;

create table users (id serial primary key, user_name text not null unique, password text not null);
grant all privileges on table users to secadv;

insert into users (user_name, password) values ('pxl-admin', '$2a$10$6Q55k3l81NcHuxyjzOSRlem4g7VCR/iPCcsV0.XdnZNAIjBOd7yU2') ;
insert into users (user_name, password) values ('george', '$2a$10$od6u1Q9hpJbop299Q4iv.ew.wHrhiGkXnUZoGGWqNUwHg74Q7iexG') ;

COMMIT;