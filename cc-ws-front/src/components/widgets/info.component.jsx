function progress(props) {
  const progressWidth =
    ((props.value - props.min) / (props.max - props.min)) * 100;
  const targetWidth =
    ((props.target - props.min) / (props.max - props.min)) * 100;
  return (
    <div className="info-progress">
      <div className="mask">
        <div className="bar" style={{ width: `${progressWidth}%` }}></div>
      </div>
      {props.target !== undefined && (
        <div
          className="target"
          style={{
            left: `calc(${targetWidth}% - ${(6 * targetWidth) / 100}px)`,
          }}
        ></div>
      )}
    </div>
  );
}

export default function Info({ info }) {
  const buildInfo = (i) => {
    if (i.type === "number") {
      return <div className="info-value">{i.value.toFixed(2)}</div>;
    }
    if (i.type === "warning") {
      return <div className={`info-warning${i.value ? " active" : ""}`}></div>;
    }
    if (i.type === "progress") {
      return progress(i);
    }
    return <div className="info-value">{i.value}</div>;
  };
  return (
    <div className="info-item">
      <label>{info.key}</label>
      {buildInfo(info)}
    </div>
  );
}
