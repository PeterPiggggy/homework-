Page({
  data: {
    optionList: [],
    showDialogue: false,
    tempOption: "",
    showResult: false,
    randomResult: null
  },


  makeChoices() {
    this.setData({showDialogue: true})
  },


  confirmChoice() {
    const userInput = this.data.tempOption
    if(userInput) {
      const newOption = {
        text: userInput,
        icon: ""
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
    this.setData({showResult: false})
  }
})