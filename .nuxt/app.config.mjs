
import { updateAppConfig } from '#app'
import { defuFn } from '/Users/gupi/Documents/gillgupi12/lalalemon/node_modules/defu/dist/defu.mjs'

const inlineConfig = {
  "nuxt": {
    "buildId": "fb9d30ec-cb71-442c-9fe9-5fd1a9d5a4be"
  }
}

// Vite - webpack is handled directly in #app/config
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    updateAppConfig(newModule.default)
  })
}

import cfg0 from "/Users/gupi/Documents/gillgupi12/lalalemon/app.config.ts"

export default /* #__PURE__ */ defuFn(cfg0, inlineConfig)
