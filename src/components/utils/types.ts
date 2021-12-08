export type Occurrence = {
  id?: Number
  type: string
  latitude: string
  longitude: string
  created?: Date
}

export type ModalizeRef = {
  open: Function,
  close: Function
}

export type OptionSelectList = {
  name: String,
  value: any
}