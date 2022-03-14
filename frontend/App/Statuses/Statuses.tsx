import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { getStatuses } from '/frontend/store/status/selectors';
import { List, Status, Process, Stage, Step } from './Statuses.style';

const Statuses = (): ReactElement => {
    const statuses = useSelector(getStatuses);

    return (
        <List>
            {statuses.length === 0 && <h1>Nothing yet.</h1>}
            {statuses.map((status) => (
                <Status>
                    <h1>
                        {status.project}: {status.state}
                    </h1>
                    <p>
                        {status.branch} {status.tag}
                    </p>
                    {status.processes.map((process) => (
                        <Process>
                            <h2>
                                {process.title}: {process.state}
                            </h2>
                            {process.stages.map((stage) => (
                                <Stage>
                                    <h3>
                                        {stage.title}: {stage.state}
                                    </h3>
                                    {stage.steps.map((step) => (
                                        <Step>
                                            {step.title}: {step.state}
                                        </Step>
                                    ))}
                                </Stage>
                            ))}
                        </Process>
                    ))}
                </Status>
            ))}
        </List>
    );
};

export default Statuses;
