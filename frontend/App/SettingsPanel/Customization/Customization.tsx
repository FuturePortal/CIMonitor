import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { About, Description, Setting, Title, Tool } from './Customization.style';
import { Content } from '/frontend/App/SettingsPanel/SettingsPanel.style';

import Icon from '/frontend/components/Icon';
import Modifier from '/frontend/components/Modifier';
import Toggle from '/frontend/components/Toggle';
import Sounds from '/frontend/sounds/Sounds';
import {
	setSizeModifier,
	toggleShowCompleted,
	toggleShowUserAvatars,
	toggleSound,
} from '/frontend/store/settings/actions';
import {
	getSizeModifier,
	isHidingUserAvatars,
	isShowingCompleted,
	isSoundEnabled,
} from '/frontend/store/settings/selectors';

const Customization = (): ReactElement => {
	const showCompleted = useSelector(isShowingCompleted);
	const sizeModifier = useSelector(getSizeModifier);
	const soundEnabled = useSelector(isSoundEnabled);
	const isHidingAvatars = useSelector(isHidingUserAvatars);
	const dispatch = useDispatch();

	const server = <Icon icon="warning" state="warning" title="Server setting" />;

	const handleSoundToggle = () => {
		if (!soundEnabled) {
			Sounds.playSuccess();
		}

		dispatch(toggleSound());
	};

	return (
		<Content>
			<p>
				You can customize your dashboard with the settings below. Note that all settings with a {server} are
				server settings, and are changed for everyone.
			</p>
			<Setting>
				<About>
					<Title>Show completed steps</Title>
					<Description>
						Do you want to see all successfully completed steps that your status went trough?
					</Description>
				</About>
				<Tool>
					<Toggle onToggle={() => dispatch(toggleShowCompleted())} enabled={showCompleted} />
				</Tool>
			</Setting>
			<Setting>
				<About>
					<Title>Enable sounds</Title>
					<Description>
						Do you want to hear a status sound when a status starts, finishes or fails?
					</Description>
				</About>
				<Tool>
					<Toggle onToggle={handleSoundToggle} enabled={soundEnabled} />
				</Tool>
			</Setting>
			<Setting>
				<About>
					<Title>Hide user avatars</Title>
					<Description>Do you want to see the user avatar images?</Description>
				</About>
				<Tool>
					<Toggle onToggle={() => dispatch(toggleShowUserAvatars())} enabled={isHidingAvatars} />
				</Tool>
			</Setting>
			<Setting>
				<About>
					<Title>Status size modifier</Title>
					<Description>
						When displaying statuses on a centralized monitor, you probably want to increase the size of the
						text. This allows you to make statuses easier to read from a distance.
					</Description>
				</About>
				<Tool>
					<Modifier
						value={sizeModifier}
						min={1}
						max={3}
						step={0.1}
						onChange={(modifier) => dispatch(setSizeModifier(modifier))}
					/>
				</Tool>
			</Setting>
			<Setting>
				<About>
					<Title>Remove statuses after</Title>
					<Description>
						{server} Automatically remove statuses older than x days. Not yet customisable in this version.
					</Description>
				</About>
				<Tool>7 days</Tool>
			</Setting>
		</Content>
	);
};

export default Customization;
