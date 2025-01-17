import { NextResponse } from "next/server";
import serverConfig from "rc/config/server.config";

const BASE_URL = serverConfig.NEXTAUTH_URL;

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
}

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
