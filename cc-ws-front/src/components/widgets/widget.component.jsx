import Method from "./method.component";
import Info from "./info.component";

export default function Widget({ widget }) {
  return (
    <div className="widget">
      <h3>
        {widget.type} {widget.id}
      </h3>
      {widget.info && (
        <div className="widget-info">
          {widget.info.map((i) => (
            <Info key={`${widget.id}-info-${i.key}`} info={i} />
          ))}
        </div>
      )}
      {widget.methods &&
        widget.methods.map((m) => (
          <Method
            key={`${widget.id}-method-${m.key}`}
            id={widget.id}
            method={m}
          />
        ))}
    </div>
  );
}
