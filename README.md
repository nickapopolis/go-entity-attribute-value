# go-entity-attribute-value
A small entity attribute value application using a Go REST server and react front end.
https://en.wikipedia.org/wiki/Entity%E2%80%93attribute%E2%80%93value_model

# Installation
```bash
git clone git@github.com:nickapopolis/go-entity-attribute-value.git
cd go-entity-attribute-value.git
go install

cd public
nvm use
yarn
yarnpkg run start & go run ../*.go
