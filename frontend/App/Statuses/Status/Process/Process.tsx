import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { Details, ProcessContainer, Stage, StageContainer, Stages, Step } from './Process.style';

import Icon from '/frontend/components/Icon';
import { isShowingCompleted } from '/frontend/store/settings/selectors';

import { Process as ProcessType, State, StepState } from '/types/status';

const getStateIcon = (state: StepState | State) => {
    const icons = {
        running: 'autorenew',
        success: 'done',
        failed: 'clear',
        error: 'clear',
        warning: 'warning_amber',
        'soft-failed': 'report_problem',
        pending: 'update',
        created: 'push_pin',
    };

    return icons[state] || 'info';
};

type Props = {
    process: ProcessType;
};

const Process = ({ process }: Props): ReactElement => {
    const showCompleted = useSelector(isShowingCompleted);

    return (
        <ProcessContainer key={process.id} state={process.state}>
            <Details>
                <Icon icon="notes" /> {process.title}
            </Details>
            {process.stages && (
                <Stages>
                    {process.stages.map((stage) => (
                        <StageContainer key={stage.id}>
                            <Stage state={stage.state}>
                                <Icon icon={getStateIcon(stage.state)} /> {stage.title}
                            </Stage>
                            {stage.steps &&
                                stage.steps.map((step) => {
                                    if (step.state === 'success' && !showCompleted) {
                                        return null;
                                    }

                                    return (
                                        <Step key={step.id} state={step.state}>
                                            <Icon icon={getStateIcon(step.state)} /> {step.title}
                                        </Step>
                                    );
                                })}
                        </StageContainer>
                    ))}
                </Stages>
            )}
        </ProcessContainer>
    );
};

export default Process;
