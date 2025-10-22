import type { Component } from 'svelte';
import { parse as yamlParse } from 'yaml';

import { PUBLIC_RESUME_STORAGE_BASE_URL, PUBLIC_RESUME_STORAGE_PREFIX } from '$env/static/public';

export type ResumeEntry = {
    type?: string;
    html?: string;
    props?: Record<string, any>;
    children?: ResumeEntry[];
};

export type ResumeEntryRenderable = Omit<ResumeEntry, 'type' | 'children'> & {
    type?: Component;
    children?: ResumeEntryRenderable[] | ResumeEntry[];
};

export type ResumeMeta = {
    title?: string;
};

export type Resume = {
    meta?: ResumeMeta;
    structure: ResumeEntry[];
};

export interface ResumeProvider {
    byId(id: string): Promise<Resume | null>;
}

enum AllowedResumeExtension {
    JSON = 'json',
    YAML = 'yaml',
    YML = 'yml'
}

export class FetchResumeProvider implements ResumeProvider {
    private readonly resumeStorageUrl: URL;

    constructor(resumeStorageUrl: URL) {
        this.resumeStorageUrl = resumeStorageUrl;
    }

    async byId(id: string): Promise<Resume | null> {
        return this.fetchByIdWithExtension(id, AllowedResumeExtension.YML)
            .catch(() => this.fetchByIdWithExtension(id, AllowedResumeExtension.YAML))
            .catch(() => this.fetchByIdWithExtension(id, AllowedResumeExtension.JSON))
            .catch(() => null);
    }

    private async fetchByIdWithExtension(id: string, ext: AllowedResumeExtension): Promise<Resume | null> {
        return fetch(`${this.resumeStorageUrl}/${id}.${ext}`)
            .then((it) => {
                if (!it.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return it;
            })
            .then((it) => it.text())
            .then((it) => yamlParse(it));
    }
}

const fetchResumeProvider = new FetchResumeProvider(
    new URL(PUBLIC_RESUME_STORAGE_PREFIX, PUBLIC_RESUME_STORAGE_BASE_URL)
);

export class AssetsResumeProvider implements ResumeProvider {
    async byId(id: string): Promise<Resume | null> {
        return this.fetchByIdWithExtension(id, AllowedResumeExtension.YML)
            .catch(() => this.fetchByIdWithExtension(id, AllowedResumeExtension.YAML))
            .catch(() => this.fetchByIdWithExtension(id, AllowedResumeExtension.JSON))
            .catch(() => null);
    }

    private async fetchByIdWithExtension(id: string, ext: AllowedResumeExtension): Promise<Resume | null> {
        return import(`$lib/assets/content/${id}.${ext}`).then((it) => it.default);
    }
}

const assetsResumeProvider = new AssetsResumeProvider();

export class CompositResumeProvider implements ResumeProvider {
    private readonly delegates: ResumeProvider[];

    constructor(delegates: ResumeProvider[]) {
        this.delegates = delegates;
    }

    async byId(id: string): Promise<Resume | null> {
        for (const delegate of this.delegates) {
            const resume = await delegate.byId(id);
            if (resume != null) {
                return resume;
            }
        }
        return null;
    }
}

export const resumeProvider = new CompositResumeProvider([fetchResumeProvider, assetsResumeProvider]);

const componentPromise = async (name: string) => {
    return import(`$lib/components/${name}.svelte`);
};

export const componentTypeParser = () => {
    const loadedComponents: { [key: string]: Component } = {};

    const transformToResumeEntryRenderable = async (entry: ResumeEntry): Promise<ResumeEntryRenderable> => {
        if (entry.type != null) {
            if (typeof entry.type === 'string' && !(entry.type in loadedComponents)) {
                loadedComponents[entry.type] = (await componentPromise(entry.type)).default as Component;
            }
            let entryRndr: ResumeEntryRenderable = { ...entry, type: loadedComponents[entry.type as string] };
            if (entryRndr.children != null && entryRndr.children?.length != 0) {
                const childEntryRndr = await Promise.all(
                    entryRndr.children.map((it) => transformToResumeEntryRenderable(it as ResumeEntry))
                );
                entryRndr = { ...entryRndr, children: childEntryRndr };
            }
            return entryRndr;
        }
        return entry as ResumeEntryRenderable;
    };

    return transformToResumeEntryRenderable;
};
