"use strict";

Component({
  behaviors: ['wx://form-field'],
  properties: {
    name: {
      type: String,
    },
    type: {
      type: String,
      default: 'media',
    },
    mediaType:{
      type: Array,
      value: ['image']
    },
    sourceType: {
      type: Array,
      value: ['album', 'camera']
    },
    // sizeType: {
    //   type: Array,
    //   value: ['original', 'compressed'],
    // },
    extension: {
      type: Array,
      value: ['docs'],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    count: {
      type: Number,
      default: 9
    },
    useRequest: {
      type: Boolean,
      default: false,
    },
    action: String,
    header: Object,
    formData: Object,
    formName: {
      type: String,
      default: "file",
    }
  },
  data: {
    value: [],

  },
  lifetimes: {},
  ready () {
  },
  methods: {
    chooseFile () {
      const { type,mediaType, sourceType, extension, count, multiple } = this.properties
      const realCount = multiple ? count : 1
      const self = this
      if (type === 'media') {
        wx.chooseMedia({
          realCount,
          mediaType,
          sourceType,
          success (res) {
            self.handleFiles(res.tempFiles)
          }
        })
      }
      else {
        let options = {
          count,
          type,
        }
        if (type === 'file') {
          options = { ...options, extension }
        }
        wx.chooseMessageFile({
          ...options,
          success (res) {
            self.handleFiles(res.tempFiles)
          }
        })
      }

    },
    handleFiles (postFiles) {
      const self = this
      const files = postFiles.map((file) => {
        file.uid = self.getUid()
        return file
      });

      this.setData({
        value: files
      });
      const chooseFile = {
        mp: files,
        web: null
      };

      this.triggerEvent('change', chooseFile);

      const { useRequest } = this.properties

      if (useRequest) {
        files.forEach((file) => {
          this.upload(file);
        });
      }
    },
    upload (file) {
      const { action, formData, header, formName } = this.properties
      const uploadTask = wx.uploadFile({
        url: action,
        filePath: file,
        name: formName,
        formData: formData,
        header: header,
        success (res) {
          this.triggerEvent('success', res, file);
          //do something
        },
        fail (err) {
          this.triggerEvent('error', err, file);
        }
      })
      uploadTask.onProgressUpdate((res) => {
        console.log('上传进度', res.progress)
        console.log('已经上传的数据长度', res.totalBytesSent)
        console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
      })
    },
    getUid (index) {
      const now = new Date().getTime();
      return `g-upload-${now}-${index || 0}`;
    }
  }
});
