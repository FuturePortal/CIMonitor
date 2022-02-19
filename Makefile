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
	@echo ""

# ===========================
# Main commands
# ===========================

init: intro do-updates do-start-containers
start: intro do-start-containers
stop: intro do-stop-containers
restart: intro do-stop-containers do-start-containers
update: intro do-updates do-stop-containers do-start-containers
logs: intro do-check-logs

production: intro do-stop-containers do-clean-generated-files do-yarn-build do-yarn-start

# ===========================
# Snippets
# ===========================

ids = USERID=$$(id -u) GROUPID=$$(id -g)

# ===========================
# Recipes
# ===========================

do-show-commands:
	@echo "===== Make commands ====="
	@echo "Development with docker:"
	@echo "    make init                  Start the project for the first time."
	@echo "    make start                 Starts docker with the server and dashboard in development mode."
	@echo "    make stop                  Stops the containers."
	@echo "    make restart               Restarts the containers."
	@echo "    make update                Update all project dependencies."
	@echo "    make logs                  Check the development logs."
	@echo "Production:"
	@echo "    make production            Builds and runs the application in production mode."

do-updates: \
	do-yarn-install

do-yarn-install:
	@echo "===== Updating dependencies ====="
	@yarn install

do-clean-generated-files:
	@echo "===== Building application in production mode ====="
	rm -rf .parcel-cache/ app/ dashboard/

do-yarn-build:
	@echo "===== Building application in production mode ====="
	@yarn build

do-yarn-start:
	@echo "===== Starting application in production mode ====="
	@yarn start

do-start-containers:
	@echo "===== Starting development containers ====="
	@${ids} docker-compose up --detach
	@echo "-> CIMonitor is running on http://localhost:3030"

do-stop-containers:
	@echo "===== Stopping development containers ====="
	@echo "Stopping development containers..."
	@${ids} docker-compose stop
	@echo "Done."

do-check-logs:
	@echo "===== Checking development logs ====="
	@docker-compose logs --follow --tail=10
