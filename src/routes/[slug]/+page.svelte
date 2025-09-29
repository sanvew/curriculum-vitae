<script lang="ts">
    import type { PageProps } from './$types';

    import CvContainer from '$lib/components/CvContainer.svelte';
    import Renderer from '$lib/components/Renderer.svelte';

    let { data }: PageProps = $props();
</script>

<svelte:head>
    {#if data.resume.meta?.title}
        <title>{data.resume.meta?.title}</title>
    {/if}
</svelte:head>
<CvContainer>
    {#each data.resume.structure as item}
        <Renderer {...item} />
    {/each}
</CvContainer>
