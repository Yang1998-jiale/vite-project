/*
 * @Author: yjl
 * @Date: 2024-08-21 09:10:55
 * @LastEditors: yjl
 * @Description: 描述
 */

export enum ResultEnum {
  SUCCESS = 0,
  ERROR = -1,
  TIMEOUT = 401,
  TYPE = "success",
}

export function resultSuccess<T = any>(data: T, { message = "ok" } = {}) {
  return {
    code: ResultEnum.SUCCESS,
    data,
    message,
    type: "success",
  };
}

export function resultPageSuccess<T = any>(
  page: number,
  pageSize: number,
  list: T[],
  { message = "ok" } = {}
) {
  const pageData = pagination(page, pageSize, list);

  return {
    ...resultSuccess({
      currentPageData: pageData,
      totalCount: list.length,
    }),
    message,
  };
}

export function resultError(
  message = "Request failed",
  { code = ResultEnum.ERROR, data = null } = {}
) {
  return {
    code,
    data,
    message,
    type: "error",
  };
}

export function pagination<T = any>(
  pageNo: number,
  pageSize: number,
  array: T[]
): T[] {
  const offset = (pageNo - 1) * Number(pageSize);
  return offset + Number(pageSize) >= array.length
    ? array.slice(offset, array.length)
    : array.slice(offset, offset + Number(pageSize));
}

export interface requestParams {
  method: string;
  body: any;
  headers?: { authorization?: string };
  query: any;
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 *
 */
export function getRequestToken({
  headers,
}: requestParams): string | undefined {
  return headers?.authorization;
}
