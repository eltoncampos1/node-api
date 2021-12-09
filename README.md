<br />
<p align="center">

  <h3 align="center">Node-Api</h3>

  <p align="center">
    <br />
    <a href="https://github.com/eltoncampos1/node-api"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/eltoncampos1/node-api">View Demo</a>
    ·
    <a href="hhttps://github.com/eltoncampos1/node-api/issues">Report Bug</a>
    ·
    <a href="https://github.com/eltoncampos1/node-api/pulls">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Api created for nodeJS study purposes, it is a Todo App, in which the user can create, list, update and delete his tasks.

### Built With

- [NodeJS](https://nodejs.dev/)
- [Typescript](https://www.typescriptlang.org)
- [Docker](https://www.docker.com/)
- [Postgres](https://www.postgresql.org/)
- [Typeorm](https://typeorm.io/#/)

<!-- GETTING STARTED -->

## Getting Started

<br/>

<br/>

### Prerequisites

- [NodeJs](https://nodejs.org/en/)
- [Git](https://git-scm.com)
- [Docker](https://www.docker.com/)
- [npm](https://www.npmjs.com)

  ```sh
        npm install npm@latest -g
  ```

### Installation

1. Clone the repo

   ```sh
        git clone https://github.com/eltoncampos1/node-api.git
   ```

2. cd `API_NAME`

   ```sh
        cd `API_NAME`
   ```

3. Install NPM packages

   ```sh
          npm install
   ```

4. Create a .env file and populate with this infos => [.env-example](https://github.com/eltoncampos1/node-api/blob/main/.env.example)

<br/>

5. On root project, run docker-compose command

    ```sh
          docker-compose up
    ```

6. Run the migrations

    ```sh
          yarn typeorm migration:run
    ```
    or

      ```sh
          npm run typeorm migration:run
      ```

- The base localhost port is **8000**, but you can edit in server.ts, and don't forget to update the docker files to expose the new port

<br/>

## Usage

- After you create an user, you have to create an session and get the token on the response and pass as a Authorization header.

In my case i use insomnia to test, and i pass the Bearer token like this =>

![token](https://user-images.githubusercontent.com/56568406/145485045-4232114f-8756-4b36-a733-3cf5407551d3.PNG)

![envs](https://user-images.githubusercontent.com/56568406/145485081-2e335e62-4a72-4e58-b2c5-f1b19a435c2d.PNG)


<br/>

- Create an Session:

  - POST: `http://localhost:${PORT}/sessions`

<br/>

- BODY

```json
{
  "email": "valid_email",
  "password": "valid_password",
}
```

 - RESPONSE

 ```json
{
	"user": {
		"name": "username",
		"email": "teste@teste.com"
	},
	"token": "jwt_token"
}
 ```
<br>

- Create an User:

  - POST: `http://localhost:${PORT}/users/create`

<br/>

- BODY

```json
{
	"name": "username",
	"password": "password",
	"phone": "phone",
	"email": "teste@teste.com",
	"age": 20,
	"weight": 20 ,
	"ethnicity": "enum"
}
```

<br>

- Update an User:

  - PATCH: `http://localhost:${PORT}/users/update`

    <br/>

- BODY

```json
{

	"name": "new_username",
	"phone": "new_phone",
	"email": "new_teste@teste.com",
	"age": 21,
	"weight": 60 ,
	"ethnicity": "enum"

}
```

<br/>

- Update an password:

  - PATCH: `http://localhost:${PORT}/users/update/password`

    <br/>

- BODY

```json
{
		"password": "new_password",
		"old_password": "old_password"
}
```


<br/>

- Delete an user:
  - Patch: `http://localhost:${PORT}/users/delete`

<br/>

- List all user:

  - GET: `http://localhost:${url}/users/list`

<br/>

- RESPONSE

```json
[
	{
		"id": "user_id",
		"name": "name",
		"phone": "phone",
		"email": "teste@teste.com",
		"age": 20,
		"weight": 60,
		"ethnicity": "enum",
		"created_at": "date",
		"updated_at": "date",
		"address": {
			"id": "addres_id",
			"street": "street",
			"number": 00,
			"complement": "complelemnt",
			"zip_code": "00000-000",
			"city": "city",
			"state": "state",
			"created_at": "date",
			"updated_at": "date"
		}
	}
]
```

<br/>


- Create an Address:

  - POST: `http://localhost:${PORT}/address/create`

<br/>

- BODY

```json
{
	"street": "street",
	"number": 00,
	"complement": "complelemnt",
	"zip_code": "00000-000",
	"city": "city",
	"state": "state",
}
```

<br>


- Update an Address:

  - PATCH : `http://localhost:${PORT}/address/update`

<br/>

- BODY

```json
{
	"street": "new_street",
	"number": 00,
	"complement": "new_complelemnt",
	"zip_code": "00000-000",
	"city": "new_city",
	"state": "new_state",
}
```
- list an Address:

  - GET : `http://localhost:${PORT}/address/list`

<br/>

- BODY

```json
{
	"id": "id",
	"street": "street",
	"number": 00,
	"complement": "complement",
	"zip_code": "00000-00",
	"city": "city",
	"state": "state",
	"created_at": "date",
	"updated_at": "date"
}
```

<br>

- Delete an Address:

  - PATCH : `http://localhost:${PORT}/address/delete`

<br/>


<br>
## Roadmap

See the [open issues](https://github.com/eltoncampos1/node-api/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Project Link: [TODO APP](https://github.com/eltoncampos1/node-api)

- [LinkedIn](https://www.linkedin.com/in/elton-campos-074015164/)
- [Email](mailto:eltoncampos36@gmail.com)
