import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const Api = async (url: string, token: string, method = 'GET', body: any = null, next?: any) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  type RequestOptions = {
    method: string;
    headers: { [key: string]: string };
    body?: string | null; // Making body property optional
    next?: any;
  };

  const requestOptions: RequestOptions = {
    method,
    headers,
  };

  if (method !== 'GET' && body) {
    requestOptions.body = JSON.stringify(body);
  }

  if (next) {
    requestOptions.next = next;
  }

  const response = await fetch(url, requestOptions);
  const responseData = await response.json();

  return responseData;
};
