import Apply from '@components/apply'
import useApplyCardMutation from '@components/apply/hooks/useApplyCardMutation'

export default function ApplyPage() {
  const { mutate } = useApplyCardMutation({
    onSuccess: () => {
      console.log('카드 추가~')
    },
    onError: () => {
      window.history.back()
    },
  })
  return <Apply onSubmit={mutate} />
}
