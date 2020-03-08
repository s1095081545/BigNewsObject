/* 沙箱模式 */
(function(w) {
  // ajax设置
  $.ajaxSetup({
    //   请求头
    headers: { Authorization: localStorage.getItem("token") },
    // 请求开始前
    beforeSend: function() {
      if (window.parent.NProgress) parent.NProgress.start();
    },
    // 请求完成后
    complete: function() {
      if (window.parent.NProgress) parent.NProgress.done();
    },
    error: function(res) {
      // 没有登录才跳转到登录页
      if(res.status===0){
        alert('网络错误，请刷新重试');
      }else if (res.status === 403) {
        alert("数据错误，请重新登录");
        parent.location.href = "./login.html";
      } else {
        alert("请求错误，请刷新页面");
      }
    }
  });
  // 模态框自动隐藏
  w.modalHide=function(time=2000){
    this.setTimeout(function(){
      $('.modal').modal('hide');
    },time);
  }

  // 请求地址
  var baseURL = "http://localhost:8080/api/v1";
  var BigNew = {
    baseURL: baseURL, //基地址
    user_login: baseURL + "/admin/user/login", //用户登录
    user_info: baseURL + "/admin/user/info", //用户信息
    user_detail: baseURL + "/admin/user/detail", //用户详情
    user_edit: baseURL + "/admin/user/edit", //用户编辑
    category_list: baseURL + "/admin/category/list", //文章类别查询
    category_add: baseURL + "/admin/category/add", //文章类别新增
    category_search: baseURL + "/admin/category/search", //文章类别搜索
    category_edit: baseURL + "/admin/category/edit", //文章类别编辑
    category_delete: baseURL + "/admin/category/delete", //文章类别删除
    article_query: baseURL + "/admin/article/query", //文章搜索
    article_publish: baseURL + "/admin/article/publish", //文章发布
    article_search: baseURL + "/admin/article/search", //文章信息查询
    article_edit: baseURL + "/admin/article/edit", //文章编辑
    article_delete: baseURL + "/admin/article/delete", //文章删除
    comment_search: baseURL + "/admin/comment/search", //文章评论列表
    comment_pass: baseURL + "/admin/comment/pass", //文章评论通过
    comment_reject: baseURL + "/admin/comment/reject", //文章评论不通过
    comment_delete: baseURL + "/admin/comment/delete", //文章评论删除
    data_info: baseURL + "/admin/data/info", //获取统计数据
    data_article: baseURL + "/admin/data/article", //日新增文章数量统计
    data_category: baseURL + "/admin/data/category", //各类型文章数量统计
    data_visit: baseURL + "/admin/data/visit", //日文章访问量
  };

  //暴露接口
  w.BigNew = BigNew;
})(window);
