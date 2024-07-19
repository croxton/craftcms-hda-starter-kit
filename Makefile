# define standard colors
ifneq (,$(findstring xterm,${TERM}))
	BLACK        := $(shell tput -Txterm setaf 0)
	RED          := $(shell tput -Txterm setaf 1)
	GREEN        := $(shell tput -Txterm setaf 2)
	YELLOW       := $(shell tput -Txterm setaf 3)
	LIGHTPURPLE  := $(shell tput -Txterm setaf 4)
	PURPLE       := $(shell tput -Txterm setaf 5)
	BLUE         := $(shell tput -Txterm setaf 6)
	WHITE        := $(shell tput -Txterm setaf 7)
	RESET := $(shell tput -Txterm sgr0)
else
	BLACK        := ""
	RED          := ""
	GREEN        := ""
	YELLOW       := ""
	LIGHTPURPLE  := ""
	PURPLE       := ""
	BLUE         := ""
	WHITE        := ""
	RESET        := ""
endif

# 👆https://gist.github.com/rsperl/d2dfe88a520968fbc1f49db0a29345b9

.PHONY: build dev composer craft npm pull up install

build: up
	@echo "Preparing to build..."
	@ddev exec npm run build
dev: up
	@ddev exec npm run dev
fix-scripts: up
	@ddev exec npm run fix-scripts
fix-styles: up
	@ddev exec npm run fix-styles
browserslist: up
	@ddev exec npx browserslist
composer: up
	@ddev composer \
		$(filter-out $@,$(MAKECMDGOALS))
craft: up
	@ddev exec php craft \
		$(filter-out $@,$(MAKECMDGOALS))
npm: up
	@ddev exec npm \
		$(filter-out $@,$(MAKECMDGOALS))
install: up build
	@echo ""
	@echo "Preparing to install Craft..."

# 👇 set_primary_site_url executes a custom command (shell script) within the web container which
# sets the default PRIMARY_SITE_URL of your Craft .env file to match your DDEV site name ${DDEV_SITENAME}.
# View the script in .ddev/commands/web/set_primary_site_url.sh
#
# Custom commands in DDEV are extremely powerful and easy to implement.
# https://ddev.readthedocs.io/en/stable/users/extend/custom-commands/
	@ddev set_primary_site_url

	@ddev exec php craft setup/app-id \
		$(filter-out $@,$(MAKECMDGOALS))
	@ddev exec php craft setup/security-key \
		$(filter-out $@,$(MAKECMDGOALS))
	@echo ""
	@ddev exec php craft install \
		$(filter-out $@,$(MAKECMDGOALS))
	@echo ""
	@echo "Installing plugins..."
# 👇 You can expand this list of plugins however you like.
# Just remember to update requirements in composer.json.default

	@ddev exec php craft plugin/install vite
	@ddev exec php craft plugin/install sprig

	@echo "*** DONE ***"
	@ddev describe
	@ddev launch

up:
	@echo "${PURPLE}Preflight check...${RESET}"

# 👇 We'll grep for some strings ("web" and "OK") to understand if DDEV is already running
	@if [ ! "$$(ddev describe | grep -e web -e OK )" ]; then \
				echo "Your DDEV project is ${GREEN}starting...${RESET}"; \
        ddev auth ssh; \
        ddev start; \
        ddev composer install; \
        ddev exec npm install --loglevel=error --no-fund; \
    else \
        echo "${YELLOW}Your DDEV project is already running.${RESET}"; \
    fi
%:
	@:
# ref: https://stackoverflow.com/questions/6273608/how-to-pass-argument-to-makefile-from-command-line
