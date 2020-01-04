# How to run this test app


Youll need to have both Docker and Docker compose for faster local deployment.

[Docker Install docs](https://docs.docker.com/install/)
[Docker Compose install](https://docs.docker.com/compose/install/)

Clone the code from this repo (make sure you download the submodules)
```
$ git clone --recurse-submodules https://github.com/juanjodarko/timechecker
```

Then you'll run the application with:

```
docker-compose build
```
This command will download the dependencies automatically (from the dev.Dockerfiles declared in docker-compose.yml),
After the building finishes, you'll need to run:

```
docker-compose up
```

make sure you have ports :4200 and :3000 available since the api will run through :3000 and the frontend will run through :4200.

## Troubleshooting

if you get an error from the front app regarding the @angular-builders/custom-webpack run manually the npm installation with the following command

```
docker-compose run --rm front npm install
```
