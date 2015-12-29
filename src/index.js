const UNMOUNT_DUCKS_STATE = '@@UNOUNT_DUCKS_STATE@@';
const MOUNT_DUCKS_STATE = '@@MOUNT_DUCKS_STATE@@';

const isFunction = any => typeof any === 'function';

const isObject = any => typeof any === 'object';

const wrapDispatchForDucksAction = (dispatch, duckId) => dispatchable => {
  if (isFunction(dispatchable)) {
    return dispatch((thunkedDispatch, ...args) =>
        dispatchable(wrapDispatchForDucksAction(thunkedDispatch, duckId), ...args));
  } else if (isObject(dispatchable)) {
    return dispatch({...dispatchable, duckId});
  } else {
    console.warn(
      `Currently, only Objects and Functions are allowed to be dispatched as Ducks actions`
    );

    return dispatch(dispatchable);
  }
};

const ducksRootReducer = (action, ducksState, ducksReducers) => {
  if (action.duckId) {
    const duckState = ducksReducers.reduce((current, partialReducer) =>
        partialReducer(current, action), ducksState[action.duckId]);

    return {...ducksState, [action.duckId]: duckState};
  } else if (action.type === UNMOUNT_DUCKS_STATE) {
    // TODO: sanity check
    const ducksStateCopy = {...ducksState};
    delete ducksStateCopy[action.payload];

    return ducksStateCopy;
  } else {
    return ducksState;
  }
};

const bindDucksActionCreator = (actionCreator, dispatch, duckId) => (...args) => {
  const dispatchable = actionCreator(...args);

  return wrapDispatchForDucksAction(dispatch, duckId)(dispatchable);
};

const buildDucksReducer = reducer => (...ducksReducers) => (appState = {ducks: {}, state: undefined}, action) => ({
  ducks: ducksRootReducer(action, appState.ducks, ducksReducers),
  state: reducer(appState.state, action)
});

const unmountDucksState = () => ({type: UNMOUNT_DUCKS_STATE});

const mountDucksState = () => ({type: MOUNT_DUCKS_STATE});

export {
  bindDucksActionCreator,
  buildDucksReducer,
  unmountDucksState,
  mountDucksState
};
