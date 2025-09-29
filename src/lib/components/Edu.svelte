<script lang="ts" module>
    export interface EduProps {
        title: string;
        titleLink?: string | URL;
        subTitle?: string;
        subTitleLink?: string | URL;
        startDate?: string | Date;
        endDate?: string | Date;
        dateFormat?: string;
        note?: string;
    }
</script>

<script lang="ts">
    import { DateFormatType, formatDate, dateParse } from '$lib/dates';

    let { title, titleLink, subTitle, subTitleLink, startDate, endDate, dateFormat, note }: EduProps = $props();

    const dateFmt = dateFormat != null ? DateFormatType[dateFormat as keyof typeof DateFormatType] : null;
    const parsedDateFmt = dateFmt != null ? dateFmt : DateFormatType.MONTH;
    const parsedStartDate = startDate != null ? dateParse(startDate) : null;
    const parsedEndDate = endDate != null ? dateParse(endDate) : null;
    const startDateFmt = parsedStartDate != null ? formatDate(parsedStartDate, parsedDateFmt) : null;
    const endDateFmt = parsedEndDate != null ? formatDate(parsedEndDate, parsedDateFmt) : null;
    const titleLinkFmt = titleLink instanceof URL ? titleLink.href : titleLink;
    const subTitleLinkFmt = subTitleLink instanceof URL ? subTitleLink.href : subTitleLink;
</script>

<div class="mb-4">
    <h3 class="headline-entry">
        {#if titleLink}
            <a class="link link-symbol" href={titleLinkFmt} target="_blank">{title}</a>
        {:else}
            {title}
        {/if}
    </h3>
    {#if subTitle && subTitleLink}
        <a class="link" href={subTitleLinkFmt} target="_blank">{subTitle}</a>
    {:else if subTitle}
        <p class="text-default">
            {subTitle}
        </p>
    {/if}
    {#if startDateFmt}
        <p class="text-light">
            {startDateFmt}
            {endDateFmt != null && `- ${endDateFmt}`}
        </p>
    {/if}
    {#if note}
        <p class="text-light">{note}</p>
    {/if}
</div>
