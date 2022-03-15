import { ReactElement } from 'react';

type Props = {
    icon: string;
};

const Icon = ({ icon }: Props): ReactElement => <span className="icon">{icon}</span>;

export default Icon;
