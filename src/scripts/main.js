/**
 * Main script bundle used throughout the website
 *
 * @author: Mark Croxton, mcroxton@hallmark-design.co.uk
 * @copyright: Hallmark Design
 */

/* import styles */
import '../styles/main.scss'

/* import framework */
import "./framework/geteventlisteners";
import HtmxInit from './framework/htmxInit';
import Start from './framework/start';

// .no-js to .js
let html = document.getElementsByTagName("html")[0];
html.className = html.className.replace("no-js", "js");

// Initialise htmx
if (typeof htmx != "undefined") {
    new HtmxInit();
}

// Bootstrap our js framework
new Start();

// Accept HMR as per: https://vitejs.dev/guide/api-hmr.html
if (import.meta.hot) {
    import.meta.hot.accept(() => {
        console.log("HMR")
    });
}
