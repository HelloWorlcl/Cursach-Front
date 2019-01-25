import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { reducer as burgerMenu } from 'redux-burger-menu';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  burgerMenu
});

export default rootReducer;