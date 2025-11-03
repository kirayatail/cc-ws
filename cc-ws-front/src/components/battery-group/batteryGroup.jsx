import Info from "../widgets/info.component";
export default function BatteryGroup({widgets, group}) {
  const bats = widgets.filter(w => w.type === 'batmon');
  
  function sumProp(list, prop) {
    return list.map(b => {
      if (!b.info) {
        return 0
      }
      return b.info.find(i => i.key === prop)?.value || 0
    }).reduce((a,b) => a+b)
  }

  if (bats.length === 0) {
    return null
  }
  return (
    <div className="widget">
      <h3>{group}</h3>
      <div className="widget-info">
        <Info info={{type: 'number', key: 'Percent', value: (sumProp(bats, 'stored') * 100 / sumProp(bats, 'total'))}} />
      </div>
    </div>
  )
}