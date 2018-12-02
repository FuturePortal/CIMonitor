.PHONY: all

# ===========================
# Default: help section
# ===========================

info: intro do-show-commands outro
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
outro:
	@echo "\n=-- Make CIMonitor --="

# ===========================
# Main commands
# ===========================

init: intro do-pre-init do-install-git-hooks do-run-updates do-show-commands outro

github: intro do-checkout-pr do-run-updates outro
update-project: intro do-run-updates outro
update: intro do-switch-branch do-run-updates outro
git-hooks: intro do-install-git-hooks outro

build-docs: intro do-build-docs outro

dev-server: intro do-dev-server outro
dev-server-slave: intro do-dev-server-slave outro
dev-client: intro do-dev-client outro
build-production: intro do-build-production outro

test: intro do-test-eslint-prettier outro
pre-commit: intro do-test-eslint-prettier do-commit-intro
fix: intro do-fix-eslint-prettier outro

cypress: intro do-cypress-open
cypress-run: intro do-cypress-run outro

# ===========================
# Recipes
# ===========================

do-show-commands:
	@echo "\n=== Make CIMonitor ===\n"
	@echo "make                        Show the make commands you can run."
	@echo "make init                   Initialise the project for development."
	@echo "make update-project         Install all dependencies and generate required files."
	@echo "make update BRANCH=<branch> Switch to a branch and run update-project."
	@echo "make github PR=<number>     Check out a PR from github and update the project."
	@echo "make git-hooks              Install the available git hooks."
	@echo "make dev-server             Run the development server."
	@echo "make dev-server-slave       Run the development slave server, listening to a master."
	@echo "make dev-client             Build, run and watch the development dashboard."
	@echo "make build-production       Build all the files required for production."
	@echo "make build-docs             Build a preview of the documentation."
	@echo "make test                   Run the testsuite."
	@echo "make fix                    Fix most of the codestyle errors."
	@echo "make cypress                Open Cypress dashboard for quick testing."
	@echo "make cypress-run            Run the cypress tests in the background."

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
	@echo "\n=== Code style check ===\n"
	@echo "Checking code style..."
	@node_modules/.bin/eslint --ext .js,.vue,.json . || \
	(\
		echo "Codestyle issues detected! Please run: \n" &&\
		echo "    make fix \n" &&\
		echo "to clean your code before you commit. \n" &&\
		exit 1\
	) && echo "All good! ❤️"

do-fix-eslint-prettier:
	@echo "\n=== Code style fixer ===\n"
	@(node_modules/.bin/eslint --fix --ext .js,.vue,.json . && echo "Code style is cleaned ❤️") ||\
	echo "\nNot everything could be fixed automatically, please check the errors above."

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
