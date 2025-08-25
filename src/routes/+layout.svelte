<script lang="ts">
    import '../app.css';
    import MainContainer from '$lib/components/MainContainer.svelte';

    let { children } = $props();
</script>

<MainContainer>
    {@render children()}
</MainContainer>
