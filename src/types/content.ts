export type ContentType = 'news' | 'movie' | 'social';

export interface ContentItem {
  id: string;
  type: ContentType;
  category: string;
  title: string;
  description: string;
  image: string;
  source: string;
  trending?: boolean;
}