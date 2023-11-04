import StatusEvents from 'backend/status/events';
import { ModuleConfig, ModuleEvent, ModuleTrigger } from 'types/module';
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

		StatusEvents.on(StatusEvents.event.statusStateChange, (status) => this.checkStatusTriggers(status));
		StatusEvents.on(StatusEvents.event.newStatus, (status) => this.checkStatusTriggers(status));

		return true;
	}

	checkStatusTriggers(status: Status) {
		for (const trigger of this.triggers) {
			let triggerMatchesStatus = true;

			for (const [statusKey, statusValue] of Object.entries(trigger.status)) {
				if (!(statusKey in status && String(status[statusKey]) === String(statusValue))) {
					triggerMatchesStatus = false;
				}
			}

			if (triggerMatchesStatus) {
				console.log(`[module/manager] Trigger match! Firing event ${trigger.event}.`);
				this.fireEvent(trigger.event);
			}
		}
	}

	fireEvent(name: string) {
		console.log(`[module/manager] Firing event ${name}...`);

		const event = this.events.find((event) => event.name === name);

		if (!event) {
			console.log(`[module/manager] No event found with name "${name}".`);
		}

		event.modules.map((module: ModuleConfig) => {
			if (!(module.type in this.modules)) {
				console.log(`[module/manager] No module found with type "${module.type}".`);
				return;
			}

			this.modules[module.type].fire(module);
		});
	}
}

export default new ModuleManager();
