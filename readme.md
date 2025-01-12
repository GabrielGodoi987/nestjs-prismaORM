# How to initiate the project
+ this route above is to see the swagger documentation of the project
<ol>
 <li>localhost:3000/docs</li>
</ol>
## Project setup

```bash
$ docker compoe up 

# if you use `-d` after the up command, you don't gonna see the container's log.
```

## Run tests
+ open the container using: 
```bash
$ docker compose exec -it [the container id goes here] bash
```

+ inside of the container run the following commands:
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
