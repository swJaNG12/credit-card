import { ApplyValues } from '@models/apply'
import Button from '@shared/Button'
import { useState, MouseEvent } from 'react'
import FixedBottomButton from '../shared/FixedBottomButton'

type CardInfoValues = Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>

export default function CardInfo({
  onNext,
}: {
  onNext: (cardInfoValues: CardInfoValues) => void
}) {
  const [cardInfoValues, setCardInfoValues] = useState<CardInfoValues>({
    isMaster: false,
    isHipass: false,
    isRf: false,
  })

  const { isHipass, isMaster, isRf } = cardInfoValues

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    const $button = e.target as HTMLButtonElement
    // console.log($button.dataset)
    // console.log($button.name)

    setCardInfoValues((prevInfo) => ({
      ...prevInfo,
      [$button.name]: JSON.parse($button.dataset.value as string),
    }))
  }

  console.log(cardInfoValues)

  return (
    <div>
      <Button.Group title="해외 결제">
        <Button
          toggle={!isMaster}
          size="medium"
          data-value={true}
          name="isMaster"
          onClick={handleButtonClick}
        >
          Master
        </Button>
        <Button
          toggle={isMaster}
          size="medium"
          data-value={false}
          name="isMaster"
          onClick={handleButtonClick}
        >
          국내 전용
        </Button>
      </Button.Group>

      <Button.Group title="후불교통기능">
        <Button
          toggle={isRf}
          size="medium"
          data-value={false}
          name="isRf"
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          toggle={!isRf}
          size="medium"
          data-value={true}
          name="isRf"
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>

      <Button.Group title="후불하이패스카드">
        <Button
          toggle={isHipass}
          size="medium"
          data-value={false}
          name="isHipass"
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          toggle={!isHipass}
          size="medium"
          data-value={true}
          name="isHipass"
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>

      <FixedBottomButton
        label="신청완료"
        onClick={() => onNext(cardInfoValues)}
      />
    </div>
  )
}
