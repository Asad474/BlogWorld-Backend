# Backend Setup


## Getting Started


### 1. Install package dependencies

In the `root` directory, run:

```bash
$ npm install
```


### 2. Adding environment variables to .env file
```bash
NODE_ENV='development(if running locally)'
MONGODB_URL='Your MongoDB localhost or cluster url.'
PORT='Any Port No(eg: 8080, 8050 etc)'
JWT_TOKEN='Token should be a long, random string of characters. Longer secrets are generally more secure than shorter ones.'

#Cloudinary Config
CLOUDINARY_CLOUD_NAME='Your Cloudinary cloud name.'
CLOUDINARY_API_KEY='Your Cloudinary api key'.
CLOUDINARY_API_SECRET='Your Cloudinary api secret.'
```

You can create JWT_TOKEN by using following command in node terminal:

```bash
$ require('crypto').randomBytes(64).toString('hex')
```


### 3. Start Backend Server

To start backend server, run: 

```bash
$ npm run dev
```