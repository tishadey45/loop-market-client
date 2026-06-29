"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { saveUserToDb } from "@/services/usersApi";


export default function UserSyncProvider({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && user?.email) {
      const syncUser = async () => {
        try {
          await saveUserToDb(user);
        } catch (error) {
          console.error("Failed to sync user with DB:", error);
        }
      };

      syncUser();
    }
  }, [user, isPending]);

  return <>{children}</>;
}