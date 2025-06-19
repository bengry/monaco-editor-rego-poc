export interface RegoExample {
  id: string;
  title: string;
  description: string;
  code: string;
  category: string;
}

export interface EditorSettings {
  theme: 'light' | 'dark';
  fontSize: number;
  minimap: boolean;
  lineNumbers: boolean;
  wordWrap: boolean;
}