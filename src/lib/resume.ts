import type { Component } from 'svelte';

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

export class AssetsResumeProvider implements ResumeProvider {
    async byId(id: string): Promise<Resume | null> {
        return import(`$lib/assets/content/${id}.json`)
            .then(
                (it) => it,
                (_) => import(`$lib/assets/content/${id}.yaml`)
            )
            .then(
                (it) => it,
                (_) => import(`$lib/assets/content/${id}.yml`)
            )
            .then(
                (it) => it.default,
                (_) => null
            );
    }
}

export const resumeProvider = new AssetsResumeProvider();

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
