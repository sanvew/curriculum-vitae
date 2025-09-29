import type { PageLoad } from './$types';

import { error } from '@sveltejs/kit';

import { type Resume, resumeProvider, componentTypeParser } from '$lib/resume';

export const load: PageLoad = async ({ params }) => {
    const transfomComponentType = componentTypeParser();

    const fetchedResume: Resume | null = await resumeProvider.byId(params.slug);
    if (fetchedResume == null) {
        error(404, 'Not found');
    }

    const parsedResumeEntries = await Promise.all(
        fetchedResume.structure.map(async (it) => await transfomComponentType(it))
    );

    return {
        resume: { ...fetchedResume, structure: parsedResumeEntries }
    };
};
