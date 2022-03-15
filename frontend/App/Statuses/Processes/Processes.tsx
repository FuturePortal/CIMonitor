import { Process as ProcessType, State, StepState } from 'types/status';
import { Details, Process, Stages, StageWrapper, Stage, Step } from './Processes.style';
import Icon from '/frontend/components/Icon';

type Props = {
    processes: ProcessType[];
};

const getStateIcon = (state: StepState | State) => {
    const icons = {
        running: 'autorenew',
        success: 'done',
        failed: 'clear',
        error: 'clear',
        warning: 'report_problem',
        'soft-failed': 'report_problem',
        pending: 'update',
        created: 'push_pin',
    }

    return icons[state] || 'info';
}

const Processes = ({ processes }: Props) => (
    <>
        {processes && processes.map((process) => (
            <Process key={process.id} state={process.state}>
                <Details><Icon icon="info" /> {process.title}</Details>
                <Stages>
                    {process.stages.map((stage) => (
                        <StageWrapper key={stage.id}>
                            <Stage state={stage.state}><Icon icon={getStateIcon(stage.state)} /> {stage.title}</Stage>
                            {stage.steps.map((step) => (
                                <Step key={step.id} state={step.state}><Icon icon={getStateIcon(step.state)} /> {step.title}</Step>
                            ))}
                        </StageWrapper>
                    ))}
                </Stages>
            </Process>
        ))}
    </>
);

export default Processes;
