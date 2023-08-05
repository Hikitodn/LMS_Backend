export interface TypeError {
  msg: string;
  errors: string;
  status: number;
  isPublic: boolean;
  stack?: string;
}
