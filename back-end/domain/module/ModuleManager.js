const Config = require('../../config/ConfigLoaderFactory')
    .getLoader()
    .getConfig();

class ModuleManager {
    constructor() {
        this.modules = {};
    }

    initModulesFromConfig() {
        const configuredModules = Config.getModules();
        console.log('[ModuleManager] Setting up all configured modules...');
        configuredModules.forEach(module => this.initializeModule(module.name, module.config));
    }

    initializeModule(name, config) {
        console.log(`[ModuleManager] Initialize module ${name}...`);

        try {
            const Module = require(`./${name}.js`);

            this.modules[name] = new Module(config);
        } catch (error) {
            console.log(`[ModuleManager] Module ${name} has thrown an initialization error.`);
            console.log(error);
        }
    }

    /**
     * @param {Status} status
     */
    fireModuleEvent(moduleName, pushConfig, status) {
        if (!this.modules[moduleName]) {
            console.log(`[ModuleManager] Module with name ${moduleName} isn't initialized.`);
            return;
        }

        console.log(`[ModuleManager] Fire event for ${moduleName}!`);
        try {
            this.modules[moduleName].fireEvent(pushConfig, status);
        } catch (error) {
            console.log(`[ModuleManager] firing the event gave an error.`);
            console.log(error);
        }
    }
}

module.exports = new ModuleManager();
