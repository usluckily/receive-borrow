/**
 * Created by Administrator on 2017/7/14.
 */
export default{
  DateDiff:function(d1,d2){
  var day = 24 * 60 * 60 *1000;
  try{
    var dateArr = d1.split("-");
    var checkDate = new Date();
    checkDate.setFullYear(dateArr[0], dateArr[1]-1, dateArr[2]);
    var checkTime = checkDate.getTime();

    var dateArr2 = d2.split("-");
    var checkDate2 = new Date();
    checkDate2.setFullYear(dateArr2[0], dateArr2[1]-1, dateArr2[2]);
    var checkTime2 = checkDate2.getTime();

    var cha = (checkTime - checkTime2)/day;
    return cha;
  }catch(e){
    return false;
  }
},
  dateCompare(d1,d2){
    if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
      d1 = d1.replace(/-/g, '/')
      d2 = d2.replace(/-/g,'/')
    }

    let x = new Date(d1).getTime() , y = new Date(d2).getTime()

    if(x > y){
      return false
    }else{
      return true
    }

  }
}
