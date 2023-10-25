import { ReactElement } from 'react';

import { Details, Duration, Info, ProcessContainer, Stage, StageContainer, Stages, Step } from './Process.style';

import RunTime from '/frontend/App/Statuses/Status/RunTime';
import Icon from '/frontend/components/Icon';
import useSetting from '/frontend/hooks/useSetting';

import { Process as ProcessType, Stage as StageType, State, Step as StepType, StepState } from '/types/status';

const getStateIcon = (state: StepState, processState: State = 'warning') => {
	const icons = {
		running: 'autorenew',
		success: 'done',
		failed: 'clear',
		error: 'clear',
		warning: 'warning_amber',
		'soft-failed': 'report_problem',
		pending: processState === 'warning' ? 'update' : 'skip_next',
		created: 'push_pin',
		skipped: 'skip_next',
		stopped: 'stop_circle',
		timeout: 'alarm',
	};

	return icons[state] || 'info';
};

type Props = {
	process: ProcessType;
};

const Process = ({ process }: Props): ReactElement => {
	const showCompleted = useSetting('showCompleted');

	const renderStep = (step: StepType): ReactElement | null => {
		if (['success', 'skipped'].includes(step.state) && !showCompleted) {
			return null;
		}

		return (
			<Step key={step.id} state={step.state} processState={process.state}>
				<Info>
					<Icon icon={getStateIcon(step.state)} /> {step.title}
				</Info>
				<Duration>
					<RunTime duration={step.duration} noWrap />
				</Duration>
			</Step>
		);
	};

	const renderStage = (stage: StageType): ReactElement => (
		<StageContainer key={stage.id}>
			<Stage state={stage.state} processState={process.state}>
				<Info>
					<Icon icon={getStateIcon(stage.state, process.state)} /> {stage.title}
				</Info>
			</Stage>
			{!!stage.steps && stage.steps.map((step) => renderStep(step))}
		</StageContainer>
	);

	return (
		<ProcessContainer key={process.id} state={process.state}>
			<Details>
				<Icon icon="notes" /> {process.title}
			</Details>
			{!!process.stages && process.stages.length > 0 && (
				<Stages>{process.stages.map((stage) => renderStage(stage))}</Stages>
			)}
		</ProcessContainer>
	);
};

export default Process;
