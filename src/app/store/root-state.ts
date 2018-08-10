import { RouterReducerState } from '@ngrx/router-store';
import { AuthState } from './auth-store';
import { DraftsState } from './drafts-store';
import { RouterStateUrl } from './router-store/serializer';

export interface State {
  auth: AuthState;
  drafts: DraftsState;
  router: RouterReducerState<RouterStateUrl>;
}
