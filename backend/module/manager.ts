import StatusEvents from 'backend/status/events';
import { ModuleEvent, ModuleTrigger } from 'types/module';
import Status from 'types/status';

import GpioModule from './type/gpio';
import HttpModule from './type/http';

class ModuleManager {
    triggers: ModuleTrigger[] = [];

    events: ModuleEvent[] = [];

    modules = {
        gpio: GpioModule,
        http: HttpModule,
    };

    init(triggers: ModuleTrigger[], events: ModuleEvent[]): boolean {
        console.log('[module/manager] Init.');

        this.triggers = triggers;
        this.events = events;

        if (triggers.length === 0) {
            console.log('[module/manager] No triggers defined in the module config, modules disabled.');
            return false;
        }

        if (events.length === 0) {
            console.log('[module/manager] No events defined in the module config, modules disabled.');
            return false;
        }

        console.log('[module/manager] Watching status events to trigger modules...');
        StatusEvents.on(StatusEvents.event.newStatus, (status) => this.onStatusUpdate(status));
        StatusEvents.on(StatusEvents.event.patchStatus, (status) => this.onStatusUpdate(status));

        return true;
    }

    onStatusUpdate(status: Status) {
        status;

        // TODO: check if a trigger matches the status

        // TODO: fire module for the matched event
    }
}

export default new ModuleManager();
