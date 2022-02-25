import React from 'react';

export interface User {
  alias: string;
  defaultPage?: string | null;
  isExportButtonEnabled: boolean;
  locale: string;
  name: string;
  passwordRemainingTime: number | null;
  themeMode?: ThemeMode;
  timezone: string;
  useDeprecatedPages: boolean;
}

export enum ThemeMode {
  dark = 'dark',
  light = 'light',
}

export interface CloudServices {
  areCloudServicesEnabled: boolean;
  setAreCloudServicesEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Acknowledgement {
  persistent: boolean;
  sticky: boolean;
}

export type UserContext = {
  acknowledgement: Acknowledgement;
  acl: Acl;
  cloudServices: CloudServices | undefined;
  downtime: Downtime;
  refreshInterval: number;
} & User;

export interface ActionAcl {
  acknowledgement: boolean;
  check: boolean;
  comment: boolean;
  downtime: boolean;
  submit_status: boolean;
}

export interface Actions {
  host: ActionAcl;
  service: ActionAcl;
}

export interface Acl {
  actions: Actions;
}

export interface Downtime {
  default_duration: number;
  default_fixed: boolean;
  default_with_services: boolean;
}
