<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */
return [
    'env' => getenv('CRAFT_ENVIRONMENT'),
    'revision' => getenv('REVISION'),
    'htmxBoost' => 'hx-boost="true" hx-target="#main" hx-select="#main" hx-swap="outerHTML show:#body:top" hx-push-url="true" hx-indicator="body"',
    'sprigBoost' => 's-target="#main" s-select="#main" s-swap="outerHTML show:#body:top" s-indicator="body"'
];
