<script lang="ts" module>
    import { type Component } from 'svelte';

    export interface RenderComponentProps {
        type?: Component;
        html?: string;
        props?: object;
        children?: RenderComponentProps[];
    }
</script>

<script lang="ts">
    import Renderer from './Renderer.svelte';

    let component: RenderComponentProps = $props();
</script>

{#if component.type}
    {#if component.children}
        <component.type {...component.props}>
            {#each component.children as child}
                <Renderer {...child} />
            {/each}
        </component.type>
    {:else}
        <component.type {...component.props} />
    {/if}
{:else if component.html}
    {@html component.html}
{/if}
