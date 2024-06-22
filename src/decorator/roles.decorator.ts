import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const RoleKeyMetadata = 'roles';

export enum Role {
  Admin = 'admin',
  Owner = 'owner',
  Normal = 'normal',
  User = 'user',
}

export const Roles = (...roles: Role[]): CustomDecorator =>
  SetMetadata(RoleKeyMetadata, roles);

export const AnonymousKeyMetadata = 'anonymous';

export const AnonymousEndpoint = SetMetadata(AnonymousKeyMetadata, true);
