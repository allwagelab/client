import { URLS } from '@allwagelab/constants'

import type {
  ChildrenTitle,
  MessageData,
  MessageDataToParent,
  MessageDataToChildren,
} from './iframeEventHandler.types'

type ValueOf<T> = T[keyof T]

export const isValidEventOrigin = (origin: ValueOf<typeof URLS>) => {
  return Object.values(URLS).includes(origin)
}

const getChildIframe = (title: ChildrenTitle) => {
  const child = document.querySelector(`iframe[title=${title}]`) as HTMLIFrameElement | null
  return child?.contentWindow
}

const postMessage = (data: MessageData) => {
  switch (data.type) {
    case 'routeChange':
      parent.postMessage({ type: data.type, route: data.route }, URLS.APP_START)
      break
    case 'navigate':
      getChildIframe(data.title)?.postMessage(
        { type: data.type, route: data.route },
        data.targetOrigin,
      )
      break

    default:
      throw new Error('Invalid message type')
  }
}

export const postMessageToParent = (data: MessageDataToParent) => postMessage(data)
export const postMessageToChildren = (data: MessageDataToChildren) => postMessage(data)
