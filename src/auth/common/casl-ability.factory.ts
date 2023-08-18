import { Ability, RawRuleOf } from '@casl/ability';
import { Injectable } from '@nestjs/common';
// import { TModelNames } from '@src/generated/types/enums';
import { AuthenticationsService } from '@src/auth/services';

function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key.toUpperCase()] = key;
    return res;
  }, Object.create(null));
}
const dynamicArrayJSON = ['MANAGE', 'CREATE', 'READ', 'UPDATE', 'DELETE'];
export const Actions = strEnum(dynamicArrayJSON);
export enum Action {
  MANAGE = 'MANAGE',
  READ = 'READ',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

// load rules from api
// type AppAbilities = [Action, TModelNames];
type AppAbilities = any;

export type AppAbility = Ability<AppAbilities>;
@Injectable()
export class CaslAbilityFactory {
  constructor(private authenticationsService: AuthenticationsService) {}
  async getAbility(userId: string) {
    // const rawRules = await getRulesFromDb();

    const userData: any =
      await this.authenticationsService.getUserPermissionsById(userId);
    const rawRules: RawRuleOf<AppAbility>[] = userData['allPermission'].flatMap(
      (permission) => {
        return {
          action: permission.action,
          subject: permission.contentType,
        };
      },
    );
    const ability = new Ability<AppAbilities>(rawRules);
    return ability;
  }
}
// async function getRulesFromDb(): Promise<RawRuleOf<AppAbility>[]> {
//   // implementation
//   return [
//     // load action subject from API
//     { action: Action.READ, subject: 'UsersUser' },
//     { action: Action.CREATE, subject: 'UsersUser' },
//     { action: Action.UPDATE, subject: 'UsersUser' },
//   ];
// }
