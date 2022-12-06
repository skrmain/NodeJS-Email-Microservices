# NodeJS-DB-CRUD

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

## DynamoDB

### Prerequisites

- DynamoDB Local - Java, AWS CLI
- NodeJS

### Notes

> DynamoDB

- Developer Guide: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html
  - Install: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html#DynamoDBLocal.DownloadingAndRunning.title
  - Doc AWS CLI + DynamoDB: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Tools.CLI.html
- API References: https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/Welcome.html
- https://askubuntu.com/questions/25347/what-command-do-i-need-to-unzip-extract-a-tar-gz-file
- Java Install: - https://ubuntu.com/tutorials/install-jre#1-overview
- AWS CLI Install: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html#cliv2-linux-install

> Other

- https://www.npmjs.com/package/@aws-sdk/client-dynamodb
- https://www.npmjs.com/package/@aws-sdk/lib-dynamodb
- CRUD - https://devapt.com/dynamodb-nodejs-crud
- CRUD API - https://codezup.com/integrate-aws-dynamodb-with-node-js-crud-operations/
- https://youtu.be/2k2GINpO308

## MongoDB/Mongoose

- [https://www.mongodb.com/docs/drivers/node/current/](https://www.mongodb.com/docs/drivers/node/current/)
- [https://mongoosejs.com/docs/guide.html](https://mongoosejs.com/docs/guide.html)
- https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial
- https://github.com/mongodb-developer/mongodb-typescript-example/tree/finish

## MySQL

```sh
npm i mysql
npm i mysql2 # support promises
```

- [https://www.npmjs.com/package/mysql2](https://www.npmjs.com/package/mysql2)
- [https://sequelize.org/master/manual/getting-started.html](https://sequelize.org/master/manual/getting-started.html)
- [https://www.npmjs.com/package/mysql2](https://www.npmjs.com/package/mysql2)
- [https://www.npmjs.com/package/mysql](https://www.npmjs.com/package/mysql)
- [https://www.w3schools.com/nodejs/nodejs_mysql.asp](https://www.w3schools.com/nodejs/nodejs_mysql.asp)
- [https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server)
- [https://dev.mysql.com/doc/relnotes/connector-nodejs/en/](https://dev.mysql.com/doc/relnotes/connector-nodejs/en/)
