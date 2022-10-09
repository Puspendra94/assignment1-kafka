echo "Creating test .env file ..."
tee -a .env << END

DB_MAX_CONNECTION=5
DB_MIN_CONNECTION=1
DB_IDEAL_CONNECTION=1
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=admin
DB_DATABASE=learning
DB_DEBUG=false
DB_DILECT=mysql
DB_ACQUIRE=60000

END
echo "Done creating configs"