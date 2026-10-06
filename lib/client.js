window.__ModuleLoader__.load({id:"dsh-swf-studio",factory:(hostRequire)=>{
const factories={"templates":(module,exports,require)=>{
/** Original banquet templates. Existing template ids and visual settings are preserved. */
const templates = [
  { id: 'wedding-rose', category: '婚礼婚庆', name: '玫瑰誓约', description: '柔粉花枝 · 浪漫婚礼',
    bg: '#f5e8e3', ink: '#743d50', accent: '#aa6978', kicker: 'THE WEDDING', title: '我们结婚啦',
    subtitle: '林先生 & 陈小姐', detail: '2026.10.18  ·  幸福礼堂', footer: '以爱之名，共赴余生', art: 'flowers', layout: 'classic' },
  { id: 'wedding-red', category: '婚礼婚庆', name: '囍结良缘', description: '朱红描金 · 中式婚礼',
    bg: '#8e202c', ink: '#ffe2a2', accent: '#d9af64', kicker: '良辰美景 · 天作之合', title: '囍结良缘',
    subtitle: '林先生 & 陈小姐', detail: '2026.10.18  ·  婚礼盛典', footer: '承蒙厚爱，诚邀见证', art: 'rings', layout: 'classic' },
  { id: 'wedding-garden', category: '婚礼婚庆', name: '回门归宁宴', description: '鼠尾草绿 · 回门归宁宴',
    bg: '#e4ece0', ink: '#355b43', accent: '#839765', kicker: '新婚归宁 · 喜聚娘家', title: '回门归宁',
    subtitle: '回门归宁宴 · 恭迎亲友', detail: '2026.10.18 · 宴会厅', footer: '感谢家人厚爱，今日欢喜团圆', art: 'leaves', layout: 'arch' },
  { id: 'wedding-peony', category: '婚礼婚庆', name: '牡丹良缘', description: '绛紫牡丹 · 华美喜宴',
    bg: '#4e2942', ink: '#f8e2ba', accent: '#c89891', kicker: '花开并蒂 · 喜结同心', title: '花好月圆',
    subtitle: '新婚庆典 · 恭迎亲友', detail: '良辰吉日 · 婚宴厅', footer: '一席喜宴，满堂祝福', art: 'peony', layout: 'seal' },
  { id: 'wedding-ivory', category: '婚礼婚庆', name: '银婚纪念', description: '象牙白金 · 25年银婚纪念',
    bg: '#f5f0e6', ink: '#645342', accent: '#b49970', kicker: '相伴二十五载 · 初心仍如故', title: '银婚之喜',
    subtitle: '结婚25周年纪念宴 · 家人同庆', detail: '2026.10.18 · 宴会厅', footer: '二十五年相守，把日常过成珍贵回忆', art: 'rings', layout: 'ribbon' },
  { id: 'wedding-lantern', category: '婚礼婚庆', name: '喜灯迎客', description: '正红喜灯 · 热闹婚宴',
    bg: '#b52e24', ink: '#fff0cf', accent: '#f1bd61', kicker: '良缘天定 · 喜宴相迎', title: '喜迎亲朋',
    subtitle: '新婚答谢宴', detail: '2026.10.18 · 喜宴厅', footer: '感谢厚爱，敬请入席', art: 'lanterns', layout: 'banner' },
  { id: 'wedding-engagement', category: '婚礼婚庆', name: '团扇定情', description: '暖杏团扇 · 雅致订婚',
    bg: '#f2dec7', ink: '#7a3d35', accent: '#bd8460', kicker: '两姓联姻 · 一堂缔约', title: '订婚之喜',
    subtitle: '佳偶相约 · 亲友同庆', detail: '良辰吉日 · 宴会厅', footer: '承蒙见证，喜乐长安', art: 'fan', layout: 'seal' },
  { id: 'wedding-cloud', category: '婚礼婚庆', name: '金婚庆典', description: '暖金祥云 · 50年金婚庆典',
    bg: '#6e4926', ink: '#ffe9a9', accent: '#d3ac60', kicker: '风雨五十载 · 相伴到如今', title: '金婚之喜',
    subtitle: '结婚50周年纪念宴 · 阖家同庆', detail: '2026.10.18 · 宴会厅', footer: '半世纪携手同行，愿往后岁月安康常乐', art: 'clouds', layout: 'arch' },

  { id: 'graduation', category: '升学谢师', name: '星辰远航', description: '深蓝星光 · 毕业纪念',
    bg: '#202c55', ink: '#f8efd9', accent: '#d8bf84', kicker: 'THE NEXT CHAPTER', title: '前程似锦',
    subtitle: '2026 届毕业典礼', detail: '青春不散场  ·  梦想正启航', footer: '愿此去繁花似锦，再相逢依然如故', art: 'stars', layout: 'classic' },
  { id: 'study-admission', category: '升学谢师', name: '金榜题名', description: '朱砂书卷 · 升学喜宴',
    bg: '#a52f32', ink: '#fff0ca', accent: '#e3ba6e', kicker: '寒窗有获 · 金榜传喜', title: '金榜题名',
    subtitle: '升学答谢宴 · 恭迎亲友', detail: '2026.10.18 · 宴会厅', footer: '感谢一路关怀，共贺锦绣前程', art: 'scroll', layout: 'banner' },
  { id: 'study-laurel', category: '升学谢师', name: '折桂之喜', description: '松绿桂冠 · 雅致升学',
    bg: '#224b43', ink: '#f8edca', accent: '#d3bd78', kicker: '勤学笃行 · 喜报新章', title: '蟾宫折桂',
    subtitle: '升学庆贺 · 感恩相聚', detail: '2026.10.18 · 喜宴厅', footer: '带着大家的祝福，向更远处出发', art: 'laurel', layout: 'seal' },
  { id: 'study-teacher', category: '升学谢师', name: '桃李谢恩', description: '米白青荷 · 温润谢师',
    bg: '#f0ead9', ink: '#496054', accent: '#a79068', kicker: '春风化雨 · 桃李芬芳', title: '师恩难忘',
    subtitle: '谢师宴 · 敬献恩师', detail: '2026.10.18 · 宴会厅', footer: '一席感恩，敬谢谆谆教诲', art: 'lotus', layout: 'arch' },
  { id: 'study-campus', category: '升学谢师', name: '青春礼成', description: '晴空蓝帽 · 毕业庆贺',
    bg: '#e2edf4', ink: '#304d74', accent: '#c49a5f', kicker: '青春作序 · 毕业启程', title: '毕业快乐',
    subtitle: '毕业纪念宴 · 同窗共庆', detail: '2026.10.18 · 宴会厅', footer: '珍藏同窗时光，奔赴各自热爱', art: 'cap', layout: 'ribbon' },
  { id: 'study-future', category: '升学谢师', name: '青云有路', description: '墨蓝流云 · 励志启程',
    bg: '#253d51', ink: '#f5e7c9', accent: '#8fb8c0', kicker: '学有所成 · 志在远方', title: '青云直上',
    subtitle: '学业有成 · 亲友同贺', detail: '良辰吉日 · 宴会厅', footer: '愿脚下有路，心中有光', art: 'clouds', layout: 'banner' },

  { id: 'birthday', category: '生日寿宴', name: '彩色心愿', description: '轻盈气球 · 生日派对',
    bg: '#e8eff5', ink: '#315b77', accent: '#dfac61', kicker: 'MAKE A WISH', title: '生日快乐',
    subtitle: '愿每一岁，都奔赴热爱', detail: '2026.10.18  ·  生日派对', footer: '把美好的愿望，写进今天', art: 'balloons', layout: 'classic' },
  { id: 'birthday-longevity', category: '生日寿宴', name: '花甲寿宴', description: '枣红牡丹 · 六十花甲寿宴',
    bg: '#792b2c', ink: '#ffe2a4', accent: '#cc9a59', kicker: '六十华诞 · 福寿绵长', title: '花甲寿喜',
    subtitle: '花甲寿宴 · 亲友同贺', detail: '良辰吉日 · 寿宴厅', footer: '愿您岁岁安康，笑口常开', art: 'peony', layout: 'seal' },
  { id: 'birthday-peace', category: '生日寿宴', name: '古稀寿宴', description: '浅青荷影 · 七十古稀寿宴',
    bg: '#dfece6', ink: '#375b50', accent: '#a79563', kicker: '七十华诞 · 岁月生香', title: '古稀寿庆',
    subtitle: '古稀寿宴 · 温暖相聚', detail: '2026.10.18 · 寿宴厅', footer: '愿您身体康健，日日舒心，笑意常在', art: 'lotus', layout: 'classic' },
  { id: 'birthday-cake', category: '生日寿宴', name: '儿童生日', description: '奶油粉橙 · 儿童生日派对',
    bg: '#f8e7d4', ink: '#86513d', accent: '#d58b7c', kicker: '童年有甜 · 成长有爱', title: '儿童生日快乐',
    subtitle: '儿童生日宴 · 家人同庆', detail: '2026.10.18 · 派对宴会厅', footer: '一起吹蜡烛，愿你健康快乐地长大', art: 'cake', layout: 'ribbon' },
  { id: 'birthday-starlight', category: '生日寿宴', name: '十八岁成人礼', description: '午夜紫金 · 十八岁成人礼',
    bg: '#352b52', ink: '#fbebd2', accent: '#c6a7d7', kicker: '青春礼成 · 勇敢启程', title: '十八岁成人礼',
    subtitle: '18岁生日宴 · 礼成启程', detail: '2026.10.18 · 宴会厅', footer: '愿你心有热爱，肩有担当，脚步坚定', art: 'stars', layout: 'arch' },
  { id: 'birthday-golden', category: '生日寿宴', name: '八十大寿', description: '暖金桂冠 · 八十大寿庆典',
    bg: '#5d4531', ink: '#fff0c5', accent: '#d3ae67', kicker: '八十华诞 · 福泽绵长', title: '八十大寿',
    subtitle: '八十大寿宴 · 阖家同庆', detail: '良辰吉日 · 寿宴厅', footer: '敬祝您福寿安康，尽享天伦之乐', art: 'laurel', layout: 'banner' },

  { id: 'baby-fullmoon', category: '宝宝成长', name: '月满童心', description: '奶黄圆月 · 温柔满月',
    bg: '#f8efda', ink: '#76603e', accent: '#cfb879', kicker: '月满添喜 · 小小欢颜', title: '满月之喜',
    subtitle: '宝宝满月宴 · 诚邀亲友', detail: '2026.10.18 · 宴会厅', footer: '愿你健康长大，被爱轻轻包围', art: 'moon', layout: 'arch' },
  { id: 'baby-hundred', category: '宝宝成长', name: '百日小愿', description: '雾粉玩具 · 童真百日',
    bg: '#f3e3e6', ink: '#805263', accent: '#ba91a0', kicker: '百日欢喜 · 成长可期', title: '百日快乐',
    subtitle: '宝宝百日宴 · 欢迎莅临', detail: '2026.10.18 · 宝宝宴会厅', footer: '每一次微笑，都是家里的好天气', art: 'toys', layout: 'ribbon' },
  { id: 'baby-firstyear', category: '宝宝成长', name: '周岁抓周宴', description: '浅杏蛋糕 · 周岁抓周喜宴',
    bg: '#f4e3c7', ink: '#7d5433', accent: '#ce9454', kicker: '周岁礼成 · 新欢喜', title: '周岁抓周',
    subtitle: '周岁抓周宴 · 亲友同乐', detail: '2026.10.18 · 宴会厅', footer: '愿你所遇皆暖，所行皆坦途', art: 'cake', layout: 'banner' },
  { id: 'baby-arrival', category: '宝宝成长', name: '云朵报喜', description: '天蓝云朵 · 新生喜讯',
    bg: '#deedf4', ink: '#3f667c', accent: '#94b8c9', kicker: '新生命 · 新欢喜', title: '添丁之喜',
    subtitle: '新生庆贺 · 恭迎亲友', detail: '良辰吉日 · 宴会厅', footer: '谢谢你们，共享这份初见的喜悦', art: 'clouds', layout: 'classic' },
  { id: 'baby-growth', category: '宝宝成长', name: '童趣印记', description: '嫩绿积木 · 成长纪念',
    bg: '#e5edcc', ink: '#52643a', accent: '#a7b765', kicker: '童心闪亮 · 快乐生长', title: '快乐长大',
    subtitle: '成长纪念宴 · 一起欢聚', detail: '2026.10.18 · 宴会厅', footer: '愿好奇不减，愿笑容常在', art: 'toys', layout: 'seal' },
  { id: 'baby-balloons', category: '宝宝成长', name: '周岁生日', description: '湖蓝气球 · 宝宝周岁生日',
    bg: '#dceeed', ink: '#3c686a', accent: '#d1a56f', kicker: '一岁一礼 · 满心欢喜', title: '周岁生日快乐',
    subtitle: '宝宝周岁生日宴 · 欢迎入席', detail: '2026.10.18 · 亲子宴会厅', footer: '把第一个生日的快乐，收藏进成长相册', art: 'balloons', layout: 'ribbon' },

  { id: 'family-reunion', category: '家庭团聚', name: '团圆一席', description: '暖棕餐桌 · 温馨家宴',
    bg: '#efdfca', ink: '#654b37', accent: '#b48c5d', kicker: '一桌好菜 · 一家团圆', title: '团圆家宴',
    subtitle: '阖家欢聚 · 共话家常', detail: '2026.10.18 · 宴会厅', footer: '人间好滋味，最是团圆时', art: 'table', layout: 'classic' },
  { id: 'family-parents', category: '家庭团聚', name: '寸草春晖', description: '暖粉花枝 · 感恩双亲',
    bg: '#f0e1db', ink: '#785045', accent: '#bc8c7e', kicker: '养育之恩 · 常记心间', title: '感恩双亲',
    subtitle: '感恩家宴 · 温情相聚', detail: '2026.10.18 · 宴会厅', footer: '陪伴是最好的礼物，愿您健康常乐', art: 'flowers', layout: 'ribbon' },
  { id: 'family-anniversary', category: '家庭团聚', name: '相伴如初', description: '酒红双环 · 婚姻纪念',
    bg: '#632f3b', ink: '#f7e3c7', accent: '#c59770', kicker: '岁月为证 · 相爱如初', title: '相伴有你',
    subtitle: '结婚纪念宴 · 家人同庆', detail: '2026.10.18 · 宴会厅', footer: '一路相守，把平凡日子过成珍贵回忆', art: 'rings', layout: 'arch' },
  { id: 'family-gathering', category: '家庭团聚', name: '家风雅集', description: '竹青书卷 · 家族欢聚',
    bg: '#dfe5d3', ink: '#46583d', accent: '#a59561', kicker: '家人相聚 · 情谊相承', title: '亲情满堂',
    subtitle: '家族团聚宴 · 恭迎亲友', detail: '良辰吉日 · 宴会厅', footer: '围坐一堂，珍惜每一次相聚', art: 'scroll', layout: 'seal' },
  { id: 'family-homecoming', category: '家庭团聚', name: '归乡灯暖', description: '赭红灯火 · 归乡接风',
    bg: '#9b4431', ink: '#ffedcf', accent: '#e0b66c', kicker: '一路辛苦 · 欢迎回家', title: '归来是欢喜',
    subtitle: '接风家宴 · 亲友相聚', detail: '2026.10.18 · 宴会厅', footer: '家里的饭香，一直在等你', art: 'lanterns', layout: 'banner' },
  { id: 'family-farewell', category: '家庭团聚', name: '清风寄语', description: '水青团扇 · 温暖送行',
    bg: '#dce9e4', ink: '#45665a', accent: '#96a77e', kicker: '此去顺遂 · 常念归期', title: '家人的祝福',
    subtitle: '送行家宴 · 温暖相伴', detail: '2026.10.18 · 宴会厅', footer: '无论走到哪里，家都在你身后', art: 'fan', layout: 'arch' },

  { id: 'reunion-classmates', category: '同学战友', name: '同窗旧时光', description: '牛皮纸卷 · 怀旧同学会',
    bg: '#e9d7b7', ink: '#655039', accent: '#a8824b', kicker: '同窗一程 · 情谊一生', title: '同学，好久不见',
    subtitle: '同学联谊宴 · 共忆青春', detail: '2026.10.18 · 宴会厅', footer: '把分别后的故事，慢慢讲给彼此听', art: 'scroll', layout: 'ribbon' },
  { id: 'reunion-comrades', category: '同学战友', name: '岁月军情', description: '军绿桂冠 · 战友情深',
    bg: '#374735', ink: '#f4e5b8', accent: '#b9a363', kicker: '并肩岁月 · 铭记于心', title: '战友重逢',
    subtitle: '战友联谊宴 · 再叙情谊', detail: '2026.10.18 · 宴会厅', footer: '一声战友，一生牵挂', art: 'laurel', layout: 'banner' },
  { id: 'reunion-alumni', category: '同学战友', name: '校友华章', description: '藏蓝学士帽 · 校友雅聚',
    bg: '#293f60', ink: '#f4e7c8', accent: '#c0a779', kicker: '同出一校 · 共赴新章', title: '校友欢聚',
    subtitle: '校友联谊宴 · 欢迎莅临', detail: '2026.10.18 · 宴会厅', footer: '聊聊校园往事，也聊聊今天的自己', art: 'cap', layout: 'seal' },
  { id: 'reunion-friends', category: '同学战友', name: '老友围坐', description: '暖橘餐桌 · 轻松叙旧',
    bg: '#f3dec5', ink: '#7b5138', accent: '#c3945d', kicker: '老友如初 · 相聚有味', title: '老友见面',
    subtitle: '好友相聚 · 共叙近况', detail: '2026.10.18 · 宴会厅', footer: '好久不见，今天慢慢聊', art: 'table', layout: 'arch' },

  { id: 'celebration', category: '商务庆典', name: '鎏金盛典', description: '黑金光环 · 年会庆典',
    bg: '#17272b', ink: '#f4dfa9', accent: '#c5a36a', kicker: 'A NIGHT TO REMEMBER', title: '共赴新程',
    subtitle: '2026 年度盛典', detail: '10月18日 19:00  ·  宴会厅', footer: '感谢同行，让每一份努力闪耀', art: 'orbit', layout: 'classic' },
  { id: 'business-opening', category: '商务庆典', name: '启幕大吉', description: '正红帷幕 · 开业庆贺',
    bg: '#a12829', ink: '#ffe6b2', accent: '#d7ad62', kicker: '盛大启幕 · 嘉宾云集', title: '开业大吉',
    subtitle: '开业庆典答谢宴', detail: '2026.10.18 · 宴会厅', footer: '感谢莅临，与您共启新篇', art: 'curtain', layout: 'banner' },
  { id: 'business-thanks', category: '商务庆典', name: '诚意相邀', description: '深青绿叶 · 客户答谢',
    bg: '#224a4b', ink: '#e8edcf', accent: '#b2bd8a', kicker: '一路相伴 · 心怀感恩', title: '感谢有您',
    subtitle: '客户答谢宴 · 恭迎嘉宾', detail: '2026.10.18 · 宴会厅', footer: '以诚相待，携手前行', art: 'leaves', layout: 'arch' },
  { id: 'business-partnership', category: '商务庆典', name: '签约答谢宴', description: '钴蓝光环 · 合作签约答谢',
    bg: '#213b6a', ink: '#edf3ff', accent: '#8eaecf', kicker: '签约携手 · 共赴新程', title: '签约答谢',
    subtitle: '签约答谢晚宴 · 恭迎合作伙伴', detail: '2026.10.18 · 宴会厅', footer: '感谢信任与支持，期待携手创造新成果', art: 'orbit', layout: 'seal' },
  { id: 'business-awards', category: '商务庆典', name: '荣耀加冕', description: '墨紫桂冠 · 表彰晚宴',
    bg: '#352b3f', ink: '#ffedbe', accent: '#c8a05f', kicker: '致敬付出 · 见证荣光', title: '荣耀时刻',
    subtitle: '表彰庆功宴 · 欢迎莅临', detail: '2026.10.18 · 宴会厅', footer: '每一份认真，都值得被看见', art: 'laurel', layout: 'ribbon' },
  { id: 'business-launch', category: '商务庆典', name: '璀璨新程', description: '深海银蓝 · 新品庆典',
    bg: '#142f47', ink: '#e7f3fc', accent: '#8db9d1', kicker: '焕新出发 · 共见未来', title: '启航新篇',
    subtitle: '新品发布庆祝晚宴', detail: '2026.10.18 · 宴会厅', footer: '感谢见证，与您分享新成果', art: 'fireworks', layout: 'banner' },

  { id: 'welcome', category: '餐厅经营', name: '简约迎宾', description: '米白绿叶 · 活动欢迎',
    bg: '#edf0e8', ink: '#36524a', accent: '#93a489', kicker: 'WELCOME', title: '欢迎莅临',
    subtitle: '很高兴，在这里遇见你', detail: '2026.10.18  ·  活动现场', footer: '美好的相聚，从此刻开始', art: 'leaves', layout: 'classic' },
  { id: 'restaurant-menu', category: '餐厅经营', name: '时令上新', description: '米黄餐桌 · 当季菜品',
    bg: '#f1e6cb', ink: '#665237', accent: '#b69a58', kicker: '随时而食 · 用心入味', title: '时令新味',
    subtitle: '当季鲜味 · 诚邀品尝', detail: '今日供应 · 详情请咨询服务人员', footer: '认真做好每一道菜，温暖每一桌相聚', art: 'table', layout: 'banner' },
  { id: 'restaurant-banquet', category: '餐厅经营', name: '花厅喜宴', description: '豆沙花枝 · 宴会预订',
    bg: '#ebd7d4', ink: '#744846', accent: '#b17d72', kicker: '好日子 · 好宴席', title: '喜宴有约',
    subtitle: '婚宴 · 寿宴 · 家宴 · 聚会', detail: '宴会预订 · 欢迎到店咨询', footer: '从一席好菜开始，认真安排你的重要日子', art: 'flowers', layout: 'ribbon' },
  { id: 'restaurant-gathering', category: '餐厅经营', name: '周年店庆', description: '酱红灯笼 · 餐厅周年店庆',
    bg: '#77372d', ink: '#ffe4b0', accent: '#c69756', kicker: '周年同庆 · 感恩惠顾', title: '周年店庆',
    subtitle: '餐厅周年庆典 · 新老顾客同欢', detail: '2026.10.18 · 店庆宴会厅', footer: '感谢每一份信任，继续用好味道陪伴大家', art: 'lanterns', layout: 'seal' },

  { id: 'festival-spring', category: '传统节日', name: '新春团圆', description: '中国红灯 · 团年家宴',
    bg: '#a72924', ink: '#ffe6a9', accent: '#e5b357', kicker: '辞旧迎新 · 阖家团圆', title: '新春大吉',
    subtitle: '新春团圆宴 · 恭迎亲友', detail: '新春佳节 · 宴会厅', footer: '愿新的一年，家人安康，万事顺意', art: 'lanterns', layout: 'seal' },
  { id: 'festival-lantern', category: '传统节日', name: '元宵月圆', description: '夜蓝圆月 · 元宵欢聚',
    bg: '#2f3558', ink: '#f9e8bd', accent: '#dfaf6f', kicker: '月圆灯暖 · 人间团圆', title: '元宵喜乐',
    subtitle: '元宵家宴 · 共享好时光', detail: '元宵佳节 · 宴会厅', footer: '一碗汤圆，一桌团圆', art: 'moon', layout: 'arch' },
  { id: 'festival-dragonboat', category: '传统节日', name: '端午清和', description: '粽叶青荷 · 端午家宴',
    bg: '#dce6ce', ink: '#3f5a38', accent: '#a19a52', kicker: '粽香满席 · 端午安康', title: '端午安康',
    subtitle: '端午家宴 · 与家人相聚', detail: '端午佳节 · 宴会厅', footer: '愿家人无恙，愿日子清和', art: 'lotus', layout: 'ribbon' },
  { id: 'festival-midautumn', category: '传统节日', name: '月满中秋', description: '黛蓝金月 · 中秋团聚',
    bg: '#243d51', ink: '#f6e6bc', accent: '#c9ae71', kicker: '明月寄情 · 团圆此刻', title: '中秋团圆',
    subtitle: '中秋家宴 · 欢迎入席', detail: '中秋佳节 · 宴会厅', footer: '愿月圆人团圆，家和万事兴', art: 'moon', layout: 'classic' },
  { id: 'festival-national', category: '传统节日', name: '金秋欢聚', description: '暖红烟花 · 假日盛宴',
    bg: '#963629', ink: '#ffebbc', accent: '#deb56e', kicker: '金秋好时节 · 假日好相聚', title: '欢度国庆',
    subtitle: '国庆欢聚宴 · 恭迎嘉宾', detail: '国庆佳节 · 宴会厅', footer: '与亲友共享美味，把假日过得有滋有味', art: 'fireworks', layout: 'banner' },
  { id: 'festival-chongyang', category: '传统节日', name: '重阳敬老', description: '秋褐祥云 · 敬老家宴',
    bg: '#ebe0c6', ink: '#64523c', accent: '#b39b5f', kicker: '岁岁重阳 · 浓浓敬意', title: '九九安康',
    subtitle: '重阳敬老宴 · 温情相聚', detail: '重阳佳节 · 宴会厅', footer: '常陪长辈说说话，愿平安与笑容常在', art: 'clouds', layout: 'seal' },

  { id: 'party-neon', category: '主题派对', name: '霓光之夜', description: '墨蓝玫紫 · 轻快派对',
    bg: '#23213d', ink: '#f4defb', accent: '#bf83c7', kicker: '今晚相聚 · 快乐开场', title: '今晚尽兴',
    subtitle: '主题派对 · 好友同乐', detail: '2026.10.18 · 派对宴会厅', footer: '把烦恼暂放一旁，一起留下开心回忆', art: 'orbit', layout: 'banner' },
  { id: 'party-stage', category: '主题派对', name: '幕启好戏', description: '深紫帷幕 · 主题晚会',
    bg: '#442942', ink: '#fae6c8', accent: '#c79a79', kicker: '好戏登场 · 欢聚今宵', title: '今夜有戏',
    subtitle: '主题晚会 · 欢迎莅临', detail: '2026.10.18 · 宴会厅', footer: '掌声送给每一位认真准备的朋友', art: 'curtain', layout: 'arch' },
  { id: 'party-garden', category: '主题派对', name: '花间茶叙', description: '淡紫繁花 · 下午茶会',
    bg: '#e9e1ef', ink: '#685477', accent: '#b299c1', kicker: '花香茶暖 · 好友相伴', title: '花间小聚',
    subtitle: '主题茶会 · 欢迎入席', detail: '2026.10.18 · 花厅', footer: '喝杯茶，说说话，享受慢下来的时光', art: 'flowers', layout: 'ribbon' },
  { id: 'party-chinese', category: '主题派对', name: '国风雅宴', description: '青瓷折扇 · 国风主题',
    bg: '#dce7e3', ink: '#3f605a', accent: '#a39a71', kicker: '清风入席 · 雅趣相逢', title: '国风雅集',
    subtitle: '国风主题宴 · 恭迎知音', detail: '2026.10.18 · 雅宴厅', footer: '于一席美味中，细品相聚的风雅', art: 'fan', layout: 'seal' },

  { id: 'milestone-home', category: '人生喜事', name: '新居常暖', description: '浅苔绿叶 · 乔迁之喜',
    bg: '#e6ebda', ink: '#4b6043', accent: '#9ca66d', kicker: '新居新景 · 喜乐常在', title: '乔迁之喜',
    subtitle: '乔迁答谢宴 · 恭迎亲友', detail: '良辰吉日 · 宴会厅', footer: '感谢关怀，愿新家四季温暖', art: 'leaves', layout: 'arch' },
  { id: 'milestone-promotion', category: '人生喜事', name: '锦程可期', description: '赤陶书卷 · 晋升庆贺',
    bg: '#884639', ink: '#ffe8c7', accent: '#d4ab79', kicker: '耕耘有获 · 前路可期', title: '再启新程',
    subtitle: '晋升庆贺宴 · 感恩同行', detail: '2026.10.18 · 宴会厅', footer: '感谢一路支持，未来继续踏实前行', art: 'scroll', layout: 'ribbon' },
  { id: 'milestone-retirement', category: '人生喜事', name: '从容新篇', description: '晴灰流云 · 退休纪念',
    bg: '#e6e9e6', ink: '#485c59', accent: '#9caa91', kicker: '岁月有功 · 生活有趣', title: '自在新生活',
    subtitle: '荣休纪念宴 · 亲友同庆', detail: '2026.10.18 · 宴会厅', footer: '愿往后的时光，有闲情，也有新热爱', art: 'clouds', layout: 'classic' },
  { id: 'milestone-journey', category: '人生喜事', name: '追光远行', description: '深蓝金星 · 新程送祝',
    bg: '#23344c', ink: '#fae6bc', accent: '#c7ab72', kicker: '带着祝福 · 奔赴热爱', title: '一路生花',
    subtitle: '新程祝福宴 · 感谢相伴', detail: '2026.10.18 · 宴会厅', footer: '愿新的旅程，步步踏实，处处有光', art: 'stars', layout: 'classic' },
]

const categories = [...new Set(templates.map(t => t.category))]

Object.assign(module.exports,{templates,categories});
},
"decorations":(module,exports,require)=>{
/** Original Canvas motifs. All positions are local to the current scene. */
const supportedArts = Object.freeze([
  'flowers', 'rings', 'balloons', 'orbit', 'stars', 'leaves', 'lanterns', 'scroll',
  'laurel', 'cap', 'peony', 'clouds', 'cake', 'toys', 'moon', 'lotus', 'table',
  'curtain', 'fireworks', 'fan',
])
const TAU = Math.PI * 2
const legacyArts = new Set(supportedArts.slice(0, 6))
function line(c, x1, y1, x2, y2) { c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke() }
function ellipse(c, x, y, rx, ry, angle = 0) { c.beginPath(); c.ellipse(x, y, rx, ry, angle, 0, TAU); c.fill() }
function at(c, x, y, scale, draw, angle = 0) { c.save(); c.translate(x, y); c.rotate(angle); c.scale(scale, scale); draw(); c.restore() }
function path(c, points, fill = true) {
  c.beginPath(); points.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); fill ? c.fill() : c.stroke()
}
function mix(a, b, amount) {
  const x = parseInt(a.slice(1), 16), y = parseInt(b.slice(1), 16)
  return '#' + [16, 8, 0].map(shift => Math.round(((x >> shift) & 255) * (1 - amount) + ((y >> shift) & 255) * amount).toString(16).padStart(2, '0')).join('')
}
function star(c, x, y, r, points = 4) {
  path(c, Array.from({ length: points * 2 }, (_, i) => {
    const a = i * Math.PI / points - Math.PI / 2, radius = i % 2 ? r * .32 : r
    return [x + Math.cos(a) * radius, y + Math.sin(a) * radius]
  }))
}
function leafBranch(c, x, y, angle, scale, color) {
  c.save(); c.translate(x, y); c.rotate(angle); c.scale(scale, scale); c.strokeStyle = color; c.fillStyle = color; c.lineWidth = 1.3
  c.beginPath(); c.moveTo(0, 0); c.bezierCurveTo(25, -65, -8, -130, 0, -220); c.stroke()
  for (let i = 1; i < 8; i++) { const side = i % 2 ? 1 : -1; ellipse(c, side * 16, -i * 26, 22, 8, side * .7) }
  c.restore()
}
function flower(c, x, y, r, color) {
  c.save(); c.translate(x, y); c.fillStyle = color
  for (let i = 0; i < 7; i++) { c.rotate(TAU / 7); ellipse(c, 0, -r * .45, r * .42, r * .6) }
  c.fillStyle = '#ddbd8e'; ellipse(c, 0, 0, r * .2, r * .2); c.restore()
}
function dust(c, t, w, h, s, legacy = false) {
  c.fillStyle = t.accent
  for (let i = 0; i < 38; i++) {
    const x = ((i * 337 + 53) % 1280) / 1280 * w, y = ((i * 197 + 31) % 720) / 720 * h
    if (x > w * .24 && x < w * .76 && y > h * .24 && y < h * (legacy ? .8 : .84)) continue
    c.globalAlpha = (legacy ? .2 : .12) + (i % 4) * (legacy ? .13 : .07)
    if (t.art === 'stars') {
      c.save(); c.translate(x, y); c.beginPath()
      for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4, r = (k % 2 ? 1.3 : 4) * s; c.lineTo(Math.cos(a) * r, Math.sin(a) * r) }
      c.closePath(); c.fill(); c.restore()
    } else ellipse(c, x, y, (1 + i % 3) * s, (1 + i % 3) * s)
  }
}
// Preserve the original six designs, including their established colors and spacing.
function legacy(c, t, w, h, s) {
  c.globalAlpha = .55; c.lineWidth = s; c.strokeRect(w * .035, h * .055, w * .93, h * .89)
  if (t.art === 'flowers' || t.art === 'leaves') {
    for (const [x, y, a] of [[w * .11, h * .80, -.55], [w * .88, h * .37, 2.6]]) {
      c.globalAlpha = .60; leafBranch(c, x, y, a, s, t.art === 'leaves' ? '#6e8c71' : '#98a282')
      leafBranch(c, x + 45 * s, y, a + .65, s * .8, '#b0b499')
      if (t.art === 'flowers') { c.globalAlpha = .8; flower(c, x, y - 45 * s, 38 * s, '#c78d96'); flower(c, x + 47 * s, y - 110 * s, 23 * s, '#d6a8aa') }
    }
  } else if (t.art === 'rings' || t.art === 'orbit') {
    c.globalAlpha = .24
    for (let i = 0; i < 6; i++) { c.beginPath(); c.ellipse(w / 2, h / 2, w * (.34 + i * .018), h * (.42 + i * .012), -.28, 0, TAU); c.stroke() }
    c.globalAlpha = .8; c.lineWidth = 3 * s
    for (const dx of [-16, 16]) { c.beginPath(); c.arc(w / 2 + dx * s, h * .18, 22 * s, 0, TAU); c.stroke() }
  } else if (t.art === 'balloons') {
    for (const [x, y, color] of [[.12, .24, '#dba0a8'], [.19, .32, '#ddbd82'], [.88, .21, '#aabfcc'], [.81, .30, '#c4b1ce']]) {
      c.globalAlpha = .72; c.fillStyle = color; ellipse(c, w * x, h * y, 32 * s, 42 * s)
      c.globalAlpha = .35; c.strokeStyle = t.ink; c.beginPath(); c.moveTo(w * x, h * y + 42 * s); c.bezierCurveTo(w * x - 20 * s, h * y + 110 * s, w * x + 25 * s, h * y + 150 * s, w * x, h * y + 210 * s); c.stroke()
    }
  }
  dust(c, t, w, h, s, true)
}
function frame(c, t, w, h, s) {
  c.globalAlpha = .36; c.lineWidth = s; c.strokeRect(w * .035, h * .055, w * .93, h * .89)
  c.globalAlpha = .16
  if (t.layout === 'arch') {
    c.beginPath(); c.moveTo(w * .22, h * .88); c.lineTo(w * .22, h * .29)
    c.bezierCurveTo(w * .22, h * .035, w * .78, h * .035, w * .78, h * .29); c.lineTo(w * .78, h * .88); c.stroke()
  } else if (t.layout === 'banner') {
    for (const y of [.07, .93]) { line(c, w * .09, h * y, w * .91, h * y); c.fillRect(w * .09, h * y - 3 * s, w * .065, 6 * s); c.fillRect(w * .845, h * y - 3 * s, w * .065, 6 * s) }
  } else if (t.layout === 'seal') {
    c.strokeRect(w * .047, h * .071, w * .906, h * .858)
    for (const x of [.066, .934]) for (const y of [.10, .90]) at(c, w * x, h * y, s, () => path(c, [[0, -9], [9, 0], [0, 9], [-9, 0]], false))
  } else if (t.layout === 'ribbon') {
    for (const y of [.10, .90]) { c.beginPath(); c.moveTo(w * .16, h * y); c.bezierCurveTo(w * .34, h * (y - .025), w * .66, h * (y + .025), w * .84, h * y); c.stroke() }
  }
  c.globalAlpha = 1
}
function lantern(c, t, x, y, s, tall = false) {
  at(c, x, y, s, () => {
    const ry = tall ? 65 : 49
    c.strokeStyle = t.accent; c.fillStyle = mix(t.accent, t.bg, .22); c.lineWidth = 2
    c.globalAlpha = .84; ellipse(c, 0, 0, 42, ry)
    c.strokeStyle = t.bg; c.globalAlpha = .47
    for (const rx of [12, 28, 40]) { c.beginPath(); c.ellipse(0, 0, rx, ry - 2, 0, 0, TAU); c.stroke() }
    c.globalAlpha = .9; c.fillStyle = t.accent; c.fillRect(-23, -ry - 6, 46, 8); c.fillRect(-21, ry - 2, 42, 7)
    c.strokeStyle = t.accent; line(c, 0, ry + 5, 0, ry + 23); ellipse(c, 0, ry + 25, 4, 5)
    for (let i = -3; i <= 3; i++) line(c, i * 2.5, ry + 30, i * 4, ry + 64 - Math.abs(i) * 2)
  })
}
function cloud(c, t, x, y, s, mirror = 1) {
  at(c, x, y, s, () => {
    c.scale(mirror, 1); c.strokeStyle = t.accent; c.lineWidth = 2; c.globalAlpha = .67
    c.beginPath(); c.moveTo(-72, 15); c.bezierCurveTo(-108, 15, -99, -20, -76, -16)
    c.bezierCurveTo(-88, -50, -35, -65, -22, -31); c.bezierCurveTo(-4, -47, 24, -31, 14, -11)
    c.bezierCurveTo(42, -23, 48, 15, 20, 15); c.lineTo(-61, 15); c.stroke()
    c.beginPath(); c.moveTo(-50, 5); c.bezierCurveTo(-75, 0, -52, -25, -36, -12); c.bezierCurveTo(-26, -4, -37, 6, -43, 0); c.stroke()
    line(c, -45, 25, 58, 25); line(c, -12, 34, 88, 34)
  })
}
function scroll(c, t, x, y, s, angle = 0) {
  at(c, x, y, s, () => {
    c.fillStyle = mix(t.bg, t.accent, .11); c.strokeStyle = t.accent; c.lineWidth = 1.5
    c.fillRect(-95, -32, 190, 64); c.strokeRect(-95, -32, 190, 64)
    c.fillStyle = t.accent
    for (const dx of [-96, 96]) { c.fillRect(dx - 4, -43, 8, 86); ellipse(c, dx, -43, 8, 4); ellipse(c, dx, 43, 8, 4) }
    c.globalAlpha = .4
    for (let i = 0; i < 5; i++) { const xx = -56 + i * 27; line(c, xx, -15, xx, 15 - (i % 2) * 9); line(c, xx - 4, -7, xx + 5, -7) }
  }, angle)
}
function wheat(c, t, x, y, s, angle = 0) {
  at(c, x, y, s, () => {
    c.strokeStyle = t.accent; c.fillStyle = t.accent; c.lineWidth = 1.5
    c.beginPath(); c.moveTo(0, 22); c.quadraticCurveTo(-12, -38, 0, -102); c.stroke()
    for (let i = 0; i < 6; i++) for (const side of [-1, 1]) {
      const yy = -12 - i * 13, xx = side * 9
      ellipse(c, xx, yy, 13, 5, side * .8); line(c, xx + side * 6, yy - 3, side * 26, yy - 19)
    }
    ellipse(c, 0, -98, 5, 12)
  }, angle)
}
function peony(c, t, x, y, s) {
  at(c, x, y, s, () => {
    for (let ring = 3; ring >= 0; ring--) {
      const petals = 7 + ring * 2, r = 16 + ring * 14
      c.fillStyle = mix(t.accent, t.bg, ring * .15); c.strokeStyle = mix(t.ink, t.bg, .65); c.lineWidth = .65
      for (let i = 0; i < petals; i++) at(c, 0, 0, 1, () => {
        c.beginPath(); c.moveTo(-r * .18, 9); c.bezierCurveTo(-r * .73, -r * .12, -r * .58, -r * 1.18, 0, -r)
        c.bezierCurveTo(r * .5, -r * 1.2, r * .73, -r * .17, r * .18, 9); c.closePath(); c.fill(); c.stroke()
      }, i * TAU / petals + ring * .33)
    }
    c.fillStyle = t.ink
    for (let i = 0; i < 9; i++) ellipse(c, Math.cos(i * 2.4) * 8, Math.sin(i * 2.4) * 8, 1.4, 1.4)
  })
}
function lotus(c, t, x, y, s) {
  at(c, x, y, s, () => {
    for (const a of [-1.05, 1.05, -.58, .58, 0]) at(c, 0, 0, 1, () => {
      c.fillStyle = mix(t.accent, t.bg, .35 + Math.abs(a) * .22); c.strokeStyle = t.accent; c.lineWidth = 1.2
      c.beginPath(); c.moveTo(0, 12); c.bezierCurveTo(-39, -10, -26, -44, 0, -67)
      c.bezierCurveTo(27, -40, 36, -10, 0, 12); c.fill(); c.stroke()
      c.globalAlpha = .4; line(c, 0, 8, 0, -46)
    }, a)
    c.globalAlpha = .55; c.strokeStyle = t.accent
    for (let i = 0; i < 3; i++) { c.beginPath(); c.ellipse(0, 24 + i * 9, 57 + i * 17, 4 + i * 2, 0, 0, Math.PI); c.stroke() }
  })
}
function fan(c, t, x, y, s, angle = 0) {
  at(c, x, y, s, () => {
    const begin = Math.PI * 1.1, end = Math.PI * 1.9, r = 100
    c.strokeStyle = t.accent; c.lineWidth = 1
    for (let i = 0; i < 12; i++) {
      const a = begin + (end - begin) * i / 12, b = begin + (end - begin) * (i + 1) / 12
      c.fillStyle = mix(t.accent, t.bg, i % 2 ? .65 : .79)
      c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, r, a, b); c.closePath(); c.fill(); c.stroke()
      c.globalAlpha = .32; c.beginPath(); c.arc(0, 0, r * .78, a, b); c.stroke(); c.globalAlpha = 1
    }
    c.fillStyle = t.accent; ellipse(c, 0, 0, 4, 4); line(c, 0, 0, 0, 23)
    for (let i = -2; i <= 2; i++) line(c, i * 2, 24, i * 3, 44)
  }, angle)
}
const painters = {
  lanterns(c, t, w, h, s) {
    for (const [x, y, z, tall] of [[.09, .20, 1, false], [.91, .18, 1.05, false], [.20, .10, .56, true], [.80, .09, .55, true]]) {
      c.globalAlpha = .65; line(c, w * x, h * .055, w * x, h * y - 53 * s * z); lantern(c, t, w * x, h * y, s * z, tall)
    }
    cloud(c, t, w * .09, h * .86, s * .7); cloud(c, t, w * .91, h * .86, s * .7, -1)
  },
  scroll(c, t, w, h, s) {
    scroll(c, t, w * .5, h * .155, s * .84)
    for (const [x, a] of [[.09, -.3], [.91, .3]]) {
      c.globalAlpha = .64; wheat(c, t, w * x, h * .78, s, a)
      at(c, w * x, h * .42, s, () => { c.lineWidth = 2; line(c, 0, -51, 0, 46); path(c, [[-4, 40], [4, 40], [0, 68]]); ellipse(c, 0, -48, 5, 7) }, a)
    }
  },
  laurel(c, t, w, h, s) {
    for (const [x, side] of [[.10, 1], [.90, -1]]) {
      c.globalAlpha = .75; leafBranch(c, w * x, h * .69, side * -.2, s * 1.2, t.accent)
      wheat(c, t, w * (x - side * .025), h * .75, s * .7, side * -.5)
    }
    at(c, w * .5, h * .145, s, () => {
      c.strokeStyle = t.accent; c.lineWidth = 1.2; c.beginPath(); c.arc(0, 0, 34, 0, TAU); c.stroke()
      c.fillStyle = t.accent; star(c, 0, -1, 19, 5); path(c, [[-20, 27], [-24, 55], [-9, 46], [0, 55], [-2, 31]])
      path(c, [[20, 27], [24, 55], [9, 46], [0, 55], [2, 31]])
    })
  },
  cap(c, t, w, h, s) {
    at(c, w * .5, h * .145, s, () => {
      c.fillStyle = mix(t.ink, t.bg, .15); path(c, [[-43, 0], [-43, 24], [0, 40], [43, 24], [43, 0]])
      c.fillStyle = t.accent; path(c, [[-78, -13], [0, -44], [78, -13], [0, 19]])
      c.strokeStyle = t.ink; c.lineWidth = 2; c.beginPath(); c.moveTo(0, -13); c.lineTo(47, 2); c.lineTo(47, 47); c.stroke()
      ellipse(c, 0, -13, 4, 3); for (let i = -2; i <= 2; i++) line(c, 47 + i, 45, 47 + i * 2.5, 66)
    })
    scroll(c, t, w * .08, h * .77, s * .55, -.45)
    for (let i = 0; i < 7; i++) { c.globalAlpha = .5; c.fillStyle = t.accent; star(c, w * (.91 + (i % 2) * .04), h * (.3 + i * .075), (4 + i % 3) * s) }
  },
  peony(c, t, w, h, s) {
    for (const [x, y, a] of [[.08, .24, -.42], [.90, .75, 2.7]]) {
      c.globalAlpha = .52; leafBranch(c, w * x, h * y + 115 * s, a, s * .9, t.accent)
      c.globalAlpha = .97; peony(c, t, w * x, h * y, s * 1.05); peony(c, t, w * x + 39 * s, h * y + 77 * s, s * .57)
    }
  },
  clouds(c, t, w, h, s) {
    for (const [x, y, z, mirror] of [[.10, .16, 1, 1], [.90, .19, 1.1, -1], [.08, .76, .83, -1], [.92, .84, .8, 1], [.49, .115, .52, 1]]) cloud(c, t, w * x, h * y, s * z, mirror)
    c.globalAlpha = .17
    for (let i = 0; i < 3; i++) { c.beginPath(); c.moveTo(w * .20, h * (.90 + i * .012)); c.bezierCurveTo(w * .4, h * (.88 + i * .012), w * .6, h * (.94 + i * .012), w * .8, h * (.9 + i * .012)); c.stroke() }
  },
  cake(c, t, w, h, s) {
    at(c, w * .5, h * .15, s * .78, () => {
      c.strokeStyle = t.accent; c.lineWidth = 1.8
      for (let tier = 0; tier < 2; tier++) {
        const ww = 120 - tier * 40, yy = 26 - tier * 38
        c.fillStyle = mix(t.bg, t.accent, .18 + tier * .12); c.fillRect(-ww / 2, yy - 32, ww, 36); c.strokeRect(-ww / 2, yy - 32, ww, 36)
        c.fillStyle = t.accent
        for (let x = -ww / 2 + 7; x < ww / 2; x += 14) ellipse(c, x, yy - 30, 7, 6)
      }
      for (const x of [-23, 0, 23]) { c.fillStyle = t.ink; c.fillRect(x - 2, -64, 4, 19); c.fillStyle = t.accent; ellipse(c, x, -72, 4, 7, .2) }
      c.fillStyle = t.accent; ellipse(c, 0, 32, 73, 5); line(c, 0, 36, 0, 51); ellipse(c, 0, 53, 27, 3)
    })
    for (const [x, y] of [[.09, .38], [.91, .64]]) { c.globalAlpha = .7; c.fillStyle = t.accent; star(c, w * x, h * y, 21 * s, 5); c.globalAlpha = .3; line(c, w * x, h * y + 24 * s, w * x, h * y + 92 * s) }
  },
  toys(c, t, w, h, s) {
    c.globalAlpha = .58; c.beginPath(); c.moveTo(w * .05, h * .09); c.quadraticCurveTo(w * .5, h * .22, w * .95, h * .09); c.stroke()
    for (let i = 0; i < 11; i++) {
      const x = .07 + i * .086, y = .09 + .062 * Math.sin(i / 10 * Math.PI)
      c.fillStyle = mix(t.accent, t.ink, i % 3 * .22); path(c, [[w * x - 12 * s, h * y], [w * x + 12 * s, h * y], [w * x, h * y + 27 * s]])
    }
    at(c, w * .09, h * .84, s * .76, () => {
      c.globalAlpha = .83; c.fillStyle = t.accent; c.strokeStyle = t.ink; c.lineWidth = 3
      c.beginPath(); c.moveTo(-63, -5); c.bezierCurveTo(-76, -31, -25, -43, 13, -24); c.lineTo(30, -77); c.lineTo(50, -86); c.lineTo(76, -61); c.lineTo(57, -54); c.lineTo(43, -32); c.lineTo(38, -4); c.closePath(); c.fill()
      path(c, [[31, -76], [34, -98], [44, -85]]); path(c, [[-53, -8], [-43, 31], [-32, 31], [-32, -8]]); path(c, [[20, -8], [28, 31], [40, 31], [33, -9]])
      c.beginPath(); c.moveTo(-79, 25); c.quadraticCurveTo(0, 64, 79, 25); c.stroke(); c.fillStyle = t.ink; ellipse(c, 51, -70, 2, 2)
    })
    at(c, w * .92, h * .86, s * .73, () => {
      c.globalAlpha = .8; c.strokeStyle = t.accent; c.lineWidth = 2
      for (const [x, y, z] of [[-47, -3, .1], [0, -3, .35], [-23, -50, .6]]) {
        c.fillStyle = mix(t.accent, t.bg, z); c.fillRect(x, y, 43, 43); c.strokeRect(x, y, 43, 43); c.fillStyle = t.bg; star(c, x + 21, y + 22, 11, 5)
      }
    })
  },
  moon(c, t, w, h, s) {
    at(c, w * .11, h * .19, s, () => {
      c.fillStyle = t.accent; c.globalAlpha = .8; c.beginPath(); c.moveTo(18, -64)
      c.bezierCurveTo(-84, -76, -83, 79, 18, 64); c.bezierCurveTo(-32, 44, -43, -30, 18, -64); c.fill()
      c.globalAlpha = .25; c.beginPath(); c.arc(-8, 0, 79, -.35, 2.2); c.stroke()
    })
    c.fillStyle = t.accent
    for (const [x, y, r] of [[.86, .14, 14], [.92, .25, 7], [.80, .22, 5], [.09, .75, 9], [.92, .81, 12]]) { c.globalAlpha = .78; star(c, w * x, h * y, r * s) }
    cloud(c, t, w * .10, h * .85, s * .66); cloud(c, t, w * .91, h * .85, s * .7, -1)
  },
  lotus(c, t, w, h, s) {
    lotus(c, t, w * .09, h * .79, s); lotus(c, t, w * .91, h * .81, s * .84)
    c.globalAlpha = .48; c.fillStyle = t.accent
    for (const [x, y, a] of [[.07, .26, -.7], [.92, .34, .9]]) {
      c.beginPath(); c.ellipse(w * x, h * y, 45 * s, 16 * s, a, .3, TAU - .3); c.lineTo(w * x, h * y); c.closePath(); c.fill()
      c.beginPath(); c.moveTo(w * x, h * y); c.bezierCurveTo(w * (x + .03), h * (y + .07), w * (x - .02), h * (y + .16), w * x, h * (y + .22)); c.stroke()
    }
  },
  table(c, t, w, h, s) {
    at(c, w * .5, h * .902, s * .72, () => {
      c.fillStyle = mix(t.accent, t.bg, .72); c.strokeStyle = t.accent; c.lineWidth = 1.4
      c.beginPath(); c.moveTo(-230, -15); c.lineTo(230, -15); c.lineTo(247, 28); c.bezierCurveTo(147, 38, -147, 38, -247, 28); c.closePath(); c.fill(); c.stroke()
      c.fillStyle = mix(t.bg, t.accent, .12); ellipse(c, 0, -15, 230, 23); c.beginPath(); c.ellipse(0, -15, 230, 23, 0, 0, TAU); c.stroke()
      for (const x of [-156, -80, 80, 156]) {
        c.beginPath(); c.ellipse(x, -10, 22, 7, 0, 0, TAU); c.stroke(); line(c, x - 30, -19, x - 30, 0); line(c, x + 30, -19, x + 30, 0)
        c.beginPath(); c.moveTo(x - 8, -44); c.quadraticCurveTo(x - 8, -26, x, -26); c.quadraticCurveTo(x + 8, -26, x + 8, -44); c.closePath(); c.stroke(); line(c, x, -26, x, -17)
      }
      c.fillStyle = t.accent; path(c, [[-12, -15], [-18, -53], [18, -53], [12, -15]])
      for (let i = 0; i < 5; i++) { const x = (i - 2) * 12; line(c, 0, -44, x, -64 - i % 2 * 8); ellipse(c, x, -68 - i % 2 * 8, 8, 6) }
    })
    at(c, w * .5, h * .11, s, () => {
      c.globalAlpha = .65; line(c, 0, -42, 0, 20)
      for (const x of [-45, -23, 23, 45]) { c.beginPath(); c.moveTo(0, 3); c.quadraticCurveTo(x, 39, x, 1); c.stroke(); ellipse(c, x, -5, 3, 7); line(c, x, 20, x, 34); path(c, [[x, 33], [x + 3, 39], [x, 45], [x - 3, 39]]) }
    })
  },
  curtain(c, t, w, h, s) {
    for (const side of [-1, 1]) {
      c.save(); if (side === 1) { c.translate(w, 0); c.scale(-1, 1) }
      c.fillStyle = mix(t.accent, t.bg, .75); c.strokeStyle = t.accent; c.lineWidth = s
      c.beginPath(); c.moveTo(0, 0); c.lineTo(w * .22, 0); c.bezierCurveTo(w * .22, h * .25, w * .10, h * .46, w * .145, h * .63); c.lineTo(w * .18, h); c.lineTo(0, h); c.closePath(); c.fill()
      c.globalAlpha = .24
      for (let i = 1; i < 6; i++) { c.beginPath(); c.moveTo(w * (.025 + i * .026), 0); c.bezierCurveTo(w * (.025 + i * .025), h * .31, w * (.06 + i * .014), h * .44, w * (.08 + i * .009), h * .63); c.lineTo(w * (.09 + i * .015), h); c.stroke() }
      c.globalAlpha = .7; line(c, w * .08, h * .635, w * .146, h * .618); line(c, w * .135, h * .63, w * .155, h * .72); c.fillStyle = t.accent; ellipse(c, w * .156, h * .73, 4 * s, 12 * s); c.restore()
    }
    c.globalAlpha = .2; c.fillStyle = t.accent
    c.beginPath(); c.moveTo(0, 0); c.lineTo(w, 0); c.lineTo(w, h * .06); c.bezierCurveTo(w * .8, h * .20, w * .65, h * .14, w * .5, h * .065); c.bezierCurveTo(w * .35, h * .14, w * .2, h * .20, 0, h * .06); c.closePath(); c.fill()
  },
  fireworks(c, t, w, h, s) {
    for (const [x, y, r, count] of [[.09, .19, 91, 22], [.92, .22, 76, 19], [.52, .11, 42, 16], [.92, .79, 55, 17]]) at(c, w * x, h * y, s, () => {
      c.strokeStyle = t.accent; c.fillStyle = t.accent; c.lineWidth = 1.5
      for (let i = 0; i < count; i++) {
        const a = i * TAU / count, outer = r * (.81 + i % 3 * .09)
        c.globalAlpha = .65; line(c, Math.cos(a) * r * .25, Math.sin(a) * r * .25, Math.cos(a) * outer, Math.sin(a) * outer)
        c.globalAlpha = .38; ellipse(c, Math.cos(a) * (outer + 9), Math.sin(a) * (outer + 9), 2, 2)
      }
      c.globalAlpha = .78; star(c, 0, 0, 8)
    })
  },
  fan(c, t, w, h, s) {
    fan(c, t, w * .09, h * .31, s * 1.04, .5); fan(c, t, w * .93, h * .77, s * .95, -.4)
    fan(c, t, w * .51, h * .185, s * .48)
    c.globalAlpha = .43; leafBranch(c, w * .09, h * .87, -.18, s * .68, t.accent)
  },
}
/** Draw one of supportedArts without changing the caller's drawing state. */
function drawDecorations(c, t, w, h) {
  const s = Math.min(w / 1280, h / 720)
  c.save(); c.strokeStyle = t.accent; c.fillStyle = t.accent; c.lineWidth = s
  if (legacyArts.has(t.art)) legacy(c, t, w, h, s)
  else {
    c.lineCap = 'round'; c.lineJoin = 'round'
    frame(c, t, w, h, s)
    // Preserve a quiet central text area in every portrait and landscape layout.
    c.save(); c.beginPath(); c.rect(0, 0, w, h); c.rect(w * .24, h * .24, w * .52, h * .60); c.clip('evenodd')
    painters[t.art]?.(c, t, w, h, s); c.restore(); dust(c, t, w, h, s)
  }
  c.restore()
}

Object.assign(module.exports,{supportedArts,drawDecorations});
},
"floor":(module,exports,require)=>{
const { templates }=require("templates");
const { drawDecorations }=require("decorations");

const FONT = { serif: '"SimSun", "Songti SC", serif', 'sans-serif': '"Microsoft YaHei", sans-serif' }
function defaultFloor(t) {
  return { mainRatio:.75, direction:90, secondaryRotation:180, visibleLength:2048, visibleWidth:512,
    offsetX:0, offsetY:0, groom:'张三', bride:'李四', showNames:t.category==='婚礼婚庆',
    kicker:t.kicker, secondaryTitle:t.title,
    secondarySubtitle:t.subtitle.replace('林先生 & 陈小姐','婚礼盛典 · 恭迎亲友'), secondaryFooter:t.footer, effects:'rich', intensity:1 }
}
function normalizeFloor(raw, t, width, height) {
  const d = {...defaultFloor(t), ...raw}
  for (const k of ['groom','bride','kicker','secondaryTitle','secondarySubtitle','secondaryFooter']) {
    if(typeof d[k]!=='string'||d[k].length>120)throw new Error('姓名和文案每栏最多 120 个字符。')
  }
  if(typeof d.showNames!=='boolean')throw new Error('姓名显示选项无效。')
  if(!Number.isFinite(d.mainRatio)||d.mainRatio<.1||d.mainRatio>.9)throw new Error('酒席区域比例应为 10%–90%。')
  if(![90,270].includes(d.direction)||![0,180].includes(d.secondaryRotation))throw new Error('文字朝向无效。')
  for(const k of ['visibleLength','visibleWidth','offsetX','offsetY'])if(!Number.isInteger(d[k]))throw new Error('尺寸和偏移应填写整数像素。')
  if(d.visibleLength<320||d.visibleLength>3000||d.visibleWidth<240||d.visibleWidth>1920||d.offsetX<0||d.offsetY<0||d.offsetX+d.visibleLength>width||d.offsetY+d.visibleWidth>height)throw new Error('可见区域必须完全落在导出画面内。')
  if(!['rich','gentle','off'].includes(d.effects)||!Number.isFinite(d.intensity)||d.intensity<.25||d.intensity>2)throw new Error('动效设置无效。')
  // Return known keys only, so imported projects cannot carry executable fields.
  return Object.fromEntries(Object.keys(defaultFloor(t)).map(k=>[k,d[k]]))
}
function floorProject(p) {
  const t=templates.find(t=>t.id===p.template)
  return {...p, schemaVersion:2, profile:'floorled', width:2408,height:512,duration:20,motion:'still',
    subtitle:p.subtitle.replace('林先生 & 陈小姐','婚礼盛典 · 恭迎亲友'),
    detail:t.category==='婚礼婚庆'?'永结同心 · 百年好合':p.detail,
    floor:defaultFloor(t)}
}
function fitted(c,value,x,y,size,width,font,color,weight='400',maxLines=3) {
  c.textAlign='center';c.textBaseline='middle';c.fillStyle=color
  const lines=[]
  // Prefer a readable size and wrap Chinese, rather than shrinking long sentences to a thin line.
  let fs=size
  const wrap=()=>{
    lines.length=0;c.font=`${weight} ${fs}px ${font}`
    for(const paragraph of value.split('\n')){
      let line=''
      for(const char of paragraph){if(line&&c.measureText(line+char).width>width){lines.push(line);line=''}line+=char}
      lines.push(line)
    }
  }
  wrap();while(lines.length>maxLines&&fs>10){fs--;wrap()}
  lines.forEach((line,i)=>c.fillText(line,x,y+(i-(lines.length-1)/2)*fs*1.28))
}
function focusPanel(c,t,w,h,top,bottom) {
  const y=h*top,height=h*(bottom-top),g=c.createLinearGradient(0,y,0,y+height)
  g.addColorStop(0,t.bg+'00');g.addColorStop(.14,t.bg+'e8');g.addColorStop(.86,t.bg+'e8');g.addColorStop(1,t.bg+'00')
  c.fillStyle=g;c.fillRect(w*.06,y,w*.88,height)
  c.strokeStyle=t.accent;c.globalAlpha=.28;c.lineWidth=Math.max(1,w/512)
  for(const edge of [y,y+height]){c.beginPath();c.moveTo(w*.26,edge);c.lineTo(w*.74,edge);c.stroke()}
  c.globalAlpha=1
}
function names(c,f,w,y,s,font,color,accent,compact) {
  const labelY=y-(compact?34:56)*s,nameSize=(compact?42:70)*s
  fitted(c,'新郎',w*.30,labelY,17*s,w*.34,FONT['sans-serif'],accent,'400',1)
  fitted(c,'新娘',w*.70,labelY,17*s,w*.34,FONT['sans-serif'],accent,'400',1)
  fitted(c,f.groom,w*.30,y,nameSize,w*.34,font,color,'600',1)
  fitted(c,f.bride,w*.70,y,nameSize,w*.34,font,color,'600',1)
  fitted(c,'&',w/2,y,20*s,w*.08,'serif',accent,'400',1)
}
function zone(p,t,w,h,secondary,makeCanvas) {
  const cv=makeCanvas();cv.width=w;cv.height=h
  const c=cv.getContext('2d'),s=Math.min(w/512,h/512),font=FONT[p.font],f=p.floor
  c.fillStyle=t.bg;c.fillRect(0,0,w,h)
  const grad=c.createRadialGradient(w/2,h*.48,0,w/2,h*.48,Math.max(w,h)*.8)
  grad.addColorStop(0,'#ffffff12');grad.addColorStop(1,'#00000010');c.fillStyle=grad;c.fillRect(0,0,w,h)
  drawDecorations(c,t,w,h)
  if(secondary){
    fitted(c,f.kicker,w/2,h*.12,18*s,w*.70,'sans-serif',t.accent,'400',2)
    fitted(c,f.secondaryTitle,w/2,h*.30,50*s,w*.72,font,p.color,'600',2)
    fitted(c,f.secondarySubtitle,w/2,h*.43,20*s,w*.70,font,p.color,'400',2)
    if(f.showNames)names(c,f,w,h*.64,s,font,p.color,t.accent,true)
    c.strokeStyle=t.accent;c.globalAlpha=.55;c.lineWidth=1.5*s;c.beginPath();c.moveTo(w*.39,h*.76);c.lineTo(w*.61,h*.76);c.stroke();c.globalAlpha=1
    fitted(c,f.secondaryFooter,w/2,h*.87,19*s,w*.72,font,p.color,'400',3)
    return cv
  }
  fitted(c,f.kicker,w/2,h*.10,23*s,w*.72,'sans-serif',t.accent,'400',2)
  focusPanel(c,t,w,h,.18,.68)
  fitted(c,p.title,w/2,h*.29,88*s,w*.76,font,p.color,'600',p.title.length<=8&&!p.title.includes('\n')?1:2)
  fitted(c,p.subtitle,w/2,h*(f.showNames?.41:.50),f.showNames?28*s:40*s,w*.72,font,p.color,'400',2)
  if(f.showNames)names(c,f,w,h*.59,s,font,p.color,t.accent,false)
  c.strokeStyle=t.accent;c.globalAlpha=.55;c.lineWidth=1.5*s;c.beginPath();c.moveTo(w*.37,h*.72);c.lineTo(w*.63,h*.72);c.stroke();c.globalAlpha=1
  fitted(c,p.detail,w/2,h*.80,26*s,w*.72,font,p.color,'400',2)
  fitted(c,p.footer,w/2,h*.91,24*s,w*.76,font,p.color,'400',3)
  return cv
}
function renderFloor(p,makeCanvas=()=>document.createElement('canvas')) {
  const t=templates.find(t=>t.id===p.template),f=p.floor,w=f.visibleWidth,h=f.visibleLength
  const portrait=makeCanvas();portrait.width=w;portrait.height=h
  const c=portrait.getContext('2d'),split=Math.round(h*(1-f.mainRatio))
  const secondary=zone(p,t,w,split,true,makeCanvas),main=zone(p,t,w,h-split,false,makeCanvas)
  c.save();if(f.secondaryRotation===180){c.translate(w,split);c.rotate(Math.PI)}c.drawImage(secondary,0,0);c.restore();c.drawImage(main,0,split)
  c.strokeStyle=t.accent;c.lineWidth=Math.max(1,w/256);c.beginPath();c.moveTo(w*.23,split);c.lineTo(w*.77,split);c.stroke()
  const background=makeCanvas(),foreground=makeCanvas()
  for(const cv of [background,foreground]){cv.width=p.width;cv.height=p.height}
  const out=background.getContext('2d');out.fillStyle=t.bg;out.fillRect(0,0,p.width,p.height)
  applyFloorTransform(out,f);out.drawImage(portrait,0,0);out.restore()
  return {background,foreground,portrait,sprites:makeSprites(t,makeCanvas)}
}
function applyFloorTransform(c,f) {
  c.save()
  if(f.direction===90){c.translate(f.offsetX,f.offsetY+f.visibleWidth);c.rotate(-Math.PI/2)}
  else{c.translate(f.offsetX+f.visibleLength,f.offsetY);c.rotate(Math.PI/2)}
}
function motionObjects(p) {
  if(p.floor.effects==='off')return []
  const f=p.floor,w=f.visibleWidth,h=f.visibleLength,split=Math.round(h*(1-f.mainRatio)),out=[]
  let seed=43;const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296}
  for(const [lo,hi] of [[0,split],[split,h]]){
    const count=Math.max(4,Math.round((hi-lo)/h*(f.effects==='rich'?64:32)*f.intensity))
    for(let i=0;i<count;i++)out.push({kind:i%3,mode:i%4,lo:lo+w*.05,hi:hi-w*.05,x:w*(i%2?.86:.14),phase:random()*Math.PI*2,start:random(),scale:(.34+random()*.40)*w/512})
  }
  return out
}
function objectPose(o,time,duration) {
  const t=time/duration,a=t*Math.PI*2,range=o.hi-o.lo
  if(o.mode===0){const glow=(.5+.5*Math.sin(a*3+o.phase))**2;return {x:o.x+3*Math.sin(a+o.phase),y:o.lo+o.start*range,scale:o.scale*(.7+.4*glow),angle:0,alpha:.12+.82*glow}}
  const y=o.lo+((o.start+t*(o.mode===1?-1:1)+1)%1)*range
  const fade=Math.max(0,Math.min(1,(y-o.lo)/35,(o.hi-y)/35))
  return {x:o.x+10*Math.sin(a+o.phase),y,scale:o.scale,angle:a+o.phase,alpha:.72*fade}
}
function makeSprites(t,makeCanvas) {
  return [0,1,2].map(k=>{
    const cv=makeCanvas();cv.width=cv.height=48;const c=cv.getContext('2d');c.fillStyle=t.accent;c.strokeStyle=t.ink;c.lineWidth=1
    c.translate(24,24)
    if(k===0){const g=c.createRadialGradient(0,0,0,0,0,23);g.addColorStop(0,t.ink+'60');g.addColorStop(1,t.ink+'00');c.fillStyle=g;c.fillRect(-24,-24,48,48);c.fillStyle=t.ink;c.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4,r=i%2?3:20;c.lineTo(Math.cos(a)*r,Math.sin(a)*r)}c.closePath();c.fill()}
    else if(k===1){c.beginPath();c.ellipse(0,0,8,17,.35,0,Math.PI*2);c.fill();c.stroke();c.beginPath();c.moveTo(-4,10);c.lineTo(4,-10);c.stroke()}
    else if(['rings','orbit','moon','balloons','table'].includes(t.art)){c.lineWidth=2;c.beginPath();c.arc(0,0,11,0,Math.PI*2);c.stroke()}
    else if(['flowers','peony','lotus'].includes(t.art)){for(let i=0;i<5;i++){c.rotate(Math.PI*2/5);c.beginPath();c.ellipse(0,-8,5,9,0,0,Math.PI*2);c.fill()}c.fillStyle=t.ink;c.beginPath();c.arc(0,0,3,0,Math.PI*2);c.fill()}
    else{c.beginPath();for(let i=0;i<10;i++){const a=i*Math.PI/5,r=i%2?5:17;c.lineTo(Math.cos(a)*r,Math.sin(a)*r)}c.closePath();c.fill()}
    return cv
  })
}
function drawFloorFrame(c,p,layers,time) {
  c.globalAlpha=1;c.clearRect(0,0,p.width,p.height);c.drawImage(layers.background,0,0)
  applyFloorTransform(c,p.floor)
  for(const o of motionObjects(p)){const q=objectPose(o,time,p.duration);c.save();c.translate(q.x,q.y);c.rotate(q.angle);c.scale(q.scale,q.scale);c.globalAlpha=q.alpha;c.drawImage(layers.sprites[o.kind],-24,-24);c.restore()}
  c.restore();c.globalAlpha=1
}
function drawPortraitFrame(c,p,layers,time) {
  c.globalAlpha=1;c.clearRect(0,0,c.canvas.width,c.canvas.height);c.drawImage(layers.portrait,0,0)
  for(const o of motionObjects(p)){const q=objectPose(o,time,p.duration);c.save();c.translate(q.x,q.y);c.rotate(q.angle);c.scale(q.scale,q.scale);c.globalAlpha=q.alpha;c.drawImage(layers.sprites[o.kind],-24,-24);c.restore()}
  c.globalAlpha=1
}

Object.assign(module.exports,{defaultFloor,normalizeFloor,floorProject,renderFloor,applyFloorTransform,motionObjects,objectPose,makeSprites,drawFloorFrame,drawPortraitFrame});
},
"scene":(module,exports,require)=>{
const { templates }=require("templates");
const { drawDecorations }=require("decorations");
const { normalizeFloor, renderFloor }=require("floor");
Object.assign(module.exports, require("templates"));

function defaultProject(id = templates[0].id) {
  const t = templates.find(t => t.id === id) || templates[0]
  return { schemaVersion: 1, template: t.id, title: t.title, subtitle: t.subtitle, detail: t.detail, footer: t.footer,
    color: t.ink, width: 1280, height: 720, fps: 24, duration: 8, motion: 'fade', font: 'serif' }
}
function normalizeProject(p) {
  if (!p || !templates.some(t => t.id === p.template)) throw new Error('无法识别这个模板工程。')
  const d = defaultProject(p.template)
  for (const k of ['title', 'subtitle', 'detail', 'footer']) {
    if (typeof p[k] !== 'string' || p[k].length > 120) throw new Error('每栏文字最多 120 个字符。')
    d[k] = p[k]
  }
  if (!d.title.trim()) throw new Error('请填写主标题。')
  if (!/^#[\da-f]{6}$/i.test(p.color)) throw new Error('请选择有效的文字颜色。')
  if (!Number.isInteger(p.width) || !Number.isInteger(p.height) || p.width < 320 || p.height < 240 || p.width > (p.profile==='floorled'?3000:1920) || p.height > 1920 || p.width * p.height > 2073600) throw new Error('画面尺寸无效；FloorLED 支持宽度到 3000 像素，总面积最多 2073600 像素。')
  if (![12, 24, 30].includes(p.fps) || !Number.isInteger(p.duration) || p.duration < 2 || p.duration > 30) throw new Error('时长为 2–30 秒，帧率为 12、24 或 30。')
  if (!['fade', 'rise', 'still'].includes(p.motion) || !['serif', 'sans-serif'].includes(p.font)) throw new Error('动画或字体选项无效。')
  const result = { ...d, color: p.color, width: p.width, height: p.height, fps: p.fps, duration: p.duration, motion: p.motion, font: p.font }
  if(p.profile!==undefined&&!['standard','floorled'].includes(p.profile))throw new Error('输出模式无效。')
  if(p.profile==='floorled')return {...result,schemaVersion:2,profile:'floorled',motion:'still',floor:normalizeFloor(p.floor,templates.find(t=>t.id===p.template),p.width,p.height)}
  return result
}
function fontFamily(style) {
  return style === 'sans-serif' ? '"PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif' : '"Songti SC", "SimSun", "Noto Serif CJK SC", serif'
}
function line(c, x1, y1, x2, y2) { c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke() }
function text(c, value, y, size, maxWidth, font, color, weight = '400') {
  c.fillStyle = color; c.textAlign = 'center'; c.textBaseline = 'middle'
  const lines = value.split('\n').slice(0, 3)
  let fs = size
  for (;;) { c.font = `${weight} ${fs}px ${font}`; if (Math.max(...lines.map(s => c.measureText(s).width)) <= maxWidth || fs <= 10) break; fs -= 1 }
  lines.forEach((s, i) => c.fillText(s, c.canvas.width / 2, y + (i - (lines.length-1)/2) * fs * 1.18))
}
/** Rasterize once; animation transforms only two reusable layers. */
function renderLayers(project, makeCanvas = () => document.createElement('canvas')) {
  const p = normalizeProject(project), t = templates.find(t => t.id === p.template)
  if(p.profile==='floorled')return renderFloor(p,makeCanvas)
  const background = makeCanvas(), foreground = makeCanvas()
  for (const canvas of [background, foreground]) { canvas.width = p.width; canvas.height = p.height }
  const b = background.getContext('2d'), c = foreground.getContext('2d'), w = p.width, h = p.height, s = Math.min(w / 1280, h / 720)
  b.fillStyle = t.bg; b.fillRect(0,0,w,h)
  const g = b.createRadialGradient(w*.5,h*.38,0,w*.5,h*.4,Math.max(w,h)*.7)
  g.addColorStop(0, '#ffffff18'); g.addColorStop(1, '#00000018'); b.fillStyle = g; b.fillRect(0,0,w,h)
  drawDecorations(b,t,w,h)
  const font = fontFamily(p.font)
  const layouts = { classic:[.26,.41,.56,.655,.72,.82], arch:[.28,.43,.57,.66,.73,.81], banner:[.24,.39,.55,.64,.71,.81], seal:[.27,.42,.57,.655,.73,.82], ribbon:[.25,.4,.55,.645,.72,.81] }
  const [kicker,title,subtitle,divider,detail,footer] = layouts[t.layout || 'classic']
  text(c,t.kicker,h*kicker,15*s,w*.7,'sans-serif',t.accent)
  text(c,p.title,h*title,72*s,w*.73,font,p.color)
  text(c,p.subtitle,h*subtitle,30*s,w*.73,font,p.color)
  c.strokeStyle = t.accent; c.globalAlpha=.6; c.lineWidth=s; line(c,w*.43,h*divider,w*.57,h*divider); c.globalAlpha=1
  text(c,p.detail,h*detail,20*s,w*.74,font,p.color)
  text(c,p.footer,h*footer,18*s,w*.74,font,p.color)
  return { background, foreground }
}
function canvasBase64(canvas) {
  const bytes = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data
  let raw = ''; for (let i=0;i<bytes.length;i+=32768) raw += String.fromCharCode(...bytes.subarray(i, i+32768))
  return btoa(raw)
}

Object.assign(module.exports,{defaultProject,normalizeProject,fontFamily,renderLayers,canvasBase64});
},
"motion":(module,exports,require)=>{
/** Shared canvas/SWF foreground state; y is pixels and alpha is in [0, 1]. */
function frameState(timeSeconds, duration, motion, height) {
  if (motion === 'still') return { alpha: 1, y: 0 };
  const progress = Math.max(0, Math.min(1, timeSeconds / 0.7, (duration - timeSeconds) / 0.7));
  const eased = progress * progress * (3 - 2 * progress);
  return {
    alpha: Math.round(eased * 256) / 256,
    y: motion === 'rise' ? Math.round(Math.min(40, height * 0.06) * (1 - eased) * 20) / 20 : 0,
  };
}

Object.assign(module.exports,{frameState});
},
"styles":(module,exports,require)=>{
const css = `
.swf-floor{margin:18px 0;border:1px solid #d9ccd3;border-radius:10px;padding:16px}.swf-floor legend{font-weight:600;color:#75425d;padding:0 8px}.swf-floor[hidden],[data-standard][hidden]{display:none}.swf-options{grid-template-columns:repeat(4,1fr)}

.swf-entry{border:0;background:transparent;color:inherit;padding:10px 12px;width:100%;text-align:left;cursor:pointer;border-radius:8px;font:inherit;display:flex;gap:10px;align-items:center}.swf-entry:hover{background:#8882}
.swf-dialog{box-sizing:border-box;width:min(1500px,96vw);height:min(900px,94vh);max-width:none;max-height:none;padding:0;border:1px solid #d9d5d1;border-radius:18px;color:#332a2f;background:#f8f7f4;box-shadow:0 30px 100px #0005;font:14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI','Microsoft YaHei',sans-serif;overflow:hidden}.swf-dialog::backdrop{background:#21192480;backdrop-filter:blur(5px)}
.swf-dialog *{box-sizing:border-box}.swf-dialog button,.swf-dialog input,.swf-dialog select,.swf-dialog textarea{font:inherit}.swf-dialog button{cursor:pointer}.swf-dialog button:disabled{cursor:default;opacity:.5}.swf-dialog :focus-visible{outline:2px solid #945776;outline-offset:3px}.swf-head{height:83px;padding:18px 26px;border-bottom:1px solid #e4dfda;display:flex;align-items:center;justify-content:space-between;background:#fffdf9}.swf-head h1{font-size:21px;margin:0;letter-spacing:.03em}.swf-head p{font-size:12px;margin:3px 0 0;color:#877980}.swf-pill{font-size:11px;background:#ecefe6;color:#56715a;padding:5px 10px;border-radius:20px;margin-left:12px}.swf-close{border:1px solid #ddd5d9;border-radius:8px;background:white;padding:7px 13px;color:#695d64}.swf-grid{display:grid;grid-template-columns:276px minmax(0,1fr);height:calc(100% - 83px)}
.swf-library{padding:20px 14px;border-right:1px solid #e4dfda;overflow:auto;background:#f0eeeb}.swf-eyebrow{font-size:11px;letter-spacing:.16em;color:#8b7c83;margin:0 0 12px}.swf-library h2{font-size:15px;margin:0 0 15px}.swf-card{display:block;width:100%;border:1px solid #dfd9d4;background:#fffdf9;border-radius:10px;padding:6px;margin-bottom:10px;text-align:left;color:#4e3c47;transition:box-shadow .15s}.swf-card[aria-pressed=true]{border-color:#8e546e;box-shadow:0 0 0 1px #8e546e}.swf-card canvas{width:100%;aspect-ratio:16/9;display:block;border-radius:6px}.swf-card strong{display:block;padding:7px 6px 0;font-size:13px}.swf-card small{display:block;padding:2px 6px 5px;color:#94838d;font-size:11px}
.swf-library-controls{position:sticky;top:-20px;z-index:1;padding:8px 0 12px;background:#f0eeeb}.swf-library-controls label{display:flex;flex-direction:column;gap:5px;margin-bottom:9px;color:#776771;font-size:12px}.swf-library-controls input,.swf-library-controls select{min-width:0;width:100%;height:36px;border:1px solid #d9d0d5;border-radius:7px;padding:6px 9px;background:#fffdf9;color:#4e3c47}.swf-library-controls input::placeholder{color:#94838d}.swf-filter-summary{display:flex;align-items:center;justify-content:space-between;gap:6px;font-size:11px;color:#8b7c83}.swf-clear{flex-shrink:0;border:0;padding:4px 0;background:transparent;color:#75425d;font-size:11px!important}.swf-clear:not(:disabled):hover{text-decoration:underline}.swf-load-more{width:100%;margin:4px 0 10px;font-size:12px!important}.swf-library-empty{margin:10px 0;padding:17px 13px;border:1px dashed #d6cbd1;border-radius:9px;color:#81707b;font-size:12px;line-height:1.8}
.swf-main{display:grid;grid-template-columns:minmax(0,1fr) minmax(380px,44%);gap:22px;height:100%;padding:22px 26px 28px;min-width:0;overflow:hidden}.swf-editor{min-width:0;overflow:auto;padding-right:6px}.swf-preview-panel{grid-column:2;grid-row:1;min-width:0;align-self:start;padding-left:20px;border-left:1px solid #e4dfda}.swf-editor{grid-column:1;grid-row:1}.swf-preview-head{display:grid;grid-template-columns:1fr auto;align-items:center;gap:4px 10px;margin-bottom:10px}.swf-preview-head strong{font-weight:500}.swf-view-label{grid-column:1/-1;border:1px solid #ddd5d9;border-radius:7px;padding:7px 10px;background:#fffefc;color:#705665;font-size:12px}.swf-meta{font-size:12px;color:#93858c;text-align:right}.swf-stage{border:1px solid #e0dad6;border-radius:12px;background:#e9e5e1;min-height:230px;height:clamp(250px,38vh,390px);display:flex;justify-content:center;align-items:center;overflow:hidden}.swf-stage.is-portrait{height:clamp(420px,62vh,640px)}.swf-stage canvas{display:block;max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;box-shadow:0 6px 25px #0001}.swf-timeline{display:flex;align-items:center;gap:10px;margin:10px 0 8px}.swf-timeline input{flex:1;accent-color:#80516a;min-width:30px}.swf-time{font:12px monospace;color:#80717b;white-space:nowrap}.swf-small{border:1px solid #d7cdd3;background:white;border-radius:7px;padding:5px 12px;color:#705665}
.swf-form{display:grid;grid-template-columns:1fr 1fr;gap:10px 16px}.swf-form label{font-size:12px;color:#776771;display:flex;flex-direction:column;gap:5px}.swf-form input,.swf-form select,.swf-form textarea{width:100%;border:1px solid #ded6da;border-radius:7px;background:#fffefc;padding:8px 10px;color:#3d3039;min-width:0}.swf-form textarea{resize:vertical;min-height:41px;max-height:100px;height:41px}.swf-options{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-top:13px}.swf-options label{font-size:11px;color:#8c7a84;display:flex;flex-direction:column;gap:5px}.swf-options select,.swf-options input{height:35px;max-width:100%;min-width:0;border:1px solid #ded6da;border-radius:7px;padding:5px;background:#fffefc;color:#4c3a45}.swf-options input[type=color]{padding:3px;width:100%}
.swf-actions{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:18px;padding-top:16px;border-top:1px solid #e2dbdf}.swf-primary{background:#75425d;border:1px solid #75425d;color:#fff;border-radius:8px;padding:10px 24px;font-weight:600;white-space:nowrap}.swf-primary:hover{background:#64354e}.swf-note{font-size:11px;color:#94848d;margin:8px 0;line-height:1.7}.swf-status{padding:12px 14px;background:#edf3ed;border:1px solid #cfdecf;border-radius:8px;margin-top:14px;overflow-wrap:anywhere}.swf-status[data-error=true]{background:#fff0ec;border-color:#ecc9be;color:#8f4431}.swf-status p{margin:3px 0}.swf-path{display:block;width:100%;background:white;border:1px solid #d3dfd2;padding:8px;border-radius:5px;margin:8px 0;font:12px/1.5 monospace;color:#3b6144;resize:none}.swf-result-actions{display:flex;gap:8px;margin-top:8px}.swf-save-location{max-width:60%;font-size:11px;color:#90808a;overflow-wrap:anywhere}
@media(max-width:1100px){.swf-main{grid-template-columns:1fr;overflow:auto}.swf-editor,.swf-preview-panel{grid-column:1;grid-row:auto}.swf-editor{overflow:visible;padding-right:0}.swf-preview-panel{grid-row:1;padding:0 0 14px;border:0;border-bottom:1px solid #e4dfda}.swf-stage{height:250px}}
@media(max-width:800px){.swf-grid{grid-template-columns:220px minmax(0,1fr)}.swf-library{padding:14px 10px}.swf-library-controls{top:-14px}.swf-main{padding:16px}.swf-options{grid-template-columns:repeat(3,1fr)}.swf-form{grid-template-columns:1fr}.swf-stage{height:230px}.swf-head{padding:14px 18px}.swf-pill{display:none}}
`

Object.assign(module.exports,{css});
},
"studio":(module,exports,require)=>{
const { templates, defaultProject, normalizeProject, renderLayers, canvasBase64, fontFamily }=require("scene");
const { css }=require("styles");
const { floorProject, drawPortraitFrame }=require("floor");
const API = '/api/dsh-swf-studio'
const TEMPLATE_PAGE_SIZE = 12
async function api(path, body) {
  const response = await fetch(API + path, body === undefined ? {} : { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  let result
  try { result = await response.json() } catch { throw new Error(`导出服务暂时不可用（${response.status}），请重新加载插件。`) }
  if (!response.ok) throw new Error(result.error || `请求失败（${response.status}）`)
  return result
}
function mountStudio(onClose, draft) {
  const libraryCategories = [...new Set(templates.map(template => template.category))]
  const style = document.createElement('style'); style.textContent = css; document.head.append(style)
  const dialog = document.createElement('dialog'); dialog.className = 'swf-dialog'; dialog.setAttribute('aria-label','大澳渔庄灯光工作台')
  dialog.innerHTML = `<header class="swf-head"><div><h1>大澳渔庄灯光工作台 <span class="swf-pill">本地生成 · 0 模型 Token</span></h1><p>60 个主题 · 完整地砖屏 · 酒席与主席台文案均可定制</p></div><button class="swf-close" aria-label="关闭工坊">关闭</button></header>
  <div class="swf-grid"><aside class="swf-library"><p class="swf-eyebrow">${templates.length} 款模板 · ${libraryCategories.length} 类宴会场景</p><h2>选择你的场景</h2>
  <div class="swf-library-controls"><label>场景分类<select data-category aria-label="场景分类"><option value="">全部分类</option></select></label><label>搜索模板<input data-search type="search" placeholder="升学、寿宴、婚礼…" aria-label="搜索模板"></label><div class="swf-filter-summary"><span data-template-count role="status" aria-live="polite"></span><button class="swf-clear" data-clear-filters>清除筛选</button></div></div>
  <div data-templates></div><p class="swf-library-empty" data-no-templates hidden>没有找到匹配的模板。试试其他关键词，或清除筛选。</p><button class="swf-small swf-load-more" data-load-more hidden></button><p class="swf-note">画面与文字随文件保存<br>筛选列表不会更改当前工程</p></aside>
  <main class="swf-main"><section class="swf-preview-panel"><div class="swf-preview-head"><strong data-scene-title></strong><span class="swf-meta" data-meta></span><span class="swf-view-label">完整走道 · 竖向预览</span></div><div class="swf-stage"><canvas aria-label="完整走道竖向动效预览"></canvas></div>
  <div class="swf-timeline"><button class="swf-small" data-play>暂停</button><input aria-label="动画时间" type="range" min="0" max="20" value="0" step="0.01"><span class="swf-time"></span></div><p class="swf-note">右侧同时显示主席台区域和酒席区域。动画固定为 20 秒、24 FPS，并持续循环播放。</p></section>
  <section class="swf-editor"><div class="swf-form"><label>主题切换<select name="keepText"><option value="no">更换主题文案，保留姓名及现场参数</option><option value="yes">保留当前全部文案</option></select></label><label>酒席方向 · 中部主标题<input name="title" maxlength="120"></label><label>酒席方向 · 中部副标题<input name="subtitle" maxlength="120"></label><label>酒席方向 · 靠舞台日期地点<input name="detail" maxlength="120"></label><label>酒席方向 · 靠舞台祝福语<textarea name="footer" maxlength="120"></textarea></label></div>
  <fieldset class="swf-floor" data-floor><legend>完整地砖屏设置</legend><div class="swf-form">
<label>新郎姓名<input name="groom" maxlength="120"></label><label>新娘姓名<input name="bride" maxlength="120"></label>
<label>姓名显示<select name="showNames"><option value="yes">两区显示新人姓名</option><option value="no">显示副标题，不显示姓名</option></select></label><label>两端引导语<input name="kicker" maxlength="120"></label>
<label>主席台方向 · 主标题<textarea name="secondaryTitle" maxlength="120"></textarea></label><label>主席台方向 · 副标题<textarea name="secondarySubtitle" maxlength="120"></textarea></label>
<label>主席台方向 · 祝福语<textarea name="secondaryFooter" maxlength="120"></textarea></label>
<label>酒席方向阅读方向<select name="direction"><option value="90">A 方向（沿用已验证方向）</option><option value="270">B 方向（整幅旋转 180°）</option></select></label>
<label>可见走道长度（像素）<input name="visibleLength" type="number" min="320" max="3000"></label><label>可见走道宽度（像素）<input name="visibleWidth" type="number" min="240" max="1920"></label>
<label>导出画面宽度（像素）<input name="stageWidth" type="number" min="320" max="3000"></label><label>导出画面高度（像素）<input name="stageHeight" type="number" min="240" max="1920"></label>
<label>可见区域 X 偏移<input name="offsetX" type="number" min="0"></label><label>可见区域 Y 偏移<input name="offsetY" type="number" min="0"></label>
<label>边缘动效<select name="effects"><option value="rich">丰富：流光、闪星、飘叶、主题粒子</option><option value="gentle">轻柔</option><option value="off">关闭</option></select></label><label>动效密度<input name="intensity" type="number" min="0.25" max="2" step="0.25"></label>
    </div><p class="swf-note">完整走道固定为酒席区域 3/4、主席台区域 1/4，主席台文字与酒席文字相向摆放。默认走道 32×7 块；像素参数沿用已验证输出。</p></fieldset><div class="swf-options"><label>文字颜色<input name="color" type="color"></label><label>字体<select name="font"><option value="serif">典雅衬线</option><option value="sans-serif">简洁无衬线</option></select></label></div>
  <p class="swf-note">所有文字、姓名和现场参数保存在工程 JSON，可重新导入修改。FloorLED 模式文字固定；本插件生成播放素材，现场传感器继续由 FloorLED 处理。</p>
  <div class="swf-actions"><div><button class="swf-small" data-import>导入工程</button><input type="file" accept=".json,application/json" data-file hidden></div><button class="swf-primary" data-export>生成 SWF 文件</button></div>
  <p class="swf-note" data-location>正在读取保存位置…</p><section class="swf-status" hidden aria-live="polite"></section></section></main></div>`
  const $ = s => dialog.querySelector(s)
  let project = normalizeProject(draft.project || floorProject(defaultProject()))
  if(project.profile!=='floorled')project=floorProject(project)
  project={...project,duration:20,fps:24,motion:'still'}
  let layers, playing = true, time = 0, previous = 0, raf = 0, busy = false, disposed = false
  let matchingTemplates = [], shownTemplates = 0
  const preview = $('.swf-stage canvas'), status = $('.swf-status'), exportButton = $('[data-export]')
  const templateList = $('[data-templates]'), categorySelect = $('[data-category]'), searchInput = $('[data-search]')
  const loadMore = $('[data-load-more]'), clearFilters = $('[data-clear-filters]')
  function message(text, error = false) { status.hidden = false; status.dataset.error = String(error); status.textContent = text }
  function syncFields() {
    for (const k of ['title','subtitle','detail','footer','color','font']) $(`[name="${k}"]`).value = project[k]
    if(project.floor){
      for(const k of ['groom','bride','kicker','secondaryTitle','secondarySubtitle','secondaryFooter','direction','visibleLength','visibleWidth','offsetX','offsetY','effects','intensity'])$(`[name=${k}]`).value=project.floor[k]
      $('[name=showNames]').value=project.floor.showNames?'yes':'no'
      $('[name=stageWidth]').value=project.width;$('[name=stageHeight]').value=project.height
    }
    $('.swf-timeline input').max = project.duration
    for (const button of dialog.querySelectorAll('[data-template]')) button.setAttribute('aria-pressed',String(button.dataset.template === project.template))
  }
  function rebuild() {
    layers = renderLayers(project); preview.width=project.width; preview.height=project.height
    $('.swf-stage').classList.toggle('is-portrait',project.profile==='floorled')
    $('[data-scene-title]').textContent = templates.find(t=>t.id===project.template).name
    $('[data-meta]').textContent = `${project.width} × ${project.height} · ${project.fps} FPS · ${project.duration} 秒`
    draft.project = structuredClone(project); draw()
  }
  function draw() {
    if (!layers) return
    const context = preview.getContext('2d'), tick = Math.min(project.duration - 1 / project.fps, Math.floor(time * project.fps) / project.fps)
    preview.width=project.floor.visibleWidth;preview.height=project.floor.visibleLength;drawPortraitFrame(context,project,layers,tick)
    $('.swf-time').textContent = `${time.toFixed(1)} / ${project.duration}s`; $('.swf-timeline input').value = time
  }
  function animate(now) {
    if (disposed) return
    if (playing && !document.hidden && previous) { const before=Math.floor(time*project.fps);time=(time+Math.min((now-previous)/1000,.1))%project.duration;if(Math.floor(time*project.fps)!==before)draw() }
    previous=now; raf=requestAnimationFrame(animate)
  }
  function templateCard(t) {
    const card = document.createElement('button'); card.className='swf-card'; card.dataset.template=t.id; card.setAttribute('aria-label',t.name+'，'+t.description)
    card.setAttribute('aria-pressed', String(t.id === project.template)); card.disabled = busy
    // Render at a supported project size, then retain only the small thumbnail bitmap.
    const thumbnail = renderLayers({...defaultProject(t.id),width:640,height:360}), cv=document.createElement('canvas')
    cv.width=320;cv.height=180;cv.getContext('2d').drawImage(thumbnail.background,0,0,320,180);cv.getContext('2d').drawImage(thumbnail.foreground,0,0,320,180)
    thumbnail.background.width=0;thumbnail.foreground.width=0
    const title=document.createElement('strong'); title.textContent=t.name; const subtitle=document.createElement('small'); subtitle.textContent=t.description
    card.append(cv,title,subtitle); card.addEventListener('click',()=>{ if(busy)return; const old=project,next=floorProject(defaultProject(t.id));project={...next,width:old.width,height:old.height,fps:24,duration:20,motion:'still',font:old.font};project.floor={...next.floor,...Object.fromEntries(['direction','visibleLength','visibleWidth','offsetX','offsetY','groom','bride','showNames','effects','intensity'].map(k=>[k,old.floor[k]]))};if($('[name=keepText]').value==='yes'){for(const k of ['title','subtitle','detail','footer'])project[k]=old[k];for(const k of ['kicker','secondaryTitle','secondarySubtitle','secondaryFooter'])project.floor[k]=old.floor[k]}; time=1.5;syncFields();rebuild(); exportButton.disabled=false; status.hidden=true })
    return card
  }
  function syncLibraryControls() {
    const remaining = matchingTemplates.length - shownTemplates
    $('[data-template-count]').textContent = `匹配 ${matchingTemplates.length} 款 · 已显示 ${shownTemplates}`
    $('[data-no-templates]').hidden = matchingTemplates.length !== 0
    loadMore.hidden = remaining === 0; loadMore.disabled = busy
    loadMore.textContent = `再显示 ${Math.min(TEMPLATE_PAGE_SIZE, remaining)} 款（剩余 ${remaining} 款）`
    clearFilters.disabled = busy || (!categorySelect.value && !searchInput.value)
  }
  function appendTemplatePage() {
    const page = matchingTemplates.slice(shownTemplates, shownTemplates + TEMPLATE_PAGE_SIZE)
    const fragment = document.createDocumentFragment()
    for (const template of page) fragment.append(templateCard(template))
    templateList.append(fragment); shownTemplates += page.length; syncLibraryControls()
  }
  function filterTemplates() {
    if (busy) return
    const category = categorySelect.value, query = searchInput.value.trim().toLocaleLowerCase()
    const words = query.split(/\s+/).filter(Boolean)
    matchingTemplates = templates.filter(template => {
      const text = [template.name, template.description, template.category, template.title].join(' ').toLocaleLowerCase()
      return (!category || template.category === category) && words.every(word => text.includes(word))
    })
    for (const canvas of templateList.querySelectorAll('canvas')) canvas.width = 0
    templateList.replaceChildren(); shownTemplates = 0
    draft.library = { category, query: searchInput.value }
    appendTemplatePage()
  }
  for (const category of libraryCategories) {
    const option = document.createElement('option'); option.value = category
    option.textContent = `${category}（${templates.filter(template => template.category === category).length}）`
    categorySelect.append(option)
  }
  categorySelect.value = libraryCategories.includes(draft.library?.category) ? draft.library.category : ''
  searchInput.value = draft.library?.query || ''
  categorySelect.onchange = filterTemplates; searchInput.oninput = filterTemplates
  clearFilters.onclick = () => { if(busy)return; categorySelect.value=''; searchInput.value=''; filterTemplates() }
  loadMore.onclick = () => { if(!busy)appendTemplatePage() }
  filterTemplates()
  function update() {
    try {
      let candidate=structuredClone(project)
      for(const k of ['title','subtitle','detail','footer','font','color']) candidate[k]=$(`[name="${k}"]`).value
      for(const k of ['groom','bride','kicker','secondaryTitle','secondarySubtitle','secondaryFooter','effects'])candidate.floor[k]=$(`[name=${k}]`).value
      for(const k of ['direction','visibleLength','visibleWidth','offsetX','offsetY','intensity'])candidate.floor[k]=Number($(`[name=${k}]`).value)
      candidate.floor.showNames=$('[name=showNames]').value==='yes'
      candidate.width=Number($('[name=stageWidth]').value);candidate.height=Number($('[name=stageHeight]').value)
      candidate.duration=20;candidate.fps=24;candidate.motion='still';candidate.floor.mainRatio=.75;candidate.floor.secondaryRotation=180
      project=normalizeProject(candidate); time=Math.min(time,project.duration-.01); $('.swf-timeline input').max=project.duration; rebuild(); exportButton.disabled=false; status.hidden=true
    }catch(error){exportButton.disabled=true;message(error.message,true)}
  }
  dialog.querySelectorAll('.swf-form input,.swf-form textarea,.swf-form select,.swf-options input,.swf-options select').forEach(input=>input.addEventListener('input',update))
  $('[data-play]').onclick=()=>{playing=!playing;$('[data-play]').textContent=playing?'暂停':'播放'}
  $('.swf-timeline input').oninput=e=>{time=Number(e.target.value);playing=false;$('[data-play]').textContent='播放';draw()}
  $('[data-import]').onclick=()=>$('[data-file]').click()
  $('[data-file]').onchange=async e=>{
    const file=e.target.files[0]; if(!file || busy || disposed)return
    const controls=[...dialog.querySelectorAll('input,textarea,select,button')].map(control=>[control,control.disabled])
    busy=true; for(const [control] of controls)control.disabled=true
    let imported=false
    try{
      if(file.size>32768)throw new Error('工程文件过大，请选择本插件导出的 project.json。')
      const content=await file.text(); if(disposed)return
      const raw=JSON.parse(content),normalized=normalizeProject(raw.project||raw);project=normalized.profile==='floorled'?normalized:floorProject(normalized)
      project={...project,duration:20,fps:24,motion:'still',floor:{...project.floor,mainRatio:.75,secondaryRotation:180}}
      syncFields();rebuild();time=1.5;draw();imported=true;message('工程已载入，可继续修改文字。')
    }catch(error){if(!disposed)message(error.message,true)}finally{
      busy=false;e.target.value=''
      if(!disposed){for(const [control,disabled] of controls)control.disabled=disabled;if(imported)exportButton.disabled=false;syncLibraryControls()}
    }
  }
  exportButton.onclick=async()=>{
    if(busy)return; busy=true
    const controls=[...dialog.querySelectorAll('input,textarea,select,button')]; for(const x of controls)x.disabled=true
    exportButton.textContent='正在本地生成…'; message('正在将画面与中文写入 SWF…')
    try{
      await document.fonts.load(`32px ${fontFamily(project.font)}`); layers=renderLayers(project)
      const poster=document.createElement('canvas');poster.width=project.width;poster.height=project.height;const pc=poster.getContext('2d');pc.drawImage(layers.background,0,0);pc.drawImage(layers.foreground,0,0)
      const result=await api('/export',{project,background:canvasBase64(layers.background),foreground:canvasBase64(layers.foreground),...(project.profile==='floorled'?{sprites:layers.sprites.map(canvasBase64)}:{}),poster:poster.toDataURL('image/png')})
      if(disposed)return
      status.replaceChildren();status.hidden=false;status.dataset.error='false'
      const heading=document.createElement('strong');heading.textContent='SWF 已生成并保存'
      const path=document.createElement('textarea');path.className='swf-path';path.readOnly=true;path.rows=2;path.value=result.absolutePath;path.setAttribute('aria-label','SWF 文件完整路径')
      const details=document.createElement('p');details.textContent=`${(result.bytes/1024).toFixed(0)} KB · ${result.width} × ${result.height} · ${result.duration} 秒。工程与预览图保存在同一文件夹。`
      const actions=document.createElement('div');actions.className='swf-result-actions'
      const copy=document.createElement('button');copy.className='swf-small';copy.textContent='复制文件位置';copy.onclick=async()=>{try{await navigator.clipboard.writeText(result.absolutePath);copy.textContent='已复制'}catch{path.focus();path.select();copy.textContent='路径已选中，可复制'}}
      const reveal=document.createElement('button');reveal.className='swf-small';reveal.textContent='打开导出文件夹';reveal.onclick=async()=>{try{await api('/reveal',{})}catch(error){message(error.message,true)}}
      actions.append(copy,reveal);status.append(heading,path,details,actions);path.focus()
    }catch(error){if(!disposed)message(error.message,true)}finally{busy=false;for(const x of controls)x.disabled=false;exportButton.textContent='生成 SWF 文件';syncLibraryControls()}
  }
  $('.swf-close').onclick=()=>{if(!busy)onClose()}
  dialog.addEventListener('cancel',e=>{e.preventDefault();if(!busy)onClose()})
  document.body.append(dialog);syncFields();rebuild();dialog.showModal();raf=requestAnimationFrame(animate)
  api('/config').then(result=>{if(!disposed)$('[data-location]').textContent='保存目录：'+result.outputDirectory}).catch(error=>{if(!disposed)message(error.message,true)})
  return()=>{disposed=true;cancelAnimationFrame(raf);for(const canvas of templateList.querySelectorAll('canvas'))canvas.width=0;dialog.close();dialog.remove();style.remove()}
}

Object.assign(module.exports,{mountStudio});
},
"client":(module,exports,require)=>{
const { createElement, useState, useEffect }=require("react");
const { mountStudio }=require("studio");
const inject = ['slots']
function apply(ctx) {
  const draft = {}
  function Entry({wide}) {
    const [open, setOpen] = useState(false)
    useEffect(() => open ? mountStudio(() => setOpen(false), draft) : undefined, [open])
    return createElement('button', {
      type:'button', 'aria-label':'大澳渔庄灯光工作台', title:'大澳渔庄灯光工作台', onClick:()=>setOpen(true),
      style:{display:'flex',alignItems:'center',gap:8,width:'100%',padding:'9px 12px',background:'transparent',border:0,borderRadius:8,color:'inherit',cursor:'pointer',textAlign:'left',font:'inherit'},
    }, createElement('span', {'aria-hidden':true,style:{fontSize:11,border:'1px solid currentColor',borderRadius:4,padding:'1px 3px'}},'SWF'),wide ? '灯光工作台' : null)
  }
  ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({ name:'sidebar.footer.action', id:'swf-studio',order:50 },Entry))
}

Object.assign(module.exports,{inject,apply});
}};
const cache={};function require(id){if(id==='react')return hostRequire(id);if(cache[id])return cache[id].exports;const m=cache[id]={exports:{}};factories[id](m,m.exports,require);return m.exports}
return require('client');}});
