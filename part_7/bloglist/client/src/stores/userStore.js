import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import loginService from '../services/login';

const useUserStore = create((set) => {
  return {
    user: null,
    token: '',
    actions: {
      loginUser: async (userDetails) => {
        const userResponse = await loginService.login(userDetails);
        if (userResponse) {
          set({
            user: userResponse,
            token: `Bearer ${userResponse.token}`,
          });
          window.localStorage.setItem(
            'loggedBlogAppUser',
            JSON.stringify(userResponse)
          );
          return true;
        }
        return false;
      },
      logoutUser: async () => {
        window.localStorage.removeItem('loggedBlogAppUser');
        set({
          user: null,
          token: '',
        });
      },
      checkUserPresent: async () => {
        const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser');
        if (loggedUserJson) {
          const user = JSON.parse(loggedUserJson);
          set({
            user: user,
            token: `Bearer ${user.token}`,
          });
        }
      },
    },
  };
});

export const useUserStoreData = () =>
  useUserStore(
    useShallow((state) => ({ user: state.user, token: state.token }))
  );

export const useUserStoreActions = () => useUserStore((state) => state.actions);

export default useUserStore;
