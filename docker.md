## How to use the database mysql ##

# before start :

decompress cloud_volume
Change the volume path to be your volume path in docker-compose.yml

# run the compose file #
1. docker compose up -d

# get access to Mysql Database #

2. docker exec -it mysql-container bash

# run the mysql in the bash

3. mysql -u root -p
4. use password : rootpassword