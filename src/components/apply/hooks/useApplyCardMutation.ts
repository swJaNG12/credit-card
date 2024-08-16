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
  return useMutation({
    mutationFn: (applyValues: ApplyValues) => applyCard(applyValues),
    onSuccess: () => {
      onSuccess()
    },
    onError: () => {
      onError()
    },
  })
}
