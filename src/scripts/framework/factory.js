import { BoosterFactory, loadStrategies } from 'htmx-booster-pack';
import { createApp } from 'vue';

export default class Factory extends BoosterFactory {

    constructor(extension='booster') {
        super(extension);
    }

  /**
   * Import a component on demand, optionally using a loading strategy
   *
   * @param el
   */
    lazyload(el) {
        const type = el.dataset.type ?? 'local'; // default
        const component = el.dataset[this.extension];
        const strategy = el.dataset.load ?? null;
        const selector = el.getAttribute('id')
        ? '#' + el.getAttribute('id')
        : null;
        if (selector === null) {
            return console.warn(`Booster Pack: an instance of ${component} doesn't have an ID attribute. Skipping.`)
        }
        const promises = loadStrategies(strategy, selector);

        // lazy load the component
        if (type === 'vue') {
            this.importVue(el, component, selector, promises);
        } else {
            this.importLocal(component, selector, promises);
        }
    }

    /**
    * Import a local component on demand, optionally using a loading strategy
    *
    * @param component
    * @param selector
    * @param promises
    */
    importLocal(component, selector, promises) {
        Promise.all(promises).then(() => {
            // 1. Import path must be relative
            // 2. Do not use @alias's
            // 3. Must have a hardcoded extension
            import(`../components/local/${component}.js`).then(
                (lazyComponent) => {
                    let instance = new lazyComponent.default(selector);
                    instance.mounted = true;
                    this.loaded.push({
                        name: component,
                        selector: selector,
                        instance: instance,
                    });
                }
            );
        });
    }

    /**
    * Import a Vue component on demand, optionally using a loading strategy
    *
    * @param el
    * @param component
    * @param selector
    * @param promises
    */
    importVue(el, component, selector, promises) {

        // props
        let options = {};
        let optionsFromAttribute = el.getAttribute('data-options');
        if (optionsFromAttribute) {
          options = JSON.parse(optionsFromAttribute);
        }

        Promise.all(promises).then(() => {
        // Mount a Vue instance, passing options from root element
        import(`../components/vue/${component}.vue`).then(
            (vueComponent) => {
                let app = createApp(vueComponent.default, { ...options });
                app.config.warnHandler = () => null;
                app.mount(el);
                this.loaded.push({
                    name:component,
                    selector: selector,
                    instance: app
                });
            });
        });
    }
}