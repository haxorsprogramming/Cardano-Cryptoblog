var myArray = [];

axios.get("http://127.0.0.1:7001/api/post/data/get/all").then(function (res) {
    console.log(res.data);
    
    let dataPost = res.data.dataPost;
    dataPost.forEach(renderPost);
    function renderPost(item, index){
        let dataPostArray = {}
        dataPostArray.judul = dataPost[index].judul;
        dataPostArray.img = dataPost[index].img
        dataPostArray.short_deks = dataPost[index].short_deks;
        dataPostArray.slug = dataPost[index].slug;
        dataPostArray.writer = dataPost[index].writer;
        myArray.push(dataPostArray);
    }
    console.log(myArray);
});


setTimeout(function(){

    let post = (
        <div>
          {myArray.map((name) => (
            <div class="gdlr-core-item-list gdlr-core-blog-full  gdlr-core-item-mglr gdlr-core-style-left">
              <div class="gdlr-core-blog-thumbnail-wrap clearfix">
                <div class="gdlr-core-blog-thumbnail gdlr-core-media-image  gdlr-core-opacity-on-hover gdlr-core-zoom-on-hover">
                  <a href="javascript:void(0)">
                    <img
                      src="https://source.unsplash.com/1000x486/?computer"
                      width="1000"
                      height="486"
                      title="pexels-photo-871053"
                    />
                  </a>
                </div>
                <a
                  href="javascript:void(0)"
                  class="zilla-likes"
                  id="zilla-likes-6613"
                  title="Like this"
                >
                  <span class="zilla-likes-count">261</span>{" "}
                  <span class="zilla-likes-postfix"></span>
                </a>
              </div>
              <div class="gdlr-core-blog-full-content-wrap">
                <div class="gdlr-core-blog-full-head clearfix">
                  <div class="gdlr-core-blog-full-head-right">
                    <h3
                      class="gdlr-core-blog-title gdlr-core-skin-title"
                      id="h3_2207_3"
                    >
                      <a href={name.slug}>{name.judul}</a>
                    </h3>
                    <div class="gdlr-core-blog-info-wrapper gdlr-core-skin-divider">
                      <span class="gdlr-core-blog-info gdlr-core-blog-info-font gdlr-core-skin-caption gdlr-core-blog-info-author">
                        <img
                          alt
                          src="/blog_asset/upload/avatar.jpeg"
                          class="avatar avatar-50 photo"
                          height="50"
                          width="50"
                        />
                        <a href="javascript:void(0)" title="Posts by Jane Smith" rel="author">
                        {name.writer}
                        </a>
                      </span>
                      <span class="gdlr-core-blog-info gdlr-core-blog-info-font gdlr-core-skin-caption gdlr-core-blog-info-date">
                        <a href="javascript:void(0)">November 3, 2019</a>
                      </span>
                      <span class="gdlr-core-blog-info gdlr-core-blog-info-font gdlr-core-skin-caption gdlr-core-blog-info-category">
                        <a href="javascript:void(0)" rel="tag">
                          Travel
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="gdlr-core-blog-content">
                {name.short_deks}
                </div>
                <div
                  class="gdlr-core-social-share-item gdlr-core-item-pdb  gdlr-core-left-align gdlr-core-social-share-left-text gdlr-core-style-plain"
                  id="div_2207_3"
                >
                  <span class="gdlr-core-social-share-wrap">
                    <a
                      class="gdlr-core-social-share-facebook"
                      href="javascript:void(0)"
                      target="_blank"
                      id="a_2207_0"
                    >
                      <i class="fa fa-facebook"></i>
                    </a>
                    <a
                      class="gdlr-core-social-share-google-plus"
                      href="javascript:void(0)"
                      target="_blank"
                      id="a_2207_1"
                    >
                      <i class="fa fa-google-plus"></i>
                    </a>
                    <a
                      class="gdlr-core-social-share-pinteres"
                      t
                      href="javascript:void(0)"
                      target="_blank"
                      id="a_2207_2"
                    >
                      <i class="fa fa-pinterest-p"></i>
                    </a>
                    <a
                      class="gdlr-core-social-share-stumbleupon"
                      href="javascript:void(0)"
                      target="_blank"
                      id="a_2207_3"
                    >
                      <i class="fa fa-stumbleupon"></i>
                    </a>
                    <a
                      class="gdlr-core-social-share-twitter"
                      href="javascript:void(0)"
                      target="_blank"
                      id="a_2207_4"
                    >
                      <i class="fa fa-twitter"></i>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
      
      ReactDOM.render(post, document.getElementById("app"));

}, 400);



