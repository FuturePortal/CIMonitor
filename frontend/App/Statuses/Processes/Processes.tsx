import { Process as ProcessType } from 'types/status';
import { Details, Process, Stages, StageWrapper, Stage, Step } from './Processes.style';

type Props = {
    processes: ProcessType[];
};

const Processes = ({ processes }: Props) => (
    <>
        {processes && processes.map((process) => (
            <Process key={process.id} state={process.state}>
                <Details>{process.title}</Details>
                <Stages>
                    {process.stages.map((stage) => (
                        <StageWrapper key={stage.id}>
                            <Stage state={stage.state}>{stage.title}</Stage>
                            {stage.steps.map((step) => (
                                <Step key={step.id} state={step.state}>{step.title}</Step>
                            ))}
                        </StageWrapper>
                    ))}
                </Stages>
            </Process>
        ))}
    </>
);

export default Processes;
