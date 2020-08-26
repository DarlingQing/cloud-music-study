import { createActions as nativeCreateActions, handleActions as nativeHandleActions } from 'redux-actions';
import { isPromise, isError } from './lang';

function handleError(error) {
  console.log(error);
  throw error;
}

function handleErrors(actions) {
  return Object.keys(actions).reduce((result, action) => ({
    ...result,
    [action]: {
      next(state, actualAction) {
        if (isError(actualAction.payload)) {
          return state;
        }
        return actions[action](Object.assign(state, { error: null }), actualAction);
      },
    },
  }), {});
}

function catchActions(actions) {
  return Object.keys(actions).reduce((result, action) => {
    return {
      ...result,
      [action]: (...args) => {
        const promise = actions[action](...args);
        if (!isPromise(promise)) return promise;
        return promise.catch(handleError);
      },
    };
  }, {});
}

export function handleActions(actions, initialState) {
  return nativeHandleActions(handleErrors(actions), { ...initialState, error: null });
}

export function createActions(actions) {
  return nativeCreateActions(catchActions(actions));
}
