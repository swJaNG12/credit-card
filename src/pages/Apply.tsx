import usePollApplyStatus from '@/components/apply/hooks/usePollApplyStatus'
import useUser from '@/hooks/auth/useUser'
import { ApplyValues, APPLY_STATUS } from '@/models/apply'
import { updateApplyCard } from '@/remote/apply'
import Apply from '@components/apply'
import useApplyCardMutation from '@components/apply/hooks/useApplyCardMutation'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function ApplyPage() {
  const user = useUser()
  const { id } = useParams()
  const navigate = useNavigate()
  const [readyToPoll, setReadyToPoll] = useState(false)

  const { data } = usePollApplyStatus({
    enabled: readyToPoll,
  })

  const cardApplyFilnal = async (status: string) => {
    if (status === APPLY_STATUS.COMPLETE) {
      console.log('성공')
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id as string,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        } as Partial<ApplyValues>,
      })
      navigate('/apply/done?success=true')
    } else if (status === APPLY_STATUS.REJECT) {
      console.log('실패')
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id as string,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        } as Partial<ApplyValues>,
      })
      navigate('/apply/done?success=false')
    }
  }

  if (data?.status === APPLY_STATUS.COMPLETE) {
    cardApplyFilnal(data?.status)
  } else if (data?.status === 'error') {
    cardApplyFilnal(data?.status)
  }

  const { mutate, status } = useApplyCardMutation({
    onSuccess: () => {
      setReadyToPoll(true)
    },
    onError: () => {
      window.history.back()
    },
  })

  if (readyToPoll || status === 'pending') {
    return <div>Loading...</div>
  }

  return <Apply onSubmit={mutate} />
}
