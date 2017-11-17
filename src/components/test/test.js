/**
 * Created by Administrator on 2017/11/14.
 */
let arr = [1,5,61,3,4,23,5]

function _set(x){

  let arrCardinality = parseInt(Math.random()*x.length) , num = x[arrCardinality]

  console.log(num)

  x.forEach(function(i){
    if(x[i] > num){
      
    }
  })

}
_set(arr)
