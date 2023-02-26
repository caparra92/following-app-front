module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleNameMapper: {
    "axios": "axios/dist/node/axios.cjs"
  },
  transformIgnorePatterns: ['/node_modules/(?!@ionic/vue|@ionic/vue-router|@ionic/core|@stencil/core|ionicons)']
}
