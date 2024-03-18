import ErrorSound from './error.mp3';
import InfoSound from './info.mp3';
import SuccessSound from './success.mp3';

class Sounds {
	info: HTMLAudioElement;
	error: HTMLAudioElement;
	success: HTMLAudioElement;

	constructor() {
		this.info = new Audio(InfoSound as string);
		this.error = new Audio(ErrorSound as string);
		this.success = new Audio(SuccessSound as string);
	}

	playInfo() {
		this.info.currentTime = 0;
		this.info.play();
	}

	playSuccess() {
		this.success.currentTime = 0;
		this.success.play();
	}

	playError() {
		this.error.currentTime = 0;
		this.error.play();
	}
}

export default new Sounds();
