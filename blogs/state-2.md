## State Management in Front-end Web Development: Actions, Dispatch, and Reducers

![a brain next to "State Management in Front-end Web Development"](https://images.abbeyperini.com/state/state-banner.png)

In [State Management in Front-end Web Development: State 101](/blog.html?blog=state-101), I covered when you need which state management tools and how they're implementations of the [observer pattern](https://en.wikipedia.org/wiki/Observer_pattern). This part of the series assumes that you need a state tool that uses the actions, dispatch, and reducers pattern. This pattern is useful when you need to consume and update the same state in multiple unrelated components. React [Context](https://react.dev/learn/scaling-up-with-reducer-and-context), and global state management libraries like [Redux](https://redux.js.org/) for React and [ngRx](https://ngrx.io/) for Angular use it.

React Context is a dependency injection solution, an alternative for [prop-drilling](https://www.freecodecamp.org/news/prop-drilling-in-react-explained-with-examples/). It's appropriate for simple state, like a boolean that represents whether the user is logged in. Conveniently, it's also the simplest, least abstracted example of the actions, dispatch, and reducers pattern.

Once your state grows more complicated, then it's time to reach for a global state management library. A common example used in the docs for these libraries is an array of songs in a playlist and multiple API calls to get, add and remove songs from the playlist.

This pattern has a lot of moving parts. I'll start by defining the parts, building towards a synchronous Context example. I'll rewrite that example in Redux and then add API calls. Finally, I'll recreate the same example with ngRX.

You can find the React examples in the [react-state GitHub repo](https://github.com/abbeyperini/state-react) and the Angular example in the [angular-state GitHub repo](https://github.com/abbeyperini/state-angular). I'm using [React](https://react.dev/learn/installation) 19.1.0, [Redux Toolkit](https://redux-toolkit.js.org/) 2.8.2, [Angular](https://angular.dev/) 19.2.14 and [ngRx](https://ngrx.io/docs) 19.2.1.

1. [Immutability](#immutability)
2. [Actions](#actions)
3. [Dispatch](#dispatch)
4. [Reducers](#reducers)
5. [A Synchronous Example with React Context](#a-synchronous-example-with-react-context)
6. [A Synchronous Example with Redux](#a-synchronous-example-with-redux)
7. [An Asynchronous Example with Redux](#an-asynchronous-example-with-redux)
8. [A Synchronous Example with ngRx](#a-synchronous-example-with-ngrx)
9. [An Asynchronous Example with ngRx](#an-asynchronous-example-with-ngrx)
10. [Conclusion](#conclusion)

### Immutability

The actions, dispatch, and reducers pattern treats state as immutable. A JavaScript object is mutable. If I change part of the object, I have mutated it.

```JavaScript
const person = { firstName: "Paul", lastName: "Posey", id: 12 };
// mutation
person.firstName = "Pauline";
```

To treat a JavaScript object as immutable, I replace the entire object with an updated copy.

```JavaScript
const person = { firstName: "Paul", lastName: "Posey", id: 12 };
// not a mutation
function updatePerson(key, value, person) {
  // make a copy
  const newPerson = person;
  // apply the update to the copy
  const newPerson[key] = value;
  // return the copy
  return newPerson;
}
person = updatePerson("firstName", "Pauline", person);
```

This doesn't just apply to objects. The [`forEach` array method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) will mutate your array. The [`filter()` array method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) will not mutate your array - it returns a copy.

A lot of times, you'll see immutable state updates written with the [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax).

```JavaScript
const tasks = [
  dishes,
  laundry,
  dusting
];
function addTask(tasks, newTask) {
  return [...tasks, newTask];
}

function updatePersonName(person, newName) {
  return {
    ...person,
    firstName: newName,
  }
}
```

The spread syntax creates a copy and adds all of the old stuff that isn't being updated at the same time.

Immutability sets the foundation for pure state update functions. Pure functions always return the same output when given the same inputs. Pure functions are free from side effects - they don't cause unintended consequences beyond the scope of the function. So state update functions should only update state, always update state the same way, and shouldn't affect things outside state.

### Actions

An action is an event that triggers changes to the state in the store. In the observer pattern, it'd be the notification to the observer that the subject has updated. You write the notifications that trigger effects now.

![A black man pointing at his eyes with two fingers saying "Look at me. I'm the captain now."](https://images.abbeyperini.com/state/captain.png)

I want to build an app that allows the user to click a button to pet a shiba. It'll also show the shiba's reaction to the number pets. I'm not getting the pets from an asynchronous API call, you can't take away pets, and I'll only be giving one pet at a time. So to start, I only need one action - "PET".

Actions are represented by strings. To prevent errors caused by misspelling a string, use a constant or [enum](https://www.typescriptlang.org/docs/handbook/enums.html) for action strings.

```JavaScript
export const actions = {
  pet: "PET",
}
```

In some cases, a string may provide all the information the store needs to update the state. Often, an action needs to contain additional information. When it does, the action string is the value of the `type` property in an object. Any additional information is passed as the value of the `payload` property.

If I wanted to add more than 1 pet at a time, my action would look like this:

```JavaScript
{
  type: actions.pet,
  payload: 5,
}
```

### Dispatch

In programming, dispatch is a synonym for send. In stores that use actions and reducers, you dispatch the action to the reducer. Thus, it is the name for the method that sends the action (notification) to the store.

```JavaScript
store.dispatch(actions.pet)
store.dispatch({
  type: actions.pet,
  payload: 5,
})
```

### Reducers

When the store receives the action, what does it do with it? The reducer handles all the logic for setting/updating state.

A reducer is a function that reduces a set of values to a single value. You may be familiar with JavaScript's [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce). A reducer in the context of a store is similar, but not recursive.

A store may have many possible actions. The reducer decides which action triggers which effect. In the observer pattern, it'd be the list registering effects to subjects. It can update state itself or call other functions.

```JavaScript
function reducer(action, payload) {
  if (action === actions.create) state = [...state, action.payload];
  if (action === actions.remove) handleRemove(payload);
  if (action === actions.update) handleUpdate(payload);
  if (action === actions.delete) handleDelete(payload);
}
```

That's a lot of `if`s! Which is why you'll often see reducers written with a switch statement.

```JavaScript
function reducer(action, payload) {
  switch (action) {
    case actions.add:
      state = [...state, action.payload];
      break;
    case actions.remove:
      handleRemove(payload);
      break;
    case actions.update:
      handleUpdate(payload);
      break;
    case actions.delete:
      handleDelete(payload);
      break;
    default:
      throw new Error("Not a valid action!")
      break;
}
```

The switch statement also provides an easy way to catch malformed actions.

The shiba petting app only has one action, so one `if` statement will do.

```JavaScript
function petsReducer(pets, action) {
  if (action === actions.pet) return ++pets;
}
```

Side note: I'm using a [pre-fixed increment operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Increment#:~:text=If%20used%20prefix%2C%20with%20operator%20before%20operand%20(for%20example%2C%20%2B%2Bx)%2C%20the%20increment%20operator%20increments%20and%20returns%20the%20value%20after%20incrementing.) here so that the value will be returned after it's been incremented. If I used `return pets++`, I'd get the value before it's been incremented.

### A Synchronous Example with React Context

[For dependency injection alone, you can use a context without writing state management logic.](https://react.dev/learn/passing-data-deeply-with-context) My shiba petting app will have two components - `Pets`, a counter with a button, and `Shiba`, which will display the shiba's reaction to the pets. Since the `Shiba` component doesn't update state, I can use dependency injection alone to pass the number of pets to it.

The `createContext` hook creates a context component that holds a value.

```JavaScript
// PetContext.jsx
import { createContext } from 'react';

export const PetContext = createContext(0);
```

Consumer components are children of the provider component. They use `useContext` to consume the state in the context.

```JavaScript
// PetContext.jsx
import { useContext } from 'react';

// reusable wrapper function for useContext with a unique name
export function usePets() {
  return useContext(PetContext);
}
```

Consumer components can be deeply nested and completely unrelated and still access the context in `<PetContext>`. This would work:

```JSX
  return (
    <PetContext value={1}>
      <div>
        <div>
          <div>
            <div>
              <Pets />
              <div>
                <div>
                  <Shiba />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PetProvider>
  );
```

```JavaScript
// Shiba.jsx
import { usePets } from '../PetContext.jsx';

export function Shiba() {
  const pets = usePets();

  // img tags and imports omitted for brevity
  if (pets < 1) return (sadShiba)
  if (pets >= 1 && pets <= 10) return (happyShiba)
  if (pets > 10) return (goodbyeShiba)
}
```

Now the number of pets is passed to consumer components using a context, but the value is essentially hardcoded. I want the user to be able to update the number of pets with a button click, but right now it can only access the number of pets.

```JavaScript
// Pets.jsx
import { usePets } from '../PetContext.jsx';

export function Pets() {
  const pets = usePets();
  return (
    <div>
      <p>{ pets }</p>
      <button onClick={() => ???} >Pet the Shiba</button>
    </div>
  )
}
```

The next step is writing the state management logic (getters and setters) with `useReducer`. It's like manually writing the observer pattern on top of a dependency injection solution.

`useReducer` returns two things - the current state and a dispatch method. A second context will hold the dispatch. `useReducer` takes two arguments - the initial value for the state and a reducer. Both contexts, the action, and the reducer can all go in the same file.

```JavaScript
// PetContext.jsx
import { createContext, useReducer, useContext } from 'react';

// create the contexts
export const PetContext = createContext(null);
export const PetDispatchContext = createContext(null);

export const actions = {
  pet: "PET",
}

// a wrapper component for both contexts
export function PetProvider({children}) {
// pass the reducer and initial value to useReducer and get state and dispatch from the call
  const [pets, dispatch] = useReducer(petsReducer, 0);

  // pass the state and dispatch to the providers
  return (
    <PetContext value={pets}>
      <PetDispatchContext value={dispatch}>
        { children }
      </PetDispatchContext>
    </PetContext>
  ) 
}

// instantiate the reducer
function petsReducer(pets, action) {
  if (action === actions.pet) return ++pets;
}

export function usePets() {
  return useContext(PetContext);
}
export function usePetDispatch() {
  return useContext(PetDispatchContext);
}
```

Now wrapper component holds the state value and provides it and the update method (dispatch) to the consumer components.

```JavaScript
// PetsApp.jsx
import { PetProvider } from '../PetContext';

export function PetsApp() {
  return (
    <PetProvider>
      <Pets />
      <Shiba />
    </PetProvider>
  );
}
```

The `Pets` component can access both contexts, so the user can update the number of pets with a button click.

```JavaScript
// Pets.jsx
import { usePets, usePetDispatch, actions } from '../PetContext.jsx';

export function Pets() {
  const pets = usePets();
  const petDispatch = usePetDispatch();
  return (
    <div>
      <p>{ pets }</p>
      <button onClick={() => petDispatch(actions.pet)} >Pet the Shiba</button>
    </div>
  )
}
```

![The number 0, a "Pet the Shiba" button, and a sad shiba in the rain. When the button is clicked, the number goes up by one. After 1 pet, the shiba is happy, dry and in a bowtie. After 11 pets, the shiba is sitting and facing away from the camera.](https://images.abbeyperini.com/state/pet-shiba.gif)

Any update within a context will trigger a re-render in every component consuming it - even if you're only updating one property and the consumer component isn't using that one property.

### A Synchronous Example with Redux

This time, I want to build an app that counts shibas. I want the user to be able to add any number of shibas, not just one at a time.

```JSX
// ShibaCounter.jsx
import { useState } from 'React';

export function ShibaCounter() {
  const [count, setCount] = useState(0);

  function handleIncrement(event) {
    event.preventDefault();
    setCount(parseInt(event.currentTarget.elements.number.value));
  }

  return (
    <div>
      <span>Shibas: {count}</span>
      <form onSubmit={(event) => handleIncrement(event)}>
        <label htmlFor='number'>Number</label>
        <input id='number' type="number"/>
        <button type="submit">Add Shibas</button>
      </form>
    </div>
  )
}
```

Now that I've got my form, I want to move count out of local state and into global state. Why? In the next example, when the user updates the count, I want to trigger an API call to fetch that many shiba images. I need to get the synchronous half working first.

I start by [installing Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started). Then, I need to instantiate a store for all of my global state. Redux creates one store. Like a pizza, one store can have many slices. Each slice holds a piece of state and its actions, dispatch, and reducers.

```JavaScript
// store.js
import { configureStore } from '@reduxjs/toolkit'
import { shibaCountReducer } from "./shibaCounterSlice"

export default configureStore({
  reducer: {
    shibaCounter: shibaCountReducer,
  }
})
```

Like Context, Redux uses a provider component to pass the store to consumer components with dependency injection. Where you'd want to keep your context as close as possible to the consumer components, a Redux store is meant to be global, so the provider is added at the root and wraps the whole app.

```JSX
// root.jsx
<Provider store={store}>
  <Outlet />
</Provider>
```

Unlike Context, Redux uses a package called [Immer](https://immerjs.github.io/immer/) to handle keeping state immutable.  I no longer have to handle copying the object to manually maintain the state I'm not updating.

```JavaScript
// context
return {
  ...oldValue,
  key: newValue,
}

// redux
state.key = newValue;
```

Next up, I need to create my first slice.

```JavaScript
// shibaCounterSlice.js
import { createSlice } from '@reduxjs/toolkit'

export const shibaCounterSlice = createSlice({
  name: 'counter',
  initialState: {
    shibaCount: 0
  },
  reducers: {
    incrementByAmount: (state, action) => {
      state.shibaCount += action.payload;
    }
  }
})

export const { incrementByAmount } = shibaCounterSlice.actions;

export default shibaCounterSlice.reducer;
```

Woah! That looks a bit different - what happened to the big switch statement? Because Redux is a state management library, it has syntax for creating actions and reducers. I don't have to write them manually.

`createSlice` returns an object I've named `shibaCounterSlice`. When I call `createSlice`, I'm passing initial state and state update functions in the `reducers` option object. `createSlice` builds an `actions` object with action creators made from those update functions. I then access those action creators by [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring) the `actions` object.

```JavaScript
// context
if (action === actions.pet) return ++pets;
// pass the action to dispatch
dispatch(actions.pet);

// redux
pet: state => ++state.pets;
// creates an action creator
function pet() {
  return { type: actions.pet };
}
// consumer component passes the action creator to dispatch
dispatch(pet());
```

The action creator consumes the action and automatically unpacks the payload.

```JavaScript
// context
dispatch({
  type: actions.pet,
  payload: 5,
})

// redux
dispatch(pet(5));
```

The `useSelector` hook selects a state from the store similar to how `useContext` accessed the context. The `useDispatch()` hook replaces the dispatch context. Now I can hook up the form to use the slice instead of local state.

```JavaScript
import { useSelector, useDispatch } from 'react-redux';
import { incrementByAmount } from '../shibaCounterSlice';

export function ShibaCounter() {
  const count = useSelector(state => state.shibaCounter.shibaCount);
  const dispatch = useDispatch();

  function handleIncrement(event) {
    event.preventDefault();
    dispatch(incrementByAmount(parseInt(event.currentTarget.elements.number.value)));
  }
}
```

![Shibas: 0. After 5 is typed into an input and the add shibas button is clicked, it shows Shibas: 5. The add shibas button is clicked twice more. It shows Shibas: 10 and then Shibas: 15.](https://images.abbeyperini.com/state/shiba-counter.gif)

Unlike `useContext`, this component will only re-render when the state that is returned from `useSelector` updates (e.g. shibaCount). Even if I could update other properties within the same slice, the component only listens for updates to what it's actually consuming. You can also leverage this to create [derived state](https://redux.js.org/usage/deriving-data-selectors) to further improve performance.

### An Asynchronous Example with Redux

Now, every time the user updates the count, I want to use the [Dog API](https://dog.ceo/dog-api/) to show shiba pictures. You may be thinking "wait, an API call is definitely a side effect." And that's right! The reducers will still only update state. The state update will trigger middleware. The middleware will be an observer watching for updates to state. It's just a function that handles API calls and dispatches a new action with the fetched data.

API calls can be pending, resolved, or rejected, so I'll need pending, success, and failure actions. Components can watch for these states and display a loading spinner, error, or the successfully fetched data. If you need to fetch data when the page loads, you can use an idle/initial state to indicate that the data hasn't been fetched yet.

If I wrote this in redux alone, I'd start with my actions and reducers.

```JavaScript
// shibaCounterSlice.js
const statusStrings = {
  shibasPending: "SHIBAS-FETCH-PENDING",
  shibaSuccess: "SHIBAS-FETCH-SUCCESS",
  shibaFailure: "SHIBAS-FETCH-FAILURE",
}

export const shibaCounterSlice = createSlice({
  name: 'counter',
  initialState: {
    shibaCount: 0,
    shibas: [],
    status: statusStrings.shibaSuccess,
    error: null,
  },
  reducers: {
    incrementByAmount: (state, action) => {
      state.shibaCount += action.payload;
    },
    shibaFetchPending: (state, action) => {
      state.shibas = [];
      state.status = statusStrings.shibaPending;
      state.error = null;
    },
    shibaFetchSuccess: (state, action) => {
      state.shibas = action.payload;
      state.status = statusStrings.shibaSuccess;
    },
    shibaFetchFailure: (state, action) => {
      state.error = action.payload;
      state.status = statusStrings.shibaFailure;
    }
  }
})

export const { incrementByAmount, shibaFetchPending, shibaFetchSuccess, shibaFetchFailure } = shibaCounterSlice.actions;
```

The reducer still only updates state! Next I need a middleware function that handles the API call and dispatches the appropriate actions.

```JavaScript
// shibaCounterSlice.js
export async function fetchShibas(count) {
  dispatch(shibaFetchPending());
  try {
    const shibas = await fetch(`https://dog.ceo/api/breed/shiba/images/random/${count}`);
  } catch (error) {
    // use error action and bail out before a success is dispatched
    dispatch(shibaFetchFailure(error.toString()));
    return;
  }
  dispatch(shibaFetchSuccess(shibas));
}
```

I could also write this with chaining.

```JavaScript
export async function fetchShibas(count) {
  dispatch(shibaFetchPending());
  await fetch(`https://dog.ceo/api/breed/shiba/images/random/${count}`).then(
    response => dispatch(shibaFetchSuccess(response.data)),
    error => dispatch(shibaFetchFailure(error.toString()))
  );
}
```

Writing the same middleware with the exact same pattern for every fetch call gets tedious. That's why Redux Toolkit comes with [redux-thunk](https://github.com/reduxjs/redux-thunk) middleware installed.

A basic thunk is a [wrapper function](https://redux.js.org/usage/writing-logic-thunks#:~:text=about%2010%20lines.-,Here%27s%20the%20source,-%2C%20with%20additional%20added) that consumes dispatch and a `getState` function.

```JavaScript
function thunk(dispatch, getState) {
  const state = getState();
  if (state.count === 5) dispatch(pet(5));
}
```

`createAsyncThunk` creates a thunk wrapper that handles the repetitive async logic.

```JavaScript
// shibaCounterSlice.js
export const fetchShibas = createAsyncThunk(
  "shibaCounter/fetchShibas/",
  async (count) => {
    const response = await fetch(`https://dog.ceo/api/breed/shiba/images/random/${count}`);
    return response.data;
  }
)
```

`createAsyncThunk` automatically defines pending, fulfilled, and rejected action strings for me. The first argument I passed is a string that will prepend them. So `fetchShibas.pending` will be set to `"shibaCounter/fetchShibas/pending"`.

Now that `createAsyncThunk` is creating my actions and dispatching them for me, I need to let create `createSlice` know. The `extraReducers` essentially creates event listeners for the actions created outside of `createSlice`.

```JavaScript
// shibaCounterSlice.js
export const shibaCounterSlice = createSlice({
  name: 'counter',
  initialState: {
    shibaCount: 0,
    shibas: [],
    status: statusStrings.shibaSuccess,
    error: null,
  },
  reducers: {
    incrementByAmount: (state, action) => {
      state.shibaCount += action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchShibas.pending, (state, action) => {
        state.status = statusStrings.shibasPending;
        state.shibas = [];
        state.error = null;
      })
      .addCase(fetchShibas.fulfilled, (state, action) => {
        state.status = statusStrings.shibaSuccess;
        state.shibas = action.payload;
      })
      .addCase(fetchShibas.rejected, (state, action) => {
        state.status = statusStrings.shibaFailure;
        state.error = action.error.message;
      })
  }
})

export const { incrementByAmount } = shibaCounterSlice.actions;
```

Finally, I'm ready to update the shiba counter component to call `fetchShibas` when the count is updated. I use `useEffect` (with all dependencies in my dependency array) to watch for an update and register the API call as an effect.

```JSX
// ShibaCounter.jsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementByAmount, statusStrings, fetchShibas } from '../shibaCounterSlice';

export function ShibaCounter() {
  const count = useSelector(state => state.shibaCounter.shibaCount);
  const shibas = useSelector(state => state.shibaCounter.shibas);
  const shibaStatus = useSelector(state => state.shibaCounter.status);
  const error = useSelector(state => state.shibaCounter.error);
  const dispatch = useDispatch();

  function handleIncrement(event) {
    event.preventDefault();
    dispatch(incrementByAmount(parseInt(event.currentTarget.elements.number.value)));
  }

  let shibaImages = shibas.map(shiba => {
    return (
      <img src={shiba} alt="shiba" key={shiba}>
      </img>
    );
  })

  useEffect(() => {
    if (count > 0) dispatch(fetchShibas(count));
  }, [count, dispatch])

  return (
    <div>
      <span>Shibas: {count}</span>
      <form onSubmit={(event) => handleIncrement(event)}>
        <label htmlFor='number'>Number</label>
        <input id='number' type="number"/>
        <button type="submit">Add Shibas</button>
      </form>
      { shibaStatus === statusStrings.shibasPending && <p>Pending</p>}
      { error && <p>{error}</p> }
      { shibaImages }
    </div>
  )
}
```

![Same as the previous demo, but now every time 5 shibas are added to the shiba count, 5 shiba images are displayed. While the API call is pending, "pending" shows instead of images.](https://images.abbeyperini.com/state/shiba-display.gif)

In this example, I am counting shibas and displaying shiba images in the same component. In the real world, the benefit of using a global state solution is I could count in one component and display in a completely unrelated component.

### A Synchronous Example with ngRX

Now I want to build the exact same example in Angular's ngRX. The concepts are the same, but the syntax is different. Once again, I'm going to start by getting the synchronous part working and then add in the API calls.

After installing [@ngrx/store](https://ngrx.io/guide/store/install) I need to provide the store to my app.

```JavaScript
// app.config.ts
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { shibasReducer } from './state/shibas.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideStore(), provideEffects(), provideState({ name: "shibas", reducer: shibasReducer })]
};
```

The action creator method is aptly named `createAction`. I have to define my action payload as props.

```JavaScript
// shibas.actions.ts
import { createActionGroup, createAction, emptyProps, props } from "@ngrx/store";

export const incrementByAmount = createAction("Increment by Amount", props<{ number: number }>())
```

I need to write a selector to get the shiba feature out of my store - a store can have many features. To do that, I use `createFeatureSelector` and pass the name I passed to `provideState` in my app config. Once I have the whole feature, I can use `createSelector` to get the value that I need.

```JavaScript
// state/shibas.selector.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ShibaData } from './dogApi.model';

type Count = {
  count: number;
}

export const selectFeatureShibas = createFeatureSelector<Count>('shibas');

export const selectShibaCount = createSelector(selectFeatureShibas, (state: Count) => state.count);
```

Then, I import and instantiate the store in my top level App component. In my template, I pass the state value to the ShibaCounter component. I also set up an event listener. When my ShibaCounter component emits the `incrementByAmount` event, my event listener will will access dispatch off of the store object and dispatch my `incrementByAmount` action.

```JavaScript
// app.component.ts
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectShibaCount } from './state/shibas.selectors';
import { incrementByAmount } from './state/shibas.actions';
import { ShibaCounter } from './shibas/shiba-counter';
import { AsyncPipe } from '@angular/common';
@Component({
    selector: 'app-root',
    template: `
      <main class="main">
        <shiba-counter [count]="(count$ | async)!" (incrementByAmount)="onIncrementByAmount($event)" />
      </main>
    `,
    imports: [ ShibaCounter, AsyncPipe ],
})
export class AppComponent {

  title = 'state-angular';

  count$;

  onIncrementByAmount(number: number) {
    this.store.dispatch(incrementByAmount({number}));
  }

  constructor(private store: Store) {
    this.count$ = this.store.select(selectShibaCount);
  }
}
```

Then, I need a reducer. I pass two arguments to `createReducer`. The first is initial state - 0. The second argument is an `on` function. It creates an event listener! The first argument is the action to listen for and the second is a state update function.

```JavaScript
// state/shibas.reducer.ts
import { createReducer, on } from "@ngrx/store";
import { incrementByAmount } from "./shibas.actions";

export const initialState = { count: 0 };

export const shibasReducer = createReducer(
  initialState,
  on(incrementByAmount, (state, { number }) => {
    return { count: state.count + number }
  })
);
```

Finally, I want to consume and update the store from my ShibaCounter component. I get count as an input from my App component and use output to create the `incrementByAmount` event listener.

```JavaScript
// shibas/shiba-counter.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'shiba-counter',
  template: `
    <span>Shibas: {{ count }}</span>
    <form (ngSubmit)="onSubmit()">
      <label for='number'>Number </label>
      <input id='number' type="number" name="number" [formControl]="number"/>
      <button type="submit">Add Shibas</button>
    </form>
  `,
  styleUrl: './shiba-counter.css',
  imports: [FormsModule, ReactiveFormsModule],
})
export class ShibaCounter {
  @Input() count = 0;
  @Output() incrementByAmount = new EventEmitter<number>();
  number = new FormControl(0);

  onSubmit() {
    this.incrementByAmount.emit(this.number.value!);
  }
}
```

![Shibas: 0. After 5 is typed into an input and the add shibas button is clicked, it shows Shibas: 5. The add shibas button is clicked twice more. It shows Shibas: 10 and then Shibas: 15.](https://images.abbeyperini.com/state/shiba-counter.gif)

### An Asynchronous Example with ngRx

Now it's time to add the API call to get shiba pictures to the previous example. First, I need to install [@ngrx/effects](https://ngrx.io/guide/effects/install). Then I need to update my app config providers. I need to provide the http client, effects, and new reducer. You can use [meta-reducers](https://ngrx.io/guide/store/metareducers) to combine all of your reducers.

```JavaScript
// app.config.ts
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { dogApiReducer } from './state/dogApi.reducer';
import * as ShibaEffects from './shibas/shibas.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideStore(), provideEffects(ShibaEffects), provideState({ name: "shibas", reducer: shibasReducer }), provideState({name: "shibaData", reducer: dogApiReducer })]
};
```

I'm made a type for my data, because it's not a primitive, and I don't want to type it out repeatedly.

```JavaScript
// state/dogApi.model.ts
export interface ShibaData {
  shibas: ReadonlyArray<string>,
  pending: boolean,
  error: string | null,
}
```

Next, I need pending, success, and failure actions for my API call. Since I have multiple actions this time, I use `createActionGroup`. I'll be able to access them like `DogApiActions.shibaFetchPending`.

```JavaScript
// state/dogApi.actions.ts
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const DogApiActions = createActionGroup({
  source: "Dog API",
  events: {
    "Shiba Fetch Pending": emptyProps(),
    "Shiba Fetch Success": props<{shibas: ReadonlyArray<string>}>(),
    "Shiba Fetch Failure": props<{error: string}>(),
  }
})
```

Now I need my selector. You can also use [selectors](https://ngrx.io/guide/store/selectors#using-selectors-for-multiple-pieces-of-state) and [feature creators](https://ngrx.io/guide/store/feature-creators) to combine multiple pieces of state.

```JavaScript
// state/shibas.selectors.ts
import { ShibaData } from './dogApi.model';

export const selectFeatureShibaData = createFeatureSelector<ShibaData>('shibaData')
export const selectShibaData = createSelector(selectFeatureShibaData, (state: ShibaData) => state);
```

Next up, the reducer.

```JavaScript
// state/dogApi.reducer.ts
import { createReducer, on } from "@ngrx/store";
import { DogApiActions } from "./dogApi.actions";
import { ShibaData } from "./dogApi.model";

export const initialState: ShibaData = {
  shibas: [],
  pending: false,
  error: null,
};

export const dogApiReducer = createReducer(
  initialState,
  on(DogApiActions.shibaFetchPending, (_state) => { 
    return {
    shibas: [],
    error: null,
    pending: true,
    }
  }),
  on(DogApiActions.shibaFetchSuccess, (_state, { shibas }) => { 
    return {
    shibas,
    pending: false,
    error: null,
    }
  }),
  on(DogApiActions.shibaFetchFailure, (_state, { error }) => {
    return {
    shibas: [],
    pending: false,
    error
    }
  })
);
```

Since my reducer should only update state, I need a service to handle the API call.

```JavaScript
// shibas/shibas.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ShibasService {
  constructor(private http: HttpClient) {}

  getShibas(count: number): Observable<Array<string>> {
    return this.http
      .get<Response & { data: string[] }>(
        `https://dog.ceo/api/breed/shiba/images/random/${count}`
      )
      .pipe(map((response) => {
        return response.message || []
      }));
  }
}
```

Now, I'm going to use I'm using @ngrx/effects and [rxjs](https://rxjs.dev/) to write the observer pattern. rxjs is an Observables library for JavaScript that Angular uses. The effect returned from `createEffect` will watch for the `DogApiActions.shibaFetchPending` action. When it happens, `exhaustMap` will pass the action to the `getShibas` service, so I can grab the updated count from its props. Based on the result of the API call returned from `getShibas`, `pipe` will then dispatch the result in the appropriate action (`DogApiActions.shibaFetchSuccess` or `DogApiActions.shibaFetchFailure`).

```JavaScript
// shibas/shibas.effects.ts
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { ShibasService } from './shibas.service';
import { DogApiActions } from '../state/dogApi.actions';

export const getShibas = createEffect(
  (actions$ = inject(Actions), shibasService = inject(ShibasService)) => {
    return actions$.pipe(
      ofType(DogApiActions.shibaFetchPending),
      exhaustMap((action) =>
        shibasService.getShibas(action.count).pipe(
          map((shibas) => DogApiActions.shibaFetchSuccess({ shibas })),
          catchError((error: { message: string }) =>
            of(DogApiActions.shibaFetchFailure({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);
```

Now I can add a subscription in my app component constructor that dispatches the `DogApiActions.shibaFetchPending` action when `count` updates. This is another way to write the observer pattern. If I wanted to fetch data on load, I would remove the `value > 0` check. If I wasn't making the call based on an update to another state variable, I would dispatch an idle/initial action in [`ngOnInit`](https://angular.dev/api/core/OnInit).

```JavaScript
// app.component.ts
this.count$.subscribe((value) => { 
  if (value > 0) return this.store.dispatch(DogApiActions.shibaFetchPending({count: value}))
});
```

I also need to pass `shibaData` to my ShibaCounter component in my template.

```JavaScript
// app.component.ts
<shiba-counter [count]="(count$ | async)!" [shibaData]="(shibaData$ | async)!" (incrementByAmount)="onIncrementByAmount($event)" />
```

In my ShibaCounter component, I grab `shibaData` and display the shiba pictures, pending, and error states.

```JavaScript
// shibas/shiba-counter.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ShibaData } from '../state/dogApi.model';

@Component({
  selector: 'shiba-counter',
  template: `
    <span>Shibas: {{ count }}</span>
    <form (ngSubmit)="onSubmit()">
      <label for='number'>Number</label>
      <input id='number' type="number" name="number" [formControl]="number"/>
      <button type="submit">Add Shibas</button>
    </form>
    @if (shibaData.pending) {
      <p>Pending</p>
    }
    @if (shibaData.error) {
      <p>{{ shibaData.error }}</p>
    }
    <div class="shiba-group">
      @for (shiba of shibaData.shibas; track shiba) {
        <img [src]="shiba" alt="shiba" />
      }
    </div>
  `,
  styleUrl: './shiba-counter.css',
  imports: [FormsModule, ReactiveFormsModule],
})
export class ShibaCounter {
  @Input() count = 0;
  @Input() shibaData: ShibaData = {
    error: null,
    pending: false,
    shibas: [],
  };
  @Output() incrementByAmount = new EventEmitter<number>();
  number = new FormControl(0);

  onSubmit() {
    this.incrementByAmount.emit(this.number.value!);
  }
}
```

![Same as the previous demo, but now every time 5 shibas are added to the shiba count, 5 shiba images are displayed. While the API call is pending, "pending" shows instead of images.](https://images.abbeyperini.com/state/shiba-display.gif)

### Conclusion

The actions, dispatch, and reducers pattern is difficult to wrap your head around at first. There are a lot of moving parts. My hope is that starting with the smallest possible example and slowly adding in concepts made the pattern easier to understand.

The next part of the series will cover the mutator pattern used by global state management libraries like [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) for React and [Pinia](https://pinia.vuejs.org/) for Vue (coming August 2025).
