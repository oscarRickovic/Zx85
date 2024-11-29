## How to use the database mysql ##

# before start change the docker compose mount file to user specific file

# run the compose file #
1. docker compose up -d

# get access to Mysql Database #

2. docker exec -it mysql-container bash

# run the mysql in the bash

3. mysql -u root -p
4. use password : rootpassword