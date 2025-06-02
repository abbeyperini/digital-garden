# State Management in Front-end Web Development: State 101

![a brain next to "State Management in Front-end Web Development"](https://images.abbeyperini.com/state/state-banner.png)

Learn where to keep your variables to improve your app design, performance, and readability.

## What is State?

In programming, state refers to all the variables within a program. Variables represent data held in memory.

Global state refers to variables that are globally scoped. They can be accessed from anywhere within the entire app.

Local state refers to variables that are locally scoped. They can only be accessed within the file, component, or function where they are declared.

Derived state refers to variables that are calculated based on other variables.

```JavaScript
const person = { firstName: "Paul", lastName: "Posey", id: 12 };
// displayName is derived state
const displayName = person.lastName + ", " + person.firstName;
```

When people talk about state in a front-end web app, they are typically referring to reactive state. Reactive state tracks updates and triggers effects when they happen. Reactive state management tools exist in all frameworks. Within them, a state variable is essentially a set of getters and setters. When you access the value, you're getting it. When you reassign the value, you're setting it. Tools that create reactive state will also have methods for instantiating the state variable, updating it, accessing its previous value, and more.

## Local State Management

When you are creating a local state variable, as yourself:

- Does this variable need to be updated repeatedly?
- Do updates to this variable need to trigger updates somewhere else?

If not, a regular `let` or `const` should suffice. Reactive state management tools are more powerful and will consume more resources. Why maintain a Ferrari when a bicycle will suit your needs?

If you do need to update the variable and trigger effects based on updates, you'll want to create reactive state.

- React: [useState](https://react.dev/learn/state-a-components-memory)
- Vue: [ref](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
- Angular: [signals](https://angular.dev/essentials/signals)

In all three frameworks, you pass an initial value to a method. When you change the value, effects will be triggered. Anything that uses these reactive state variables will be notified when there's an update. So if you're displaying the value of a reactive state variable, the new value will be displayed.

Frameworks also provide ways to trigger complex effects after an update. For example, a user clicks the "next page" button, so the value of your `pageNumber` state variable is incremented, and you need to make an API call to get the next page of results. You'd use [useReducer](https://react.dev/learn/extracting-state-logic-into-a-reducer) or [useEffect](https://react.dev/reference/react/useEffect) in React, [watchers](https://vuejs.org/guide/essentials/watchers.html) in Vue, and [effects](https://angular.dev/guide/signals#effects) in Angular.

In Angular, you can create reactive state using `signal`.

```JavaScript
const person = signal({ firstName: "Paul", lastName: "Posey", id: 12 });
```

If you just want to assign a new value, you can use `set()` to update your signal. If you want to compute a new value based on the old value, you use `update()`.

In Vue, you can create reactive state using `ref`.

```JavaScript
const person = ref({ firstName: "Paul", lastName: "Posey", id: 12 });
```

A ref maintains a reference to the original value and creates a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). You access and reassign the value within the Proxy using `.value`.

```JavaScript
if (person.value.firstName === "Paul") {
  person.value = { firstName: "Pauline", lastName: "Person", id: 14};
}
```

In React, you create a state value and an update function using the `useState` hook. (A hook is a function that let you “hook into” React features within a functional component.)

```JavaScript
const [person, setPerson] = useState({ firstName: "Paul", lastName: "Posey", id: 12 });
```

## Derived State Management

- React: `const`
- Vue: [computed](https://vuejs.org/guide/essentials/computed.html)
- Angular: [computed signals](https://angular.dev/guide/signals#computed-signals)

When possible, keep derived state in the least powerful state tool.

In React, it is more performative to declare derived state with `const`. An update to a reactive state variable will trigger a component re-render. If you update one variable declared with `useState` and trigger an update to another variable declared with `useState`, the component will re-render twice. If you just use `const`, the value will re-compute during the first re-render anyway.

```JavaScript
// Triggers a second re-render
const [person, setPerson] = useState({ firstName: "Paul", lastName: "Posey", id: 12 });
const [displayName, setDisplayName] = useState(() => person.firstName + " " + person.lastName);

// Doesn't trigger a second re-render
const [person, setPerson] = useState({ firstName: "Paul", lastName: "Posey", id: 12 });
const displayName = person.firstName + " " + person.lastName;
```

In Vue and Angular, this is when you'd use `computed()`.

```JavaScript
const displayName = computed(() => {
  return person.value.lastName + ", " + person.value.firstName;
});
```

We can think of the function passed to `computed()` as an effect. Vue and Angular keep track of which reactive variables trigger which effects. Because the reactive variable `person` is used in the function passed to `computed()`, the function is registered as an effect to be triggered by an update to `person`. Put simply, whenever `person` is updated, `displayName` will update.

## Dependency Injection

- React: [Context](https://react.dev/learn/scaling-up-with-reducer-and-context)
- Vue: [Provide/Inject](https://vuejs.org/guide/components/provide-inject)
- Angular: [Dependency Injection](https://angular.dev/guide/di)

The more complex your application gets, the more [prop-drilling](https://www.freecodecamp.org/news/prop-drilling-in-react-explained-with-examples/) becomes a problem. In a small application, it's fine to pass state down to child or even grandchild components. As a rule of thumb, if you have to pass state as a prop to a great-grandchild component, it's time to re-evaluate the design. It's common to run into this problem when multiple components need to use the same data from an API call.

![A person labelled as a React Developer sweating and choosing between two buttons. One is labeled "Pass props through 10 nested components" and the other is labeled "use redux"](https://images.abbeyperini.com/state/button.jpeg)

Before you reach for global state, consider an in-between solution - dependency injection. It's still local state, but instead of using props, parent components provide the state, and their children can consume it. That's why "dependency injection" and "provider/consumer" are used interchangeably.

This pattern isn't just for reactive state. If you have derived state or a complex calculation, you can use dependency injection as a type of [memoization](https://en.wikipedia.org/wiki/Memoization). You only have to call an expensive function once and then you can inject the result.

In Vue, a component uses the provide method to make a key value pair. Then, any child component can use the inject method to access that value.

```JavaScript
// Parent component
const isLoggedIn = ref(false);
provide("key", isLoggedIn);
```

```JavaScript
// Child component
const isLoggedIn = inject("key");
if (isLoggedIn) showData();
```

You can inject update functions into consumer components. To avoid unintended side effects, updates should stay in the provider component.

Angular also has an inject method for dependency injection. It provides multiple ways to create a provider. A common pattern is creating a class [service](https://angular.dev/tutorials/first-app/09-services), but you can also use [values like a string, boolean, or Date](https://angular.dev/guide/di/dependency-injection-providers). If you need to trigger updates from a consumer, your service class can define getters and setters.

Dependency injection in React involves four hooks - `useReducer`, `createContext`, `createContextDispatch`, and `useContext`. Writing a context requires understanding concepts that are used in global state management libraries. I'll explain how to write one in the next part of this series.

Basically, `createContext` creates a component to hold your state and `createContextDispatch` creates a component with methods for updating your state.

To use a context you've written, you need to wrap your components in a provider tag.

```JSX
<PersonContext.Provider value={person}>
  <PersonDispatchContext.Provider value={dispatch}>
    <WelcomeBanner />
    <MainContent />
    <Footer />
  </TasksDispatchContext.Provider>
</TasksContext.Provider>
```

Consumer child components use the `useContext()` hook to access the state. Before the `useContext()` hook was added, you had to use a consumer tag like `<PersonDispatch.Consumer>`.

## Global State Management

- React: [Redux](https://redux.js.org/), [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)
- Vue: [Pinia](https://pinia.vuejs.org/)
- Angular: [ngRx](https://ngrx.io/)

What if you need to consume the same data and trigger the same API call to update that data in two unrelated components? It's common to run into this problem with auth (e.g. checking if the user has logged in). Global state is for variables that are used and updated in multiple unrelated files.

Technically, you could make the argument that putting variables and update functions in your main file and using prop-drilling is global state management.

![Smart guy meme - a black guy tapping the side of his head and smiling. Captioned "you don't ever have to pass parameters if every variable is a global variable"](https://images.abbeyperini.com/state/global.jpg)

Typically, global state management refers to a library that makes your data available without the parent/child relationship required to prop-drill or use dependency injection. Like with derived state, you should only use a global state management library when it's worth the performance trade-off.

A global state management library typically creates a store. This pattern is so ubiquitous that sometimes global state management libraries refer to themselves as "a store." You store your state in a store. A store can maintain complex data structures. A store provides a standard way to make changes to your global state, making state changes predictable.

There are a couple common patterns for writing stores and triggering updates in global state management libraries. I'll cover them in the next two parts of this series (coming June or July 2025).

- State Management in Front-end Web Development: Actions, Dispatch, and Reducers
- State Management in Front-end Web Development: Mutators
