import type { TModuleConfigs } from '../types/moduleTypes'
import { CommonConfigs } from './common/CommonConfigs'

export abstract class StoneConfigs {
  public static getConfigs(): TModuleConfigs {
    const common = CommonConfigs.getConfigs()

    common.categorizerFuncs = () => {
      return {}
    }
    return common
  }
}
