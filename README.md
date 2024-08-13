# Contributor

swJaNG12

# Project Configuration

- CRACO(CRA Configuration Override): craco.config.js, 경로 alias 설정
  - plugin: craco-alias
- tsconfig.json, tsconfig.paths.json: TypeScript 설정
- eslint: eslint.config.mjs
  - plugins: eslint-plugin-prettier, eslint-plugin-react
  - parser: @typescript-eslint/parser
- prettier: .prettierrc
- Package Manager: yarn 4.3.1
- Database: Cloud Firestore
- Authentication: Firebase Auth

# Tech Stack

- TypeScript
- React
- Firebase(Firestore, Firebase Auth)
- emotion

# Styles

## emotion(CSS-in-JS)

예시코드

```jsx
// 아래 코드에서 width, height는 지정 X
import { css } from '@emotion/react'
import styled from '@emotion/styled'

// css Prop(String Styles)
const containerStyle = css`
  background-color: blue;
`

// Styled Components
const Button = styled.button`
  background-color: red;
  color: #fff;
`

// Composition
const base = css`
  ${containerStyle}
  color: yellow;
`
function Example() {
  return (
    <div css={containerStyle}>
      <Button>lorem</Button>
      <p css={base}>lorem ipsum</p>
    </div>
  )
}
```

# Shared Components

일관된 디자인으로 통일성을 주기 위해, 텍스트, 버튼을 공통 컴포넌트로 작성

## typography

- 'typography'로 텍스트의 크기, 행간을 지정된 크기로만 사용할 수 있게 만들어 통일성을 향상시킵니다.
- 'color'로 텍스트 색상을 지정된 색상으로만 사용할 수 있게 만들어 통일성을 향상시킵니다.
- 'display'로 텍스트의 display 속성을 유연하게 조정할 수 있습니다.
- 'textAlign'로 텍스트의 가로 정렬을 유연하게 지정할 수 있습니다.
- 'fontWeight'으로 텍스트의 굵기를 유연하게 지정할 수 있습니다.
- 'bold'로 텍스트의 굵기를 bold로 설정할지 말지 명시적으로 지정할 수 있습니다.

</br>

- emotion styled components, span tag
- Props
  - typography?: `Typography`, defaults to 't5'
  - color?: `Colors`, defaults to 'black'
  - display?: `CSSProperties['display']`, defaults to 'inline'
  - textAlign?: `CSSProperties['textAlign']`, defaults to 'left'
  - fontWeight?: `CSSProperties['fontWeight']`
  - bold?: `boolean`

```jsx
function Example() {
  return (
    <div>
      <Text color={'red'}>t5</Text>
      <Text typography={'t2'} color={'green'}>
        t2
      </Text>
    </div>
  )
}
```

## button

- 'size'로 버튼의 패딩, 텍스트 크기를 지정된 크기내에서 사용할 수 있게 만들어 통일성있는 스타일을 줄 수 있습니다.
- 'color', 'toggle'로 버튼의 배경색, 텍스트 색상, 보더를 지정된 색상내에서 사용할 수 있게 만들어 통일성있는 스타일을 줄 수 있습니다.
- 'disabled'로 버튼이 disabled 되었는지 아닌지 명시적으로 지정할 수 있습니다.
- 'full'로 버튼이 가로 너비를 꽉 채울지 말지 명시적으로 지정할 수 있습니다.

</br>

- emotion styled components, button tag
- props
  - color?: ButtonColorType, defaults to 'primary'
  - size?: ButtonSizeType, defaults to 'small'
  - disabled?: boolean
  - full?: boolean
  - toggle?: boolean, defaults to

```jsx
function Example() {
  return (
    <div>
      <Button color={'success'}>click</Button>
      <Button color="error">click</Button>
      <Button color="success" toggle={true}>
        click
      </Button>
      <Button disabled={true}>click</Button>
    </div>
  )
}
```

## text field

- 'label'로 입력창의 입력창의 라벨을 추가합니다.
- 'hasError'로 입력의 유효성을 확인합니다.
- 'helpMessage'로 입력창의 설명을 추가합니다.

</br>

- props
  - label?: string
  - hasError?: boolean
  - helpMessage?: string

```jsx
function Example() {
  return (
    <div>
      <TextField
        label="패스워드"
        hasError={true}
        helpMessage={'잘못된 입력입니다.'}
      />
    </div>
  )
}
```

# input dirty

회원가입 페이지에서 입력창에 에러가 발생하는 경우는 올바르지 않은 입력을 하거나, 입력을 했다가 input에서 focus가 벗어나는 순간일 것이다.

기능을 작업할 당시 errors는 회원가입 페이지에 들어가는 순간부터 채워져있고, 올바른 입력을 하면 에러가 지워지는 로직으로 작성했었다. 그래서 회원가입 페이지에 들어가자마자 아무것도 하지 않았는데 input은 에러로 판단하고 에러메세지를 보여주고 있었다. 이 문제를 해결하기 위해 dirty state를 추가해 에러메세지를 가지고는 있지만 dirty 상태, 즉 입력을 다 끝내지 않고 focus를 옮겼을 때 에러메세지를 보여주도록 작업했다.

```tsx
...
const [dirty, setDirty] = useState<Partial<FormValues>>({})
const handleBlur = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  setDirty((prevDrity) => ({
    ...prevDrity,
    [e.target.name]: 'true',
  }))
}, [])
...

return (
	...
		<TextField
			label="이메일"
			placeholder="이메일"
			name="email"
			value={formValues.email}
			onChange={handleFormValues}
			hasError={Boolean(dirty.email) && Boolean(errors.email)}
			helpMessage={Boolean(dirty.email) ? errors.email : ''}
			onBlur={handleBlur}
		/>
	...
)
```

</br>

# Commit Emoji

🎨
:art:
코드의 구조/형태 개선
Improve structure / format of the code.

⚡️
:zap:
성능 개선
Improve performance.

🔥
:fire:
코드/파일 삭제
Remove code or files.

🐛
:bug:
버그 수정
Fix a bug.

🚑
:ambulance:
긴급 수정
Critical hotfix.

✨
:sparkles:
새 기능
Introduce new features.

📝
:memo:
문서 추가/수정
Add or update documentation.

💄
:lipstick:
UI/스타일 파일 추가/수정
Add or update the UI and style files.

🎉
:tada:
프로젝트 시작
Begin a project.

✅
:white_check_mark:
테스트 추가/수정
Add or update tests.

🔒
:lock:
보안 이슈 수정
Fix security issues.

🔖
:bookmark:
릴리즈/버전 태그
Release / Version tags.

💚
:green_heart:
CI 빌드 수정
Fix CI Build.

📌
:pushpin:
특정 버전 의존성 고정
Pin dependencies to specific versions.

👷
:construction_worker:
CI 빌드 시스템 추가/수정
Add or update CI build system.

📈
:chart_with_upwards_trend:
분석, 추적 코드 추가/수정
Add or update analytics or track code.

♻️
:recycle:
코드 리팩토링
Refactor code.

➕
:heavy_plus_sign:
의존성 추가
Add a dependency.

➖
:heavy_minus_sign:
의존성 제거
Remove a dependency.

🔧
:wrench:
구성 파일 추가/삭제
Add or update configuration files.

🔨
:hammer:
개발 스크립트 추가/수정
Add or update development scripts.

🌐
:globe_with_meridians:
국제화/현지화
Internationalization and localization.

💩
:poop:
똥싼 코드
Write bad code that needs to be improved.

⏪
:rewind:
변경 내용 되돌리기
Revert changes.

🔀
:twisted_rightwards_arrows:
브랜치 합병
Merge branches.

📦
:package:
컴파일된 파일 추가/수정
Add or update compiled files or packages.

👽
:alien:
외부 API 변화로 인한 수정
Update code due to external API changes.

🚚
:truck:
리소스 이동, 이름 변경
Move or rename resources (e.g.: files paths routes).

📄
:page_facing_up:
라이센스 추가/수정
Add or update license.

💡
:bulb:
주석 추가/수정
Add or update comments in source code.

🍻
:beers:
술 취해서 쓴 코드
Write code drunkenly.

🗃
:card_file_box:
데이버베이스 관련 수정
Perform database related changes.

🔊
:loud_sound:
로그 추가/수정
Add or update logs.

🙈
:see_no_evil:
.gitignore 추가/수정
Add or update a .gitignore file.
출처: https://inpa.tistory.com/entry/GIT-⚡️-Gitmoji-사용법-Gitmoji-cli [Inpa Dev 👨‍💻:티스토리]
