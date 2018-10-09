const app = getApp()
Page({
  data: {
    isShowRegister: false,
    isShowForget: false,
    username: '',
    password: ''
  },
  bindUsername(e){
    this.setData({
      username: e.detail.value
    })
  },
  bindPassword(e) {
    this.setData({
      password: e.detail.value
    })
  },
  showRegister(){
    this.setData({
      isShowRegister: true,
      username: '',
      password: ''   
    })
  },
  hideRegister() {
    this.setData({
      isShowRegister: false,
      username: '',
      password: ''      
    })
    console.log('hide',this.data)
  },
  showForget() {
    this.setData({
      isShowForget: true,
      password: ''
    })
  },
  hideForget() {
    this.setData({
      isShowForget: false,
      password: ''
    })
  },
  goLogin() {
    if (this.data.username && this.data.password) {
      wx.request({
        url: app.globalData.ajaxUrl + '/login/selectLogin',
        method: 'POST',
        data: {
          username: this.data.username,
          password: this.data.password
        },
        success(res) {
          if (res.data.meta && res.data.meta.code === 0) {
            wx.setStorage({
              key: 'username',
              data: res.data.data[0].username,
            })
            wx.showToast({
              title: '登录成功',
              success() {
                wx.redirectTo({
                  url: '../index/index',
                })
              }
            })
          } else {
            wx.showToast({
              title: res.data.meta.message,
              icon: 'none'
            })
          }
        },
        fail(err) {
          console.log('fail', err)
        }
      })
    } else {
      wx.showToast({
        title: '请输入用户名和密码',
        icon: 'none'
      })
    }
  },
  goRegister() {
    let _this = this;
    if (_this.data.username && _this.data.password) {
      wx.request({
        url: app.globalData.ajaxUrl + '/login/addLogin',
        method: 'POST',
        data: {
          username: _this.data.username,
          password: _this.data.password
        },
        success(res) {
          if (res.data.meta && res.data.meta.code === 0) {
            wx.showToast({
              title: '注册成功',
              success() {
                _this.setData({
                  isShowRegister: false,
                  password: ''
                })
              }
            })
          } else if (res.data.meta && res.data.meta.code === 100102){
            wx.showModal({
              title: res.data.meta.message,
              content: '是否删掉该用户，删掉后此用户名就归你了哦~',
              success(res){
                if(res.confirm){
                  _this.goDelete()
                }
              }
            })

          } else {
            wx.showToast({
              title: res.data.meta.message,
              icon: 'none'
            })
          }
        },
        fail(err) {
          console.log('fail', err)
        }
      })
    } else {
      wx.showToast({
        title: '请输入用户名和密码',
        icon: 'none'
      })
    }
  },
  goForget(){
    let _this = this;
    if (_this.data.username && _this.data.password) {
      wx.request({
        url: app.globalData.ajaxUrl + '/login/updateLogin',
        method: 'POST',
        data: {
          username: _this.data.username,
          password: _this.data.password
        },
        success(res) {
          if (res.data.meta && res.data.meta.code === 0) {
            wx.showToast({
              title: '修改成功',
              success() {
                _this.setData({
                  isShowForget: false,
                  password: ''
                })
              }
            })
          } else {
            wx.showToast({
              title: res.data.meta.message,
              icon: 'none'
            })
          }
        },
        fail(err) {
          console.log('fail', err)
        }
      })
    } else {
      wx.showToast({
        title: '请输入用户名和密码',
        icon: 'none'
      })
    }
  },
  goDelete(){
    let _this = this;
    wx.request({
      url: app.globalData.ajaxUrl + '/login/deleteLogin',
      method: 'POST',
      data: {
        username: _this.data.username,
        password: _this.data.password
      },
      success(res) {
        if (res.data.meta && res.data.meta.code === 0) {
          wx.showToast({
            title: '删除成功',
            success() {
             
            }
          })
        } else {
          wx.showToast({
            title: res.data.meta.message,
            icon: 'none'
          })
        }
      },
      fail(err) {
        console.log('fail', err)
      }
    })
  }
})