import "./widgetLg.css";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Đơn hàng gần đây</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Khách hàng</th>
          <th className="widgetLgTh">Ngày mua</th>
          <th className="widgetLgTh">Tổng tiền</th>
          <th className="widgetLgTh">Trạng thái</th>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <span className="widgetLgName">Cam</span>
          </td>
          <td className="widgetLgDate">2-12-2021</td>
          <td className="widgetLgAmount">200000</td>
          <td className="widgetLgStatus">
            <Button type="Đang giao" />
          </td>
        </tr>
      </table>
    </div>
  );
}
