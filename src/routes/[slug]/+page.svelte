<script lang="ts">
    import type { PageProps } from './$types';

    import CvContainer from '$lib/components/CvContainer.svelte';
    import Renderer from '$lib/components/Renderer.svelte';

    let { data }: PageProps = $props();
</script>

<CvContainer>
    {#each data.content as item}
        <Renderer {...item} />
    {/each}
</CvContainer>
