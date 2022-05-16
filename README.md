# Product Micro-Services

## Notes

```sh
# - Create Folder for docker data
mkdir -p docker-data/mysql_data

# - Start the mongodb server using docker-compose
docker-compose up -d

docker-compose down

docker-compose logs -f <SERVICE_NAME>

# Migration Command
npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:show
```

## References

- https://typeorm.io/
- https://joi.dev/api/?v=17.6.0
- https://www.npmjs.com/package/dotenv
- https://github.com/nodemailer/nodemailer-amqp-example
- https://nodemailer.com/about/
- https://typeorm.io/validation
