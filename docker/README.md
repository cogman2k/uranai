# PostgreSQL Docker Setup

This directory contains the Docker configuration for running PostgreSQL database for the Todo application.

## Prerequisites

- Docker
- Docker Compose

## Configuration

The PostgreSQL database is configured with the following default settings:

- Database Name: `todo_db`
- Username: `postgres`
- Password: `postgres`
- Port: `5432`

You can modify these settings in the `docker-compose.yml` file if needed.

## Running the Database

To start the PostgreSQL database:

```bash
docker-compose up -d
```

To stop the database:

```bash
docker-compose down
```

To stop the database and remove the volume (this will delete all data):

```bash
docker-compose down -v
```

## Connecting to the Database

You can connect to the database using any PostgreSQL client with these credentials:

- Host: `localhost`
- Port: `5432`
- Database: `todo_db`
- Username: `postgres`
- Password: `postgres`

## Data Persistence

The database data is persisted in a Docker volume named `postgres_data`. This ensures that your data remains even if you stop or restart the container.

## Environment Variables

Make sure your backend `.env` file matches these database credentials:

```
DB_NAME=todo_db
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
``` 