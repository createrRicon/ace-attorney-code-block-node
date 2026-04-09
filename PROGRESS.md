## Done
- 仓库维护：完善根目录 `.gitignore`（忽略 `node_modules`、`dist`、Vite 缓存、`.env`、`dist` 等），从 Git 中移除已误提交的 `node_modules` 与 `.claude/settings.local.json`；排除嵌套仓库目录 `claude-telegram-bot-bridge/`、`telegram_bot/`；已推送到 `origin`（GitHub）。
- 强化第二个 prototype 中「测试运行」按钮的引导动效：按钮本体改为更明显的放大/外发光脉冲，并增加上方浮动提示标签，提升首次注意力捕捉。
- 结尾页新增「重头游玩」按钮：仅在最终结束旁白时显示，点击后返回封面的「点击开始」页。
- `App` 中补充统一返回封面逻辑：重置游戏/对话状态并关闭证物相关弹层，避免二次开局残留上次进度。
- 移除第三幕 `CodeBlockPrototype` 展示前的 500ms 等待：组件初始阶段改为直接进入 `waiting-click`，新方案出现后可立即交互，无额外时间间隔。
- 按反馈将第五幕“项目复盘”进一步压缩到 10 句主对白（`act5_01`~`act5_10`），并移除后续 4 句尾声追问，节奏更紧凑。
- 精简第五幕结尾复盘台词：压缩为三点核心反思，并移除“……”无语停顿台词；已同步 `src/data/scenes/act5_verdict.ts` 与 `DIALOGUES_FOR_EDIT.md`。
- 修复"探索新方案"（ClueFindingGame）场景中人物立绘未隐藏的问题：将角色隐藏条件从 `!showPrototype` 改为 `!isInteractionActive`，覆盖所有交互模式（clue-finding + prototype-demo）。
- 修复第三幕新方案 prototype 演示时人物立绘未隐藏的问题：在 `GameEngine` 中进入 `showPrototype` 状态后不再渲染角色层，避免干扰原型探索。
- 调整第三幕小王访谈定位：从"看日志"改为"查看处理结果并配置回填到表单"，明确其不会主动改代码、需要时找技术同事协助。
- 在第三幕中补充小王访谈结束到老陈访谈开始的时间过渡，强调两者是两次独立线上会话；并同步第四幕法庭总结与 `DIALOGUES_FOR_EDIT.md` / `evidences.ts` 文案。
- 精简 `CodeBlockPrototype` 中与当前演示无关的辅助文案，移除"插入字段提示""配置测试值""流转规则说明"三处文字，避免干扰内容理解。
- 将 `ObjectionEffect` 从 `fixed` 改为 `absolute`，避免按浏览器视口居中。
- 将异议特效挂载位置从外层容器移动到 `GameEngine` 的 `1280x720` 游戏屏幕容器内，确保在游戏画面中心显示。
- 完成相关文件 lint 自检，未发现新问题。
- 修复线索题（`ClueFindingGame`）阶段人物立绘被误隐藏的问题：`GameEngine` 中角色隐藏条件从“所有交互态”收敛为“仅 `prototype-demo` 隐藏”，确保截图所示选择题场景正常显示人物。
- 进一步细化线索题人物显示策略：`ClueFindingGame` 按阶段回传人物可见性，`exploring`（探索卡片）阶段隐藏人物，`choosing/feedback` 与后续剧情恢复显示，满足“这一幕隐藏、后一幕出现”。
- 第三幕小王、老陈访谈：增加力康追问轮次（`act3_iw_*` / `act3_ic_*`）；证词引文与 `evidences.ts` 保持原始版本不变；已同步 `DIALOGUES_FOR_EDIT.md`。
- 第三幕小王、老陈访谈：将多条过长单句拆成连续短句，降低单次对白长度；已同步 `src/data/scenes/act3_investigation.ts` 与 `DIALOGUES_FOR_EDIT.md`。
- 第三幕调研收束：移除"拖动证词卡片分类"的旧引导，改为直接进入 `clue-finding`；同时继续精炼第三幕过长台词，并清理未使用的 `evidence-sorting` 交互类型。
- 第四幕「方案通过」庆祝动画：
  - 给 `DialogueLine` 类型新增 `effects` 可选字段（`VisualEffect[]`），支持声明式地标记对话行的视觉效果。
  - 新建 `ConfettiEffect` 组件：Canvas 粒子动画，金色纸屑从顶部飘落 + 底部两侧礼炮发射，自然衰减淡出。
  - 改造 `ScreenShake` 组件：从无效的 overlay div 改为通过 `targetRef` 直接操作游戏容器的 CSS transform，实现真实震屏。
  - `act4_55`（"设计方案，通过！"）触发白色闪光 + 屏幕震动；`act4_56`（法槌落下）触发礼花；`act4_end`（案件逆转成功）延续礼花。
  - `GameEngine` 中新增 effects useEffect，根据 `currentLine.effects` 自动触发对应效果组件。

## Issues
- 暂无已知阻塞问题。
- `npm run lint` 当前无法执行：仓库内缺少 ESLint 配置文件，命令会直接报错退出。

## Next
- 运行态感受第三幕 `CodeBlockPrototype` 的「测试运行」提示强度，如仍不够可继续加入口径更强的箭头/高亮描边。
- 运行态验证结尾「重头游玩」按钮的点击范围、焦点状态与回到封面后的二次开局流程。
- 在运行态验证第四幕庆祝动画的表现（礼花密度、颜色、震动力度是否需要微调）。
- 在运行态验证第二幕 `act2_05` 的异议触发位置是否稳定居中（不同窗口尺寸/缩放下）。
- 如需，继续统一其他全屏特效为"相对游戏屏幕"定位策略。
