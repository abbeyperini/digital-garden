## How To Reload a Page Whenever a User Makes a Change with React/Redux

![A screenshot of a simple counter app with a "Counter!" heading, a + button, the number 20, a - button, and 14 of the 20 shiba pictures](https://images.abbeyperini.com/reload/shibas.png)

You’ve got your React components. You figured out how to use Redux to feed them data. You make a component that creates/updates/deletes an item in your API, and put it in a page displaying the items from your API. How do you get the whole page to reload to show the updated data every time a user makes a change? Redux state and the `useEffect()` Dependency Array.

It is possible to use only React to pass the data from our counter to the parent element to get almost the same counter effect in my example, but using Redux state and the React `useEffect()` Dependency Array is easier in some ways, and applicable to many more situations.

This article assumes basic familiarity with APIs, React, Redux, and Node. I started this app with create-react-app and am using functional components and hooks. You can find all the code in [this repository](https://github.com/abbeyperini/ReactReload). I’m working with React (v17.0.1), Redux (v4.0.5), [react-redux](https://www.npmjs.com/package/react-redux) (v7.2.2), and [redux-thunk](https://www.npmjs.com/package/redux-thunk) (v2.3.0). For this example, I used [Dog API](https://dog.ceo/dog-api/documentation/breed) to get random Shiba Inu pictures to display.

After testing the API endpoints (in this case in the browser with [JSONView](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en)), I started by setting up my action types and action creators for the Dog API GET request. I’m able to create async actions thanks to redux-thunk. For this small example, I’ve left my fetch requests inside the action creators.

The following are the results of the action creator, with the loading action, which will be important later.

```JavaScript
> shibaActions.js
function shibesRequested() { return { type: shibaConstants.SHIBES_REQUESTED } }
function success(result) { return { type: shibaConstants.SHIBES_FETCHED, payload: result } }
function failure(error) { return { type: shibaConstants.SHIBE_FETCH_FAIL, payload: error } }
```

Next the reducer:

```JavaScript
> shibaReducer.js
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case shibaConstants.SHIBES_REQUESTED:
            return {
                ...state,
                shibasLoading: true,
                shibasFetched: false
            }
        case shibaConstants.SHIBES_FETCHED:
            return {
                ...state,
                shibasLoading: false,
                shibasFetched: true,
                shibas: action.payload
            }
        case shibaConstants.SHIBE_FETCH_FAIL:
            return {
                ...state,
                shibasLoading: false,
                shibasFetched: false
            }
        default:
            return state
    }
}
```

Finally, I initialize the store. The first item in the composeEnhancers enables [Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en), and this setup allows the use of both dev tools and middleware (in this case, redux-thunk).

```JavaScript
> index.js
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './store/shibaReducer';
const rootReducer = reducer;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

On to our components! I set up App.js to display Shiba pictures based on a number in local state. Were this a real app, I would take the time to create a unique key and alt text for each picture.

```JavaScript
> App.js
import { connect } from 'react-redux';
import { shibaActions } from './store/shibaActions';
import Counter from './components/Counter';
function App(props) {
  const [number, setNumber] = useState(1);
useEffect(() => {
    props.fetchShibes(number)
  }, []);
if (!props.shibes || !props.shibes[0]) {
    return (<h1 className="heading">Loading!</h1>)
  } else {
    
    let shibaImages = props.shibes.map(shiba => {
      return (
        <img className="image" src={shiba} alt="shiba" key={shiba}>
        </img>
      );
    })
  
    return (
      <div className="App">
        {shibaImages}
        <Counter />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    shibes: state.shibas
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchShibes: (num) => dispatch(shibaActions.fetchShibes(num))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
```

An empty `useEffect()` Dependency Array (the brackets after the function) means the page won’t re-render indefinitely, nor will a re-render be triggered by updates to the component’s dependencies.

Note: [Denny Scott](https://medium.com/better-programming/understanding-the-useeffect-dependency-array-2913da504c44) and the React team advise against empty Dependency Arrays because they’ll hide bugs.

Now that my shibes are being displayed, I’ll start the counter component. Because this API doesn’t have POST, UPDATE, or DELETE endpoints, the counter will change the value of `num` passed to the GET request url within the action creator.

```JavaScript
let url = `https://dog.ceo/api/breed/shiba/images/random/${num}`;
```

First I update my action types, action creators, and reducer. In this small example, I’m using a single file for each of these, but I would typically have multiple reducers and use the `combineReducers()` hook.

```JavaScript
> shibaActions.js
function addOne(num) {
      return dispatch => {
        let number = num + 1;
        dispatch(add(number))
      }
  function add(number)  { return { type: shibaConstants.ADD_ONE,  
  payload: number } }
}
function subOne(num) {
      return dispatch => {
          let number = num - 1;
          dispatch(sub(number))
      }
  function sub(number) { return { type: shibaConstants.SUB_ONE, 
  payload: number } }     
}
> shibaReducer.js
case shibaConstants.ADD_ONE:
   return {
       ...state,
       counter: action.payload
   }
case shibaConstants.SUB_ONE:
   return {
       ...state,
       counter: action.payload
   }
```

I also add the counter to the initial state, so that there is always 1 shibe.

```JavaScript
> shibaReducer.js
const initialState = {shibasLoading: false, shibasFetched: false, counter: 1};
```

Now for the counter component itself — pretty straightforward.

```JavaScript
> Counter.js
import React from 'react';
import { connect } from 'react-redux';
import { shibaActions } from '../store/shibaActions';
function Counter(props) {
    const handleOnAdd = () => {
        props.addOne(props.counter)
    }
const handleOnSub = () => {
        props.subOne(props.counter)
    }
return (
        <div className="container-counter">
            <h1 className="heading">Counter!</h1>
            <button onClick={handleOnAdd}>+</button>
            <p>{props.counter}</p>
            <button onClick={handleOnSub}>-</button>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addOne: (num) => dispatch(shibaActions.addOne(num)),
        subOne: (num) => dispatch(shibaActions.subOne(num))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

Next, to make our page reload every time the button clicks change the counter, we have to go back to App.js. We’ll use `mapStateToProps()` to access the counter within the page component, and pass it instead of the local state `number` when we dispatch `fetchShibes()`.

```JavaScript
> App.js
// const [number, setNumber] = useState(1);
useEffect(() => {
    props.fetchShibes(props.counter)
  }, [props.counter]);
```

As you can see above, the only thing we have to do to get the page to reload with the button changes is put the counter state in the `useEffect()` dependency brackets (the React team advises assigning the state to variables instead of using `props.state` within the Dependency Array). Add just a smidge of styling, and we have a basic, little Shiba Counter.

![when a user clicks the + or - button, the number of the shiba pictures on the page changes by 1](https://images.abbeyperini.com/reload/shibaCounter.gif)

Getting the page to reload based on an async action is only slightly more difficult — you’d use the loading state like `shibasLoading` above. If you only use the end result state, like `shibasFetched`, then the page will only reload based on the first successful request. So if you have a user adding multiple things to your API, it will only show the first.

This concept also lends to creating error messages within your app. After adding the `shibasFetched` and `shibasLoading` state objects to `mapStateToProps()`, I updated my App.js file.

```JavaScript
> App.js
if (!props.shibes || !props.shibes[0]) {
    return (
      <div>
        {(props.shibasLoading || !props.shibasFetched) && <h1  
        className="heading">Loading!</h1>}
        {!props.shibasLoading && !props.shibasFetched && 
        <h1>Something went wrong - shibas not loaded.</h1>}
      </div>
    )
  } else {
    
    let shibaImages = props.shibes.map(shiba => {
      return (
        <img className="image" src={shiba} alt="shiba" key={shiba}>
        </img>
      );
    })
  
    return (
      <div className="App">
        {!props.shibasLoading && !props.shibasFetched && 
        <h2>Something went wrong - shibas not loaded.</h2>}
        <Counter />
        {shibaImages}
      </div>
    );
  }
```

Using JSX conditional logic and our Redux state, we can display different error messages based on the state of our async requests.

### Conclusion

After struggling to figure it out myself, I strove to create a straightforward example of how to use the `useEffect()` hook to reload components based on changes other components are making.

There are many ways to use this across an app, and the basic concept itself allows you to do fun things like custom error messages using JSX conditional logic.

If this helped you when you got stuck or left you with a question, leave me a comment!
