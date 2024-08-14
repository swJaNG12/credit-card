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

# AuthGuard Component

인증처리를 통해 현재 사용자가 로그인한 상태인지 로그인한 상태가 아닌지 판단하는 컴포넌트다. 인증처리를 완료하기 전까지(사용자의 로그인 상태를 판단하기 전까지) App을 렌더링하지 않는다. App이 렌더링 되었다는 것은 인증처리가 끝났다는 것이다. firebase auth 의 onAuthStateChanged를 통해 인증 처리를 진행한다.

이 컴포넌트를 추가하는 이유는 로그인한 상태에 따라서 보여지는 UI가 달라질 수 있기 때문에 먼저 로그인 상태를 확인하는 것이 사용자 경험 측면에서 더 좋기 떄문이다.

initialize 상태를 통해 인증처리를 거친 상태인지 판단한다.

## onAuthStateChanged

onAuthStateChanged 함수는 Firebase Authentication에서 사용자 인증 상태의 변화를 감지하는 데 사용되는 함수이다. 이 함수는 사용자의 로그인 상태가 변경될 때(로그인, 로그아웃 등) 호출되는 콜백함수를 등록할 수 있다.

- 사용자 인증 상태 변화 감지 이전에 콜백함수가 최초에 1번 실행된다.
- 콜백함수에 전달되는 user값에 따라서 사용자가 로그인한 상태인지, 로그인하지 않은 상태인지 구분해 로직을 별도로 작성할 수 있다.

</br>

# Private Route

PrivateRoute.tsx

```tsx
import useUser from '@hooks/auth/useUser'
import React from 'react'
import { Navigate } from 'react-router-dom'

// 유저의 정보를 받아서 어떤 페이지로 보낼지 결정
export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const user = useUser()

  // 로그인이 되어있지 않다면 로그인 페이지로
  if (user === null) {
    return <Navigate to="/signin" replace={true} />
  }

  return <>{children}</>
}
```

App.tsx

```tsx
...
import PrivateRoute from '@components/auth/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/card/:id" element={<CardPage />} />
        <Route
          path="/apply/:id"
          element={
            <PrivateRoute>
              <ApplyPage />
            </PrivateRoute>
          }
        />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App

```

# UX 고려사항

## 적절한 안내 메세지 보여주기

### 1. 로그인 상황

로그인할 때 여러 에러가 발생할 수 있다. 인증을 담당하는 Firebase 에러가 발생할 수도 있고, 또 서비스 자체의 문제로 에러가 발생할 수도 있다. 이러한 경우, 모두 같은 메시지를 보여주기 보다는 사용자에게 어떤 문제로 장애가 발생했는지 적절하게 구분지어서 안내한다면 사용자 경험을 높일 수 있을 것이다.

#### 해결방안

Signin.tsx

```tsx
try {
  const user = await signInWithEmailAndPassword(auth, email, password)

  navigate(-1)
} catch (error) {
  // firebase 에러
  if (error instanceof FirebaseError) {
    open({
      title: '계정 정보를 다시 확인해주세요',
      onButtonClick: () => {
        //
      },
    })

    return
  }
  // 일반적인 에러
  console.log(error)
  open({
    title: '잠시 후 다시 시도해주세요',
    onButtonClick: () => {
      //
    },
  })
}
```

### 2. 카드 신청하기 상황

카드 신청하기 페이지(`/apply/:cardId`)는 유저가 로그인이 된 경우에만 이동가능한 페이지다. 그래서 유저가 로그인을 하지 않은 상황에서 카드정보 상세페이지(`/card/:cardId/`)에 있는 '신청하기' 버튼을 클릭한다면 로그인 페이지로 이동하게 된다. </br>
이때 아무런 안내 메세지 없이 바로 로그인 페이지로 이동하게 된다면 서비스에 익숙하지 않은 사용자는 당황할 수 있다("신청하기를 눌렀는 데 바로 로그인 페이지로 이동하네?")
</br>
이렇게 된다면 사용자에게 친절하지 못하고 어색할 수 있기 떄문에 사용자 경험이 낮아질 수 있다.

#### 해결방안

사용자에게 먼저 카드 신청하기 서비스는 로그인이 필요한 서비스라는 것을 안내하고, 로그인 페이지로 이동한다면 사용자 경험을 높일 수 있을 것이다.

Card.tsx에 moveToApply 함수를 추가할 수 있다.

```tsx
const { id = '' } = useParams()
const navigate = useNavigate()
const user = useUser()
const { open } = useAlertContext()

const moveToApply = useCallback(() => {
  if (user === null) {
    open({
      title: '로그인이 필요한 서비스입니다.',
      onButtonClick: () => {
        navigate(`/signin`)
      },
    })

    return
  } else {
    navigate(`/apply/${id}`)
  }
}, [user, id, open, navigate])
```

유저 정보를 확인하고 Alert을 띄워서 안내 메세지를 보여주고 로그인 페이지로 이동시킨다.

### 추가

위 순서로 로그인을 진행한다면 로그인 후 홈 화면으로 이동하기 보다는 이전에 신청하기 버튼을 클릭했던 카드 상세 페이지로 이동하는게 더 자연스럽다. 그래서 로그인 후 navigate(-1)로 수정해서 이전 페이지로 이동할 수 있게 수정했다.

# 카드 신청 폼 데이터 관리

카드 신청은 단계별로 이루어진다. </br>

- (1)약관 동의 => (2)기본 정보 입력 => (3)카드 서비스 상세 설정

이렇게 여러 단계에 걸쳐서 데이터를 모아 처리하는 방식은 mbti 검사, 카드 신청 등에서 볼 수 있다. 이런 방식에 대응하기 위해서 데이터를 페이지 단위로 분리하는 방법을 생각해 볼 수 있다.

## 페이지 단위로 분리

페이지 단위로 분리하는 방법은 프로세스를 여러 개의 페이지로 나누는 방식이다. 이 방식을 사용하면 각 페이지가 데이터, 데이터 처리 로직을 독립적으로 가지게 되기 때문에 각 단계에 필요한 코드를 개별적으로 관리할 수 있게된다. 그럼 특정 단계에서 로직을 수정해야 할 경우 해당 페이지내 코드만 수정하면 되므로 유지보수가 용이해진다는 장점이 있다.

단점으로는 각 페이지의 역할이 너무 많아질 수 있다는 점이다. 우리가 최종적으로 필요한 데이터는 모든 단계에 있는 데이터를 모아서 구성해야 하는데 페이지 단위로 분리해 데이터를 관리했을 때, 이전 단계에 있는 데이터를 전달하는 방식을 사용한다면 각 페이지는 데이터를 모으고, 검증하고, 전달하는 등 많은 역할을 수행하게 된다. 그리고 데이터를 전역으로 관리하게 될 경우 상태관리도 복잡해질 수 있다.

따라서 데이터를 넘겨주는 방식대신, 데이터를 조금 더 중앙집중적으로 관리하고, 각 컴포넌트의 관심사를 분리하는 방식을 사용해 볼 수 있다.

## 부모 컴포넌트와 자식 컴포넌트로 나누고 관심사를 분리

데이터를 각 페이지에서 관리하는 대신, 부모 컴포넌트는 전체 데이터를 관리하고, 각 자식 컴포넌트(페이지)들은 각 필드에서 모인 데이터를 모으도록 관심사를 분리할 수 있다.

자식 컴포넌트는 데이터를 생성하고 부모 컴포넌트에 보내주는 역할만 수행하며, 부모 컴포넌트는 자식 컴포넌트가 넘겨준 데이터를 모아서 관리하고, 각 단계에 대한 분기처리를 수행한다. 이렇게 하면 데이터를 전역으로 관리하지 않아도, 단순 state나 변수만으로도 처리할 수 있기 때문에 상태관리가 좀 더 단순해 질 수 있다. 그리고 관심사를 분리해 각 컴포넌트가 특정 역할만 담당하게 되기 때문에 코드가 더 명확해지고 유지보수도 용이해진다.

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

```

```
