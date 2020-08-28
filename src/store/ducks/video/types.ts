export default {
  VIDEO_SET_PLAY_STATE: 'VIDEO_SET_PLAY_STATE',
  VIDEO_SET_DURATION: 'VIDEO_SET_DURATION',
  VIDEO_SET_POSITION: 'VIDEO_SET_POSITION',
  VIDEO_SET_VIDEO: 'VIDEO_SET_VIDEO',
  VIDEO_SET_PERSIST: 'VIDEO_SET_PERSIST'
}

export interface State {
  playState: string
  position: number
  duration: number
  src?: string
  title?: string
  description?: string
  persist: boolean
  thumbnail?: string
}