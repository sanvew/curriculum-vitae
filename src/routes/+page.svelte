<script lang="ts" module>
    import { redirect } from '@sveltejs/kit';

    export const load: PageLoad = ({ params }) => {
        redirect(301, '/index');
    };
</script>

<script lang="ts">
    import type { PageProps } from './$types';

    import Renderer from '$lib/components/Renderer.svelte';

    let { data }: PageProps = $props();
</script>

{#each data.content as item}
    <Renderer {...item} />
{/each}
