import logo from './logo.svg'
import './style/App.css'

function App() {
  return (
    <div className="App">
      <div className="logo-wrapper" onClick={() => console.log('click big')}>
        <div onClick={() => console.log('click little')}>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div onClick={() => console.log('click big')}>
          <img src={logo} className="App-logo-2" alt="logo" />
        </div>
      </div>
      <div className="square_wrapper">
        <div className="blue"></div>
        <div className="red" onClick={() => console.log('click big')}></div>
      </div>
    </div>
  )
}

export default App
