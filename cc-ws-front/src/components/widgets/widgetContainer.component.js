import { useSelector } from "react-redux";
import BatteryGroup from "../battery-group/batteryGroup";
import Widget from './widget.component';
import './widgets.style.css';

export function WidgetContainer() {
  const widgets = useSelector((state) => state.widgets);

  function widgetsByGroup(ws) {
    const groups = [...new Set(ws.map(w => w.group).filter(g => g ?? false))];
    return groups.map(g => {
      return {
        group: g,
        widgets: ws.filter(w => w.group === g)
      }
    })
  }
  
  return (
    <div className='widgets-container'>
      {
        [
          widgets.filter(w => !w.hidden).sort((a,b) => a.type.localeCompare(b.type)).map((w, i) => (
            <Widget widget={w} key={i}></Widget>
          )),
          ...widgetsByGroup(widgets).map(g => <BatteryGroup widgets={g.widgets} group={g.group} />)
        ]
      }
    </div>
  )
}