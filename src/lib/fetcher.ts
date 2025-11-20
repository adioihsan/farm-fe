import axios, {
    AxiosError,
    type AxiosRequestConfig,
    type InternalAxiosRequestConfig,
} from "axios";

export interface IRefreshTokenResBody {
    status: string;
    message: string;
    data: {
        accessToken: string;
        refreshToken?: string // optional if FE and BE not in the same region. but for this test case it belongs to the same regions
    }
}

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_HOST,
    withCredentials: true,
});

const cleanInstance = axios.create({
    baseURL: import.meta.env.VITE_API_HOST,
    withCredentials: true,
});


let accessToken: string | null = null;
const tokenListeners = new Set<(token: string | null) => void>();
const logoutListeners = new Set<() => void>();


export function setAccessTokenApi(token: string | null) {
    accessToken = token;
    console.log("TOKEN in set:",accessToken)
    if (token) {
        instance.defaults.headers.common.Authorization = `Bearer ${token}`;
 
    } else {
        delete instance.defaults.headers.common.Authorization;
    }
    tokenListeners.forEach((cb) => cb(token));
}

export function getAccessToken() {
    return accessToken;
}

export function onAccessTokenChange(cb: (token: string | null) => void) {
    tokenListeners.add(cb);
    return () => tokenListeners.delete(cb);
}


export async function fetcher<T>(path: string, initRequestInit?: AxiosRequestConfig) {
    return instance({
        url: path,
        ...initRequestInit,
    }).then((res) => res.data as T);
}

export async function cleanFetcher<T>(path: string, initRequestInit?: AxiosRequestConfig) {
    return cleanInstance({
        url: path,
        ...initRequestInit,
    }).then((res) => res.data as T);
}

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
    if (isRefreshing && refreshPromise) return refreshPromise;

    isRefreshing = true;

    refreshPromise = (async () => {
        try {

            const { data } = await cleanInstance.post<IRefreshTokenResBody>(
                "/v1/auth/refresh-token"
            );

            setAccessTokenApi(data.data.accessToken);

            return data.data.accessToken;
        } catch (e) {
            setAccessTokenApi(null);
            return null;
        } finally {
            isRefreshing = false;
            refreshPromise = null;
        }
    })();

    return refreshPromise;
}


instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const status = error.response?.status;
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        if (status !== 401) {
            return Promise.reject(error);
        }

        if (originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        const newToken = await refreshAccessToken();
        
  if (!newToken) {
    logoutListeners.forEach(cb => cb());       
    return Promise.reject(error);
  }

        if (!newToken) {
            return Promise.reject(error);
        }

        if (!originalRequest.headers) {
            originalRequest.headers = {} as any;
        }
        (originalRequest.headers as any).Authorization = `Bearer ${newToken}`;

        return instance(originalRequest);
    }
);


export function onSessionExpired(cb: () => void) {
  logoutListeners.add(cb);
  return () => logoutListeners.delete(cb);
}