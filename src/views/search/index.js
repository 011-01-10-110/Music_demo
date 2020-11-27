import React from "react";
// 引入接口
import { getHotsearch, getSearch, getSuggest } from "../../utils/axios/";
// 引入样式
import "../../assets/css/search.css";
class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchHotList: [],
      suggest: [],
      display: "",
      inputval: "",
      songList: [],
    };
  }
  componentDidMount() {
    getHotsearch().then((res) => {
      let searchHotList = res.data.result.hots;
      this.setState({
        searchHotList,
      });
    });
  }
  // input输入
  onChange(e) {
    if (e.target.value !== "") {
      document.getElementsByClassName("holder")[0].style.display = "none";
      document.getElementsByClassName("u-svg-empty")[0].style.display =
        "inline-block";
      let suggest = [];
      // 获取搜索建议
      getSuggest({ keywords: e.target.value, type: "mobile" }).then((res) => {
        suggest = res.data.result.allMatch;
        this.setState({
          display: "keywords",
          suggest,
          inputval: e.target.value,
        });
      });
    } else {
      this.onReset();
    }
  }
  // 回车
  onEnter(e) {
    if (e.keyCode === 13 && e.target.value !== "") {
      // 获取详情
      getSearch({ keywords: e.target.value }).then((res) => {
        console.log(res);
        let songList = res.data.result.songs;
        this.setState({
          display: "list",
          songList,
        });
      });
    }
  }
  // 点击关键词
  keyClick(keywords) {
    document.getElementsByClassName("input")[0].value = keywords;
    // 获取详情
    getSearch({ keywords }).then((res) => {
      // console.log(res);
      let songList = res.data.result.songs;

      this.setState({
        display: "list",
        songList,
      });
    });
  }

  // 清空input
  onReset() {
    document.querySelector("input[type=search]").value = "";
    document.getElementsByClassName("holder")[0].style.display = "inline-block";
    document.getElementsByClassName("u-svg-empty")[0].style.display = "none";
    this.setState({
      display: "",
    });
  }
  render() {
    return (
      <div className="search">
        <form className="m-input f-bd f-bd-btm" method="get" action="#">
          <div className="inputcover">
            <i className="u-svg u-svg-srch"></i>
            <input
              type="search"
              name="search"
              className="input"
              placeholder=""
              autoComplete="off"
              onKeyUp={this.onEnter.bind(this)}
              onChange={this.onChange.bind(this)}
            />
            <label className="holder">搜索歌曲、歌手、专辑</label>
            <figure className="close">
              <i
                className="u-svg u-svg-empty"
                onClick={this.onReset.bind(this)}
              ></i>
            </figure>
          </div>
        </form>
        <div className="m-default">
          {this.state.display === "" ? (
            <section className="m-hotlist">
              <h3 className="title">热门搜索</h3>
              <ul className="list">
                {this.state.searchHotList.map((item, index) => {
                  return (
                    <li className="item f-bd f-bd-full" key={index}>
                      <div className="link">{item.first}</div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : (
            ""
          )}
          {this.state.display === "keywords" ? (
            <section className="m-recom">
              <h3 className="title f-bd f-bd-btm f-thide">
                搜索“{this.state.inputval}”
              </h3>
              <ul>
                {this.state.suggest.map((item, index) => {
                  return (
                    <li
                      className="recomitem"
                      key={index}
                      onClick={this.keyClick.bind(this, item.keyword)}
                    >
                      <i className="u-svg u-svg-search"></i>
                      <span className="f-bd f-bd-btm f-thide">
                        {item.keyword}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : (
            ""
          )}
          {this.state.display === "list" ? (
            <section>
              <ul>{this.state.songList.map((item) => {
                return (
                  <li key={item.id} onClick={()=>this.props.history.push('/play?id='+item.id)}>
                    {item.name}
                  </li>
                )
              })}</ul>
            </section>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
export default Search;
