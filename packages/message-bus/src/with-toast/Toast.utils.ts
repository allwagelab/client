import { MessageBus } from '../MessageBus'
import { getGlobalMessageBus } from '../MessageBusContext'

type ToastType = 'success' | 'error' | 'info'

/**
 * 전역적으로 토스트 메시지를 표시하는 유틸리티 함수
 * @param message - 표시할 메시지
 * @param type - 토스트 타입 ('success' | 'error' | 'info')
 * @param messageBus - 선택적으로 MessageBus 인스턴스를 전달 (기본값: 전역 MessageBus)
 */
export const showGlobalToast = (
  message: string,
  type: ToastType,
  messageBus: MessageBus = getGlobalMessageBus(),
) => {
  messageBus.publishEvent('SHOW_TOAST', { message, type })
}
