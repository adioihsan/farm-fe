export type IErrorResponse = {
    status: string,
    message: string,
    data?: any
    errors?: Array<IFieldErrors>
}
export type IFieldErrors = {
    field: string,
    message: Array<string>
}

export interface AxiosApiError {
    response: {
        data: IErrorResponse;
    };
}

// export function normalizeApiError(error: any):IErrorResponse {
//   return error?.response?.data ?? {
//     status: "error",
//     message: "Unexpected server error",
//     errors: []
//   }
// }


export function handleApiErrors(err: unknown, setFieldError: Function | undefined) {
    console.log(err)
    if (!isApiError(err)) return "Unexpected error occurred";

    const data = err.response.data;

    if (setFieldError) {
        data.errors?.forEach((e: IFieldErrors) => {
            setFieldError(e.field, e.message.join(". "));
        });
    }
    return data.message;
}

export function isApiError(error: any): error is AxiosApiError {
    return (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        error.response &&
        typeof error.response.data?.message === "string"
    );
}