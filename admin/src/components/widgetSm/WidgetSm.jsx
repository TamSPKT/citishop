import "./widgetSm.css";

export default function WidgetSm() {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Khách hàng gần đây</span>
      <ul className="widgetSmList">
        <li className="widgetSmListItem">
          <div className="widgetSmUser">
            <span className="widgetCus">Khách hàng</span>
          </div><div className="widgetSmUser">
            <span className="widgetSmDate">Ngày tham gia</span>
          </div>
        </li>
        <li className="widgetSmListItem">          
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Cam Cam</span>
          </div>
          <div className="widgetSmUser">
            <span className="widgetSmUsername">20-12-2021</span>
          </div>         
        </li>       
      </ul>
    </div>
  );
}
