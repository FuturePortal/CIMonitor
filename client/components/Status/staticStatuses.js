import satelliteImage from './satellite.svg';

export const STATUS_CONNECTION_LOST = {
    key: 'not-connected',
    state: 'error',
    title: 'Not connected',
    subTitle: 'There is no connection with the server.',
    image: 'https://image.flaticon.com/icons/svg/497/497738.svg',
};

export const STATUS_NO_STATUSES = {
    key: 'no-statuses',
    state: 'info',
    title: 'No statuses',
    subTitle: 'Waiting for new statuses to be pushed to the server.',
    image: satelliteImage,
};
