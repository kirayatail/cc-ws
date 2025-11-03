import { useDispatch } from "react-redux";
import { sendMessage } from "../../socket.slice";

export default function Method({ id, method }) {
  const dispatch = useDispatch();

  const elementId = `${id}-method-${method.key}`;
  const send = (value) => {
    const message = {
      type: "command",
      id,
      payload: {
        key: method.key,
        value,
      },
    };
    dispatch(sendMessage(message));
  };
  const buildMethod = (method) => {
    if (method.type === "number") {
      return (
        <input
          id={elementId}
          type="number"
          min={method.min}
          max={method.max}
          className="text-input"
          onChange={(evt) => send(parseInt(evt.target.value))}
          value={method.value}
        />
      );
    }
    if (method.type === "radio") {
      return (
        <div>
          {method.options.map((opt) => (
            <div className="method-radio" key={`${elementId}_${opt}`}>
              <label htmlFor={`${elementId}_${opt}`}>{opt}</label>
              <input
                type="radio"
                id={`${elementId}_${opt}`}
                name={`${id}_${method.key}`}
                value={opt}
                checked={opt === method.value}
                onChange={(evt) => send(evt.target.value)}
              />
            </div>
          ))}
        </div>
      );
    }
    if (method.type === "text") {
      return (
        <input
          type="text"
          id={elementId}
          className="text-input"
          onChange={(evt) => send(evt.target.value)}
          value={method.value}
        />
      );
    }
    if (method.type === "toggle") {
      return (
        <button
          id={elementId}
          className={"toggle-button" + (method.value ? " active" : "")}
          onClick={() => send(!method.value)}
        />
      );
    }
    if (method.type === "void") {
      return (
        <button id={elementId} className="wide-button" onClick={() => send()}>
          {method.name ? method.name : method.key}
        </button>
      );
    }
    if (method.type === "dropdown") {
      return (
        <select
          id={elementId}
          className="text-input"
          onChange={(evt) => send(evt.target.value)}
          value={method.value}
        >
          {method.options.map((opt) => (
            <option key={`${elementId}-opt-${opt}`} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }

    if (method.type === "slider") {
      return (
        <input
          type="range"
          id={elementId}
          className="text-input"
          min={method.min ?? 0}
          max={method.max ?? 10}
          step="1"
          onInput={(evt) => send(evt.target.value)}
          value={method.value}
        />
      );
    }
  };

  return (
    <div className="method">
      {method.type === "void" ? (
        <></>
      ) : method.type === "radio" ? (
        <span>{method.name ? method.name : method.key}</span>
      ) : (
        <label htmlFor={elementId}>
          {method.name ? method.name : method.key}
        </label>
      )}
      {buildMethod(method)}
    </div>
  );
}
