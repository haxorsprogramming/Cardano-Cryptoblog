var postData = {};

console.log(slug);

axios.get(apiserver+"post/"+slug+"/detail").then(function (res) {
  console.log(res.data);
  document.querySelector("#capTitle").innerHTML = res.data.dataPost[0].judul;
  postData.isi = res.data.dataPost[0].long_deks;
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

