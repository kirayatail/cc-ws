import Method from './method.component';
import Info from './info.component';

export default function Widget({widget}) {
  return (
    <div className="widget">
      <h3>{widget.type} {widget.id}</h3>
      {widget.info && (
        <div className="widget-info">
          {widget.info.map((inf, i) => (
            <Info key={i} info={inf} />
          ))}
        </div>
      )}
      {widget.methods &&
        widget.methods.map((m, i) => (
          <Method key={i} id={widget.id} method={m} /> 
        ))
      }
    </div>
  )
}