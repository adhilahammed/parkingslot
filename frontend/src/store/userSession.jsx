export const userSessionKey = "userSession";

import { create } from "zustand";
import { persist } from "zustand/middleware";
// import jwt, { JwtPayload } from "jsonwebtoken";

export const UserSessionKey = "userSession";

const useUserSessionStore = create(
  persist(
    (set, get) => ({
      session: null,
      logout: () => set({ session: null }),
      getSession: () => get()?.session,
      setSession: (session) => set({ session }),
    }),
    { name: UserSessionKey }
  )
);

// eslint-disable-next-line react-refresh/only-export-components
export { useUserSessionStore };
