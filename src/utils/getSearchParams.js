/**
 *
 * @authors liwb (you@example.org)
 * @date    2018/8/9 10:30
 * @version $ IIFE
 */

/* name module */

export default function getSearchParams(search = window.location.search, name) {
  // 构造一个含有目标参数的正则表达式对象
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  // 匹配目标参数
  var r = search.substr(1).match(reg);

  if (r !== null) return decodeURIComponent(r[2]);

  return null;
}
