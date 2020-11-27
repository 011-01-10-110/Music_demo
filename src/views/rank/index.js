import React from "react";
// 引入接口
import { getHotrank } from "../../utils/axios/";
// 引入样式
import "../../assets/css/rank.css";
class Rank extends React.Component {
  constructor() {
    super();
    this.state = {
      rankList: [],
    };
  }
  componentDidMount() {
    // 获取榜单
    getHotrank({ id: 3778678 }).then((res) => {
      let rankList = res.data.playlist.tracks.slice(0, 20);
      // console.log(rankList);
      this.setState({
        rankList,
      });
    });
  }
  onPlay(id) {
    this.props.history.push("/play?id=" + id);
  }
  render() {
    return (
      <div className="rank">
        <div className="hotop">
          <div className="hotopct">
            <div className="u-hmsprt hoticon"></div>
            <div className="hottime">更新日期：11月19日</div>
          </div>
        </div>
        <ul className="rankList">
          {this.state.rankList.map((item, index) => {
            return (
              <li
                className="m-sgitem"
                key={item.id}
                onClick={this.onPlay.bind(this, item.id)}
              >
                <div className={index < 3 ? "sgfl sgfl-cred" : "sgfl"}>
                  {index + 1 >= 10 ? index + 1 : "0" + (index + 1)}
                </div>
                <div className="sgfr f-bd f-bd-btm">
                  <div className="sgchfl">
                    <div className="f-thide sgtl">
                      {item.name}
                      {item.alia.length === 0 ? '' : <span className='sgalia'>({item.alia[0]})</span>}
                    </div>
                    <div className="f-thide sginfo">
                      {parseInt(index) === 3 ? (
                        ""
                      ) : (
                        <i className="u-hmsprt sghot"></i>
                      )}
                      {item.ar.map((arItem, arIndex) => {
                        return (
                          <span key={arItem.id}>
                            {arItem.name}
                            {arIndex === item.ar.length - 1 ? "" : " / "}
                          </span>
                        );
                      })}{" "}
                      - {item.al.name}
                    </div>
                  </div>
                  <div className="sgchfr">
                    <span className="u-hmsprt sgchply"></span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Rank;