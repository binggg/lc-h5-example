import * as React from 'react';
import Avatar from './Avatar.png'

const openData = [
  { type: 'groupName', label: '群名称' },
  { type: 'userNickName', label: '用户昵称' },
  { type: 'userAvatarUrl', label: '用户头像', url: Avatar },
  { type: 'userGender', label: '男' },
  { type: 'userCity', label: '吕梁' },
  { type: 'userProvince', label: '山西' },
  { type: 'userCountry', label: '中国' },
  { type: 'userLanguage', label: 'zh_CN' },
];
export default function ({ id, data, style, className }) {
  const { type = 'userNickName' } = data;

  const item = openData.find(item => item.type === type) || openData[0];
  return <React.Fragment>
    {item.url ? <img id={id} src={item.url} alt="[图片]" className={className}
                     style={{ display: 'block', width: '100%', ...style }}/> :
      <div id={id} className={className} style={{ display: 'block', width: '100%', ...style }}>{item.label}</div>}
  </React.Fragment>

}
