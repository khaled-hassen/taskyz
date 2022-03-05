
This is a customizable TODO web app made with:
* Typescript
* Apollo GraphQL
* React + TailwindCSS + styled-components
* NodeJs + ExpressJS
* MongoDB

[Demo](https://taskyz.netlify.app/)

## Getting Started

1. clone the repo

```bash
git clone https://github.com/khaled-hassen/taskyz.git
cd taskyz
```
2. setup the api
```bash
# dir: taskyz/api
npm install
# or
yarn install
```
3. add environment variables
```
# dir: taskyz/api
# create .env file
# add these variables:
	COOKIE_SECRET=<your-cookie-secret> # for signing the cookies
	HASH_KEY=<your-hashing-key> # for hasing the passwords
	ACCESS_KEY=<your-access-key> # for generating access jwt token
	ACCESS_EXPIRE=<access-expire-duration> # the duration for access token
	REFRESH_KEY=<your-refresh-key> # for generating refresh jwt token
	CLIENT=<client-url> # for local development it's http://localhost:3000
	DB_NAME=<mongodb-db-name>
	DB_USERNAME=<your-mongodb-username> # db access username
	DB_PASSWORD=<your-mongodb-password> # db access password
	UNSPLAH_ACCESS_KEY=<unsplash-api-key> # from https://unsplash.com/developers
```
4. start the api server

```bash
#dir: taskyz/api
npm run dev
# or
yarn dev
```
5. setup the client
```bash
# dir: taskyz/client
npm install
# or
yarn install
```
The api will be on [http://localhost:5000](http://localhost:5000)

6. add environment variables
```bash
# dir: taskyz/client
# create .env file
# add these variables:
	REACT_APP_API=<api-url> # for local development it's http://localhost:5000
```
7. start the client server

```bash
# dir: taskyz/client
npm start
# or
yarn start
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building the app
```bash
# dir: taskyz/api
npm run build
# or
yarn build
```
```bash
# dir: taskyz/client
npm run build
# or
yarn build
```
