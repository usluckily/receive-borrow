/**
 * Created by Administrator on 2017/6/16.
 */
//SZWPGLY 发放人 ， WPLYTY 审批人

let obj = {
  nav:[],
  type:'',
  indexBtnText:'',
  permissions:''
};

let perm;
perm = 'ASD' //SZWPGLY,WPJYTY

if(window.GreenSchool){
  GreenSchool.showLeftBtn(false)
}

function isInArr(c,p){
  let state = false , len = p.length;
  for(var i = 0;i<len;i++){
    c == p[i] ? state = true : '';
  }
  return state;
}

//预加载图片
let img = new Image() , img2 = new Image()
img.src = '../img/remind.png'
img2.src = '../img/remind2.png'
//

export default{
  getBase(type){
    if(type == 'receive'){

      if(window.GreenSchool){
        perm = GreenSchool.getPermissions('WPLY')
      }else if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
        perm = window.iosParams.perm
      }

      if(typeof perm == 'string'){
        perm = perm.split(',')
      }


      // isInArr('WPLYTY',perm) ? obj.permissions = 'WPLYTY' : isInArr('SZWPGLY',perm) ? obj.permissions = 'SZWPGLY' : obj.permissions = ''

      if(isInArr('WPLYTY',perm)){
        obj.permissions = 'WPLYTY'
      }else if(isInArr('SZWPGLY',perm)){
        obj.permissions = 'SZWPGLY'
      }else{
        obj.permissions = ''
      }

      if(obj.permissions == ''){
        obj.showall = 0
      }else{
        obj.showall = 1
      }


      obj.type = '1'
      obj.indexBtnText = '申请领用'
      switch (obj.permissions){
        case 'SZWPGLY':
          obj.nav = [
            {tit:'待发放',id:'2',module:'dff'},
            {tit:'已发放',id:'3',module:'yff'},
            {tit:'我的',id:'frMe',module:'my'},
          ];
          break;
        case 'WPLYTY':
          obj.nav = [
            {tit:'待审批',id:'1',module:'dsp'},
            {tit:'已审批',id:'2',module:'ysp'},
            {tit:'我的',id:'frMe',module:'my'},
          ]
          break;
        default:
          obj.nav = []
          break;
      }
    }else{
      if(window.GreenSchool){
        perm = GreenSchool.getPermissions('WPJY')
      }else if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
        perm = window.iosParams.perm
      }

      if(typeof perm == 'string'){

        perm = perm.split(',')
      }
      // isInArr('WPLYTY',perm) ? obj.permissions = 'WPLYTY' : isInArr('SZWPGLY',perm) ? obj.permissions = 'SZWPGLY' : obj.permissions = ''

      if(isInArr('WPJYTY',perm)){
        obj.permissions = 'WPJYTY'
      }else if(isInArr('SZWPJYGLY',perm)){
        obj.permissions = 'SZWPJYGLY'
      }else{
        obj.permissions = ''
      }

      if(obj.permissions == ''){
        obj.showall = 0
      }else{
        obj.showall = 1
      }

      obj.type = '2'
      obj.indexBtnText = '申请借用'
      switch (obj.permissions){
        case 'SZWPJYGLY':
          obj.nav = [
            {tit:'待借出',id:'2',module:'djc'},
            {tit:'待归还',id:'4',module:'dgh'},
            {tit:'已归还',id:'5',module:'ygh'},
            {tit:'我的',id:'frMe',module:'my'},
          ];
          break;
        case 'WPJYTY':
          obj.nav = [
            {tit:'待审批',id:'1',module:'dsp'},
            {tit:'已审批',id:'2',module:'ysp'},
            {tit:'我的',id:'frMe',module:'my'},
          ]
          break;
        default:
          obj.nav = []
          break;
      }
    }

    if(obj.nav.length > 0){
      obj.status = obj.nav[0].id//初始status
    }else{
      obj.way = 'frme'
      delete obj.status
    }


    return obj
  },
  obj:obj
}
