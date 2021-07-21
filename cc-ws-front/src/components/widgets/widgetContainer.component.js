import { useSelector } from "react-redux";
import Widget from './widget.component';
import './widgets.style.css';

export function WidgetContainer() {
  const widgets = useSelector((state) => state.widgets);
  
  return (
    <div className='widgets-container'>
      {
        widgets.map((w, i) => (
          <Widget widget={w} key={i}></Widget>
        ))
      }
    </div>
  )
}