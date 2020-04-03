// import aesjs from 'aes-js';
const aesjs = require('aes-js')
let isEncrypt = true //true为加密，false为不加密
let keyIv={
  rbs :'QIANBIANKEJI2019'.split(''),
  ajc :'2019122520200101'.split('')
}
function encrypt(text,keys,ivs) {
  var textBytes = aesjs.utils.utf8.toBytes(text);
  keys = keys.map(function (item) {
    return item.charCodeAt()
  })
  ivs = ivs.map(function (item) {
    return item.charCodeAt()
  })
  var aesOfb = new aesjs.ModeOfOperation.ofb(keys, ivs);
  var encryptedBytes = aesOfb.encrypt(textBytes);
  var hexstr=aesjs.utils.hex.fromBytes(encryptedBytes);
  return hexstr
}
function decrypt(str,keys,ivs) {
  var encryptedBytes = aesjs.utils.hex.toBytes(str);
  keys = keys.map(function (item) {
    return item.charCodeAt()
  })
  ivs = ivs.map(function (item) {
    return item.charCodeAt()
  })
  var aesOfb = new aesjs.ModeOfOperation.ofb(keys, ivs);
  var decryptedBytes = aesOfb.decrypt(encryptedBytes);
  var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  return decryptedText
}
function hanldeTime(r){
  return typeof r == 'string'?(r.toLowerCase()!='null'?r.substr(0,10):''):''
}

function commonEncrypt(str){
 if(isEncrypt){
   return encrypt(str,keyIv.rbs,keyIv.ajc)
 }else{
   return  str
 }
}
function commonDecrypt(str){
  if(isEncrypt){
    return decrypt(str,keyIv.rbs,keyIv.ajc)
  }else{
    return  str
  }
}

exports.hanldeTime = hanldeTime
exports.encrypt = encrypt
exports.decrypt = decrypt
exports.isEncrypt =isEncrypt
exports.commonEncrypt=commonEncrypt
exports.commonDecrypt=commonDecrypt


