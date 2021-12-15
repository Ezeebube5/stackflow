# StackFlow (be-ebubechi-ezenwanne)
This repo contains the impementation of a Stack Overflow clone.
Technologies used include Typescript, Express, MySQL (using Sequelize ORM), Redis, Nodemailer and Bull (for managing queues).
For details of available routes, please, consult the included Postman Collection

### This API can be accessed online via [Heroku Deployment](https://be-ebubechi-ezenwanne.herokuapp.com/)
For any questions: ebubechi.ezenwanne@stu.cu.edu.ng

## Installation

To get started, clone this repo and run the following command to install dependencies

```
npm install

```

To run in development mode:
```
npm run dev

```

To create build:
```
npm start:build

```

To run built files:
```
npm start

```

To test:
```
npm test

```

More details about these commands can be found in the package.json file

### Database Setup
This is done automatically on server startup (i.e the DB.Sync method is run with the model files). No seed data is needed to interact with the API as new entries can be created for users, questions, answers, subscriptions and votes by interacting with the designated routes.
During testing, data is seeded in the test setup of individual test suites.

## Assumptions
- The REST API will be consumed via a frontend (web/mobile) application
- A user can ask multiple questions and answer any question
- A user can answer a question once and edit this answer
- A user can vote once for a question and edit this vote
- A user can subscribe/unsubsribe to any question and receive an email notification upon each answer


## Challenges faced

- Need for secure authentication - used a combination of JWTs cached in the Redis DB thus aiding logout functionality and preventing attackers from creating JWTs using leaked secrets.
- Some ORM features did not work as planned - associations, seeding etc (Had to implement work arounds)
- Global test setup files were not working. Had to setup test files individually
- Personal Logistics - Had to relocate on short notice alongside other personal engagements while working to complete the project. 
- Use of Queues affected testing.

## Visuals
Pictures of the DB Schema and test emails are included in the supporting docs folder

## Improvements
- To reduce the latency of the Redis Server, it could be hosted alongside the main web server using Docker Containers.
- The Deployment can be relocated to AWS/Google Cloud to make use of Hosted Containers, Container Services and Hosted Databases
