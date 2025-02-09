export type TabType = {
  name: string;
  templateContentRef: any;
  allowClose: boolean;
  icon?: string;
}
export type ClosedTabType = {
  tabIndexDeleted: number;
  tabIndexUpdated: number;
}
