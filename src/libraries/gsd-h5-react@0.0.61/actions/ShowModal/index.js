import * as sdk from '@govcloud/weapps-sdk'

export default function showModal({ data }) {
  sdk.wx.showModal(data)
}
