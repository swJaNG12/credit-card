import { User } from './user'

// 약관 인터페이스
export interface Term {
  id: string
  link?: string
  title: string
}

// 전체 데이터 인터페이스
export interface ApplyValues {
  userId: User['uid']
  terms: Array<Term['id']>
  appliedAt: Date
  cardId: string
}
