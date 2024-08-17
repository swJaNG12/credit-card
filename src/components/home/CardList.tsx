import { getCards } from '@remote/card'
import ListRow from '@shared/ListRow'
import Badge from '@shared/Badge'
import { useNavigate } from 'react-router-dom'

import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import flatten from 'lodash.flatten'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function CardList() {
  const navigate = useNavigate()

  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['cards'],
    queryFn: ({ pageParam }: any) => {
      return getCards(pageParam)
    },
    initialPageParam: null,
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible
    },
  })

  if (!data) {
    return null
  }

  const loadMore = () => {
    if (hasNextPage === false || isFetching) {
      return
    }
    fetchNextPage()
  }

  const cards = flatten(data.pages.map(({ items }) => items))

  return (
    <div>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<div>Loading...</div>}
        next={loadMore}
        scrollThreshold="100px"
      >
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
              right={card.payback && <Badge label={card.payback} />}
              withArrow={true}
              onClick={() => navigate(`/card/${card.id}`)}
            />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}
