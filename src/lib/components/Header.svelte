<script lang="ts" module>
    export interface HeaderProps {
        name: string;
        headline: string;
    }
</script>

<script lang="ts">
    let { name = 'Andrew Nemov', headline = 'Backend Engineer' }: HeaderProps = $props();
</script>

<div>
    <h1 class="headline-name">
        {name}
    </h1>
    <p class="text-light">
        {headline}
    </p>
    <hr class="my-4" />
</div>

<style>
    @reference "tailwindcss";

    .headline-name {
        @apply text-3xl font-semibold;
    }
</style>
