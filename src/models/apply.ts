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
  appliedAt: Date
  cardId: string
  terms: Array<Term['id']>
  salary: string
  creditScore: string
  payDate: string
  isMaster: boolean
  isHipass: boolean
  isRf: boolean
}

export interface Option {
  label: string
  value: string | number | undefined
}
