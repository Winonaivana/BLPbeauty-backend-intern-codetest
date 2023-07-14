# Bookie-app

Bookie is simple personal book management app, where users can add books they want to read, planning to or is reading. Users can mark when they have finished reading the book, give ratings, description and book image url. As well as add them to categories.

REST API for Bookie is built with [Nest](https://github.com/nestjs/nest).

## Usage

- Docker Hub: [Repository Link](https://hub.docker.com/repository/docker/winonaivana/bookie-backend/general)

## System Design Diagram

![system-design-diagram](/Assets/DB.png)

## Entity Relationship Diagram

![entity-relationship-diagram](/public/assets/erd.png)

## API Endpoints

Full documentation is available through Swagger

This project exposes the following endpoints:

| Method   | Endpoint        | Description           | Auth? |
| :------- | :-------------- | :-------------------- | :---: |
| 'GET'    | '/category'     | Get all categories    |  🔒   |
| 'POST'   | '/category'     | Create new category   |  🔒   |
| 'DELETE' | '/category/:id' | Delete category by id |  🔒   |
| 'PATCH'  | '/category/:id' | Edit category by id   |  🔒   |

| Method   | Endpoint           | Description                      | Auth? |
| :------- | :----------------- | :------------------------------- | :---: |
| 'GET'    | '/book'            | Get all books                    |  🔒   |
| 'GET'    | '/book/:id'        | Get book by id                   |  🔒   |
| 'POST'   | '/book'            | Create new book                  |  🔒   |
| 'DELETE' | '/book/:id'        | Delete book by id                |  🔒   |
| 'PATCH'  | '/book/:id'        | Edit book by id                  |  🔒   |
| 'POST'   | '/book/finish/:id' | Add finish date to existing book |  🔒   |

| Method | Endpoint       | Description     | Auth? |
| :----- | :------------- | :-------------- | :---: |
| 'GET'  | '/auth/signup' | Create new user |       |
| 'POST' | '/auth/signin' | Login user      |       |

| Method   | Endpoint | Description        | Auth? |
| :------- | :------- | :----------------- | :---: |
| 'GET'    | '/user'  | Get logged in user |  🔒   |
| 'DELETE' | '/user'  | Delete user        |  🔒   |
