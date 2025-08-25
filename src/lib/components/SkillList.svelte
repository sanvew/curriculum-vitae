<script lang="ts" module>
    export interface SkillsCategory {
        title?: string;
        skills: string[];
    }

    export interface SkillsListProps {
        skillsCategories: SkillsCategory[];
    }
</script>

<script lang="ts">
    let { skillsCategories }: SkillsListProps = $props();
</script>

<div>
    <ul class="list-skills">
        {#each skillsCategories as category}
            {#if category.title}
                <li>
                    <b>{category.title}:</b>
                    {category.skills.join(', ')}
                </li>
            {:else}
                <li>
                    {category.skills.join(', ')}
                </li>
            {/if}
        {/each}
    </ul>
</div>

<style>
    @reference "./../../app.css";

    .list-skills {
        @apply list-inside list-disc text-gray-700;
    }
</style>
