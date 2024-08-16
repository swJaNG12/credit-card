import { useQuery } from '@tanstack/react-query'

interface usePollApplyStatusProps {
  enabled: boolean
}

export default function usePollApplyStatus({
  enabled,
}: usePollApplyStatusProps) {
  return useQuery({
    queryKey: ['applyStatus'],
    queryFn: () => {},
    enabled,
    refetchInterval: 2000,
    staleTime: 0,
  })
}
