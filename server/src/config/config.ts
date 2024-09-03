import { plainToInstance } from "class-transformer";
import {
  IsEnum,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
  validateSync,
  ValidationError,
} from "class-validator";

enum Environment {
  development = "development",
  production = "production",
  test = "test",
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;

  @IsString()
  @Length(32, 64)
  JWT_SECRET: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const parseValidatorError = (errors: ValidationError[]) => {
      return errors
        .map((error) => {
          if (error.children.length > 0) {
            return parseValidatorError(error.children);
          }
          return Object.values(error.constraints).join("\n");
        })
        .join("\n");
    };
    throw new Error(parseValidatorError(errors));
  }
  return validatedConfig;
}

export const configs = [];
