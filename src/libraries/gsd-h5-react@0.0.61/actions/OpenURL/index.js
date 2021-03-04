import { history } from "utils/history";

function openURL (
  {
    data: {
      newTable, url, deliverParams = true, jumpType, pageId, navigateType, appId, path, envVersion
    },
    // history,
  }) {
  if (jumpType === 1) {
    if (history) {
      if (navigateType === 'navigateTo') {
        history.push(`/${pageId}`);
      }
      if (navigateType === 'redirectTo') {
        history.replace(`/${pageId}`);
      }
      if (navigateType === 'reLaunch') {
        history.reLaunch(`/${pageId}`);
      }
      if (navigateType === 'navigateBack') {
        history.navigateBack()
      }
    }
    return;
  }

  if (jumpType === 3) {
    if (process.env.isMiniprogram) {
      wx.navigateToMiniProgram({
        appId, path, envVersion
      })
    }
  }

  return history.href = url;
}

export default openURL;
