export type Contributor = {
    commits: number;
    username: string;
    profile: string;
    image: string;
    site?: string | null;
    location?: string | null;
    name?: string | null;
    company?: string | null;
};

export type Version = {
    server: string;
    latest: string | null;
};

export const socketEvent = {
    connect: 'connect',
    disconnect: 'disconnect',
    allStatuses: 'status-all',
    newStatus: 'status-new',
    patchStatus: 'status-patch',
    deleteStatus: 'status-delete',
    requestAllStatuses: 'status-request',
};
