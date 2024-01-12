import { BoosterConductor, loadStrategies } from 'htmx-booster-pack';

export default class ConductorFactory extends BoosterConductor {

    constructor(extension='booster', conductors = []) {
        super(extension, conductors);
    }

    /**
     * Import a conductor and run its constructor
     * We'll use lazy loading for the chunk file
     *
     * @param {object}  entry
     */
    lazyload(entry) {
        let promises = loadStrategies(entry.strategy, entry.selector);
        Promise.all(promises).then(() => {
            import(`../components/local/${entry.conductor}.js`).then((lazyConductor) => {
                this.loaded[entry.conductor] = new lazyConductor.default(entry.selector);
                this.loaded[entry.conductor].mounted = true;
            });
        });
    }
}