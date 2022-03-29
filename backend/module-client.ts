import ModuleManager from 'backend/module/manager';
import SocketClient from 'backend/socket/client';
import StorageManager from 'backend/storage/manager';

import 'dotenv/config';

(async () => {
    console.log('[module-client] Starting...');

    await StorageManager.init();

    const { events, triggers } = await StorageManager.loadModules();

    const hasModules = ModuleManager.init(triggers, events);

    if (!hasModules) {
        console.log('[module-client] Without modules, the module client has no purpose.');
        process.exit(1);
    }

    SocketClient.init();

    SocketClient.listen();
})();
