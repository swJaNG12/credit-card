import usePollApplyStatus from '@/components/apply/hooks/usePollApplyStatus'
import { APPLY_STATUS } from '@/models/apply'
import Apply from '@components/apply'
import useApplyCardMutation from '@components/apply/hooks/useApplyCardMutation'
import { useState } from 'react'

export default function ApplyPage() {
  const [readyToPoll, setReadyToPoll] = useState(false)

  const { data } = usePollApplyStatus({
    enabled: readyToPoll,
  })

  if (data?.status === APPLY_STATUS.COMPLETE) {
    console.log('성공')
  } else if (data?.status === 'error') {
    console.log('실패')
  }

  const { mutate } = useApplyCardMutation({
    onSuccess: () => {
      setReadyToPoll(true)
    },
    onError: () => {
      window.history.back()
    },
  })
  return <Apply onSubmit={mutate} />
}
