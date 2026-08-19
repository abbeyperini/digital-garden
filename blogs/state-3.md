## State Management in Front-end Web Development: Mutators

![a brain next to "State Management in Front-end Web Development"](https://images.abbeyperini.com/state/state-banner.png)

Libraries like [Valtio](https://valtio.dev/) and [Pinia](https://pinia.vuejs.org/) for Vue use a mutator pattern instead of the [actions, dispatch, and reducers pattern](https://dev.to/abbeyperini/state-management-in-front-end-web-development-actions-dispatch-and-reducers-gfo).

You can find the Valtio example in the [react-state GitHub repo](https://github.com/abbeyperini/state-react) and the Pinia example in the [vue-state GitHub repo](https://github.com/abbeyperini/state-vue). I'm using [React](https://react.dev/learn/installation) 19.1.0, [Valtio](https://valtio.dev/) x.x.x, [Vue](https://vuejs.org/guide/quick-start.html) 13.5.40 and [Pinia](https://pinia.vuejs.org/) 4.0.3.

1. [Mutability](#mutability)
2. [Mutators](#mutators)
3. [Pinia Example](#pinia-example)
4. [Valtio Example](#valtio-example)
5. [Conclusion](#conclusion)

## Mutability

Mutators mutate mutable state. You can change a part of your state without replacing the whole thing.

This article is a lot shorter than the last part of the series. Mutators seem much more intuitive to learn and more computationally efficient. (We don't have to replace the entire object.) So why not always use mutable state?

The mutator pattern allows you to have side effects in your state update methods. Mutable state is non-deterministic. It is easy to create transient bugs that are difficult to troubleshoot, like [race conditions](https://en.wikipedia.org/wiki/Race_condition). The result of your updates may vary wildly depending on the order of method calls, ([especially with parallel processing](https://henrikeichenhardt.blogspot.com/2013/06/why-shared-mutable-state-is-root-of-all.html?m=1).)

The actions, dispatch, and reducers pattern forces you to define and handle every possible permutation of your state in the store. Mutators allow you to handle possible permutations when and how you want, including outside of the store. This may lead to verbose code handling every possible permutation in your components.

This isn't to say that the mutator pattern inherently produces bugs. Where the actions, dispatch, and reducers pattern imposes strict rules, the mutator pattern gives you freedom. With freedom comes the opportunity to create more bugs.

## Mutators

In the first part of this series, I said that reactive state is essentially creating getters and setters. Another set of terms for the same pattern is accessors and mutators.

In other words, instead of creating the [observer pattern](https://en.wikipedia.org/wiki/Observer_pattern) with actions, dispatch, and reducers, mutators just use the observer pattern.

Typically, this uses a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) under the hood. A Proxy is a copy of a JavaScript object (the target) and a handler. The handler defines operations to be performed on the target like accessors and mutators.

The methods for accessing state are called getters or accessors. The methods for mutating state are typically called actions.

## Pinia Example

The first thing I need to do is initialize Pinia as a plugin.

```JavaScript
// main.ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.mount('#app');
```

I'll be using the Setup Store syntax, because I'm more familiar with [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html) syntax. Plus, I want the ability to use [watchers](https://vuejs.org/guide/essentials/watchers.html) and [composables](https://vuejs.org/guide/reusability/composables.html#composables) in my stores. The docs provide examples for the [Options Stores syntax](https://pinia.vuejs.org/core-concepts/#Option-Stores), if you're more comfortable with that.

Next, I create my store. Everything can go inside the store, include my update methods, called actions.

```JavaScript
// stores/shibas.ts
import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export const useShibaStore = defineStore('shibas', () => {
  // state
  const count = ref(0);
  const shibaList: Ref<string[]> = ref([]);
  const pending = ref(false);
  const errorMessage = ref("");

  // action
  async function increment(number: number) {
    errorMessage.value = "";
    count.value += number;
    pending.value = true;
    const response = await fetch(`https://dog.ceo/api/breed/shiba/images/random/${number}`);
    const shibas = await response.json();
    pending.value = false;
    if (shibas.status !== "success") {
      errorMessage.value = shibas.status!.toString();
      return;
    }
    return shibas.message.forEach((shiba: string) => shibaList.value.push(shiba))
  }

  return { count, shibaList, increment, pending, errorMessage }
})
```

Finally, I use my store in my component to display the shibas.

```JavaScript
// components/shibaCounter.vue
<script setup lang="ts">
import { useShibaStore } from '@/stores/shibas';
import { storeToRefs } from 'pinia';
const shibas = useShibaStore();
// Destructuring without storeToRefs will break reactivity
const { count, shibaList, pending, errorMessage } = storeToRefs(shibas)

function handleIncrement(e: SubmitEvent) {
  const form = e.target as HTMLFormElement;

  // Actions can be used as store properties
  shibas.increment(parseInt(form.number.value));
}

</script>
<template>
  <div>
    <span>Shibas: {{count}}</span>
    <form @submit.prevent="handleIncrement">
      <label for='number'>Number</label>
      <input id='number' type="number"/>
      <button type="submit">Add Shibas</button>
    </form>
    <p v-if="pending">Pending</p>
    <p v-if="errorMessage.length > 0">{{errorMessage}}</p>
    <img v-for="shiba in shibaList" :key="shiba" :src="shiba" alt="shiba" />
  </div>
</template>
<style lang="css">
img {
  width: 300px;
}
</style>
```

![Shibas: 0. After 5 is typed into an input and the add shibas button is clicked, it shows Shibas: 5. 5 images of shibas are added to the page. "Pending" shows while the API call is pending.](https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/gyf3dr95nb3oa63xzoz4.gif)

## Valtio Example

I'm using a Valtio example because [Zustand is kind of a hybrid](https://zustand.docs.pmnd.rs/learn/getting-started/comparison#valtio). Zustand's update syntax doesn't use actions, dispatch, and reducers. It's closer to accessors and mutators. However, it uses [Immer](https://immerjs.github.io/immer/) under the hood to keep state immutable. If your updates get too complex and Immer can't keep up, you have to handle the immutability yourself.

First, I instantiate my proxy (store).

```JavaScript
// ShibaCounter-Valtio.js
import { proxy, useSnapshot } from 'valtio'

export const shibaStore = proxy({
  count: 0,
  shibaList: [],
  pending: false,
  error: false,
});
```

Then, I create my component that accesses the proxy using `useSnapshot`. This creates a read-only subscriber that watches for changes. Note that unlike Redux, I don't have to rely on `useEffect` to trigger side effects.

```JavaScript
import { useSnapshot } from 'valtio';
import { shibaState, increment } from '../ShibaCounter-Valtio';

export function ShibaCounterValtio() {
  const shibaSnap = useSnapshot(shibaState);

  function handleIncrement(event) {
    event.preventDefault();
    increment(parseInt(event.target.number.value));
  }

  let shibaImages = shibaSnap.shibaList.map(shiba => {
    return (
      <img src={shiba} alt="shiba" key={shiba}>
      </img>
    );
  })

  return (
    <div>
      <span>Shibas: {shibaSnap.count}</span>
      <form onSubmit={(event) => handleIncrement(event)}>
        <label htmlFor='number'>Number</label>
        <input id='number' type="number"/>
        <button type="submit">Add Shibas</button>
      </form>
      { shibaSnap.pending && <p>Pending</p>}
      { shibaSnap.error && <p>{error}</p> }
      { shibaImages }
    </div>
  )
}
```

Finally, I create my increment action. Valtio is purposefully [unopinionated about organizing your actions](https://valtio.dev/docs/how-tos/how-to-organize-actions). I like keeping it all together, so I'm just going to export my actions from the same file as my state.

```JavaScript
// ShibaCounter-Valtio.js
export async function increment(number) {
    shibaState.error = "";
    shibaState.count += number;
    shibaState.pending = true;
    const response = await fetch(`https://dog.ceo/api/breed/shiba/images/random/${number}`);
    const shibas = await response.json();
    shibaState.pending = false;
    if (shibas.status !== "success") {
      shibaState.error = shibas.status.toString();
      return;
    }
    return shibas.message.forEach((shiba) => shibaState.shibaList.push(shiba))
  }
```

![Shibas: 0. After 5 is typed into an input and the add shibas button is clicked, it shows Shibas: 5. 5 images of shibas are added to the page. "Pending" shows while the API call is pending.](https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/gyf3dr95nb3oa63xzoz4.gif)

## Conclusion

The mutator pattern is much more intuitive than the actions, dispatch, and reducers pattern, but freedom makes it easier to create hard to troubleshoot bugs. It's hard not to view the actions, dispatch, and reducers pattern as the default - these examples even call their update methods actions. However, I've just touched the surface of both of these libraries. They're more flexible and much easier to get started with.
