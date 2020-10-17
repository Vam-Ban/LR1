import {useState,useCallback} from 'react'


export const useHttp = () =>{
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({initialState:null})

  const request = useCallback(async (url, method ='GET', body = null, headers = {}) => {
    setLoading(true)
    try {
      const response = await fetch(url,{method,body,headers})
      const data = await response.json()

      if(!response.ok)
      {
        throw new Error(data.message || 'Щось пішло не так')
      }

      setLoading(false)

      return data
    } catch (e) {
      setLoading(false)
      setError(e.message)
      throw e
    }
  },[])

  const clearError = () => setError(null)
  return {loading, request, error,clearError}
}
