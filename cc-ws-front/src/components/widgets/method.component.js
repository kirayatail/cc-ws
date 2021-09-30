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
      return <input type="number" min={method.min} max={method.max} className="text-input" onChange={evt => send(parseInt(evt.target.value))} value={method.value}/>
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
    if (method.type === 'dropdown') {
      return (
        <select className="text-input" onChange={evt => send(evt.target.value)} value={method.value}>
          {method.options.map(opt => (
            <option value={opt}>{opt}</option>
          ))}
        </select>
      )
    }

    if (method.type === 'slider') {
      return <input type="range" className="text-input" min={method.min ?? 0} max={method.max ?? 10} step="1"  onInput={evt => send(evt.target.value)} value={method.value} />
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