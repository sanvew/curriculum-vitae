import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import type { RenderComponent } from '$lib/components/Renderer.svelte';

const componentPromise = (name: string) => {
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

const contentById = async (id: string): object => {
    return (await import(`$lib/assets/content/${id}.json`)).default;
};

export const load: PageLoad = async ({ params }) => {
    let jsonContent;
    try {
        jsonContent = await contentById(params.cv);
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
