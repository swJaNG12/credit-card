import { getAppliedCard } from '@remote/apply'
import { UseQueryOptions, useSuspenseQuery } from '@tanstack/react-query'

export default function useAppliedCard({
  userId,
  cardId,
}: {
  userId: string
  cardId: string
}) {
  return useSuspenseQuery({
    queryKey: ['applied', userId, cardId],
    queryFn: () => getAppliedCard({ userId, cardId }),
  })
}
