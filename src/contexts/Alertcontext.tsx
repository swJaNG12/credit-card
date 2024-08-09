import React, {
  ComponentProps,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import Alert from '@shared/Alert'
import { createPortal } from 'react-dom'

type AlertProps = ComponentProps<typeof Alert>
type AlertOptions = Omit<AlertProps, 'open'>

interface AlertContextValue {
  open: (options: AlertOptions) => void
}
const Context = createContext<AlertContextValue | undefined>(undefined)

const defaultValues: AlertProps = {
  open: false,
  title: null,
  description: null,
  onButtonClick: () => {},
}

export function AlertContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [alertState, setAlertState] = useState<AlertProps>(defaultValues)

  const $portal_root = document.getElementById('root-portal')

  const close = useCallback(() => {
    setAlertState(defaultValues)
  }, [])

  const open = useCallback(({ onButtonClick, ...options }: AlertOptions) => {
    setAlertState({
      ...options,
      open: true,
      onButtonClick: () => {
        close()
        onButtonClick()
      },
    })
  }, [])

  const values = useMemo(
    () => ({
      open,
    }),
    [open],
  )

  return (
    <Context.Provider value={values}>
      {children}

      {$portal_root !== null &&
        createPortal(<Alert {...alertState} />, $portal_root)}
    </Context.Provider>
  )
}

export const useAlertContext = () => {
  const value = useContext(Context)
  if (value === null) {
    throw Error('AlertContext 내부에서 사용해주세요')
  }
  return value
}
