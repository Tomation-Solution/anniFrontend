import { configureStore , ThunkAction, Action} from '@reduxjs/toolkit'
import signUpReducer from './auth/signup/signupSlice';
import signinReducer from './auth/signin/signinSlice';
import AdmindashboardReducer from "./admin/dashboard/dashboardSlice"
import membersReducer from './admin/members/membersSlice';

export const store = configureStore({
  reducer: {
    // signUp:signUpReducer,
    signIn:signinReducer,
    adminDashboard:AdmindashboardReducer,
    members:membersReducer
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
