import { useQuery } from '@tanstack/react-query'
import { getCards } from '@remote/card'
import ListRow from '@shared/ListRow'

export default function CardList() {
  const { data: cards } = useQuery({
    queryKey: ['cards'],
    queryFn: getCards,
  })

  if (cards === null) {
    return null
  }

  return (
    <div>
      <ul>
        {cards?.map((card, idx) => (
          <ListRow
            key={card.id}
            contents={
              <ListRow.Texts
                title={`${idx + 1} 위`}
                subTitle={`${card.name}`}
              />
            }
            right={
              <div>
                {card.payback !== null ? <div>{card.payback}</div> : null}
              </div>
            }
            withArrow={true}
          />
        ))}
      </ul>
    </div>
  )
}
