import usePollApplyStatus from '@/components/apply/hooks/usePollApplyStatus'
import useUser from '@/hooks/auth/useUser'
import { ApplyValues, APPLY_STATUS } from '@/models/apply'
import { updateApplyCard } from '@/remote/apply'
import Apply from '@components/apply'
import useApplyCardMutation from '@components/apply/hooks/useApplyCardMutation'
import useAppliedCard from '@components/apply/hooks/useAppliedCard'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAlertContext } from '@/contexts/Alertcontext'

export default function ApplyPage() {
  const user = useUser()
  const { id } = useParams()
  const navigate = useNavigate()
  const { open } = useAlertContext()

  const [readyToPoll, setReadyToPoll] = useState(false)

  const { data: appliedCard } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id as string,
  })

  console.log('appliedCard', appliedCard)
  useEffect(() => {
    if (appliedCard === null) {
      return
    }
    if (appliedCard.status === APPLY_STATUS.COMPLETE) {
      open({
        title: '이미 발급이 완료된 카드입니다.',
        onButtonClick: () => {
          window.history.back()
        },
      })

      return
    }
    setReadyToPoll(true)
  }, [appliedCard])

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
      navigate('/apply/done?success=true', {
        replace: true,
      })
    } else if (status === APPLY_STATUS.REJECT) {
      console.log('실패')
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id as string,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        } as Partial<ApplyValues>,
      })
      navigate('/apply/done?success=false', {
        replace: true,
      })
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

  if (appliedCard !== null && appliedCard.status === APPLY_STATUS.COMPLETE) {
    return null
  }

  if (readyToPoll || status === 'pending') {
    return <div>Loading...</div>
  }

  return <Apply onSubmit={mutate} />
}
