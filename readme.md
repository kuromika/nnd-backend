# Natsu no Daisankaku, blog API

This is a RESTful API / server for my personal blog,
it was made using Node - Express, and it connects to a MongoDB database
using Mongoose.

Authentication made with Passport using the local and JWT strategies.

## Routes

#### Users:

| Method | Endpoint                                 | Request                                    | Response                           |
| ------ | ---------------------------------------- | ------------------------------------------ | ---------------------------------- |
| POST   | https://nnd-backend.up.railway.app/users | **Body:** 'username' and 'password' fields | JSON with the data of the new user |

#### Auth:

| Method | Endpoint                                      | Request                                    | Response                                |
| ------ | --------------------------------------------- | ------------------------------------------ | --------------------------------------- |
| POST   | https://nnd-backend.up.railway.app/auth/login | **Body:** 'username' and 'password' fields | JSON with user data and a new JWT token |

#### Posts:

| Method | Endpoint                                              | Request                                                                                                                        | Response                                           |
| ------ | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| GET    | https://nnd-backend.up.railway.app/posts              |                                                                                                                                | JSON with all the blog posts                       |
| GET    | https://nnd-backend.up.railway.app/posts/:id          | **Parameters:** post's id                                                                                                      | JSON with the data of the requested post           |
| POST   | https://nnd-backend.up.railway.app/posts              | **Headers:** bearer token of an admin user<br/>**Body:** 'content' and 'isPublished' fields                                    | JSON with the newly created post data              |
| PUT    | https://nnd-backend.up.railway.app/posts/:id          | **Parameters:** post's id<br/>**Headers:** bearer token of an admin user<br/>**Body:** 'content' and / or 'isPublished' fields | JSON with the updated post data                    |
| DELETE | https://nnd-backend.up.railway.app/posts/:id          | **Parameters:** post's id<br/>**Headers:** bearer token of an admin user                                                       | JSON with the data of the deleted post             |
| GET    | https://nnd-backend.up.railway.app/posts/:id/comments | **Parameters:** post's id                                                                                                      | JSON with all the comments in the post             |
| POST   | https://nnd-backend.up.railway.app/posts/:id/comments | **Parameters:** post's id<br/>**Headers:** bearer token<br/>**Body:** 'content' field                                          | JSON with the newly created comment                |
| GET    | https://nnd-backend.up.railway.app/posts/:id/likes    | **Parameters:** post's id                                                                                                      | JSON with all the likes given to the specific post |
| POST   | https://nnd-backend.up.railway.app/posts/:id/likes    | **Parameters:** post's id<br/> **Headers:** bearer token                                                                       | JSON with the newly created like                   |

#### Comments:

| Method | Endpoint                                              | Request                                                                                                                    | Response                                              |
| ------ | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| GET    | https://nnd-backend.up.railway.app/comments           |                                                                                                                            | JSON with the data of all the comments in the blog    |
| PUT    | https://nnd-backend.up.railway.app/comments/:id       | **Parameters**: comment's id<br/>**Headers:** bearer token of the original comment's author<br/> **Body:** 'content' field | JSON with the newly created comment                   |
| DELETE | https://nnd-backend.up.railway.app/comments/:id       | **Parameters**: comment's id<br/>**Headers:** bearer token of the original comment's author                                | JSON with the data of the deleted comment             |
| GET    | https://nnd-backend.up.railway.app/comments/:id       | **Parameters:** comment's id                                                                                               | JSON with the requested comment's data                |
| GET    | https://nnd-backend.up.railway.app/comments/:id/likes | **Parameters:** comment's id                                                                                               | JSON with all the likes given to the specific comment |
| POST   | https://nnd-backend.up.railway.app/comments/:id/likes | **Parameters:** comment's id<br/>**Headers:** bearer token                                                                 | JSON with the newly created like                      |

#### Likes:

| Method | Endpoint                                     | Request                                                                      | Response                         |
| ------ | -------------------------------------------- | ---------------------------------------------------------------------------- | -------------------------------- |
| GET    | https://nnd-backend.up.railway.app/likes     |                                                                              | JSON with all the existing likes |
| DELETE | https://nnd-backend.up.railway.app/likes/:id | **Parameters:** like's id<br/>**Headers:** bearer token of the like's author | JSON with the deleted comment    |
