import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const Api = async (url:string, token:string, method = 'GET', body = null,next?:any) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  const requestOptions = {
    method,
    headers,
  };

  if (method !== 'GET' && body) {
    requestOptions.body = JSON.stringify(body);
  }

  if(next){
    requestOptions.next = next;
  }
  
  //(requestOptions)
 
  const response = await fetch(url, requestOptions);

  const responseData = await response.json();
  
  return responseData;
}; 
