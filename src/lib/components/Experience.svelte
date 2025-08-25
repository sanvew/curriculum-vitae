<script lang="ts" module>
    export interface ExperienceProps {
        positionTitle: string;
        company: string;
        companyLink?: string;
        description: string;
        skills?: string[];
        startDate: string | Date;
        endDate?: string | Date;
    }
</script>

<script lang="ts">
    import { dateParse, dateFormatYearMonth, dateDelta } from '$lib/dates.ts';

    let {
        positionTitle = 'Position',
        company = 'Company',
        companyLink = 'https://example.com',
        description = 'Position description',
        skills,
        startDate,
        endDate
    }: ExperienceProps = $props();

    const parsedStartDate = dateParse(startDate);
    const parsedEndDate = endDate != null ? dateParse(endDate) : null;
    const startDateFmt = dateFormatYearMonth(parsedStartDate);
    const endDateFmt = parsedEndDate != null ? dateFormatYearMonth(parsedEndDate) : null;
    const deltaFmt = dateDelta(parsedStartDate, parsedEndDate != null ? parsedEndDate : new Date());
    const skillsFmt = skills != null ? skills.join(', ') : null;
</script>

<div class="mb-4">
    <h3 class="headline-entry">
        {positionTitle},
        {#if companyLink}
            <a class="link link-symbol" href={companyLink} target="_blank">{company}</a>
        {:else}
            {company}
        {/if}
    </h3>
    <p class="text-default">
        {description}
    </p>
    {#if skillsFmt}
        <p class="text-light">
            <b>Skills:</b>
            {skillsFmt}
        </p>
    {/if}
    <p class="text-light">
        {startDateFmt}
        -
        {endDateFmt == null ? 'Present' : endDateFmt},
        {deltaFmt}
    </p>
</div>
