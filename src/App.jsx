import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { UserContext } from './context/UserContext'

function App() {
 
  const {user, toggleLogin, changeStatus} = useContext(UserContext)

  return (
    <div className="App">
      <h1>Unser Chatroom</h1>
      <div>
        <button onClick={() => toggleLogin()}>{user.isLoggedIn ? 'Logout' : 'Login'}</button>
        {
          user.isLoggedIn && 
          <>
            <h4>{user.name} ist eingeloggt</h4>
            <ul>
              {user.friends.map((el,index) => {
                return (
                <li key={el.friends_id}>
                    <span className={`indicator ${el.isOnline ? 'online' : 'offline' }`} />
                    {el.name} 
                    <button onClick={() => changeStatus(el.friends_id)}>
                        {el.isOnline ? 'change to offline' : 'change to online'} 
                    </button>
                </li>)
              })}
            </ul>
          </>
        }
      </div>
    </div>
  )
}

export default App
