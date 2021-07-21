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
  }

  return (
    <div className="method">
      <label>
        {method.name ? method.name : method.key}
      </label>
      {buildMethod(method)}
    </div>
  )
}