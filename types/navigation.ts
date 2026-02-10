export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavSection {
  title: string;
  links: NavLink[];
}

export interface NavItem {
  label: string;
  href: string;
  sections?: NavSection[];
}

export interface AudiencePath {
  label: string;
  description: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}
