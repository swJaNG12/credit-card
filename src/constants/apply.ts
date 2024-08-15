import { Option, Term } from '@models/apply'

// 약관 목록
export const TermsList: Term[] = [
  {
    id: '01',
    title: '카드신청 관련 안내 및 필수 동의',
  },
  {
    id: '02',
    title: '(필수) 개인(신용)정보 요약동의서',
    link: 'https://www.google.com',
  },
]

// 연소득 옵션
export const anuallIncomeOptions: Option[] = [
  { label: '600만원 ~ 5,000만원', value: '600만원 ~ 5,000만원' },
  { label: '5,000만원 ~ 1억원', value: '5,000만원 ~ 1억원' },
  { label: '1억원 초과', value: '1억원 초과' },
]

// 신용점수 옵션
export const creditScore: Option[] = [
  { label: '600점 이상', value: '600점 이상' },
  { label: '600점 미만', value: '600점 미만' },
]

// 결제일 옵션
export const paymentDateOptions: Option[] = [
  { label: '1일', value: '1일' },
  { label: '25일', value: '25일' },
]
