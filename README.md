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

API Doc
- https://api.postman.com/collections/16136036-3e612cc7-b2b7-4288-b0ee-616d9024694b?access_key=PMAT-01HCTRBHA1JGCVQ5M2QXMQ81VS
- POST
  Content-Type application/json
  - http://localhost:8080/lucky_draw
    - {"phoneNumber": "66554433"} 
  - http://localhost:8080/lucky_draw/redeem
    - {"phoneNumber": "66554433", "redeemCode": "YOURCODEHERE"} 
     
Further improvement 
- implement swagger
- config db timezone
- refractor code
