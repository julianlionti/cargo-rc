import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { fetchApi } from "rc/utils/fetchApi";
import { startTransition, useActionState, useEffect } from "react";

export default function useUser() {
  const { data } = useSession();
  const { user } = data || {};

  const [userDb, getUserInfo, isLoadingUser] = useActionState(async () => {
    if (!user) return null;
    const dbUser = await fetchApi<User>(`/api/user/${user.id}`);
    return dbUser;
  }, null);

  useEffect(() => {
    startTransition(() => {
      getUserInfo();
    });
  }, [getUserInfo]);

  return { user: userDb, isLoadingUser };
}
