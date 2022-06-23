var postData = {};

console.log(slug);

axios.get("http://127.0.0.1:7001/api/post/" + slug).then(function (res) {
  console.log(res.data);
  document.querySelector("#capTitle").innerHTML = res.data.judul;
  postData.isi = res.data.isi;
});

class Header extends React.Component {
  constructor() {
    super();
    // membuat objek state
    this.state = {
      title: "Belajar Reactjs",
      subTitle: "Panduan step-by-step Reactjs untuk pemula",
    };
  }

  render() {
    return <div></div>;
  }
}
ReactDOM.render(<Header />, document.getElementById("app"));
