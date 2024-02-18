import { useAuth } from '@/hooks/auth'
import { useState } from 'react';
import { trpc } from '@/utils/trpc'

const Login = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<string[]>([])
  const [status, setStatus] = useState(null)


  const { login } = useAuth({ middleware: '', redirectIfAuthenticated: '' })

  const handleSubmit = () => {
    login({
      setErrors,
      setStatus,
      email,
      password
    })

  }

  return (
    <main
      className='h-[383px] w-[80%] ml-auto mr-auto md:w-[100%] md:mt-16 max-w-[1500px] pr-0 md:pl-[50px] text-dark-slate-grey'
    >

      {errors?.length && errors.map((err, ix) => <p key={ix}>{err}</p>)}
      <div className='flex flex-col justify-start w-1/5'>
        <input
          autoFocus={true}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          className="mt-4 px-3 py-2 border border-gray-500 rounded-md" />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="mt-3 px-3 py-2 border border-gray-500 rounded-md" />
        <button onClick={handleSubmit} className='p-2 bg-medium-sea-green mt-4 rounded-md w-1/3'>Submit</button>
      </div>

    </main>
  )
};

export default Login;