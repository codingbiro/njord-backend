# Njord Backend

This is a Node.js backend service created with FoalTS and written in Typescript. The database is PostgreSQL and the ORM is TypeORM.

The purpose of this project is to showcase some of the popular libraries within a simple application. The backend manages users, implements JWT authentication and provides REST API endpoints for some basic method with its entities.

## Install and run

In the project directory, you can run:

### `npm i` and `npm run develop`

Runs the app in the development mode.\
Runs at http://localhost:3001.
*Note: database synchronization and initialization is turned on by default.*

The application has linting set up. Usage:
### `npm run lint`

## Database creation/run

There is a VSCode Task set up for running the db in a Docker Container.\
*Note: Docker is required.*
*If you wish to not use VSCode, you can also run the following command:* `docker-compose -f .docker/docker-compose.local.yml --project-name njord-backend up -d db`

### `Run Task > Start backend db`

## Credentials
The needed credentials can be found in the `.env` file and the **config** directory.

To test the application, an auto generated user may be used:
email: `test@example.com`
password: `admin`

## API Endpoints
- POST **/auth/login**: log in using email and password
- GET **/auth/whoami**: returns the currently logged in user from context
- GET **/job/all?rejected=true&location=Lyngby**: returns all jobs or accepts query params to filter the jobs
- GET **/job/locations**: returns all locations that are set on jobs (returns an unique list)
- POST **/job/accept**: accepts the job that is sent in the request's body (identified by the object's id)
- POST **/job/accept**: rejects the job that is sent in the request's body (identified by the object's id)
