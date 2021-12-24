import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Doanh Thu</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">2000000</span> 
          <span className="featuredMoneyRate">
          { }%<ArrowDownward  className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">So với tháng trước</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Đơn hàng</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">10</span>
          <span className="featuredMoneyRate">
            { }%<ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">So với tháng trước</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Người dùng</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">15</span>
          <span className="featuredMoneyRate">
          { }% <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">So với tháng trước</span>
      </div>
    </div>
  );
}
