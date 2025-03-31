import reactData from './react';
import nextjsData from './nextjs';

export const learningData = {
  react: reactData,

  nextjs: nextjsData,
};

export const learningMeta = {
  version: '1.0.0',
  lastUpdated: '2025-03-31',
  authors: ['변세민'],
  totalTopics: Object.values(reactData).flat().length + Object.values(nextjsData).flat().length,
};

export default learningData;
