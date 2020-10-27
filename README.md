
# README for creating users

To use the app, you need an admin user and a default user. 
How to register these users?  

- In the app: register two users. One for default and one who will be admin
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
![Logo](https://github.com/scg-unibe-ch/ese2020-team6/blob/master/Logo.png)
