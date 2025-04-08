
export type BSAClient = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type BSADataSource = {
  id: string;
  client_id: string;
  name: string;
  source_type: string;
  source_url: string | null;
  created_at: string;
  updated_at: string;
};

export type BSAFile = {
  id: string;
  client_id: string;
  filename: string;
  file_path: string;
  file_type: string;
  file_size: number;
  year: number | null;
  quarter: number | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
};

export type BSAReport = {
  id: string;
  client_id: string;
  title: string;
  year: number;
  quarter: number;
  bsa_score: number | null;
  data: Record<string, any>;
  created_at: string;
  updated_at: string;
  created_by: string | null;
};

export type BSAUserSettings = {
  id: string;
  user_id: string;
  openai_api_key: string | null;
  anthropic_api_key: string | null;
  gemini_api_key: string | null;
  deepseek_api_key: string | null;
  default_llm: string | null;
  created_at: string;
  updated_at: string;
};

export type ReportSections = {
  summary: string;
  sentimentDistribution: string;
  departmentPerformance: string;
  keyFindings: string;
  recommendations: string;
  trendAnalysis: string;
  bsaScore: string | null;
};
