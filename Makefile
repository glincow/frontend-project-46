install:
	npm ci

gendiff:
	node bin/gendiff.js

lint:
	npx eslint .

test:
	npx jest

test-cov: 
	npx jest --collectCoverage