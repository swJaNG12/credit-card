import { useAlertContext } from '@/contexts/Alertcontext'
import { ApplyValues } from '@models/apply'
import { applyCard } from '@remote/apply'
import { useMutation } from '@tanstack/react-query'

interface useApplyCardMutationProps {
  onSuccess: () => void
  onError: () => void
}

export default function useApplyCardMutation({
  onSuccess,
  onError,
}: useApplyCardMutationProps) {
  const { open } = useAlertContext()

  return useMutation({
    mutationFn: (applyValues: ApplyValues) => applyCard(applyValues),
    onSuccess: () => {
      onSuccess()
    },
    onError: () => {
      open({
        title: '카드를 신청하는데 실패했어요. 나중에 다시 시도해주세요.',
        onButtonClick: () => {
          onError()
        },
      })
    },
  })
}
