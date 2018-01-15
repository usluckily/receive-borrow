/**
 * Created by Administrator on 2017/7/11.
 */
// var arr = [10,4,5]
// console.log(arr['length'])

var x = new Date('2017-08-14 03:47').getTime() , y = new Date('2017-08-14 03:48').getTime()

console.log(x)
console.log(y)
console.log('2017-08-14 03:47'.replace(/-/g,'/'))


var str = '%7B%220%22%3A%22Hello%20from%20JS%20button%22%2C%221%22%3A%22haha%22%7D' , str2 = '阿斯顿'
console.log(decodeURI(str))

  var obj = {
    a:{

    }
  };

var test = 'a';

var m = 'xxx'

var code = 'console.log(obj[test])';

(obj[test])[m] = function(){
  console.log('asdkjgakjdk1827389123kjsahskjdf')
};

// (obj['a'])['a'] = function a(){
//   console.log('asdafsdafsjdgajshdgjs')
//   };



  // console.log( obj[test][m] )
function aaa(){
    console.log(arguments.callee.name)
}
aaa()
