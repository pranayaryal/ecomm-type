import { useState } from 'react'
import { useAuth } from '@/hooks/auth'

const Register: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([])
  const [regParams, setRegParams] = useState({})

  const { register } = useAuth({ 'middleware': 'guest' })

  const handleSubmit = () => {
    register({
      setErrors,
      name: formState.name.value,
      email: formState.email.value,
      password: formState.password.value,
      password_confirmation: formState.confirmPassword.value
    })
  }

  const [formState, setFormState] = useState({
    email: {
      value: "",
      error: ""
    },
    name: {
      value: "",
      error: ""
    },
    password: {
      value: "",
      error: ""
    },
    confirmPassword: {
      value: "",
      error: ""
    }
  })

  const onChangeHandler = (field: string, value: string) => {
    let state = {
      [field]: {
        value,
        error: null
      }
    }

    setFormState({ ...formState, ...state })

  }


  return (
    <main
      className='h-[383px] w-[80%] ml-auto mr-auto md:w-[100%] md:mt-16 max-w-[1500px] pr-0 md:pl-[50px] text-dark-slate-grey'
    >

      { errors.length > 0 && errors.map(err => <p>{err}</p>)}
      <div className='flex flex-col justify-start w-1/5'>
        <input 
          autoFocus={true}
          value={formState.name.value}
          onChange={(e) => onChangeHandler("name", e.target.value)}
          type="text" placeholder="Name" className="px-3 py-2 border border-gray-500 rounded-md" />
        <input 
          autoFocus={true}
          value={formState.email.value}
          onChange={(e) => onChangeHandler("email", e.target.value)} type="text" placeholder="Email" className="mt-4 px-3 py-2 border border-gray-500 rounded-md" />
        <input value={formState.password.value} 
          onChange={(e) => onChangeHandler("password", e.target.value)} type="password" placeholder="Password" className="mt-3 px-3 py-2 border border-gray-500 rounded-md" />
        <input 
          onChange={(e) => onChangeHandler("confirmPassword", e.target.value)}
          value={formState.confirmPassword.value} type="password" placeholder="Confirm Password" className="mt-3 px-3 py-2 border border-gray-500 rounded-md" />
        <button onClick={handleSubmit} className='p-2 bg-medium-sea-green mt-4 rounded-md w-1/3'>Submit</button>
      </div>

    </main>
  )
};

export default Register;