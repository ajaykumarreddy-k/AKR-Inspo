import { ReactNode } from "react";

export interface TabItem {
  id: string;
  title: string;
  description: string;
  image: string;
  badge?: string;
  iconName?: string;
}

export type TriggerMode = "hover" | "click" | "both";

export interface TabsCardProps {
  items?: TabItem[];
  defaultActiveId?: string;
  triggerMode?: TriggerMode;
  autoPlay?: boolean;
  autoPlayInterval?: number; // in milliseconds
  className?: string;
  activeColorClass?: string; // CSS class for active state background color
  isDarkMode?: boolean;
  onChange?: (id: string, item: TabItem) => void;
}
