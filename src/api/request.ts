export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete'
}

export const request = async <T = void>(
  httpMethod: HttpMethod,
  endpoint: string,
  params: FormData
): Promise<T> => {
  try {
    const response = await fetch(`${process.env.API_ORIGIN}${endpoint}/`, {
      method: httpMethod,
      body: params
    })

    return response.json()
  } catch (error) {
    console.error(error)

    throw error
  }
}
