<p align="center">
  <img align="center" width="100" height="100" src="https://github.com/scg-unibe-ch/ese2020-team6/blob/master/frontend/src/assets/favicon-highlight-small.png">
</p>

# Starting the backend
When launching the backend server, there will be an error. The error is thrown, because the server tries to insert into a non-existing table. You just have to restart the server with:
```
$ rs
```
and everyting is ok.
# README for creating users

To use the app, you need an admin user and a default user.
How to register these users?  

- In the app: register two users. One for default and one who will be admin. For the one who will be admin, use 'Admin' as lastname.
- In the terminal if you are in the ese-project:
```
$ cd backend
$ sqlite3 db.sqlite
```
- Then you are in the database and can enter the following commands:
```
sqlite> select * from users;  // to see what your admin user's last name is
sqlite> update users set isAdmin = true where users.lastName = 'put admin user's last name here';
sqlite> .q
```
Now you can login with one admin user and one default user.
