import React from "react";
// 引入样式
import "../assets/css/list.css";
import qs from "querystring";

import { getDetail } from "../utils/axios/";
class List extends React.Component {
  constructor() {
    super();
    this.state = {
      playList: {},
      creator: {},
      tracks: [],
    };
  }
  componentDidMount() {
    let id = qs.parse(this.props.location.search.slice(1)).id;
    getDetail({ id }).then((res) => {
      console.log(res);
      let playList = res.data.playlist;
      let creator = res.data.playlist.creator;
      let tracks = res.data.playlist.tracks;
      this.setState({
        playList,
        creator,
        tracks,
      });
    });
  }
  render() {
    const { coverImgUrl, name, playCount } = this.state.playList;
    return (
      <div className="list">
        <div className="header">
          <div className="header-fl">
            <img className="header-img" src={coverImgUrl} alt="" />
            <span className="lsthd_icon">歌单</span>
            <i className="u-earp lsthd_num">
              {(playCount / 10000).toFixed(1)}万
            </i>
          </div>
          <div className="header-fr">
            <h2 className="header-title">{name}</h2>
            <div className="userInfo">
              <img
                className="userimg"
                src={this.state.creator.avatarUrl}
                alt=""
              />
              {this.state.creator.nickname}
            </div>
          </div>
        </div>

        <div className="pylst_list">
          <h3 className="u-smtitle">歌曲列表</h3>
          <div className="m-sglst">
            {this.state.tracks.map((item, index) => {
              return (
                <div className="m-sgitem" key={item.id} onClick={()=>this.props.history.push('play?id='+item.id)}>
                  <div className="sgfl">{index+1}</div>
                  <div className="sgfr f-bd f-bd-btm">
                    <div className="sgchfl">
                      <div className="f-thide sgtl">{item.name}</div>
                      <div className="f-thide sginfo">
                        {item.ar.map((arItem,aridx)=>{
                          return (
                            <span key={aridx}>
                              {
                                arItem.name
                              }
                              {
                                item.ar.length - 1 === aridx ? '' : ' / '
                              }
                            </span>
                          )
                        })}
                        {' - ' + item.al.name}
                      </div>
                    </div>
                    <div className="sgchfr">
                      <span className="u-hmsprt sgchply"></span>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="more-holder"></div>
            <div className="more-wrap f-fcc">
              <div className="more-text">查看更多歌曲，请下载客户端</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
