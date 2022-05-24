export type ErrorType = "A" | "B";

export type Environment = "dev" | "prod" | "test";

export interface ErrorObjectType {
  id: string;
  instituteId: string;
  businessId: string;
  errorType: ErrorType;
  createdAt: Date;
  environment: Environment;
  region: string;
  service: string;
}
