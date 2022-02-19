# ===========================
# Default: help section
# ===========================

info: intro do-show-commands
intro:
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



# ===========================
# Recipes
# ===========================

do-show-commands:
	@echo "===== Make commands ====="
	@echo "Project:"
	@echo "    none."

do-parcel-build:
	@echo "===== Make commands ====="
	node_modules/.bin/parcel frontend/index.html
