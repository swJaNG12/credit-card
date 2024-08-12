import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { getCards } from '@remote/card'
import ListRow from '@shared/ListRow'
import { flatten } from 'lodash'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useCallback } from 'react'

export default function CardList() {
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

  console.log(hasNextPage)

  const cards = flatten(data.pages.map(({ items }) => items))

  return (
    <div>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<div>Loading...</div>}
        next={loadMore}
      >
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
      </InfiniteScroll>
    </div>
  )
}
