<script lang="ts">
    let { children } = $props();
</script>

<div class="h-dvh overflow-y-scroll bg-gray-100 p-4 pt-0 font-sans">
    {@render children()}
</div>
