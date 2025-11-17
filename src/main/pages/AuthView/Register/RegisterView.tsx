import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Calendar } from 'primereact/calendar'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { authService } from '../../../../services/AuthService'
import type { UserCredentialRegister } from '../../../../types/UserCredentialRegister'

export const Register = () => {
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState<UserCredentialRegister>({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    birthDate: new Date(),
    registerDate: new Date(),
    email: '',
  }) 

  const [password2, setPassword2] = useState('')

  const validateEmail = () => {
    const email = credentials.email.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateUser = () => credentials.username.length > 3
  const validatePassword = () => credentials.password === password2 && credentials.password !== ''

  const handleRegister = async () => {
    if (!validateUser()) {
      window.alert('El usuario debe tener al menos 4 caracteres.')
      return
    }
    if (!validatePassword()) {
      window.alert('Las contraseñas no coinciden.')
      return
    }
    if (!validateEmail()) {
      window.alert('El email ingresado no es válido.')
      return
    }

    try {
      await authService.register(credentials)
      window.alert('Usuario registrado con éxito.')
      navigate('/login')
    } catch {
      window.alert('Error al registrar el usuario.')
    }
  }

  return (
  <div className="flex justify-content-center align-items-center min-h-screen surface-ground">
    <Card className="p-4 w-full sm:w-20rem">
      <div className="flex flex-column align-items-center mb-3">
        <i className="pi pi-user-plus" style={{ fontSize: '2rem' }}></i>
        <h2>Crea tu cuenta</h2>
      </div>

      <div className="field mb-3">
        <label>Nombre*</label>
        <InputText
          className="w-full"
          value={credentials.firstname}
          onChange={(e) => setCredentials({ ...credentials, firstname: e.target.value })}
        />
      </div>

      <div className="field mb-3">
        <label>Apellido*</label>
        <InputText
          className="w-full"
          value={credentials.lastname}
          onChange={(e) => setCredentials({ ...credentials, lastname: e.target.value })}
        />
      </div>

      <div className="field mb-3">
        <label>Usuario*</label>
        <InputText
          className="w-full"
          maxLength={100}
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
      </div>

      <div className="field mb-3">
        <label>E-mail*</label>
        <InputText
          className="w-full"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        />
      </div>

      <div className="field mb-3">
        <label>Fecha de nacimiento*</label>
        <Calendar
          value={credentials.birthDate}
          onChange={(e) => setCredentials({ ...credentials, birthDate: e.value as Date })}
          showIcon
          className="w-full"
          inputClassName="w-full"
        />
      </div>

      <div className="field mb-3">
        <label>Contraseña*</label>
        <Password
          className="w-full"
          inputClassName="w-full"
          toggleMask
          feedback={false}
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
      </div>

      <div className="field mb-4">
        <label>Reingrese la contraseña*</label>
        <Password
          className="w-full"
          inputClassName="w-full"
          toggleMask
          feedback={false}
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
      </div>

      <Button label="Registrarse" className="w-full p-button-custom-primary" onClick={handleRegister} />

      <p className="text-center mt-3">
        ¿Ya tienes una cuenta? <a href="/login">Inicia Sesión</a>
      </p>
    </Card>
  </div>
)
}
