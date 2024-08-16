import { ApplyValues } from '@models/apply'
import { applyCard } from '@remote/apply'
import { useMutation } from '@tanstack/react-query'

export default function useApplyCardMutation() {
  return useMutation({
    mutationFn: (applyValues: ApplyValues) => applyCard(applyValues),
  })
}
