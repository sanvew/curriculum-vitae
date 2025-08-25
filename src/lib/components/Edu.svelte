<script lang="ts" module>
    export interface EduProps {
        title: string;
        titleLink?: string | URL;
        subTitle?: string;
        subTitleLink?: string | URL;
        dates: string | Date;
    }
</script>

<script lang="ts">
    import { dateFormatYearMonth } from '$lib/dates.ts';

    let { title, titleLink, subTitle, subTitleLink, dates }: EduProps = $props();

    const datesFmt = dates instanceof Date ? dateFormatYearMonth(dates) : dates;
</script>

<div class="mb-4">
    <h3 class="headline-entry">
        {#if titleLink}
            <a class="link link-symbol" href={titleLink} target="_blank">{title}</a>
        {:else}
            {title}
        {/if}
    </h3>
    {#if subTitle && subTitleLink}
        <a href={subTitleLink} target="_blank" class="link">{subTitle}</a>
    {:else if subTitle}
        <p class="text-default">
            {subTitle}
        </p>
    {/if}
    <p class="text-light">
        {datesFmt}
    </p>
</div>
