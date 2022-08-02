# NestJs Server Application

[![Coverage Status](https://coveralls.io/repos/github/kanakamedala-rajesh/basic-server/badge.svg?branch=master)](https://coveralls.io/github/kanakamedala-rajesh/basic-server?branch=master)
[![Node.js CI](https://github.com/kanakamedala-rajesh/basic-server/actions/workflows/nodejs.yml/badge.svg?branch=master)](https://github.com/kanakamedala-rajesh/basic-server/actions/workflows/nodejs.yml)

Basic NestJs REST API to perform CURD operations from firestore. Initial mock data is retrieved from https://jsonplaceholder.typicode.com/

## Clone Instructions

- Clone the repository
- Generate serviceAccountKey.json from firebase console
- Add it in root directory as `serviceAccountKey.json`

## Build Instructions

- `yarn install` (first time)
- `yarn start:dev`

## HTTP Requests

All possible HTTP request sample are present within `http` directory. Some of the sample ones are listed below

### Users Specific

- http://localhost:3000/users/init - Add all mock data to firestore
- http://localhost:3000/users - retrieves all users from firestore

### Posts Specific

- http://localhost:3000/posts/init - Add all posts mock data to firestore
- http://localhost:3000/posts - retrieves all posts from firestore

### Generating serviceAccountKey.json file

- Go to firebase console and navigate to specific project
- Click on `Settings` -> `Project Settings`
- Click on `Service accounts`
- Select `NodeJs` under `Admin SDK configuration snippet`
- Click on `Generate New Provate Key`
- Click on `Generate Key`
- Save the file as `serviceAccountKey.json` under projects root directory

## Known Issues

- Improve code coverage
