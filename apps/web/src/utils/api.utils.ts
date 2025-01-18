import { NextResponse } from "next/server";

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
