import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {FormControl} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {APP_CONST} from '../../../constants/app-constants';
import {MatTooltip} from '@angular/material/tooltip';
import {NgIf, NgTemplateOutlet} from '@angular/common';
import {ClosedTabType, TabType} from '../../types/tabs-type';
import {BoxDialogService} from '../../../services/common/box-dialog.service';
import {DialogActionButtonsType} from '../../types/dialog-type';

@Component({
  selector: 'app-tabs',
  imports: [
    MatTabsModule,
    MatIconModule,
    MatIconButton,
    MatTooltip,
    NgIf,
    NgTemplateOutlet,
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent implements OnInit, OnChanges {
  protected readonly appConst = APP_CONST;
  private readonly FIRST_TAB_INDEX = 0;
  @Output() onCloseTab = new EventEmitter<ClosedTabType>();
  @Output() onTabIndexChange = new EventEmitter<number>();
  @Input() tabs: TabType[] = [
    {
      name: APP_CONST.TAB.DEFAULT.TAB_NAME,
      templateContentRef: APP_CONST.TAB.DEFAULT.TEMPLATE_CONTENT,
      allowClose: APP_CONST.TAB.DEFAULT.CLOSE_TAB
    }
  ];
  @Input() showTabNumber: boolean = false;
  @Input() selectedTabIndex!: number;
  @Input() alignTabs: 'start' | 'center' | 'end' = 'start';
  @Input() showTabClosingConfirmation: boolean = false;

  protected arrayTabs: TabType[] = [];
  protected confirmationOptionButtons: DialogActionButtonsType[] = [];
  protected selectedTab = new FormControl(0);


  constructor(private boxDialogService: BoxDialogService) {
  }

  ngOnInit() {
    this.updateTabs(this.tabs);
    this.updateSelectedTab(this.selectedTabIndex || 0);
  }

  ngOnChanges(changes: SimpleChanges) {

    const tabs = changes['tabs'];
    const selectedTabIndex = changes['selectedTabIndex'];

    if (tabs && tabs.currentValue) {
      this.updateTabs(tabs.currentValue);
    }
    if (selectedTabIndex) {
      this.updateSelectedTab(selectedTabIndex.currentValue);
    }
  }

  private updateTabs(tabs: TabType[]) {
    this.tabs = tabs;
    this.arrayTabs = tabs;
  }

  protected getTabLabel(tab: TabType, index: number): string {
    let label = '';
    label = this.showTabNumber && index > 0 ? index + '.' : '';
    return label.concat(tab.name);
  }

  protected hasOnlyOneTab(): boolean {
    return this.arrayTabs.length === 1;
  }

  protected showCloseTab(tab: TabType): boolean {
    return (tab.allowClose && !this.hasOnlyOneTab());
  }

  private async emitCloseTab(deletedIndex: number, updatedIndex: number): Promise<void> {
    return new Promise((resolve) => {
      const emitValue: ClosedTabType = {
        tabIndexDeleted: deletedIndex,
        tabIndexUpdated: updatedIndex
      };
      this.onCloseTab.emit(emitValue);
      resolve();
    })
  }

  protected eventSelectedIndexChange(value: number) {
    this.updateSelectedTab(value);
    this.onTabIndexChange.emit(value);
  }

  private updateSelectedTab(value: number): void {
    this.selectedTab.setValue(value)
    this.selectedTabIndex = value;
  }

  protected async eventButtonCloseTabHandler(index: number): Promise<void> {

    if (this.showTabClosingConfirmation) {
      this.confirmationOptionButtons = [];
      this.confirmationOptionButtons.push({
        label: this.appConst.ACTION_BUTTON.LABEL.YES,
        callback: async () => {
          this.deleteTabByIndex(index);
          await this.runEmitCloseTabByIndex(index);
        }
      })
      this.boxDialogService.openBoxDialogConfirmation(
        this.appConst.TAB.LABEL.CLOSING_CONFIRMATION,
        this.confirmationOptionButtons
      );

    } else {
      this.deleteTabByIndex(index);
      await this.runEmitCloseTabByIndex(index);
    }

  }

  private async runEmitCloseTabByIndex(index: number): Promise<void> {
    return new Promise((resolve) => {
      const updateIndex = this.getUpdatedTabIndex(index);
      this.emitCloseTab(index, updateIndex);
      resolve();
    })
  }

  private getUpdatedTabIndex(index: number): number {
    const updateIndex = Math.min(index, this.arrayTabs.length - 1);
    return updateIndex >= this.FIRST_TAB_INDEX ? updateIndex : this.FIRST_TAB_INDEX;
  }

  private deleteTabByIndex(index: number): void {
    this.arrayTabs.splice(index, 1);
    this.updateTabs(this.arrayTabs);
    const updateIndex = this.getUpdatedTabIndex(index);
    this.updateSelectedTab(updateIndex);
  }

  closeTab(index: number): void {
    this.deleteTabByIndex(index);
  }
}
