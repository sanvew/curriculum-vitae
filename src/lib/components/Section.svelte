<script lang="ts" module>
    import { type Snippet } from 'svelte';

    export interface SectionProps {
        title: string;
        children?: Snippet;
    }
</script>

<script lang="ts">
    let { title = 'Section title', children }: SectionProps = $props();
</script>

<div>
    <h2 class="headline-section">
        {title}
    </h2>
    {#if children}
        {@render children()}
    {:else}
        <p>no content</p>
    {/if}
</div>
