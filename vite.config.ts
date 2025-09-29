import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import yaml from '@modyfi/vite-plugin-yaml';

export default defineConfig({
    plugins: [tailwindcss(), yaml(), sveltekit()]
});
