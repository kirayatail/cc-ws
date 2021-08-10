import { useDispatch } from "react-redux";
import { sendMessage } from "../../socket.slice";

export default function Method({id, method}) {
  const dispatch = useDispatch();
  const send = (value) => {
    const message = {
      type: 'command',
      id,
      payload: {
        key: method.key,
        value
      }
    };
    dispatch(sendMessage(message));
  }
  const buildMethod = (method) => {
    if (method.type === 'number') {
      return <input type="number" className="text-input" onChange={evt => send(parseInt(evt.target.value))} value={method.value}/>
    }
    if (method.type === 'radio') {
      return (<div>
        {method.options.map(opt => (
          <div className="method-radio">
            <label htmlFor={`${id}_${method.key}_${opt}`}>{opt}</label>
            <input type="radio" id={`${id}_${method.key}_${opt}`} name={`${id}_${method.key}`} 
            value={opt} checked={opt === method.value} onChange={evt => send(evt.target.value)} />
          </div>
        ))}
      </div>)
    }
    if (method.type === 'text') {
      return (<input type="text" className="text-input" onChange={(evt) => send(evt.target.value)} value={method.value}/>);
    }
    if (method.type === 'toggle') {
      return (
        <button className={"toggle-button" + (method.value ? " active" : "")} 
          onClick={() => send(!method.value)}
        />
      )
    }
    if (method.type === 'void') {
      return (
        <button className="wide-button" onClick={() => send()}>
          {method.name ? method.name : method.key}
        </button>
      )
    }
  }

  return (
    <div className="method">
      {method.type !== 'void' && (
        <label>
          {method.name ? method.name : method.key}
        </label> )}
      {buildMethod(method)}
    </div>
  )
}