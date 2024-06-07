import { TypeOptions } from 'react-toastify'

export type MessageType<T = undefined> = {
    message?: string
    type: TypeOptions | undefined
} & (T extends undefined
    ? undefined
    : {
          data?: T
      })
