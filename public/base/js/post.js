var postData = {};

console.log(slug);

axios.get("http://127.0.0.1:7001/api/post/" + slug).then(function (res) {
  console.log(res.data);
  document.querySelector("#capTitle").innerHTML = res.data.judul;
  postData.isi = res.data.isi;
});

setTimeout(function(){
  class Header extends React.Component {
    constructor() {
      super();
      // membuat objek state
      this.state = {
        title: "Belajar Reactjs",
        subTitle: postData.isi,
      };
    }
  
    render() {
      return <div>
        <p style={{ textAlign:"justify" }}>{this.state.subTitle}</p>
      </div>;
    }
  }
  ReactDOM.render(<Header />, document.getElementById("app"));
}, 400);

