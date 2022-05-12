import { configureStore , ThunkAction, Action} from '@reduxjs/toolkit'
import signUpReducer from './auth/signup/signupSlice';
import signinReducer from './auth/signin/signinSlice';



export const store = configureStore({
  reducer: {
    // signUp:signUpReducer,
    signIn:signinReducer,
  },
})



export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
