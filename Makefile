.PHONY: all

# ===========================
# Default: help section
# ===========================

info: intro do-show-commands
intro:
	@echo ""
	@echo " .d8888b. 8888888 888b     d888                   d8b 888"
	@echo "d88P  Y88b  888   8888b   d8888                   Y8P 888"
	@echo "888    888  888   88888b.d88888                       888"
	@echo "888         888   888Y88888P888  .d88b.  88888b.  888 888888 .d88b.  888d888"
	@echo "888         888   888 Y888P 888 d88\"\"88b 888 \"88b 888 888   d88\"\"88b 888P\""
	@echo "888    888  888   888  Y8P  888 888  888 888  888 888 888   888  888 888"
	@echo "Y88b  d88P  888   888   \"   888 Y88..88P 888  888 888 Y88b. Y88..88P 888"
	@echo " \"Y8888P\" 8888888 888       888  \"Y88P\"  888  888 888  \"Y888 \"Y88P\"  888"

# ===========================
# Main commands
# ===========================

init: intro do-pre-init do-install-git-hooks do-run-updates do-show-commands
update-project: intro do-run-updates
update: intro do-switch-branch do-run-updates
github: intro do-checkout-pr do-run-updates
git-hooks: intro do-install-git-hooks

build-production: intro do-build-production

build-docs: intro do-build-docs

dev-server: intro do-dev-server
dev-server-slave: intro do-dev-server-slave
dev-client: intro do-dev-client

build-container: intro do-backup-dependencies do-build-production do-build-container do-restore-dependencies do-run-updates
dev-container: intro do-dev-container

test: intro do-test-eslint-prettier
cypress: do-cypress-open
cypress-run: do-cypress-run

pre-commit: intro do-fix-eslint-prettier do-commit-intro

# ===========================
# Recipes
# ===========================

do-show-commands:
	@echo "\nProject:"
	@echo "  make init                   Initialise the project for development."
	@echo "  make update-project         Install all dependencies and generate required files."
	@echo "  make update BRANCH=<branch> Switch to a branch and run update-project."
	@echo "  make github PR=<number>     Check out a PR from github and update the project."
	@echo "  make git-hooks              Install the available git hooks."
	@echo "\nLocal installation:"
	@echo "  make build-production       Build all the files required for production."
	@echo "\nDocumentation:"
	@echo "  make build-docs             Build a preview of the documentation."
	@echo "\nDevelopment:"
	@echo "  make dev-server             Run the development server."
	@echo "  make dev-server-slave       Run the development slave server, listening to a master."
	@echo "  make dev-client             Build, run and watch the development dashboard."
	@echo "\nDocker container:"
	@echo "  make build-container        Build production assets and a Docker container."
	@echo "  make dev-container          Run the built Docker container."
	@echo "\nTests:"
	@echo "  make test                   Run the test suite."
	@echo "  make cypress                Open Cypress dashboard for quick testing."
	@echo "  make cypress-run            Run the cypress tests in the background."

do-pre-init:
	cp -n server/config/config.example.json server/config/config.json

do-switch-branch:
	@if [ -z $$BRANCH ]; then echo "No branch is set, please run:\nmake update BRANCH=<branch>"; exit 1; fi
	@echo "\n=== Switching to and updating $$BRANCH ===\n"
	git checkout $$BRANCH
	git pull upstream $$BRANCH

do-checkout-pr:
	@if [ -z $$PR ]; then echo "No PR number is set, please run:\nmake github PR=<number>"; exit 1; fi
	@echo "\n=== Checking out Pull Request $$PR ===\n"
	git fetch upstream refs/pull/$$PR/head:refs/remotes/upstream/pr/$$PR
	git checkout upstream/pr/$$PR

do-run-updates:
	@echo "\n=== Updating project ===\n"
	yarn install

do-run-watch:
	@echo "\n=== Running file watchers ===\n"
	rm -rf dist/*
	yarn watch

do-dev-server:
	@echo "\n=== Starting server application ===\n"
	node server/server.js

do-dev-server-slave:
	@echo "\n=== Starting server slave application ===\n"
	node server/server-slave.js

do-dev-client:
	@echo "\n=== Building and watching files ===\n"
	yarn watch

do-build-production:
	@echo "\n=== Building files for production ===\n"
	yarn install --production
	yarn production

do-test-eslint-prettier:
	@echo "\n=== ESlint + Prettier code style check ===\n"
	@echo "Wrongly formatted files:"
	@node_modules/.bin/eslint --ext .js,.vue,.json . && echo "None ❤️"

do-fix-eslint-prettier:
	@echo "\n=== ESlint + Prettier code style fixer ===\n"
	@node_modules/.bin/eslint --fix --ext .js,.vue,.json . && echo "Code style is cleaned ❤️"

do-commit-intro:
	@echo "\n=== Committing ===\n"

do-install-git-hooks:
	@echo "\n=== Installing git hooks ===\n"
	cp dev/git-hooks/* .git/hooks
	chmod +x .git/hooks/*

do-cypress-open:
	@echo "\n=== Opening Cypress dashboard ===\n"
	./node_modules/.bin/cypress open

do-cypress-run:
	@echo "\n=== Running Cypress tests ===\n"
	./node_modules/.bin/cypress run

do-build-docs:
	@echo "\n=== Building docs with mkdocs ===\n"
	@echo "Check the documentation at http://localhost:9998/"
	@docker run -ti --rm -p 9998:9998 -v $$PWD:/documents moird/mkdocs

do-dev-container:
	@echo "\n=== Running dev container ===\n"
	docker run -ti --rm -p9999:9999 cimonitor/cimonitor:latest

do-build-container:
	@echo "\n=== Building Docker container ===\n"
	yarn remove babel-cli laravel-mix sass-resources-loader --production
	docker build -t cimonitor/cimonitor:latest .

do-backup-dependencies:
	@echo "\n=== Backing up dependencies ===\n"
	cp package.json package.json.tmp
	cp yarn.lock yarn.lock.tmp

do-restore-dependencies:
	@echo "\n=== Restoring dependencies ===\n"
	mv package.json.tmp package.json
	mv yarn.lock.tmp yarn.lock
