import { logout } from "./slices/authSlice";
import { persistor } from "./store";

export const loOutMiddleware = () => {
  return (next: (arg0: unknown) => unknown) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (action: any) => {
      if (action.type === logout.type) {
        persistor.purge();
      }
      return next(action);
    };
  };
};
