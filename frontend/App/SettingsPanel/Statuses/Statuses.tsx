import { Fragment, ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { DeleteButton } from './Statuses.style';
import { Content } from '/frontend/App/SettingsPanel/SettingsPanel.style';

import { deleteAllStatuses, deleteStatus } from '/frontend/api/cimonitor';
import Alert from '/frontend/components/Alert';
import Icon from '/frontend/components/Icon';
import { getStatuses } from '/frontend/store/status/selectors';

const Statuses = (): ReactElement => {
    const statuses = useSelector(getStatuses);

    if (statuses.length === 0) {
        return (
            <Content>
                <Alert>
                    There are no statuses yet to show. Check the documentation on how to add your first status to the
                    dashboard via a webhook.
                </Alert>
            </Content>
        );
    }

    return (
        <Content>
            <DeleteButton onClick={() => deleteAllStatuses()}>
                <Icon icon="delete_forever" /> delete all statuses
            </DeleteButton>
            {statuses.map((status) => (
                <Fragment key={status.id}>
                    <hr />
                    <DeleteButton onClick={() => deleteStatus(status.id)}>
                        <Icon icon="delete_outline" /> {status.id}
                    </DeleteButton>
                </Fragment>
            ))}
        </Content>
    );
};

export default Statuses;
