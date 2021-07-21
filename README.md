# THIS IS API FOR DSC BLOG

## Setup
### Environment
- Install nodejs
- First create .env file by this command
```bash
$ cp .env.example ./.env
```
- Config environment variables match to what you want

### Setup Docker
- Configure postgres database variable in docker-compose.yml file
- Configure DATABASE_URL in env file. 
- In this case: DATABASE_URL=postgres://postgres:postgres@db:5432/blog
- Set NODE_ENV in .env file
- Build and run container
```bash
$ docker-compose up 
```
- Remove compose container
```bash
$ docker-compose down
```
- If run docker-compose up successfully, then migrate database and seed data
- Access node-psql environment
```bash
$ docker container exec -it node-psql bash
```
- Migrate data
```bash
$ yarn migrate:latest
```
- Seed data
```bash
$ yarn seed:run
```

## Start project
- To run project on dev local:
```bash
$ yarn dev
```

- To run project on production:

```bash
$ yarn run build && yarn start
```

## View PSQL Database
- Access db environment
```bash
$ docker container exec -it blog-be_db_1 bash
```
- Login account
```bash
$ psql -U postgres
```
- Command 
- \l : list databases
- \c [database name] : connect to database 
- \dt : list tables
- user SQL command to query data such as ' SELECT * FROM users;'