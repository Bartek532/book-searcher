import axios from "axios";

type HTTPMethod =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "OPTIONS"
  | "PATCH"
  | "get"
  | "delete"
  | "head"
  | "options"
  | "post"
  | "put"
  | "patch"
  | "purge"
  | "PURGE"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK"
  | undefined;

export const fetcher = async (
  path: string,
  method: HTTPMethod,
  data?: Record<string, unknown>,
): Promise<any> => {
  try {
    return await axios({
      url: path,
      method,
      responseType: "json",
      headers: { "content-type": "application/json" },
      withCredentials: true,
      data: data || {},
    });
  } catch (err) {
    console.log(err);
    throw new Error(err.response?.data.message);
  }
};
