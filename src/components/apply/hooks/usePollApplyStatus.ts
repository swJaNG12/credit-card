import { APPLY_STATUS } from '@/models/apply'
import { useQuery } from '@tanstack/react-query'

interface usePollApplyStatusProps {
  enabled: boolean
}

export default function usePollApplyStatus({
  enabled,
}: usePollApplyStatusProps) {
  return useQuery({
    queryKey: ['applyStatus'],
    queryFn: getApplyStatus,
    enabled,
    refetchInterval: 2000,
    staleTime: 0,
  })
}

// 카드사 mocking 함수, 랜덤하게 상태값 전달
function getApplyStatus() {
  const values = [
    APPLY_STATUS.READY,
    APPLY_STATUS.PROGRESS,
    APPLY_STATUS.COMPLETE,
    APPLY_STATUS.REJECT,
  ]

  const status = values[Math.floor(Math.random() * values.length)]

  if (status === APPLY_STATUS.REJECT) {
    return { status: 'error', message: '카드 발급에 실패했습니다.' }
  }

  return { status }
}
