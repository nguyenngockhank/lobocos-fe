# lobocos-fe-v2

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Library

https://www.antdv.com/components/layout/#components-layout-demo-side

https://pinia.vuejs.org/core-concepts/outside-component-usage.html

https://fullcalendar.io/docs/handlers

https://router.vuejs.org/guide/advanced/composition-api

## Vue 

### Emit from script

```ts
const emit = defineEmits(['input'])

// usage
emit('input', value)
```

## Links

```vue
<router-link :to="'/orders/' + value">
    <a-tag color="magenta">
        #{{ value }}
    </a-tag>
</router-link>
```

## Grid
- 24 columns

