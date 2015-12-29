# redux-ducks

> Redux toolset for isolating state as defined by ducks-modular-redux proposal.

State isolation implementation based on [ducks-modular-redux proposal](https://github.com/erikras/ducks-modular-redux).

## Usage

The package simply provides `buildDucksReducer` the function takes your original top level reducer as first argument and returns another function which takes N ducks reducers. See example usage in [react-redux-ducks example](https://github.com/salsita/react-redux-ducks/blob/master/examples/counters/src/app.js#L10-L12).

```javascript
import { createStore } from 'redux';
import { buildDucksReducer } from 'redux-ducks';

// This is your plain old top level reducer (for example result of combinReducers function)
const yourTopLevelReducer => (appState, action) => {
  return appState;
};

// Ducks standard reducer as defined in ducks-modular-redux
const ducksReducer = (appState, action) => {
  return appState;
};

const topLevelReducer = buildDucksReducer(yourTopLevelReducer)(ducksReducer, anotherDucksReducer);

const store = createStore(topLevelReducer);
```