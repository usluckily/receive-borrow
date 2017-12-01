/**
 * Created by Administrator on 2017/6/19.
 */
let host='' //http://120.24.178.171:8080

export default{
  host:host,
  getStatus:host+'/school/itemManagementManage_listItemManagement.do?method=getItemManagementCountMobile',
  getList:host+'/school/itemManagementManage_listItemManagement.do?method=getItemManagementListMobile',
  getBase:host+'/school/itemManagementManage_listItemManagement.do?method=getItemManagementBasicDataMobile',
  addData:host+'/school/itemManagementManage_addItemManagement.do?method=addItemManagementMobile',
  updateData:host+'/school/itemManagementManage_updateItemManagement.do?method=updateItemManagementMobile',
  approveData:host+'/school/itemManagementManage_updateItemManagement.do?method=approveItemManagementMobile',
  updateDataStatus:host+'/school/itemManagementManage_updateItemManagement.do?method=updateItemManagementStatusMobile',
  getDataDetails:host+'/school/itemManagementManage_listItemManagement.do?method=getItemManagementCommentMobile',
  fuzzyQuery:host+'/school/itemManagementManage_listItemManagement.do?method=seacherGoodsManagementMobile',
  searchDandC:host+'/school/itemManagementManage_listItemManagement.do?method=seacherDeptAndClassMobile',
  searchItemType:host+'/school/itemManagementManage_listItemManagement.do?method=seacherItemTypeMobile',
  leaveMsg:host+'/school/itemManagementManage_updateItemManagement.do?method=addItemManagementApproveCommentMobile',
  getApproverLv:host+'/school/approverManage_list.do?method=getNextApproverMobile&sid=41',


  //new borrow module
  getSiteList:host+'/school/applyVenue_getListApplyVenue.do?method=toClientList',
  getSiteBase:host+'/school/applyVenue_getListApplyVenue.do?method=toClientAdd',
  addSite:host+'/school/applyVenue_getListApplyVenue.do?method=clientAddApplyVenue',
  changeSiteApproveman:host+'/school/applyVenue_getListApplyVenue.do?method=toClientApply',
  siteApprove:host+'/school/applyVenue_getListApplyVenue.do?method=clientApply',
  getSiteApprLevel:host+'/school/applyVenue_getListApplyVenue.do?method=clientNextUser',
  getSiteDetails:host+'/school/applyVenue_getListApplyVenue.do?method=toClientApply',

  getBusList:host+'/school/schoolBusApplyFor_clientSchoolBusApplyFor.do?method=toClientList',
  getBusBase:host+'/school/schoolBusApplyFor_clientSchoolBusApplyFor.do?method=toClientAdd',
  addBus:host+'/school/schoolBusApplyFor_clientSchoolBusApplyFor.do?method=clientAddSchoolBusApplyFor',
  getBusapprLevel:host+'/school/schoolBusApplyFor_clientSchoolBusApplyFor.do?method=clientNextUser',
  busApprove:host+'/school/schoolBusApplyFor_clientSchoolBusApplyFor.do?method=clientSchoolBusApplyFor',
  getBusDetails:host+'/school/schoolBusApplyFor_clientSchoolBusApplyFor.do?method=toClientApply'
}
