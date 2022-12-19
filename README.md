# elastic-stack-nodejs-demo

## Notes

> NPM Package

- https://github.com/elastic/elasticsearch-js
- DOCS: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html

> Elastic Search Integration with Winston

- https://dev.to/deleteman123/logging-at-scale-done-right-3m0e

## Flow

- error-log-service(nodejs) --> Local ELK Stack --> Kibana

> 1- Push Data to ELastic Search

> 2- Add Data view for the index

> 3- We can now Explore the Data in - Analytics/Discover or we can create Dashboards

## Commands

```sh
cd demo-nodejs-service
npm run dev

cd error-log-service
npm run dev
```
