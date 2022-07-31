# NestJs Server Application

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
 - 
### Posts Specific
- http://localhost:3000/posts/init - Add all posts mock data to firestore
 - http://localhost:3000/posts - retrieves all posts from firestore



## Known Issues
- Currently not able to retrieve data for firestore queries with `where` clause
			Ex: http://localhost:3000/posts?userId=1 should retrieve all posts with userId `1` but it not working as expected
