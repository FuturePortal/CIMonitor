export type Status = {
    key: string;
    title: string;
    subTitle?: string;
    state: 'info' | 'warning' | 'danger' | 'success';
    image: string;
};

export default Status;
