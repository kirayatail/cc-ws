import Method from './method.component'

export default function Widget({widget}) {
  return (
    <div className="widget">
      <h3>{widget.type} {widget.id}</h3>
      {widget.methods &&
        widget.methods.map(m => (
          <Method id={widget.id} method={m} /> 
        ))
      }
    </div>
  )
}