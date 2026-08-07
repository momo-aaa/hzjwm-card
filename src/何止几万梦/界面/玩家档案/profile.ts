export type ProfileStatus = '未填写' | '已填写' | '已跳过';

export type ProfileField = {
  key: string;
  label: string;
  placeholder: string;
  multiline?: boolean;
};

export type ProfileSection = {
  id: 'basic' | 'life' | 'music' | 'future';
  label: string;
  shortLabel: string;
  note: string;
  fields: ProfileField[];
};

export const profileSections: ProfileSection[] = [
  {
    id: 'basic',
    label: '基本资料',
    shortLabel: '基本',
    note: '笑脸里已经写好的内容可以留空，这里只补充这张卡需要知道的部分。',
    fields: [
      { key: '姓名与称呼', label: '姓名与称呼', placeholder: '希望角色怎样称呼你' },
      { key: '性别', label: '性别', placeholder: '可留白或自由描述' },
      { key: '外貌', label: '外貌', placeholder: '只写你希望在叙事中被注意到的特征', multiline: true },
      { key: '宿舍安排', label: '宿舍安排', placeholder: '宿舍组团、室友性别或其他安排' },
      { key: '院系与专业', label: '院系与专业', placeholder: '例如：文学院汉语言文学' },
    ],
  },
  {
    id: 'life',
    label: '来处与日常',
    shortLabel: '日常',
    note: '没有填写的部分会继续留白，不会由角色或旁白自行补完。',
    fields: [
      { key: '家乡', label: '家乡', placeholder: '城市、地区或成长环境' },
      { key: '家庭', label: '家庭', placeholder: '想让故事知道的家庭成员与关系', multiline: true },
      { key: '入学前经历', label: '入学前经历', placeholder: '重要经历即可，不必写完整履历', multiline: true },
      { key: '性格与价值观', label: '性格与价值观', placeholder: '你通常怎样待人、在意什么', multiline: true },
      { key: '兴趣与生活习惯', label: '兴趣与生活习惯', placeholder: '爱好、作息、饮食或日常习惯', multiline: true },
    ],
  },
  {
    id: 'music',
    label: '音乐与网络',
    shortLabel: '音乐',
    note: '这些信息决定你从哪里听见“临临”，不会强制你参与音乐创作。',
    fields: [
      { key: '音乐能力', label: '音乐能力', placeholder: '演唱、乐器、写词、制作，或只是听众', multiline: true },
      { key: '6sing用户名', label: '6sing用户名', placeholder: '向艺可能觉得眼熟的用户名' },
      { key: '网络经历', label: '网络经历', placeholder: '论坛、QQ、音乐平台等使用经历', multiline: true },
      {
        key: '古风音乐了解程度',
        label: '古风音乐了解程度',
        placeholder: '偶尔听、熟悉圈内作品，或已有创作经验',
        multiline: true,
      },
    ],
  },
  {
    id: 'future',
    label: '关系与未来',
    shortLabel: '未来',
    note: '社团、学业与职业只记录开场时的倾向，真正的选择仍由剧情决定。',
    fields: [
      { key: '恋爱取向', label: '恋爱取向', placeholder: '可留白；只按你明确写出的内容处理' },
      { key: '社团初始倾向', label: '社团初始倾向', placeholder: '感兴趣、想观望，或暂时不参加' },
      { key: '学业方向', label: '学业方向', placeholder: '目前感兴趣的课程或发展方向' },
      { key: '职业理想', label: '职业理想', placeholder: '可以写“还没想好”' },
    ],
  },
];

export const profileFields = profileSections.flatMap(section => section.fields);

export function createProfileDraft(profile: Record<string, string> = {}): Record<string, string> {
  return Object.fromEntries(profileFields.map(field => [field.key, profile[field.key] ?? '']));
}

export function cleanProfileDraft(draft: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    profileFields
      .map(field => [field.key, (draft[field.key] ?? '').trim()] as const)
      .filter(([, value]) => value.length > 0),
  );
}
