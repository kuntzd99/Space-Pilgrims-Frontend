const SolarFlare = (props) => {
  return (
    <div className="flare-info">
      <div>Date & Time: {props.start}</div>
      <div>Class Type: {props.classType}</div>
    </div>
  )
}

export default SolarFlare