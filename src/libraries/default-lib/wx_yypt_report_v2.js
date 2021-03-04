/*
* 使用方法
const wxReportSdk = require('./components/gsd-lib/report/index.js');
new wxReportSdk({
    reportUrl:'http://www.qq.com',
})
*/
class wxReportSdk {
  constructor (opt) {
    this.originPage = Page;
    this.originApp = App;
    this.logTimer = null;
    this.idxKey = '_monitor_idx';
    this.config = {
      mp_appid: '', // 填入小程序的appid
      appKey: '', // 填入你的应用key
      stopReport: false, // 停止上报
      isNet: true, // 是否上报网络信息（默认：true）
      isSys: true, // 是否上报系统信息（默认：true）
      isError: true, // 是否开启错误上报 （默认：false）
      autoReportPV: false, // 是否自动上报页面PV
      commonPageEId: 'MP_ALLPAGES_ONSHOW', // 统一的页面上报标志
      getRemoteParamsUrl: '',// 获取远程参数url
      reportUrl: '', // 上报url
      intervalTime: 3, // 间隔多久执行一次上报，默认3秒
      reportLogsNum: 5, // 每次合并上报记录条数，默认5次
    };

    this.reportData = {
      ky: '',//app key，应用的身份标识
      pf: 'MiniProgram',// 平台类型
      id: '',// 平台型相关的ID字段，如微信平台中则是open_id
      cui: '',// custom user id，自定义用户id,用户上报的自定义用户id，也就是app业务方统计用户的身份标识,用于多平台帐号打通。
      geo: '',// 地理位置
      scene: '', // 入口场景,小程序的场景值
      ev: {
        'cn': '',//connect type，设备连接方式
        'lg': '',//anguage，系统语言类型
        'sr': '',//screen resolution，屏幕分辨率
        'tz': '',//time zone，系统的时区
        'os': '',//操作系统,
        'ua': '-', //
      },
      ui: '',// 一个随机生成的id，因为大多数没有id,cui，所以用ui计算uv
      si: '',//session id，会话id,一串随机产生的数字，标识一个新的会话
      ts: '',//timestamp，时间戳
      pi: '',// page id，页面id
      rf: '',// refer page id,来源页面id
      et: '1',// eventtype，事件类型,PAGE_VIEW(1),PAGE_HIDE(3001),SESSION_ENV(2),ERROR(3),CUSTOM(1000),ADDITION(1001),MONITOR_STAT(1002);SPECIAL_CUSTON(),小程序onshow使用PAGE_VIEW，关闭或隐藏时使用PAGE_HIDE,事件使用1000
      ht: '',// 	hot tag	string	屏幕的点击事件ID
      htx: '',// 	hot tag x	string	点击位置的X坐标
      hty: '',// 	hot tag y	string	点击位置的Y坐标
      ei: '',//	event id，自定义事件id	string	自定义事件id
      kv: '',//	Key-Value,自定义事件Key-Value参数对	map	JSON格式
      er: '',//	error，错误、异常信息	string	错误字符串或堆栈异常信息
      ea: '',//error attribute	uint 共有4种错误类型：USER_MSG(0)、USER_EXCEPTION(1)、AUTO_EXCEPTION(2)、NATIVE_CRASH(3)、SDK_EXCEPTION(99)
      ext: '',//扩展字段，不进行计算，可存储更细的用户信息
      region: '', // 城市码
      mp_appid: '', // 小程序appid
      adt: "", // 自定义渠道来源
    };

    this.config = Object.assign(this.config, opt || {});
    this.reportLogs = [];
    this.pagePrams = {};//存储每个页面自定义上报的数据，例如kv
    this.cusSid = this._getCusSid();
    this._init();
  }

  // 获取自定义session
  _getCusSid(len = 10) {
    const $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789";
    const maxPos = $chars.length;
    let pwd = "";
    for (let i = 0; i < len; i++) {
      pwd = pwd + $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd + new Date().getTime();
  }

  // 获取用户唯一标示
  _getUuid () {
    let uuidKey = "_mp_monitor_uuid_v2";
    let uuid = wx.getStorageSync(uuidKey);
    if (uuid) {
      return uuid;
    }
    let s = [];
    let hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-';
    uuid = "mc_" + s.join('');
    wx.setStorageSync(uuidKey, uuid);
    return uuid;
  };

  startReport () {
    if (this.config.stopReport || !this._isAllowReport()) return;
    const _this = this;
    _this._logRequest();
    _this.logTimer = setInterval(function () {
      _this._logRequest();
    }, _this.config.intervalTime * 1000);
  }

  /*点击流上报
  * eid 事件id
  * kv Key-Value,自定义事件Key-Value参数对
  * event 事件对象
  * */
  eventClick (eid, params = {}, event) {
    let cookiedObj = {};
    // 兼容老版本事项直接传入kv值
    if (eid === 'MP_SHIXIANG' && !params.kv) {
      cookiedObj.kv = params;
    }
    else {
      cookiedObj = params;
    }
    this._statpid(Object.assign({
      et: '1000',// eventtype 事件使用1000
      ei: eid, // 事件id
      htx: event ? event.detail.x : '',
      hty: event ? event.detail.y : '',
      ht: event ? event.target.id : '',// 	hot tag	string	屏幕的点击事件ID
    }, cookiedObj));
  }

  logInfo (msg, params = {}) {
    params.type = 'info';
    params.msg = msg;
    this._logReport(params);
  }

  logWarn (msg, params = {}) {
    params.type = 'warn';
    params.msg = msg;
    this._logReport(params);
  }

  logError (msg, params = {}) {
    params.type = 'error';
    params.msg = msg;
    this._logReport(params);
  }

  // 日志上报
  _logReport (params = {}) {
    let cookiedObj = { kv: params };
    this._statpid(Object.assign({
      et: '2000',//
    }, cookiedObj));
  }

  /*页面pv上报
 * pageId 页面标识id
 * params 额外参数，比如城市码
 * */
  pagePV (pageId, params = {}) {
    this._statpid(Object.assign({
      et: '3001',// eventtype，事件类型,PAGE_VIEW(1),PAGE_HIDE(3001),SESSION_ENV(2),ERROR(3),CUSTOM(1000),ADDITION(1001),MONITOR_STAT(1002);SPECIAL_CUSTON(),小程序onshow使用PAGE_VIEW，关闭或隐藏时使用PAGE_HIDE,事件使用1000å
      ei: pageId, // 事件id
    }, params));
  }

  // 设置页面参数
  setPagePrams (params) {
    let pagePath = this._getPagePath();
    if (pagePath && params) {
      this.pagePrams[pagePath] = params;
    }
  }

  // 是否允许上报
  _isAllowReport () {
    if (!this.config.reportUrl || !this.config.appKey) {
      console.error('reportUrl、appKey，存在没传的参数，不允许上报');
      return false;
    }
    return true;
  }

  _init () {
    if (this.config.stopReport || !this._isAllowReport()) return;
    this._spyApp();
    this._spyPage();
    if (this.config.isNet) this._network();
    if (this.config.isSys) this._system();
  }

  // 包装App对象
  _spyApp () {
    const _this = this;
    App = (app) => {
      const _onError = app.onError || function () { };
      const _onLaunch = app.onLaunch || function () { };
      const _onHide = app.onHide || function () { };
      app.onLaunch = function (opt) {
        _this.reportData.adt = opt.query.ysschannel || '';
        // _this.reportData.mp_appid = opt.referrerInfo &&
        //   opt.referrerInfo.appId ||
        //   '';
        _this.reportData.sense = opt.scene;
        wx.setStorageSync(_this.idxKey, 1);
        if (_this.config.getRemoteParamsUrl) {
          wx.request({
            url: _this.config.getRemoteParamsUrl,
            data: {},
          }).then((res) => {
            if (res.open) {
              _this.config = Object.assign(_this.config,
                {
                  intervalTime: res.sec || _this.config.intervalTime,
                  reportLogsNum: res.num || _this.config.reportLogsNum,
                  stopReport: !!res.stop,
                });
            }
          });
        }
        return _onLaunch.apply(this, arguments);
      };
      if (this.config.isError) {
        // 错误捕获并上报
        app.onError = function (err) {
          let errspit = err.split(/\n/) || [];
          let src, col, line;
          let errs = err.match(/\(.+?\)/);
          if (errs && errs.length) errs = errs[0];
          errs = (errs || '').replace(/\w.+js/g, $1 => {
            src = $1;
            return '';
          });
          errs = errs.split(':');
          if (errs && errs.length > 1) line = parseInt(errs[1] || 0);
          col = parseInt(errs[2] || 0);
          _this._reportError(JSON.stringify({
            col: col,
            line: line,
            name: src,
            msg: `${errspit[0]};${errspit[1]};${errspit[2]};`,
            type: 'js',
          }));
          return _onError.apply(this, arguments);
        };
      }
      app.onHide = function () {
        if (_this.logTimer) {
          clearInterval(_this.logTimer);
        }
        _this._logRequest(true);
        return _onHide.apply(this, arguments);
      };
      _this.originApp(app);
    };
  }

  _wrapPagePV (pageOnShowTime) {
    const _this = this;
    if (_this.config.autoReportPV) {
      _this.pagePV(_this.config.commonPageEId,
        { du: Math.ceil((Date.now() - pageOnShowTime) / 1000) });
    }
  }

  // 包装page对象
  _spyPage () {
    const _this = this;
    Page = (page) => {
      const _onShow = page.onShow || function () { };
      const _onHide = page.onHide || function () { };
      const _onUnload = page.onUnload || function () { };
      let pageOnShowTime = 0;
      page.onShow = function () {
        pageOnShowTime = Date.now();
        if (_this.config.autoReportPV) {
          _this.pagePV(_this.config.commonPageEId, { et: '1' });
        }
        return _onShow.apply(this, arguments);
      };
      page.onHide = function () {
        _this._wrapPagePV(pageOnShowTime);
        return _onHide.apply(this, arguments);
      };
      page.onUnload = function () {
        _this._wrapPagePV(pageOnShowTime);
        return _onUnload.apply(this, arguments);
      };
      _this.originPage(page);
    };
  }

  // 集中收集 logs 方法
  // type = 'memory' | 'storage'
  _collectLogs (item) {
    let nData = [];
    let oData = this.reportLogs;
    Array.isArray(item) ? nData = item : nData.push(item);
    // 剔除掉无值的字段，减少体积
    nData.forEach(tempItem => {
      for (let tempKey in tempItem) {
        let tempVal = tempItem[tempKey];
        if (tempVal === '' ||
          (typeof tempVal === 'object' && Object.keys(tempVal).length === 0)) {
          delete tempItem[tempKey];
        }
      }
    });
    // 内存不能超过 100 条
    let rule = oData.length > 100;
    if (rule) {
      oData.splice(0, nData.length);
    }
    this.reportLogs = oData.concat(nData);
  }

  // 获取页面路径
  _getPagePath () {
    let currentPages = getCurrentPages();
    if (currentPages && currentPages.length) {
      const length = currentPages.length;
      const lastpage = currentPages[length - 1];
      return lastpage.__route__;
    }
    else {
      return '';
    }
  }

  // 埋点上报
  _statpid (opt) {
    let currentPages = getCurrentPages();
    if (currentPages && currentPages.length) {
      const length = currentPages.length;
      const lastpage = currentPages[length - 1];
      opt.pi = lastpage.__route__;
      if (length >= 2) {
        opt.rf = currentPages[length - 2].__route__;
      }
      opt.ext = lastpage.options || {};
      // 合并用户传入的自定义参数
      opt = Object.assign(opt, this.pagePrams[opt.pi]);
    }
    let idx = Number(wx.getStorageSync(this.idxKey) || '0') + 1;
    wx.setStorageSync(this.idxKey, idx);
    opt.idx = idx;
    const _statpid2 = this._getCookiedReportData(opt);
    this._collectLogs(_statpid2);
  }

  /*错误上报
  * desc 错误信息
  * */
  _reportError (desc) {
    this._logReport({ type: 'error', msg: desc });
  }

  _getCookiedReportData (opt) {
    const realUserId = wx.getStorageSync('wx-openid') || wx.getStorageSync('tif-openid') ||
      wx.getStorageSync('openid') || opt.openid || this._getUuid();
    return Object.assign({}, this.reportData, {
      ts: Date.now(),//timestamp，时间戳
      ky: this.config.appKey, // app key，应用的身份标识
      si: wx.getStorageSync('wx-sessionid') || wx.getStorageSync('tif-sid') || this.cusSid,
      id: realUserId, // 平台型相关的ID字段，如微信平台中则是open_id
      cui: realUserId, // custom user
      ui: wx.getStorageSync('tif-unionid') || realUserId, // id，自定义用户id,用户上报的自定义用户id，也就是app业务方统计用户的身份标识,用于多平台帐号打通。
      region: wx.getStorageSync('reportRegion') || '',
      mp_appid: this.config.mp_appid || '',
    }, opt);
  }

  /*
  * cycle:是否循环上报
  * */
  _logRequest (cycle = false) {
    // 过滤掉开发者工具、测试环境的logs
    let _this = this;
    // 停止上报
    if (_this.config.stopReport) return;
    const reportLogs = _this.reportLogs;
    if (reportLogs.length === 0) {
      return;
    }
    let data = reportLogs.splice(0, _this.config.reportLogsNum);
    let sessionid = wx.getStorageSync('wx-sessionid') || wx.getStorageSync('tif-sid')
    wx.request({
      url: _this.config.reportUrl,
      header: {
        'x-tif-sid': sessionid,
        'x-tif-did': wx.getStorageSync('tif-did'),
        'wx-sessionid': sessionid,
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {reportInfo: JSON.stringify(data)},
      method: 'POST',
      complete (res) {
        if (cycle && res.data && Number(res.data.errcode) === 0 &&
          reportLogs.length > 0) {
          _this._logRequest(true);
        }
        if (res.data && (Number(res.data.errcode) !== 0)) {
          if (data && data.length !== 0) {
            _this._collectLogs(data);
          }
        }
      },
    });
  }

  // 获取网络类型
  _network () {
    wx.getNetworkType({
      success: res => {
        this.reportData.ev.cn = res.networkType;//connect type，设备连接方式
      },
    });
  }

  // 获取系统信息
  _system () {
    wx.getSystemInfo({
      success: res => {
        this.reportData.ev = {
          'lg': res.language,//anguage，系统语言类型
          'sr': res.screenWidth + '*' + res.screenHeight,//screen resolution，屏幕分辨率
          'tz': new Date().getTimezoneOffset(),//time zone，系统的时区
          'os': res.system,//操作系统,
          'version': res.version,//微信版本号
          'SDKVersion': res.SDKVersion,//客户端基础库版本
          'ua': `oa=${res.system},mp_version=${res.version},mp_sdk=${res.SDKVersion}`,
        };
      },
    });
  }
}

module.exports = wxReportSdk;
