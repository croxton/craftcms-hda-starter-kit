#!/usr/bin/env bash

## Description: Sets the default PRIMARY_SITE_URL of your Craft .env file to
## your ddev project name, and removes the trailing slash from the ddev URL.
## Usage: set_primary_site_url
## Example: "ddev set_primary_site_url"

sed -i -s "s#YOUR-CRAFT-PROJECT-NAME#${DDEV_SITENAME}#" /var/www/html/.env
sed -i -s "s#ddev.site/#ddev.site#" /var/www/html/.env