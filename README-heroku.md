# To run commands in heroku app
# heroku COMMAND [--app APP] [command-specific-options]
heroku run npx prisma migrate dev --app bitdeposit-backend

heroku logs --app bitdeposit-backend 

heroku run npx prisma migrate reset --app bitdeposit-backend  