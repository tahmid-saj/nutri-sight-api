# nutri-sight-api

API for nutrition tracking including predicting nutrition info using images / text, tracking calories burned and fitness / exercises, and searching recipes. Developed with Express, GraphQL, MongoDB, OpenAI API, Redis, PostgreSQL.

The directory structure is as follows:

```
nutri-sight-api/
├── api/
│   └── index.js
├── Dockerfile
├── index.js
├── package-lock.json
├── package.json
├── README.md
├── src/
│   ├── app.js
│   ├── graphql/
│   │   ├── calories-burned/
│   │   │   ├── calories-burned.graphql
│   │   │   ├── calories-burned.model.js
│   │   │   └── calories-burned.resolvers.js
│   │   ├── fitness/
│   │   │   ├── fitness.graphql
│   │   │   ├── fitness.model.js
│   │   │   └── fitness.resolvers.js
│   │   └── nutrition-tracker/
│   │       ├── nutrition-tracker.graphql
│   │       ├── nutrition-tracker.model.js
│   │       └── nutrition-tracker.resolvers.js
│   ├── models/
│   │   ├── calories-burned/
│   │   │   ├── calories-burned.model.js
│   │   │   ├── calories-burned.mongo.crud.js
│   │   │   └── calories-burned.mongo.js
│   │   ├── fitness/
│   │   │   ├── fitness.model.js
│   │   │   ├── fitness.mongo.crud.js
│   │   │   └── fitness.mongo.js
│   │   └── nutrition-tracker/
│   │       ├── nutrition-tracker.model.js
│   │       ├── nutrition-tracker.mongo.crud.js
│   │       └── nutrition-tracker.mongo.js
│   ├── routes/
│   │   ├── api.routes.js
│   │   ├── calories-burned/
│   │   │   ├── calories-burned.controller.js
│   │   │   └── calories-burned.router.js
│   │   ├── chatbot/
│   │   │   ├── chatbot.controller.js
│   │   │   └── chatbot.router.js
│   │   ├── fitness/
│   │   │   ├── fitness.controller.js
│   │   │   └── fitness.router.js
│   │   ├── nutrient-predictor/
│   │   │   ├── nutrient-predictor.controller.js
│   │   │   └── nutrient-predictor.router.js
│   │   ├── nutrition-tracker/
│   │   │   ├── nutrition-tracker.controller.js
│   │   │   └── nutrition-tracker.router.js
│   │   ├── recipes/
│   │   │   ├── recipes.controller.js
│   │   │   └── recipes.router.js
│   │   └── test-route/
│   │       └── test-route.router.js
│   ├── services/
│   │   ├── mongodb/
│   │   │   └── mongodb.service.js
│   │   ├── open-ai/
│   │   │   └── open-ai.service.js
│   │   └── redis/
│   └── utils/
│       ├── calculations/
│       ├── constants/
│       │   ├── chatbot.constants.js
│       │   └── recipes.constants.js
│       ├── errors/
│       │   ├── calories-burned.errors.js
│       │   ├── chatbot.errors.js
│       │   ├── fitness.errors.js
│       │   ├── nutrient-predictor.errors.js
│       │   └── recipes.errors.js
│       ├── requests/
│       │   ├── calories-burned/
│       │   │   ├── calories-burned.requests.js
│       │   │   └── calories.requests.js
│       │   ├── chatbot/
│       │   │   └── chatbot.requests.js
│       │   ├── fitness/
│       │   │   └── fitness.requests.js
│       │   ├── nutrient-predictor/
│       │   │   ├── nutrient-predictor.requests.js
│       │   │   └── nutrition.requests.js
│       │   └── recipes/
│       │       └── recipes.requests.js
│       └── validations/
│           ├── calories-burned/
│           │   └── calories-burned.validation.js
│           └── nutrition-tracker/
│               └── nutrition-tracker.validations.js
├── tests/
│   ├── api/
│   └── graphql/
│       └── graphql.tests
└── vercel.json
```
