export const Schema = z.object({
  _玩家设定: z
    .object({
      状态: z.enum(['未填写', '已填写', '已跳过']).prefault('未填写'),
      档案: z.record(z.string().describe('玩家设定字段'), z.string()).prefault({}),
    })
    .prefault({}),
  世界: z
    .object({
      日期: z.string().prefault('2010-09-11'),
      时间段: z.string().prefault('上午近十一点'),
      当前地点: z
        .object({
          city: z.string().prefault('金陵市'),
          campus: z.string().prefault('华立中央大学'),
          area: z.string().prefault('鹤林校区'),
          detail: z.string().prefault('大学生活动中心一楼艺术社团展区'),
        })
        .prefault({}),
      学期: z.string().prefault('2010-2011学年第一学期'),
      时代标签: z.string().prefault('2010年秋·按键机主流与早期智能机并存的校园网时代'),
    })
    .prefault({}),
  关系: z
    .object({
      好感度: z.coerce
        .number()
        .transform(value => _.clamp(value, 0, 100))
        .prefault(0),
      信任度: z.coerce
        .number()
        .transform(value => _.clamp(value, 0, 100))
        .prefault(0),
      阶段: z.enum(['陌生', '相识', '朋友', '暧昧', '恋人']).prefault('陌生'),
      当前关系: z.string().prefault('尚未正式认识'),
      可观察状态: z.string().prefault('在琴键前专注而从容，离开音乐以后又显得安静拘谨'),
    })
    .prefault({}),
  身份认知: z
    .object({
      玩家对向艺: z.enum(['未知', '怀疑', '确认']).prefault('未知'),
      向艺对玩家: z.enum(['未知', '怀疑', '确认']).prefault('未知'),
      玩家可见线索: z.array(z.string()).prefault([]),
      向艺私有判断: z.array(z.string()).prefault([]),
    })
    .prefault({}),
  音乐: z
    .object({
      当前焦点项目: z.string().prefault('未命名古风原创'),
      活动项目: z
        .record(
          z.string().describe('项目名'),
          z
            .object({
              类别: z.string().prefault('未记录'),
              阶段: z.string().prefault('未记录'),
              进度: z.coerce
                .number()
                .transform(value => _.clamp(value, 0, 100))
                .prefault(0),
              状态: z.string().prefault('未记录'),
            })
            .prefault({}),
        )
        .prefault({}),
      灵感碎片: z
        .array(
          z.object({
            名称: z.string().prefault('未命名灵感'),
            描述: z.string().prefault(''),
          }),
        )
        .prefault([]),
      项目归档: z
        .array(
          z.object({
            名称: z.string().prefault('未命名项目'),
            类别: z.string().prefault('未记录'),
            结果: z.string().prefault('未记录'),
            日期: z.string().prefault('未记录'),
            意义: z.string().prefault('未记录'),
          }),
        )
        .prefault([]),
    })
    .prefault({}),
  声名: z
    .object({
      网络知名度: z.coerce
        .number()
        .transform(value => _.clamp(value, 0, 100))
        .prefault(22),
      校园知名度: z.coerce
        .number()
        .transform(value => _.clamp(value, 0, 100))
        .prefault(0),
      网络公众印象: z
        .string()
        .prefault('在古风原创小圈里有少量固定听众，名字略有眼熟，但更新不算稳定，听众几乎不了解本人'),
      校园公众印象: z.string().prefault('尚未在华央校园里留下可辨认的公众印象'),
    })
    .prefault({}),
  记忆: z
    .object({
      近期事件: z.array(z.string()).prefault([]),
      关键里程碑: z.array(z.string()).prefault([]),
      关系阶段摘要: z.record(z.string().describe('关系阶段'), z.string()).prefault({}),
      学期摘要: z.record(z.string().describe('学期'), z.string()).prefault({}),
    })
    .prefault({}),
});

export type Schema = z.output<typeof Schema>;
