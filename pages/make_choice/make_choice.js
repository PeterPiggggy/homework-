Page({
  data: {
    optionList: [],

    showClearAllMask: false,

    showCreateMask: false,

    showResult: false,

    showDeleteIndex: null,
    showDeleteMask: false,

    tempOptionText: "",
    tempOptionIcon: "",
    randomResult: null,

    optionIconsPath: [
      {path: "../../img/options_icon/步数.png"},
      {path: "../../img/options_icon/地址.png"},
      {path: "../../img/options_icon/购物车.png"},
      {path: "../../img/options_icon/浏览.png"},
      {path: "../../img/options_icon/汽车.png"},
      {path: "../../img/options_icon/文本.png"},
      {path: "../../img/options_icon/饮食.png"},
      {path: "../../img/options_icon/咨询.png"}
    ]
  },



  onShow() {
    const app = getApp()

    if(app.globalData.restoreList) {
      this.setData({optionList: app.globalData.restoreList})
      app.globalData.restoreList = null
    }
  },



  recordOptions() {
    const history = wx.getStorageSync("history") || [];
    if(this.data.optionList.length){
    history.push({
      time: new Date().toLocaleString(),
      list: this.data.optionList
    });
    wx.setStorageSync("history", history)
    wx.showToast({
      title: "搞定(˘◡˘)",
      icon: "success",
      duraion: 2000
    })
    }
    else if(this.data.optionList.length == 0){
      wx.showToast({
        title: "没有选项呀QAQ",
        icon: "error",
        duraion: 2000
      })
    }
    else if(history.length > 1000) {
      wx.showToast({
        title: "装不下(´ڡ`)",
        icon: "error",
        duraion: 2000
      })
    }
  },



  showDeleteMenu(index_to_delete) {
    const optionDeleteIndex = index_to_delete.currentTarget.dataset.index
    this.setData({
      showDeleteIndex: optionDeleteIndex,
      showDeleteMask: true,
    })
  },
  missDeleteMenu() {
    this.setData({
      showDeleteIndex: null,
      showDeleteMask: false
    })
  },
  deleteOption() {
    const index = this.data.showDeleteIndex
    const newOptionList = this.data.optionList.filter((item, i) => i !== index)
    this.setData({
      optionList: newOptionList,
      showDeleteIndex: null,
      showDeleteMask: false
    })
  },



  clearAll() {
    this.setData({
      showClearAllMask: true
    })
  },
  confirmClearAll() {
    this.setData({
      optionList: [],
      showClearAllMask: false
    })
  },
  refuseClearAll() {
    this.setData({
      showClearAllMask: false
    })
  },



  randomlyChooseIcon() {
    const randomIconIndex = Math.floor(Math.random() * 8)
    this.setData({tempOptionIcon: this.data.optionIconsPath[randomIconIndex].path})
  },
  chooseIcon(icon_path) {
    const IconPath = icon_path.currentTarget.dataset.image
    this.setData({tempOptionIcon: IconPath})
  },
  getOptionText(option_text) {
    this.setData({tempOptionText: option_text.detail.value})
  },
  createOption() {
    this.setData({showCreateMask: true})
  },
  confirmCreateOption() {
    const userInput = this.data.tempOptionText
    if(userInput) {
      const newOption = {
        text: userInput,
        icon: this.data.tempOptionIcon
      }
      const newOptionList = this.data.optionList.concat([newOption])
      this.setData({
        showCreateMask: false,
        tempOptionText: "",
        optionList: newOptionList
      })
    }
  },
  refuseCreateOption() {
    this.setData({
      showCreateMask: false,
      tempOptionText: ""
    })
  },


  
  RandomlyChoose() {
    const list = this.data.optionList
    if(list.length != 0) {
        const randomIndex = Math.floor(Math.random() * list.length)
        this.setData({
          randomResult: list[randomIndex],
          showResult: true
        })
    }
  },
  goBack() {
    this.setData({
      showResult: false,
      randomResult: null
    })
  }
})