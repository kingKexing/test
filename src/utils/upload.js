var OSS = require('ali-oss')
export function client(data) {
  return new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: data.AccessKeyId,
    accessKeySecret: data.AccessKeySecret,
    stsToken: data.SecurityToken,
    bucket: 'fxz-oss'
  })
}
