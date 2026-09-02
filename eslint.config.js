const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'commonjs',
            globals: {
                ...globals.node,
            },
        },
        rules: {
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        },
    },
    {
        files: ['__tests__/**/*.js'],
        languageOptions: {
            globals: {
                ...globals.jest,
            },
        },
    },
    {
        ignores: ['node_modules/', 'coverage/'],
    },
];
