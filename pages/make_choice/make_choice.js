Page({
  data: {
    optionList: [],
    showDialogue: false,
    showResult: false,
    showDeleteIndex: null,
    showDeleteMask: false,
    optionIconsPath: [
      {path: "../../img/options_icon/步数.png"},
      {path: "../../img/options_icon/地址.png"},
      {path: "../../img/options_icon/购物车.png"},
      {path: "../../img/options_icon/浏览.png"},
      {path: "../../img/options_icon/汽车.png"},
      {path: "../../img/options_icon/文本.png"},
      {path: "../../img/options_icon/饮食.png"},
      {path: "../../img/options_icon/咨询.png"}
    ],
    tempIcon: "",
    tempOption: "",
    randomResult: null,
  },



  showDeleteMenu(e) {
    const optionDeleteIndex = e.currentTarget.dataset.index
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



  makeChoices() {
    this.setData({showDialogue: true})
  },



  confirmChoice() {
    const userInput = this.data.tempOption
    if(userInput) {
      const newOption = {
        text: userInput,
        icon: this.data.tempIcon
      }
      const newOptionList = this.data.optionList.concat([newOption])
      this.setData({
        showDialogue: false,
        tempOption: "",
        optionList: newOptionList
      })
    }
  },



  refuseChoice() {
    this.setData({
      showDialogue: false,
      tempOption: ""
    })
  },



  getChoice(choice) {
    this.setData({tempOption: choice.detail.value})
  },

  

  choose() {
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
  },



  randomlyChooseIcon() {
    const randomIconIndex = Math.floor(Math.random() * 8)
    this.setData({tempIcon: this.data.optionIconsPath[randomIconIndex].path})
  },
  chooseIcon(e) {
    const IconPath = e.currentTarget.dataset.image
    this.setData({tempIcon: IconPath})
  }
})