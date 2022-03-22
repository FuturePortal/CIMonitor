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
