import { User } from './user'

// 약관 인터페이스
export interface Term {
  id: string
  link?: string
  title: string
}

export const APPLY_STATUS = {
  READY: 'READY',
  PROGRESS: 'PROGRESS',
  COMPLETE: 'COMPLETE',
  REJECT: 'REJECT',
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
  status: keyof typeof APPLY_STATUS
  step: number
}

export interface Option {
  label: string
  value: string | number | undefined
}
