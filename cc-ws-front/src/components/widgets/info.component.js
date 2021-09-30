
export default function Info({info}) {
  const buildInfo = (i) => {
    if (i.type === 'number') {
      console.log(i)
      return (<div className="info-value">
        {i.value.toFixed(2)}
      </div>)
    }
    if (i.type === 'warning') {
      return <div className={`info-warning${i.value ? ' active' : ''}`}></div>
    }
    return (<div className="info-value">{i.value}</div>)
  }
  return (
    <div className="info-item">
      <label>{info.key}</label> 
      {buildInfo(info)}
    </div>
  )
}