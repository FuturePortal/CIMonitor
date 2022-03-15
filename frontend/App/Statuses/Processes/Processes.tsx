import { Process as ProcessType } from 'types/status';
import { Process, Stages, Stage, Step } from './Processes.style';

type Props = {
    processes: ProcessType[];
};

const Processes = ({ processes }: Props) => (
    <>
        {processes && processes.map((process) => (
            <Process key={process.id} state={process.state}>
                {process.title}
                <Stages>
                    {process.stages.map((stage) => (
                        <Stage key={stage.id} state={stage.state}>
                            <h3>{stage.title}</h3>
                            {stage.steps.map((step) => (
                                <Step key={step.id} state={step.state}>{step.title}</Step>
                            ))}
                        </Stage>
                    ))}
                </Stages>
            </Process>
        ))}
    </>
);

export default Processes;
