/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
    // @ts-expect-error
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
    },
});
