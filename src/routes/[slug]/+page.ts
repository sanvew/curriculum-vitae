import type { EntryGenerator, PageLoad } from './$types';

import type { Component } from 'svelte';
import { error } from '@sveltejs/kit';

import contentProvider from '$lib/content-provider.ts';

export const prerender = true;
export const entries: EntryGenerator = async () => {
    return (await contentProvider.entries()).map((it) => ({ slug: it }));
};

const componentPromise = async (name: string) => {
    return import(`$lib/components/${name}.svelte`);
};

const loadAndSetComponentsDeep = async (entry: object, loadedComponents: object) => {
    if (entry.type != null) {
        if (!(entry.type in loadedComponents) && typeof entry.type === 'string') {
            loadedComponents[entry.type] = (await componentPromise(entry.type)).default;
        }
        entry.type = loadedComponents[entry.type];
        if (entry.children != null) {
            await loadAndSetComponentsDeep(entry.children, loadedComponents);
        }
    }
};

export const load: PageLoad = async ({ params }) => {
    let jsonContent = [];
    try {
        jsonContent = await contentProvider.byId(params.slug);
    } catch (err) {
        error(404, 'Not found');
    }
    const loadedComponents = {};
    await Promise.all(
        jsonContent.map(async (it) => await loadAndSetComponentsDeep(it, loadedComponents))
    );

    return {
        content: jsonContent
    };
};
