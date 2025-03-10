# Hypermedia Driven Application starter kit for Craft CMS

A solid platform for front-end development when using Craft CMS as a backend, following the [Hypermedia Driven Application (HDA)](https://htmx.org/essays/hypermedia-driven-applications/) architecture and the [Locality of Behaviour](https://htmx.org/essays/locality-of-behaviour/) (LoB) principle. Create highly interactive, SPA-like web apps without the overhead.

Includes a working demo featuring full page transitions and example `Alpine.js`, `Vue 3` and vanilla JS components.

* [Craft CMS](https://craftcms.com/) (v5)
* [Vite](https://vitejs.dev/) (v6) - provides a robust ES6 development environment with script and style injection (HMR, file watching).
* [htmx](https://htmx.org/) (v2) + [Booster Pack](https://github.com/croxton/htmx-booster-pack) (v1) for HTML-over-the-wire 
* [Tailwind CSS](https://tailwindcss.com/) (v4) for utility-first CSS.
* [Alpine.js](https://alpinejs.dev/) (v3) + [Async Alpine](https://github.com/Accudio/async-alpine) (v2) for composing behaviour directly in markup, with support for asynchronous on-demand components.
* [Vue.js](https://vuejs.org/) (v3) for complex reactive applications using SFCs.
* Minimalistic JavaScript framework for vanilla JS components:
    * Components can be lazyloaded as they enter the DOM and use loading strategies including `visible`, `idle` and `media`
    * Framework-agnostic - works with vanilla JS, Vue, jQuery, GSAP, Alpine.js or your framework of choice; any third party script can be integrated into the simple component lifecycle.
* Legacy bundles for older browsers.
* Static files (fonts, images etc).
* Linting: opinionated Eslint and Stylelint configs with Vite plugin checker.

## Requirements

* Node.js 20+
* PHP 8.2+
* MySQL 8.0.17+ using InnoDB, MariaDB 10.4.6+, or PostgreSQL 13+
* Composer 2.0+

OR

* Docker
* DDEV, minimum version 1.19

## Installation

Clone this repo into a new directory.

### Clone this repo
```bash
git clone git@github.com:croxton/craftcms-hda-starter-kit.git my-website
cd my-project
rm -rf .git
# (Optional) Start a new repository:
git init .
```

### Option 1: DDEV (recommended)

These instructions assume you have [installed Docker and DDEV](https://ddev.readthedocs.io/en/stable/users/install/).

#### 1. Configure DDEV (Optional)

You can skip this step if the name of your root directory matches your desired DDEV subdomain.

If you need your local DDEV domain to be different from the name of this project's root directory, run the following command from inside said directory:

```shell
ddev config
```

Follow the prompts.

-   **Project name:** `my-test-site` would establish a project URL of `https://my-test-site.ddev.site`
-   **Docroot location:** defaults to `web`, should be kept as-is (press return)
-   **Project Type:** should be kept as-is (press return)

#### 2. Install Craft

To install Craft and plugins, run the following command and follow the prompts.

```shell
make install-craft
```

This builds a Dockerized development environment running the latest version of Craft CMS and installs the front-end packages.

**Pay special attention to the Craft installation prompts**. After setting the admin’s account credentials, you’ll be prompted for your desired site name and url.

The **Site name** can be anything, can include spaces and capital letters, and doesn't need to correspond to your project's root folder name or DDEV domain.

The **Site url** If for some reason the suggested default isn’t acceptable, answer the prompt for a url with the full url (e.g. `https://my-website.ddev.site`)

Once installation is complete you should see the output of `ddev describe` in your terminal, which will look something like this:

```shell
┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Project: craftcms-hda-starter-kit ~/projects/craftcms-hda-starter-kit https://craftcms-hda-starter-kit.ddev.site                          │
│ Docker platform: orbstack                                                                                                                 │
│ Router: traefik                                                                                                                           │
├──────────────┬──────┬────────────────────────────────────────────────────────────────────────────────────────────────┬────────────────────┤
│ SERVICE      │ STAT │ URL/PORT                                                                                       │ INFO               │
├──────────────┼──────┼────────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────┤
│ web          │ OK   │ https://craftcms-hda-starter-kit.ddev.site                                                     │ craftcms PHP8.3    │
│              │      │ InDocker -> Host:                                                                              │ nginx-fpm          │
│              │      │  - web:80 -> 127.0.0.1:32768                                                                   │ docroot:'web'      │
│              │      │  - web:443 -> 127.0.0.1:32769                                                                  │ Perf mode: mutagen │
│              │      │  - web:3000                                                                                    │ NodeJS:20.10       │
│              │      │  - web:8025                                                                                    │                    │
├──────────────┼──────┼────────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────┤
│ db           │ OK   │ InDocker -> Host:                                                                              │ mysql:8.0          │
│              │      │  - db:3306 -> 127.0.0.1:32770                                                                  │ User/Pass: 'db/db' │
│              │      │                                                                                                │ or 'root/root'     │
├──────────────┼──────┼────────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────┤
│ Mailpit      │      │ Mailpit: https://craftcms-hda-starter-kit.ddev.site:8026                                       │                    │
│              │      │ Launch: ddev mailpit                                                                           │                    │
├──────────────┼──────┼────────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────┤
│ vite         │      │ https://craftcms-hda-starter-kit.ddev.site:3001                                                │                    │
│              │      │ InDocker: web:3000                                                                             │                    │
├──────────────┼──────┼────────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────┤
│ Project URLs │      │ https://craftcms-hda-starter-kit.ddev.site, https://127.0.0.1:32769,                           │                    │
│              │      │ http://craftcms-hda-starter-kit.ddev.site, http://127.0.0.1:32768                              │                    │
└──────────────┴──────┴────────────────────────────────────────────────────────────────────────────────────────────────┴────────────────────┘
```

### Option 2: BYO webserver

These instruction assume you will bring your own webserver for local development, e.g. MAMP, Laravel Valet.

#### 1. Replace the default Vite config files

```bash
cp vite.config.local.js vite.config.js
cp config/vite.local.php config/vite.php
```

#### 2. Create a host
Create a host (e.g. `https://my-website.local`) pointing to the `web` directory of the new project, and a new database.

#### 3. Create `.env`
Craft depends on environment variables set in a root .env file so you’ll need to copy the .env.example over.

```bash
cp .env.example.dev .env
```

Update the `PRIMARY_SITE_URL` to the host you created, e.g. `https://my-website.local`, and add your database credentials.

#### 4. Install Node packages
```bash
# Use Node 20.x or later
npm install
````

#### 5. Install Composer packages
```bash
composer install
````

#### 6. Install Craft

```bash
php craft setup
php craft install
php craft plugin/install ckeditor
php craft plugin/install image-resizer
php craft plugin/install imgixer
php craft plugin/install postmark
php craft plugin/install preparse-field
php craft plugin/install sprig
php craft plugin/install vite
```

Open the`PRIMARY_SITE_URL` you specified in a browser to view your site.

## Usage

### Run your desired workflow:

Run the development server (with hot module reloading and file watching)

```bash
# DDEV:
make dev

# Or, with BYO:
npm run dev
```

Run the production build

```bash
# DDEV:
make build

# Or, with BYO:
npm run build
```

Fix your javascript with eslint

```bash
# DDEV:
make fix-scripts

# Or, with BYO:
npm run fix-scripts
```

Fix your styles with stylelint

```bash
# DDEV:
make fix-styles 

# Or, with BYO:
npm run fix-styles
``` 

View list of supported browsers for this project (see `package.json` to edit):

```bash
# DDEV:
make browserslist 

# Or, with BYO:
npx browserslist
```

### DDEV: Other Makefile Commands

-   `make up` - Confirms your DDEV project is running. Rebuilds the containers and pushes over your SSH credentials if needed.
-   `make install-craft` - Runs a complete one-time process to set the project up and install Craft
-   `make composer <command>` - Run Composer commands inside the container, e.g. `make composer install`
-   `make craft <command>` - Run Craft commands inside the container, e.g. `make craft project-config/touch`
-   `make npm <command>` - Run npm commands inside the container, e.g. `make npm install`

### DDEV: Useful DDEV Commands

<code>ddev start</code>, <code>ddev stop</code>, <code>ddev restart</code>, <code>ddev import-db</code>, <code>ddev describe</code>, and <code>ddev poweroff</code> are among [the most useful commands available when using DDEV](https://ddev.readthedocs.io/en/latest/users/cli-usage/). They can be run from any directory below your project's root directory.

## Front-end development

Our aim is to keep markup and logic (styling / scripting) together in one file, wherever possible, and this starter kit gives you some great tools to start with simply by editing html. Realistically however, this isn’t always possible or desirable as the complexity of an application increases: sometimes we need units of behaviour or style to be separated as individual components that map to elements in the markup. Ideally, these components should be as self-contained and expressive as possible, so they remain readable and composable.

This kit gives you the flexibility to find a pragmatic balance between Locality of Behaviour (LoB) and Separation of Concerns (SoC) that suits your project and preferences.

## Styling
You may need to create bespoke styles for UI states that can’t easily be expressed with Tailwind CSS utility classes. You can organise these in a [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)-inspired hierarchy extending Tailwind's cascade layers:

* **Theme** – global CSS properties and Tailwind theme variables.
* **Base** – styling for bare HTML elements (like BODY, H1, A, etc.).
* **Objects** –  `[attribute]` or `.class` based selectors which define undecorated design patterns, intended to be reusable between projects (e.g. `[aria-hidden]`,`[data-share]`, `.o-share`).
* **Layouts** – layout grids and containers (e.g. `.l-container`).
* **Vendor** - third party component stylesheets.
* **Components** – specific UI components (e.g. `.c-button`).
* **Utilities** – utilities and helper classes with ability to override anything which goes before (e.g. `.h1`).

## Scripting
`Alpine.js` allows you to express UI component behaviour directly in markup, but sometimes you may need to isolate behaviour in an individual component and load it asynchronously on demand rather than in one big script bundle up-front. This kit allows you to use Async Alpine components, Vue SFCs or roll your own vanilla JS components. The later can be used to load heavy third-party libraries like [GSAP](https://greensock.com/gsap/) in a memory-efficient manner, by wrapping them in a `mount()` / `unmount()` lifecycle.

### `framework/start.js`
This file controls the components you wish to load, and the selectors they map to.

####  Global components
Global components are loaded once on initial page load. They manage the state of site-wide elements and behaviours like the main menu, `<head>` metadata and window resize events. Create global components in `components/global` and initialise in `globalComponents()` in `framework/start.js`.

#### Local components
Local components are classes attached to elements that are automatically loaded on demand in content swapped into a target by htmx, such as `<main>`, and destroyed automatically when the element they are attached to is no longer in the DOM. Create local components in `components/local` and attach to elements with `data-component="myComponent"`. Determine the loading strategy for the component instance with `data-load=""`.

The component can appear once or multiple times in your markup, with each instance respecting the loading strategy specified for the element it is mounted on, and each instance of the class being mounted / unmounted independently. Regardless of the number of instances, the component’s script (split into an individual chunk file by Vite) will only be requested once - when a matching component is first encountered.

For example, if you create a component class at `components/local/myComponent.js`, you can use it in your html like this:

```html
<div id="a-unique-id" data-component="myComponent" data-load="visible"></div>
<div id="another-unique-id" data-component="myComponent" data-load="media (min-width: 1024px)" data-options='{"option1":"value1", "option2":"value2"}'></div>
```

Each instance *must* have a unique ID.

#### Conductors

Conductors are a special type of local component for managing **multiple** elements matching a selector, rather than being attached to individual elements via `data-component=""` attributes. They can be a more efficient way to coordinate the behaviour of arbitrary groups of separated elements, such as lazy loaded images or viewport intersection animations: instead of _multiple_ instances of a component's class there will only ever be one.

To register conductors pass a `conductors` array to the `ConductorFactory()` class. Specify the conductor name, CSS selector and loading strategy for each conductor you want to register.

A conductor is loaded and mounted using the specified strategy when its selector is detected in the dom, and unmounted (but not destroyed) when it's selector is no longer found in the dom; as such, conductors are stateful - they retain any properties that you set on the class regardless of mount/unmount lifecycles, unless you destroy the properties in `unmount()`. Conductors are also not bound to a htmx target, so mounted conductors will be "refreshed" (unmount/mount) on every swap, if the selector remains in the dom after the swap.
```html
    new ConductorFactory('component', [
            { conductor: "myConductor1", selector: "[data-thing-1]", strategy: "eager" }
            { conductor: "myConductor2", selector: "[data-thing-2]", strategy: "visible" }
    ]);
```

#### Alpine Async components
Asynchronous Alpine components can be loaded anywhere in your markup. 

Create Alpine components in `components/alpine`. See `components/alpine/message.js` for an example.

Alpine components must be initialised in `asyncAlpineComponents()` in `framework/start.js`:

```js
AsyncAlpine.data("message", () => import("../components/alpine/message.js"));
```

In your html:
```html
  <div
    ax-load="visible"
    x-data="message('Component loaded with Async Alpine using the `visible` strategy')"
    x-ignore>
  </div>
```

If the element controlled by Alpine contains markup, preserve the initial markup state for history restores by using the `hx-history-preserve` attribute. This allows Alpine to reinitialise itself properly when the user navigates to the page with the browser’s back/forward buttons.

```html
<div id="alpine-search" hx-history-preserve x-data='{}'>
    <details class="c-search__item" role="list" :open="isOpen">
        <ul class="border border-200 rounded p-2 shadow-xl max-h-64 overflow-y-scroll" 
            role="listbox" 
            x-on:click.outside="closeSearch">
            <template x-for="item in getItems" :key="item.id">
            </template>
        </ul>
    </details>
</div>
```

For instructions see [Async Alpine](https://github.com/Accudio/async-alpine).

#### Vue single-file components
Vue components are loaded on demand in content swapped by htmx, such as `<main>`. Create components in `components/vue`, and attach to elements with `data-component="MyComponent"` and `data-type="vue"`. Determine the loading strategy for the component with `data-load=""`, and pass props via the `data-options=""` attribute (which accepts any valid JSON string).

No initialisation step is required for Vue components; like local components they are loaded and mounted automatically on demand, as individual Vue application instances.

See `components/vue/LocationMap.js` for an example.

```html
<div 
  id="map-london"
  data-component="LocationMap"
  data-type="vue"
  data-load="visible"
  data-options='{
    "latitude": "51.509865", 
    "longitude": "-0.118092", 
    "caption": "A map of London"
  }'>
</div>
 ```

For more, see [Vue SFCs](https://vuejs.org/guide/scaling-up/sfc.html)

### Loading strategies
Loading strategies allow you to load components asynchronously on demand instead of up-front, freeing up the main thread and speeding up page rendering. Alpine components use the `ax-load` attribute to specify the strategy, whereas vanilla JS and vue components use the `data-load` attribute.

#### Eager
The default strategy if not specified. If the component is present in the page on initial load, or in content swapped into the dom by htmx, it will be loaded and mounted immediately.

#### Event
Vanilla JS components and Vue components can listen for an event on `document.body` to be triggered before they are loaded. Pass the event name in parentheses.

```html
<div id="my-thing-1" data-component="myThing" data-load="event (htmx:validation:validate)"></div>
```

Alpine async components have their own implementation of Event - see: https://async-alpine.dev/docs/strategies/#event.

#### Idle
Uses `requestIdleCallback` (where supported) to load when the main thread is less busy. Where `requestIdleCallback` isn’t supported (Safari) we use an arbitrary 200ms delay to allow the main thread to clear.

Best used for components that aren’t critical to the initial paint/load.

```html
<div id="my-thing-1" data-component="myThing" data-load="idle"></div>
```

#### Media
The component will be loaded when the provided media query evaluates as true.

```html
<div id="my-thing-1" data-component="myThing" data-load="media (max-width: 820px)"></div>
```

#### Visible
Uses IntersectionObserver to only load when the component is in view, similar to lazy-loading images. Optionally, custom root margins can be provided in parentheses.

```html
<div id="my-thing-1" data-component="myThing" data-load="visible (100px 100px 100px 100px)"></div>
```

#### Combined strategies
Strategies can be combined by separating with a pipe |, allowing for advanced and complex code splitting. All strategies must resolve to trigger loading of the component.

```html
<div id="my-thing-1" data-component="myThing" data-load="idle | visible | media (min-width: 1024px)"></div>
```

### Creating your own local components and conductors

Component classes must extend the `Booster` class and have `mount()` and `unmount()` methods.

See [HTMX Booster Pack](https://github.com/croxton/htmx-booster-pack) for details.

#### HTML:

```html
<div id="my-thing-1" data-component="myThing" data-options='{"message":"Hello!"}'></div>
```

#### `components/local/myThing.js`:

```js
import { Booster } from 'htmx-booster-pack';

export default class MyThing extends Booster {
    
    thing;
    thingObserver;
    
    constructor(elm) {
        super(elm);
        
        // default options here are merged with those set on the element
        // with data-options='{"option1":"value1"}'
        this.options = {
            message: "Hi, I'm thing",
        };

        this.mount();
    }

    mount() {
        // setup and mount your component instance
        this.thing = document.querySelector(this.elm);
        
        // do amazing things...
        this.clicked = (e) => {
          console.log('Hello!');
        }
        this.clickHandler = this.clicked.bind(this);
        window.addEventListener('click', this.clickHandler);
        
        this.thingObserver = new IntersectionObserver(...);
        
        this.setState('component', {
          playingVideoId: "123"
        });
    }

    unmount() {
        // remove any event listeners you created on global objects like 'window'
        // and on any dom elements that you created in mount()
        window.removeEventListener('click', this.clickHandler);
        this.clickHandler = null;
        
        // remove any observers you connected
        this.thingObserver.disconnect();
        this.thingObserver = null;
        
        // unset any references to DOM nodes
        this.thing = null;
        
        // destroy state if you used it
        this.destroyState('component');
    }
}
```

### Event bus
For communication *between* components, the kit comes with [PubSubJS](https://github.com/mroderick/PubSubJS), a topic-based publish/subscribe library.

Example use:

```js
import PubSub from 'pubsub-js';

// subscribe to 'video.play'
let topic = 'video.play';
let subscriber = PubSub.subscribe(topic, (msg, id) => {
    if (id !== player.plyId) {
        player.pause();
    }
});

player.on('play', event => {
    this.videoMount.classList.add('is-playing');
    // pause any other videos mounted on the page that are playing
    PubSub.publish(topic, player.plyId);
});
        
```

Be sure to unsubscribe to topics in `unmount()`:

```js
 // unsubscribe
 PubSub.unsubscribe(subscriber);
```

## Thank you

Inspired by:

* [Agency Webpack Mix Config](https://github.com/ben-rogerson/agency-webpack-mix-config)
* [Gia](https://github.com/giantcz/gia)
* [Async Alpine](https://github.com/Accudio/async-alpine)
