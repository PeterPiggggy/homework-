Page({
  data: {
    historyList: [],
    showDeleteMask: false
  },



  onShow() {
    const history = wx.getStorageSync("history") || []
    this.setData({historyList: history})
  },



  openHistory(history_index) {
    const index = history_index.currentTarget.dataset.index
    const history = this.data.historyList[index]

    const app = getApp()
    app.globalData.restoreList = history.list

    wx.switchTab({url:"../make_choice/make_choice"})
  },



  editHistory() {
    this.setData({
      showDeleteMask: true
    })
  },
  deleteHistory(delete_index) {
    const index = delete_index.currentTarget.dataset.index
    const newHistoryList = this.data.historyList.filter((item, i) => i !== index)
    this.setData({
      showDeleteMask: false,
      historyList: newHistoryList
    })
    wx.setStorageSync("history", this.data.historyList)
  },
  missDeleteMenu() {
    this.setData({
      showDeleteMask: false
    })
  }
})