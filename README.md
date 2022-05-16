# Product CRUD

## Notes

```sh
# - Create Folder for docker data
mkdir -p docker-data/{mysql_data,redis_data,mongodb_data}

# - Start the mongodb server using docker-compose
docker-compose up -d

npm install
```

## References

- https://stackabuse.com/converting-callbacks-to-promises-in-node-js/

> MongoDB

- https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial
- https://github.com/mongodb-developer/mongodb-typescript-example/tree/finish
- https://www.mongodb.com/docs/drivers/node/current/usage-examples/findOne/

> Prettier

- https://prettier.io/docs/en/index.html

> ESLint

- https://eslint.org/docs/user-guide/getting-started

> Redis

```ts
// - Setting Expiry
// - https://redis.io/commands/expire/#options
await this.client.set('name', 'Admin', {
  EX: 10,
});
```
