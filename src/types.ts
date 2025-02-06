export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ToolboxState {
  selectedTool: string | null;
  jsonInput: string;
  regexInput: string;
  regexPattern: string;
  base64Input: string;
  hashInput: string;
  hashType: 'MD5' | 'SHA256';
  jwtInput: string;
  snippets: CodeSnippet[];
}

export interface CodeSnippet {
  id: string;
  title: string;
  code: string;
  language: string;
  createdAt: Date;
}