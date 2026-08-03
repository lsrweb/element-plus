/// <reference types="vite/client" />

declare module 'virtual:component-changelog-data' {
  const data: import('./utils/changelog-parser').ComponentChangelogs
  export default data
}

declare module 'virtual:group-icons.css' {}

declare module '*.css' {}
