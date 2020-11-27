import React from "react";

import "../assets/css/play.css";
import Img from "../assets/images/needle-ip6.png";
import $ from 'jquery';
import axios from "axios";
import { getsongDetail, getLyric, getsongUrl } from "../utils/axios/";
// 引入querystring
import Qs from "querystring";
class Play extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      songList: [],
      al: {},
      ar: [],
      lyric: {},
      songUrl: "",
      playTime: "00:00",
      flag: false,
    };
    //创建一个播放器的ref
    this.audio = React.createRef();
    //创建一个播放图表的ref
    this.playIcon = React.createRef();
  }
  //   挂载
  componentDidMount() {
    // 引入querystring方式解析url
    let id = Qs.parse(this.props.location.search.slice(1)).id;
    this.setState({
      id,
    });

    axios
      .all([getsongDetail({ ids: id }), getLyric({ id }), getsongUrl({ id })])
      .then(
        axios.spread((res1, res2, res3) => {
          // 歌曲
          // console.log(res1);
          // 歌词
          // console.log(res2);
          let lyric = res2.data.lrc.lyric;
          let reg = /\[(.*?)](.*)/g;
          let obj = {};
          lyric.replace(reg, (a, b, c) => {
            b = b.slice(0, 5);
            obj[b] = c;
          });
          lyric = obj;
          // 获取歌曲url
          console.log(res3);
          this.setState(
            {
              songList: res1.data.songs[0],
              al: res1.data.songs[0].al,
              ar: res1.data.songs[0].ar,
              lyric,
              songUrl: res3.data.data[0].url,
            },
            () => {
              //实时监听播放器的变化 ontimeupdate属性
              // console.log(this.audio.current);
              let audio = this.audio.current;
              audio.ontimeupdate = () => {
                let nowTime = this.formateTime(audio.currentTime);
                //剔除掉没有歌词的播放器时间
                if (nowTime in this.state.lyric) {
                  //去设置播放时间
                  this.setState(
                    {
                      playTime: nowTime,
                    },
                    () => {
                      //调取歌词滚动的方法
                      this.moveLyric();
                    }
                  );
                }
              };
            }
          );
        })
      );
  }

  //封装一个事件格式化的方法
  formateTime(timer) {
    let minutes = (Math.floor(timer / 60) + "").padStart(2, "0");
    let seconds = (Math.floor(timer % 60) + "").padStart(2, "0");
    return `${minutes}:${seconds}`;
  }
  //歌词滚动
  moveLyric() {
    let active = document.getElementsByClassName("active")[0];
    let index = $(".geci_box").children().index(active);
    let offSet = 31;
    if (active.offsetTop > 31) {
      //更改它位置
      $(".geci_box").css("transform", `translateY(-${index * offSet}px)`);
    }
  }
  //创建一个播放事件
  toPlay() {
    this.setState(
      {
        flag: !this.state.flag,
      },
      () => {
        if (this.state.flag) {
          //如果flag是真 代表暂停 出现图标 ，音乐停止
          this.playIcon.current.style.display = "block";
          this.audio.current.pause();
        } else {
          //如果flag是假 代表播放 没有图标 ，音乐正在播放
          this.playIcon.current.style.display = "none";
          this.audio.current.play();
        }
      }
    );
  }
  render() {
    return (
      <div className="play">
        <div className="play_top">
          <img src={Img} alt="" />
        </div>
        <div className="play_img_all" onClick={this.toPlay.bind(this)}>
          <i ref={this.playIcon} className="play_icon"></i>
          <div className="play_img_box">
            <div className="small_img">
              <img src={this.state.al.picUrl} alt="" />
            </div>
          </div>
        </div>
        <div className="play_txt">
          <div className="play_txt_name">
            {this.state.songList.name} -{" "}
            {this.state.ar.map((item, index) => {
              return <span key={index}>{item.name}</span>;
            })}
          </div>
          <div className="play_txt_geci">
            <div className="geci_box">
              {Object.entries(this.state.lyric).map((item, index) => {
                // console.log(item);
                if (this.state.playTime === item[0]) {
                  return (
                    <p key={index} className="active">
                      {item[1]}
                    </p>
                  );
                } else {
                  return <p key={index}>{item[1]}</p>;
                }
              })}
            </div>
          </div>
        </div>
        <div className="audio_box">
          <audio ref={this.audio} src={this.state.songUrl} autoPlay></audio>
        </div>
      </div>
    );
  }
}

export default Play;
