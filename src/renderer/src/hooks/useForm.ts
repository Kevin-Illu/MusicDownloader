import { useState, ChangeEvent } from 'react'

interface FormValues {
  [key: string]: any
}

type HandleInputChange = (event: ChangeEvent<HTMLInputElement>) => void

type ResetForm = () => void

type UseFormReturnType = [FormValues, HandleInputChange, ResetForm]

export const useForm = (initialState: FormValues = {}): UseFormReturnType => {
  const [values, setValues] = useState(initialState)

  const reset = () => {
    setValues(initialState)
  }

  const handleInputChange: HandleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value
    })
  }

  return [values, handleInputChange, reset]
}
