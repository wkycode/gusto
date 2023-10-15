# gusto

Comose Docker (Command)
- docker compose up
- docker exec gusto-api-1 npx prisma migrate dev
- docker exec gusto-api-1 npx prisma db seed

Comose Docker (Alternative)
- docker compose up
- Go into DockerContainer(gusto-code-test-api-1) and run
  - npx prisma migrate dev
  - npx prisma db seed
