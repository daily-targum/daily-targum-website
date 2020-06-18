const ENABLE_DYNAMIC_HEADER = 'ENABLE_DYNAMIC_HEADER';
const DISABLE_DYNAMIC_HEADER = 'DISABLE_DYNAMIC_HEADER';

export default {
  ENABLE_DYNAMIC_HEADER,
  DISABLE_DYNAMIC_HEADER
}

export interface State {
  dynamicHeaderEnabled: boolean
}