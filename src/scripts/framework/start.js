/*
 * Start
 *
 * Initialise our application
 */

import AsyncAlpine from 'async-alpine';
import Alpine from 'alpinejs'
import { BoosterExt } from 'htmx-booster-pack';
import Factory from './factory';

/* site-wide component imports */
import LazysizesInit from '../components/global/lazysizesInit';
import Menu from '../components/global/menu';
import Metadata from '../components/global/metadata';
import Revision from '../components/global/revision';
import Viewport from '../components/global/viewport';

export default class Start {

    // initialise components
    constructor() {
        this.globalComponents();
        this.localComponents();
        this.asyncAlpineComponents();
    }

    // Components that only need to be initialised ONCE on initial full page load:
    // - they target DOM elements in the page that don't change between htmx swaps
    // - or, they update their state by using their own DOM mutation observer
    globalComponents() {
        new LazysizesInit();
        new Menu();
        new Metadata();
        new Revision();
        new Viewport();
    }

    // Local components (with Booster Pack)
    // @see https://github.com/croxton/htmx-booster-pack
    localComponents() {
        // Create a custom htmx extension with the name 'component',
        // matching elements with the attribute 'data-component'.
        // Make sure to add 'component' to hx-ext attribute on the <body>
        new BoosterExt(Factory, 'component');
    }

    // Asynchronous Alpine components
    // @see https://async-alpine.dev/
    asyncAlpineComponents() {
        AsyncAlpine.init(Alpine);
        AsyncAlpine.data("message", () => import("../components/alpine/message.js"));
        AsyncAlpine.start();
        Alpine.start();
    }
}