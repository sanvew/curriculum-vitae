<script lang="ts">
    import { tick } from 'svelte';

    let { children } = $props();

    let hideForPrint: boolean = $state(false);

    const printPdf = () => {
        hideForPrint = true;
        tick().then(() => {
            window.print();
        });
    };

    const afterPrintPdf = () => {
        hideForPrint = false;
    };
</script>

<svelte:window on:afterprint={afterPrintPdf} />
{#if hideForPrint == false}
    <div class="container mx-auto p-4">
        <div class="rounded-lg bg-white p-6 shadow-lg/20">
            {@render children()}
        </div>
    </div>
    <div class="flex justify-center print:hidden">
        <button class="button-print" onclick={printPdf}>Get PDF</button>
    </div>
{:else}
    {@render children()}
{/if}

<style>
    @reference "tailwindcss";

    .button-print {
        @apply rounded-sm bg-blue-500 p-2;
    }
</style>
