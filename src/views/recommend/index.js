import React from "react";
// 引入接口
import axios from "axios";
import { getPersonalized, getNewsong, getBanner } from "../../utils/axios";
// 轮播图
import "swiper/dist/css/swiper.css";
import Swiper from "swiper/dist/js/swiper.min";

// 引入css
import "../../assets/css/recommend.css";

class Recommend extends React.Component {
  constructor() {
    super();
    this.state = {
      songList: [],
      geList: [],
      bannerList: [],
    };
  }
  componentDidMount() {
    // 获取数据
    axios.all([getPersonalized({ limit: 6 }), getNewsong(), getBanner()]).then(
      axios.spread((res1, res2, res3) => {
        // 推荐歌单
        let songList = res1.data.result;
        // 过滤播放量
        songList.forEach((item) => {
          item.playCount = (item.playCount / 10000).toFixed(1);
        });
        // console.log(songList);
        // 推荐歌曲
        let geList = res2.data.result;
        console.log(geList);

        // 轮播图
        // console.log(res3);
        let bannerList = res3.data.banners;
        // 存值
        this.setState({
          songList,
          geList,
          bannerList
        },()=>{
          new Swiper(".swiper-container", {
            loop: true,
            autoplay: true,
            pagination: {
              el: ".swiper-pagination",
            },
          });
        });
      })
    );

  }
  getPlay(id) {
    this.props.history.push("/play?id=" + id);
  }
  render() {
    return (
      <div className="recommend">
        <div className="banner">
          {/* 轮播图 */}
          <div className="swiper-container">
            <div className="swiper-wrapper">
              {this.state.bannerList.map((item) => {
                return (
                  <div className="swiper-slide" key={item.targetId}>
                    <img src={item.imageUrl} alt="" />
                  </div>
                );
              })}
            </div>
            {/* 分页 */}
            <div className="swiper-pagination"></div>
          </div>
        </div>
        <h2 className="remd_tl">推荐歌单</h2>
        <div className="remd_songs">
          <ul className="remd_ul">
            {this.state.songList.map((item) => {
              return (
                <li className="remd_li" key={item.id} onClick={()=>this.props.history.push('/list?id='+item.id)}>
                  <div className="remd_img">
                    <img className="u-img" src={item.picUrl} alt="" />
                    <span className="u-earp remd_lnum">{item.playCount}万</span>
                  </div>
                  <p className="remd_text">{item.name}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <h2 className="remd_tl">最新音乐</h2>
        {/*  */}
        <ul className="m-sglst">
          {this.state.geList.map((item) => {
            return (
              <li
                className="m-sgitem"
                key={item.id}
                onClick={this.getPlay.bind(this, item.id)}
              >
                <div className="sgfr f-bd f-bd-btm">
                  <div className="sgchfl">
                    <div className="f-thide sgtl">
                      {item.name}
                      {item.song.alias.length !== 0 ? (
                        <span className="sgalia">({item.song.alias[0]})</span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="f-thide sginfo">
                      <i className="u-hmsprt sghot"></i>
                      {item.song.artists.map((song, index) => {
                        return (
                          <span key={song.id}>
                            {song.name}
                            {index === item.song.artists.length - 1
                              ? ""
                              : " / "}
                          </span>
                        );
                      })}{" "}
                      - {item.song.album.name}
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
export default Recommend;
