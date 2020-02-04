import { plural } from "pluralize";
import { DefaultNamingStrategy } from "typeorm";
import { snakeCase } from "typeorm/util/StringUtils";

export default class NamingStrategy extends DefaultNamingStrategy {
  public tableName(
    targetName: string,
    userSpecifiedName: string | undefined
  ): string {
    return plural(snakeCase(userSpecifiedName || targetName));
  }

  public relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }

  public columnName(propertyName: string, customName: string) {
    return snakeCase(customName || propertyName);
  }

  public joinColumnName(relationName: string, referencedColumnName: string) {
    return snakeCase(`${relationName}_${referencedColumnName}`);
  }

  public joinTableColumnName(
    tableName: string,
    propertyName: string,
    columnName: string
  ) {
    return snakeCase(`${tableName}_${columnName || propertyName}`);
  }
}
