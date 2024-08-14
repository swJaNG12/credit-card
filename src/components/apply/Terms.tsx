import Agreement from '@shared/Agreement'

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
        <Agreement.Description
          checked={false}
          onChange={(e, checked) => {
            console.log(e)
            console.log(checked)
          }}
        >
          카드신청 관련 안내 및 필수/선택 동의
        </Agreement.Description>
        <Agreement.Description
          checked={true}
          onChange={(e, checked) => {
            console.log(e)
            console.log(checked)
          }}
          link="google.com"
        >
          (팔수) 개인(신용)정보 요약동의서
        </Agreement.Description>
      </Agreement>
    </div>
  )
}
