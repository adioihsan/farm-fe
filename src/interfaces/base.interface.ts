export interface IBaseResponse{
    status:string,
    message:string,
    data?:any
    errors?:Array<IFieldErrors>
}

export interface IFieldErrors{
  field:string,
  message:Array<string>
}

// export interface BaseSuccessResponse<T>{
//     data:T
// }

// export interface BaseErrorResponse extends BaseResponse{
//     errors:[]
// }