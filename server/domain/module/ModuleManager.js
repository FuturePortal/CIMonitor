const Config = require('../../config/Config');

class ModuleManager {
    constructor() {
        console.log('[ModuleManager] Setting up all configured modules...');
        this.modules = {};

        this.initModulesFromConfig();
    }

    initModulesFromConfig() {
        const configuredModules = Config.getModules();

        console.log(configuredModules);

        configuredModules.forEach(module => this.initializeModule(module.name, module.config));
    }

    initializeModule(name, config) {
        console.log(`[ModuleManager] Initialize module ${name}...`);

        try {
            const Module = require(`./${name}.js`);
            this.modules[name] = new Module(config);
        } catch (error) {
            console.log(`[ModuleManager] Module ${name} doesn't exist!`);
            console.log(error);
        }
    }

    fireModuleEvent(moduleName, pushConfig) {
        if (!this.modules[moduleName]) {
            console.log(`[ModuleManager] Module with name ${moduleName} isn't initialized.`);
            return;
        }

        console.log(`[ModuleManager] Fire event for ${moduleName}!`);
        this.modules[moduleName].fireEvent(pushConfig);
    }
}

module.exports = new ModuleManager();
