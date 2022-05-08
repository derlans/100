module.exports = {
  extends: ['@antfu'],
  rules: {
    'vue/component-tags-order': ['error', {
      order: [['script', 'template'], 'style'],
    }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/prefer-ts-expect-error': 'off',
    'no-new-func': 'off',
  },
}
