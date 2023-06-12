import { LanguageMap } from '@/contexts/core/language';

export type RoleAlias = 'patient' | 'parent';

export interface Role {
    id: string;
    alias: RoleAlias;
    name: LanguageMap;
}
