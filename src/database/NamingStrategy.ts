import { plural } from 'pluralize';
import { DefaultNamingStrategy } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export class NamingStrategy extends DefaultNamingStrategy {
  tableName(targetName: string, userSpecifiedName: string | undefined): string {
    return plural(snakeCase(userSpecifiedName || targetName));
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }

  columnName(propertyName: string, customName: string) {
    return snakeCase(customName || propertyName);
  }

  joinColumnName(relationName: string, referencedColumnName: string) {
    return snakeCase(`${relationName}_${referencedColumnName}`);
  }

  joinTableColumnName(
    tableName: string,
    propertyName: string,
    columnName: string,
  ) {
    return snakeCase(`${tableName}_${columnName || propertyName}`);
  }
}
