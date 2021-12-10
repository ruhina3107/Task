module.exports = function (app)
{


 const basePath = '/api'
 const bizSdk = require('facebook-nodejs-business-sdk');
 const AdAccount = bizSdk.AdAccount;
 const Campaign = bizSdk.Campaign;
 const AdSet = bizSdk.AdSet;
 const AdCreative = bizSdk.AdCreative;
 const Ad = bizSdk.Ad;
 const AdPreview = bizSdk.AdPreview;
 
 let access_token = 'EAAXYEyJaMHIBAFeJZBbqPc1Qixt329H9DpigoZBiZA9I65Gx6f4WJG9A9gKczXdikHIsyMwzgZAaCes0CVGSPhmKCNxTvUffaLvROwoqmBNnLj3fQdTcVWQg0kXZAd5SstMPydl39dS51HNP7wx8uZB8ZAZA1SSiv0BZAR3HbHGBpCtRXC7ljZBsDXnbjEILkES9IZD';
 let ad_account_id = 'act_438997031176787';
 let app_secret = 'd7cf981fc7f957a4c28780a760f27bdb';
 let page_id = '102532404824749';
 let app_id = '1644951575867506';
 const api = bizSdk.FacebookAdsApi.init(access_token);
 const account = new AdAccount(ad_account_id);
 const showDebugingInfo = true; // Setting this to true shows more debugging info.
 if (showDebugingInfo) {
   api.setDebug(true);
 }
 
 let campaign;
 let campaign_id;
 let ad_set;
 let ad_set_id;
 let creative;
 let creative_id;
 let ad;
 let ad_id;
 let adpreview;
 let adpreview_id;
 
 const logApiCallResult = (apiCallName, data) => {
   console.log(apiCallName);
   if (showDebugingInfo) {
     console.log('Data:' + JSON.stringify(data));
   }
 };
 
 const fields = [
 ];
 const params = {
   'name' : 'My Campaign',
   'buying_type' : 'AUCTION',
   'special_ad_categories':'NONE',
   'objective' : 'PAGE_LIKES',
   'status' : 'PAUSED',
 };
 campaign =  (new AdAccount(ad_account_id)).createCampaign(
   fields,
   params
 
 );
 console.log("I connected")
 
 app.post(`${basePath}/login`, (req, res) => {
   console.log(req)
    campaign
  
 .then((result) => {
   logApiCallResult('campaign api call complete.', result);
   campaign_id = result.id;
   const fields = [
   ];
   const params = {
     'name' : 'My AdSet',
     'optimization_goal' : 'PAGE_LIKES',
     'billing_event' : 'IMPRESSIONS',
     'bid_amount' : '20',
     'promoted_object' : {'page_id': page_id},
     'daily_budget' : '1000',
     'campaign_id' : campaign_id,
     'targeting' : {'geo_locations':{'countries':['US']}},
     'status' : 'PAUSED',
   };
   return (new AdAccount(ad_account_id)).createAdSet(
     fields,
     params
   );
 })
 .then((result) => {
   logApiCallResult('ad_set api call complete.', result);
   ad_set_id = result.id;
   const fields = [
   ];
   const params = {
     'name' : 'My Creative',
     'object_id' : page_id,
     'title' : 'My Page Like Ad',
     'body' : 'Like My Page',
     'image_url' : 'http://tia.lagoontechcloud.com:3000/public/public/uploads/provider/tia1.jpg',
   };
   return (new AdAccount(ad_account_id)).createAdCreative(
     fields,
     params
   );
 })
 .then((result) => {
   logApiCallResult('creative api call complete.', result);
   creative_id = result.id;
   const fields = [
   ];
   const params = {
     'name' : 'My Ad',
     'adset_id' : ad_set_id,
     'creative' : {'creative_id':creative_id},
     'status' : 'PAUSED',
   };
   return (new AdAccount(ad_account_id)).createAd(
     fields,
     params
   );
 })
 .then((result) => {
   logApiCallResult('ad api call complete.', result);
   ad_id = result.id;
   const fields = [
   ];
   const params = {
     'ad_format' : 'DESKTOP_FEED_STANDARD',
   };
   return (new Ad(ad_id)).getPreviews(
     fields,
     params
   );
 })
 .then((result) => {
   logApiCallResult('adpreview api call complete.', result);
   adpreview_id = result[0].id;
 })
 .catch((error) => {
   console.log(error);
 });
 
})
}