<script lang="ts" module>
    export interface Contact {
        title?: string;
        value: string;
        valueLink?: string | URL;
    }

    export interface ContactProps {
        contacts: Contact[];
    }
</script>

<script lang="ts">
    let { contacts }: ContactProps = $props();
</script>

<ul class="list-contact">
    {#each contacts as contact}
        <li>
            {#if contact.title}{contact.title}
            {/if}
            {#if contact.valueLink}
                <a class="link" href={contact.valueLink} target="_blank">{contact.value}</a>
            {:else}
                {contact.value}
            {/if}
        </li>
    {/each}
</ul>

<style>
    @reference "./../../app.css";

    .list-contact {
        @apply list-inside list-disc text-gray-700;
    }
</style>
