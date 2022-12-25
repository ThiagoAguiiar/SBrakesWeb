import React from "react"

// Hook para guardar dados no LocalStorage
export const useLocalStorage = (key, inicial) => {
  const [user, setUser] = React.useState(() => {
    const local = window.localStorage.getItem(key)
    return local ? local : inicial
  })

  React.useEffect(() => {
    window.localStorage.setItem(key, user)
  }, [key, user])

  return [user, setUser]
}