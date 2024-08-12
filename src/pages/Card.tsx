import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { getCard } from '@/remote/card'
import Top from '@shared/Top'
import ListRow from '@shared/ListRow'

export default function CardPage() {
  const { id = '' } = useParams()

  const { data } = useQuery({
    queryKey: ['card', id],
    queryFn: () => getCard(id),
    enabled: id !== '',
  })

  if (!data) {
    return null
  }

  const { name, corpName, promotion, tags, benefit } = data

  const subTitle = !!promotion
    ? removeHtmlTags(promotion.title)
    : tags.join(', ')

  return (
    <div>
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />
      {benefit.map((text, idx) => (
        <ListRow
          key={text}
          left={<IconCheck />}
          contents={<ListRow.Texts title={`혜택 ${idx + 1}`} subTitle={text} />}
        />
      ))}
    </div>
  )
}

function removeHtmlTags(text: string) {
  let result = ''

  for (let i = 0; i < text.length; i++) {
    if (text[i] === '<') {
      for (let j = i + 1; i < text.length; j++) {
        if (text[j] === '>') {
          i = j
          break
        }
      }
    } else {
      result += text[i]
    }
  }

  return result
}

function IconCheck() {
  return (
    <svg
      fill="none"
      height="20"
      viewBox="0 0 48 48"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="white" fillOpacity="0.01" height="48" width="48" />
      <path
        d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
        fill="#2F88FF"
        stroke="black"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <path
        d="M16 24L22 30L34 18"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
    </svg>
  )
}
