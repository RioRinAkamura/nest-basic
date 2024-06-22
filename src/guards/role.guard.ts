import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ApiRole } from '../common/enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly roles: ApiRole[]) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const roles = this.roles;

    return false;
  }
}
