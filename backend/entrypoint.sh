#!/bin/sh
echo "⏳ Waiting for MariaDB..."
while ! nc -z mariadb 3306; do
  sleep 1
done
echo "✅ MariaDB is up!"
exec "$@"