import { Process as ProcessType } from 'types/status';
import { Process, Stage, Step } from './Processes.style';

type Props = {
    processes: ProcessType[];
};

const Processes = ({ processes }: Props) => (
    <>
        {processes.map((process) => (
            <Process state={process.state}>
                <h2>{process.title}</h2>
                {process.stages.map((stage) => (
                    <Stage state={stage.state}>
                        <h3>{stage.title}</h3>
                        {stage.steps.map((step) => (
                            <Step state={step.state}>{step.title}</Step>
                        ))}
                    </Stage>
                ))}
            </Process>
        ))}
    </>
);

export default Processes;
