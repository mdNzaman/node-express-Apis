
# RESTful APIs

Some of my production level node-express apis 

you can run it on localhost using 
`http://localhost:4000/api/`





## Installation

Install my-project with npm

```bash
  npm install express mysql jwt fcm-node moment
  or 
  npm install (to download all dependencies)
  cd my-project-name
```
to start my-project with npm
```bash
  npm start app.js
```
## Deployment

I deployed this sample code on

```bash
  AWS ec2
```
for MySQL used

```bash
  AWS RDS
```
To store profile pics used
```bash
  AWS S3 bucket
```
## API Reference

####  POST APIs

```http
  POST   /api/send-phone-verification-otp
  POST   /api/verify-phone-verification-otp
  POST   /api/register-user
  UPDATE /api/update-device-token
  POST   /api/send-connection-request
  POST   /api/block-user
  POST   /api/register-user
  DELETE /api/delete-account
```


#### send-connection-request

To send friend request and push notification to other user.

For push notification install with npm
```http
  npm install fcm-node
```
Generate server key on

- [firebase](https://firebase.google.com/docs/cloud-messaging)
## Author

- [@nooruz_zaman](https://www.github.com/mdNzaman)

To setup and for more info reach me 

- [nooruzzaman18@gmail.com](nooruzzaman18@gmail.com)