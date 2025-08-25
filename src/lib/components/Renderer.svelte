<script lang="ts" module>
    import { type Component } from 'svelte';

    export interface RenderComponent {
        type?: Component;
        html?: string;
        props?: object;
        children?: RenderComponent;
    }
</script>

<script lang="ts">
    import Renderer from './Renderer.svelte';

    let component: RenderComponent = $props();
</script>

{#if component.type}
    {#if component.children}
        <component.type {...component.props}>
            <Renderer {...component.children} />
        </component.type>
    {:else}
        <component.type {...component.props} />
    {/if}
{:else if component.html}
    {@html component.html}
{/if}
