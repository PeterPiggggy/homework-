Page({
  data: {
    optionList: [],

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