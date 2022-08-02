# NestJs Server Application [![Coverage Status](https://coveralls.io/repos/github/kanakamedala-rajesh/basic-server/badge.svg?branch=master)](https://coveralls.io/github/kanakamedala-rajesh/basic-server?branch=master)

Basic NestJs REST API to perform CURD operations from firestore. Initial mock data is retrieved from https://jsonplaceholder.typicode.com/

## Clone Instructions

- Clone the repository
- Generate serviceAccountKey.json from firebase console
- Add it in root directory as `serviceAccountKey.json`

## Build Instructions

- `yarn install` (first time)
- `yarn start:dev`

## HTTP Requests

### Users Specific

- http://localhost:3000/users/init - Add all mock data to firestore
- http://localhost:3000/users - retrieves all users from firestore

### Posts Specific

- http://localhost:3000/posts/init - Add all posts mock data to firestore
- http://localhost:3000/posts - retrieves all posts from firestore

## Known Issues
