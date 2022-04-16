const Home = () => {
  return (
    <div className="solar-system">
      <div className="blue" onClick={() => console.log('click blue')}></div>
      <div
        className="blue-planet"
        onClick={() => console.log('click blue')}
      ></div>
      <div className="red" onClick={() => console.log('click red')}></div>
      <div
        className="red-planet"
        onClick={() => console.log('click red')}
      ></div>
    </div>
  )
}

export default Home
