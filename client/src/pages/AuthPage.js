import React, {useEffect,useState} from "react"
import {useHttp} from '../hooks/http.hook'

export const AuthPage = () =>{
  const {loading, request, error} = useHttp()
  const [form, setForm] = useState({initialState:{
    email: '', password: ''
  }})

  useEffect(() => {

  },[error])
  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register','POST',{...form})
      console.log('Data', data);
    } catch (e) {}
  }

  return(
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Gachi Club</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизація</span>
            <div className="input-field">
              <input
                placeholder="Введіть ваш email"
                id="email"
                type="text"
                name="email"
                className="yellow-input"
                onChange={changeHandler} />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
              <input
                placeholder="Введіть ваш пароль"
                id="password"
                type="password"
                name="password"
                className="yellow-input"
                onChange={changeHandler} />
              <label htmlFor="password">Пароль</label>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{marginRight: 10}}
              disabled={loading}>
            Увійти
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}>
            Зареєструватись
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
