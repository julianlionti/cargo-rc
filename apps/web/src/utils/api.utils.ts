import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOptions from "./auth.utils";
import { db } from "rc/lib/db";

interface CommonError {
  error: string;
}

export const responseError = (
  message: string,
  statusCode: number = 500
): NextResponse<CommonError> => {
  const error: CommonError = { error: message };
  return NextResponse.json(error, { status: statusCode });
};

export async function getUserFromServerSession() {
  const serverSession = await getServerSession(authOptions);
  if (!serverSession) throw Error("No serve session");
  const { user } = serverSession;
  const { id: uid } = user;

  const userData = await db.user.findUnique({ where: { uid } });
  if (!userData) throw Error("No user");
  return userData;
}

export async function getDriverFromServerSession() {
  const serverSession = await getServerSession(authOptions);
  if (!serverSession) throw Error("No serve session");
  const { user } = serverSession;
  const { id: uid } = user;

  const userData = await db.user.findUnique({ where: { uid } });
  if (!userData) throw Error("No user");

  const driver = await db.driver.findUnique({ where: { userId: userData.id } });
  return { driver, user: userData };
}
