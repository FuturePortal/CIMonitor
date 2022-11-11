import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { Details, ProcessContainer, Stage, StageContainer, Stages, Step } from './Process.style';

import Icon from '/frontend/components/Icon';
import { isShowingCompleted } from '/frontend/store/settings/selectors';

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
	const showCompleted = useSelector(isShowingCompleted);

	const renderStep = (step: StepType): ReactElement | null => {
		if (['success', 'skipped'].includes(step.state) && !showCompleted) {
			return null;
		}

		return (
			<Step key={step.id} state={step.state} processState={process.state}>
				<Icon icon={getStateIcon(step.state)} /> {step.title}
			</Step>
		);
	};

	const renderStage = (stage: StageType): ReactElement => (
		<StageContainer key={stage.id}>
			<Stage state={stage.state} processState={process.state}>
				<Icon icon={getStateIcon(stage.state, process.state)} /> {stage.title}
			</Stage>
			{stage.steps && stage.steps.map((step) => renderStep(step))}
		</StageContainer>
	);

	return (
		<ProcessContainer key={process.id} state={process.state}>
			<Details>
				<Icon icon="notes" /> {process.title}
			</Details>
			{process.stages && process.stages.length > 0 && (
				<Stages>{process.stages.map((stage) => renderStage(stage))}</Stages>
			)}
		</ProcessContainer>
	);
};

export default Process;
