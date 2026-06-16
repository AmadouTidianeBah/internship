import { SetMetadata } from '@nestjs/common';

export const IS_ROLE_SKIPPED_KEY = 'isRoleSkipped';
export const SkipRole = () => SetMetadata(IS_ROLE_SKIPPED_KEY, true);
