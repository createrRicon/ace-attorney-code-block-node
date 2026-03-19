/**
 * 角色配置
 * 定义所有角色的属性和表情
 */

export interface CharacterConfig {
  id: string
  name: string
  role: string
  color: string
  expressions: string[]
}

export const CHARACTERS: Record<string, CharacterConfig> = {
  // 主角
  likang: {
    id: 'likang',
    name: '力康',
    role: '设计师',
    color: '#e94560',
    expressions: ['normal', 'thinking', 'surprised', 'confident', 'awkward']
  },

  // 核心角色
  snow: {
    id: 'snow',
    name: 'Snow',
    role: '产品经理',
    color: '#4a90e2',
    expressions: ['normal', 'smile', 'serious']
  },
  ll: {
    id: 'll',
    name: 'LL',
    role: '检察官',
    color: '#ff6b6b',
    expressions: ['normal', 'serious', 'angry', 'glasses']
  },
  poet: {
    id: 'poet',
    name: 'poem',
    role: '法官',
    color: '#9b59b6',
    expressions: ['normal', 'serious', 'smile']
  },

  // 证人
  zhang: {
    id: 'zhang',
    name: '张老师',
    role: '突击证人',
    color: '#f39c12',
    expressions: ['normal', 'smile', 'serious']
  },
  wang: {
    id: 'wang',
    name: '小王',
    role: '业务经理',
    color: '#1abc9c',
    expressions: ['normal', 'awkward']
  },
  chen: {
    id: 'chen',
    name: '老陈',
    role: '研发经理',
    color: '#34495e',
    expressions: ['normal', 'thinking', 'serious']
  }
}

export type CharacterId = keyof typeof CHARACTERS
