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

### `Run Task > Start backend db`