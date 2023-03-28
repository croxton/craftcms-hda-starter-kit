# Hypermedia Driven Application starter kit for Craft CMS

A solid platform for front-end development when using Craft CMS as a backend, following the [Hypermedia Driven Application (HDA)](https://htmx.org/essays/hypermedia-driven-applications/) architecture and the [Locality of Behaviour](https://htmx.org/essays/locality-of-behaviour/) (LoB) principle. Create highly interactive, SPA-like web apps without the overhead.

Includes a working demo featuring full page transitions and example `Alpine.js`, `Vue 3` and vanilla JS components.

* [Craft CMS 4](https://craftcms.com/)
* [Vite 4](https://vitejs.dev/) - provides a robust ES6 development environment with script and style injection (HMR, file watching)
* [htmx](https://htmx.org/) for HTML-over-the-wire
* [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
* [Alpine.js](https://alpinejs.dev/) + [Async Alpine](https://github.com/Accudio/async-alpine) for composing behaviour directly in markup, with support for asynchronous on-demand components
* [Vue.js](https://vuejs.org/) (v3) for complex reactive applications using SFCs
* Minimalistic JavaScript framework for vanilla JS components:
    * Components can be lazyloaded as they enter the DOM and use loading strategies including `visible`, `idle` and `media`
    * Framework-agnostic - works with vanilla JS, Vue, jQuery, GSAP, Alpine.js or your framework of choice; any third party script can be integrated into the simple component lifecycle
* SASS auto compiling, prefixing, minifying and sourcemaps
* CSS Autoprefixer, PostCSS Preset Env for older browsers
* Legacy bundles for older browsers
* Image optimisation
* Critical CSS
* Static files (fonts, images etc)
* Eslint
* Stylelint

## Requirements

* Node 16+
* PHP 8.0.2+
* MySQL 5.7.8+ with InnoDB, MariaDB 10.2.7+, or PostgreSQL 10+
* Composer 2.0+

OR

* Docker
* DDEV, minimum version 1.19

## Installation

### Clone this repo
```bash
git clone git@github.com:croxton/craftcms-hda-starter-kit.git my-website
cd my-project
rm -rf .git
# (Optional) Start a new repository:
git init .
```

### Option 1: BYO webserver

These instruction assume you will bring your own webserver, e.g. MAMP, Laravel Valet.

#### 1. Create a host
Create a host (e.g. `http://my-website.local`) pointing to the `web` directory of the new project, and a new database.

#### 2. Create `.env`
Craft depends on environment variables set in a root .env file so you’ll need to copy the .env.example over.

```bash
cp .env.example.dev .env
```

Update the `PRIMARY_SITE_URL` to the host you created, e.g. `http://my-website.local`, and add your database credentials.

#### 3. Install Node packages
```bash
# Use Node 16.x or later
npm install
````

#### 4. Install Composer packages
```bash
composer install
````

#### 5. Install Craft

```bash
php craft setup
php craft install
php craft plugin/install vite
```

Open the`PRIMARY_SITE_URL` you specified in a browser to view your site.

### Option 2: DDEV

These instructions assume you have [installed Docker and DDEV](https://ddev.readthedocs.io/en/stable/users/install/).

#### 1. Copy the DDEV-specific config files

```bash
cp vite.config.ddev.js vite.config.js
cp config/vite.ddev.php config/vite.php
```

#### 2. Configure DDEV (Optional)

You can skip this step if the name of your root directory matches your desired DDEV subdomain.

If you need your local DDEV domain to be different from the name of this project's root directory, run the following command from inside said directory:

```shell
ddev config
```

Follow the prompts.

-   **Project name:** `my-test-site` would establish a project URL of `https://my-test-site.ddev.site`
-   **Docroot location:** defaults to `web`, should be kept as-is
-   **Project Type:** defaults to `php`, should be kept as-is

#### 3. Install Craft

To install Craft, Vite and the [Vite](https://github.com/nystudio107/craft-vite) plugin run the following command and follow the prompts.

```shell
make install
```

This builds a Dockerized development environment running the latest version of Craft CMS and installs the front-end packages.

**Pay special attention to the Craft installation prompts**. After setting the admin’s account credentials, you’ll be prompted for your desired site name and url.

The **Site name** can be anything, can include spaces and capital letters, and doesn't need to correspond to your project's root folder name or DDEV domain.

The **Site url** If for some reason the suggested default isn’t acceptable, answer the prompt for a url with the full url (e.g. `https://my-website.ddev.site`)

_💡 If you’re unclear about the url of your project open another terminal window in the same directory and run `ddev describe`.


## Usage

### Run your desired workflow:

Run the development server (with hot module reloading and file watching)

```bash
# BYO:
npm run dev

# Or, with DDEV:
make dev
```

Run the production build

```bash
# BYO:
npm run build

# Or, with DDEV:
make build
```

Run the production build and generate critical CSS

```bash
# BYO:
npm run build-critical

# Or, with DDEV:
make build-critical
```

Fix your javascript with eslint

```bash
# BYO:
npm run fix-scripts

# Or, with DDEV:
make fix-scripts
```

Fix your styles with stylelint

```bash
# BYO:
npm run fix-styles

# Or, with DDEV:
make fix-styles 
``` 

View list of supported browsers for this project (see `package.json` to edit):

```bash
# BYO:
npx browserslist

# Or, with DDEV:
make browserslist 
```

### DDEV: Other Makefile Commands

-   `make up` - Confirms your DDEV project is running. Rebuilds the containers and pushes over your SSH credentials if needed.
-   `make install` - Runs a complete one-time process to set the project up and install Craft
-   `make composer <command>` - Run Composer commands inside the container, e.g. `make composer install`
-   `make craft <command>` - Run Craft commands inside the container, e.g. `make craft project-config/touch`
-   `make npm <command>` - Run npm commands inside the container, e.g. `make npm install`

### DDEV: Useful DDEV Commands

<code>ddev start</code>, <code>ddev stop</code>, <code>ddev restart</code>, <code>ddev import-db</code>, <code>ddev describe</code>, and <code>ddev poweroff</code> are among [the most useful commands available when using DDEV](https://ddev.readthedocs.io/en/latest/users/cli-usage/). They can be run from any directory below your project's root directory.

## Front-end development

Our aim is to keep markup and logic (styling / scripting) together in one file, wherever possible, and this starter kit gives you some great tools to start with simply by editing html. Realistically however, this isn’t always possible or desirable as the complexity of an application increases: sometimes we need units of behaviour or style to be separated as individual components that map to elements in the markup. Ideally, these components should be as self-contained and expressive as possible, so they remain readable and composable.

This kit gives you the flexibility to find a pragmatic balance between Locality of Behaviour (LoB) and Separation of Concerns (SoC) that suits your project and preferences.

## Styling
You may need to create bespoke styles for UI states that can’t easily be expressed with Tailwind CSS classes. This kit allows you to organise these in a [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)-inspired folder hierarchy, and use [SASS](https://sass-lang.com/) as much or as little as you wish.

* **Settings** – global variables, config switches etc.
* **Functions** – globally used functions.
* **Mixins** – globally used mixins.
* **Base** – styling for bare HTML elements (like BODY, H1, A, etc.).
* **Objects** – class-based selectors which define undecorated, design patterns, intended to be reusable between projects (e.g. `.o-ratio`).
* **Layouts** – layout grids and containers (e.g. `.l-container`).
* **Vendor** - third party component stylesheets
* **Components** – specific UI components  (e.g. `.c-button`).
* **Utils** – utilities and helper classes with ability to override anything which goes before (e.g. `.h1`).

## Scripting
`Alpine.js` allows you to express UI component behaviour directly in markup, but sometimes you may need to isolate behaviour in an individual component and load it asynchronously on demand rather than in one big script bundle up-front. This kit allows you to use Async Alpine components, Vue SFCs or roll your own vanilla JS components. The later can be used to load heavy third-party libraries like [GSAP](https://greensock.com/gsap/) in a memory-efficient manner, by wrapping them in a `mount()` / `unmount()` lifecycle.

### `framework/start.js`
This file controls the components you wish to load, and the selectors they map to.

####  `globalComponents()`
Global components are loaded once on initial page load. They manage the state of site-wide elements and behaviours like the main menu, `<head>` metadata and window resize events. Create global components in `framework/components/global`.

#### `localComponents()`
Vanilla JS components are loaded on demand in content swapped into a target by htmx, such as `<main>`. Create local components in `framework/components/local` and attach to elements with `data-component="myComponent"`. Determine the loading strategy for the component instance with `data-load=""`.

The component can appear once or multiple times in your markup, with each instance respecting the loading strategy specified for the element it is mounted on. Regardless of the number of instances, the component’s script (split into an individual chunk file by Webpack) will only be requested once - when the component is first encountered.

For example, if you create a component class at `framework/components/local/myComponent.js`, you can use it in your html like this:

```html
<div id="a-unique-id" data-component="myComponent" data-load="visible"></div>
<div id="another-unique-id" data-component="myComponent" data-load="media (min-width: 1024px)"></div>
```

Each instance *must* have a unique ID.

If the element contains markup that is manipulated by the component you have created, preserve the initial markup state for history restores by using the `hx-history-preserve` attribute. For example, a component matching the `[data-component="carousel"]` selector that uses [Swiper.js](https://swiperjs.com/) to generate a carousel:

```html
<div id="my-carousel" class="swiper" data-component="carousel" hx-history-preserve>
  <div class="swiper-wrapper">
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
  </div>
  <div class="swiper-pagination"></div>
</div>
```

It is also possible to manually load a specific component and attach to a selector in `start.js`. When the selector enters the dom, the component will be loaded and mounted using the selected strategy:

```js
this.componentLoader.load('share', '[data-share]', 'visible');
```

#####  Important note
Htmx uses a 'swap and settle' logic to enable CSS transitions between new and old content. From the docs:
> When new content is received from a server, before the content is swapped in, the existing content of the page is examined for elements that match by the id attribute. If a match is found for an element in the new content, the attributes of the old content are copied onto the new element before the swap occurs. The new content is then swapped in, but with the old attribute values. Finally, the new attribute values are swapped in, after a "settle" delay (20ms by default)

If your component adds attributes (e.g. classes) _to the element it is mounted on_ AND uses those classes to determine it's own state, you may find it won't initialise itself fully after a swap between two pages where the element IDs of the components are the same in the old and new content, because the element is being settled when the component loader tries to mount it. In that case, put your component _inside_ another container. For example:

```html
<div id="my-carousel" data-component="carousel" hx-history-preserve>
  <div class="swiper">
     <div class="swiper-wrapper">
       <div class="swiper-slide">Slide 1</div>
       <div class="swiper-slide">Slide 2</div>
       <div class="swiper-slide">Slide 3</div>
     </div>
     <div class="swiper-pagination"></div>
  </div>
</div>
```

#### `asyncAlpineComponents()`
Asynchronous Alpine components can be loaded anywhere in your markup. Create Alpine components in `framework/components/alpine`. See `components/alpine/message.js` for an example.

In `start.js`:

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

For instructions see [Async Alpine](https://github.com/Accudio/async-alpine).

#### `vueComponents()`
Vue components are loaded on demand in content swapped by htmx, such as `<main>`. Create components in `framework/components/vue`, and attach to elements with `data-vue-component="MyComponent"`. Determine the loading strategy for the component with `data-load=""`, and pass props via additional `data-` attributes.

No initialisation step is required for Vue components, they are loaded and mounted automatically on demand as individual Vue application instances.

See `components/vue/LocationMap.js` for an example.

```html
<div 
  id="map-london" 
  data-vue-component="LocationMap" 
  data-load="visible" 
  data-latitude="51.509865" 
  data-longitude="-0.118092" 
  data-caption="A map of London">
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

#### Subscribe
Vanilla JS components and Vue components can subscribe to a `PubSubJS` topic; when the topic is published the component will be loaded.

Async Alpine components do not support `Subscribe`.

```html
<div id="my-thing-1" data-component="myThing" data-load="subscribe (video.button.clicked)"></div>
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

### Creating your own local components

Local component classes must extend `framework/baseComponent.js` and have `mount()` and `unmount()` methods. See `components/local/share.js` for an example. A component would typically map to one element and manipulate the markup within it. Use publish/subscribe topics to orchestrate multiple component instances.

#### `mount()`
Use this method to initialise your component.

#### `umount()`
Use this method to remove any references to elements in the DOM so that the browser can perform garbage collection and release memory.
Remove any event listeners and observers that you created. The framework automatically tracks event listeners added to elements and provides a convenience function `clearEventListeners()` that can clean things up for you.

```html
<div id="my-thing-1" data-component="myThing"></div>
```

`components/local/myThing.js`:

```js
import BaseComponent from '../../framework/baseComponent';

export default class MyThing extends BaseComponent {
    
    constructor(elm) {
        super(elm);
        this.mount();
    }

    mount() {
        // setup and mount your component instance
        let thing = document.querySelector(this.elm); // [data-component="thing"]
      
        // do stuff with the thing!
    }

    unmount() {
        if (this.mounted) {
          // unset references to DOM nodes
          // and remove any event listeners or observers you created
        }
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
