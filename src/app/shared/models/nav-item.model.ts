export interface NavItem {
  displayName: string;
  iconName: string;
  permission: Permission;
  disabled?: boolean;
  route?: string;
  children?: NavItem[];
}

export interface Permission {
  read: string;
  write: string;
}
