/*
 * Htmx init
 *
 * Initialise htmx
 */

export default class HtmxInit {
  constructor() {
    // log all events for debugging
    //htmx.logger = function(elt, event, data) {
    //    if(console) {
    //        console.log("INFO:", event, elt, data);
    //    }
    //}
    //htmx.logAll();

    // lock down htmx
    htmx.config.selfRequestsOnly = true;
    htmx.config.allowScriptTags = false;

    // handle response error
    htmx.on('htmx:responseError', (event) => {
      // hard redirect to final path, to let Craft handle it
      let path = event.detail.pathInfo.finalRequestPath ?? event.detail.pathInfo.finalPath ?? null;
      if (path) {
        try {
          let redirectUrl = new URL(path);
          if (redirectUrl) {
            if (redirectUrl.origin === window.location.origin) {
              window.location.href = path;
            }
          }
        } catch (e) {
          // ignore
        }
      }
    });

    // handle swap error
    htmx.on('htmx:swapError', (event) => {
      // hard redirect to final path, to let Craft handle it
      let path = event.detail.pathInfo.finalRequestPath ?? event.detail.pathInfo.finalPath ?? null;
      if (path) {
        try {
          let redirectUrl = new URL(path);
          if (redirectUrl) {
            if (redirectUrl.origin === window.location.origin) {
              window.location.href = path;
            }
          }
        } catch (e) {
          // ignore
        }
      }
    });

    // This extension adds the X-Requested-With header to requests with the value "XMLHttpRequest".
    htmx.defineExtension('ajax-header', {
      onEvent: function (name, evt) {
        if (name === 'htmx:configRequest') {
          evt.detail.headers['X-Requested-With'] = 'XMLHttpRequest';
        }
      },
    });
  }
}
