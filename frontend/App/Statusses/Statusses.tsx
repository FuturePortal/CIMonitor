import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { getStatuses } from '/frontend/store/status/selectors';

const Statusses = (): ReactElement => {
    const status = useSelector(getStatuses);

    return <pre>{JSON.stringify(status, null, 4)}</pre>;
};

export default Statusses;
