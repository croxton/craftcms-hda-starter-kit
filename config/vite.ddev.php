<?php
/**
 * Vite plugin for Craft CMS
 *
 * Allows the use of the Vite.js next generation frontend tooling with Craft CMS
 *
 * @link      https://nystudio107.com
 * @copyright Copyright (c) 2021 nystudio107
 */

use craft\helpers\App;

/**
 * Vite config - for DDEV
 */

// Decides which port to use for devServerPublic. This allows
// you to visit the http or https port. If you plant to only
// use http, make sure that PRIMARY_SITE_URL is set to http
//
// Match ports to .ddev/config.yaml -> web_extra_exposed_ports
$host = Craft::$app->getRequest()->getIsConsoleRequest()
    ? App::env('PRIMARY_SITE_URL')
    : Craft::$app->getRequest()->getHostInfo();
$httpPort = 3000;
$httpsPort = 3001;
$devServerPort = str_starts_with($host, 'https') ? $httpsPort : $httpPort;

return [
    'devServerPublic' => "$host:$devServerPort",
    'serverPublic' => '/dist/',
    'useDevServer' => App::env('CRAFT_ENVIRONMENT') === 'dev',
    'manifestPath' => '@webroot/dist/.vite/manifest.json',
    'errorEntry' => 'src/scripts/main.js',
    'cacheKeySuffix' => '',
    'checkDevServer' => false,
    'includeReactRefreshShim' => false,
    'includeModulePreloadShim' => true,
    'criticalPath' => '@webroot/criticalcss',
    'criticalSuffix' => '_critical.min.css',
];