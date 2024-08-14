import Agreement from '@shared/Agreement'
import { TermsList } from '@constants/apply'

export default function Terms() {
  return (
    <div>
      <Agreement>
        <Agreement.Title
          checked={true}
          onChange={(e, checked) => {
            console.log(e)
            console.log(checked)
          }}
        >
          약관에 모두 동의
        </Agreement.Title>
        {TermsList.map((term, idx) => (
          <Agreement.Description
            key={term.id}
            checked={false}
            link={term.link}
            onChange={(e, checked) => {
              console.log(e)
              console.log(checked)
            }}
          >
            {term.title}
          </Agreement.Description>
        ))}
      </Agreement>
    </div>
  )
}
