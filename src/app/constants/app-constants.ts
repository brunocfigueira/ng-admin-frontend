import {TemplateRef} from '@angular/core';
import {PushNotificationType} from '../shared-components/types/push-notification-type';

export const APP_CONST = {
  ENTRY_ROUTE: '/home',
  EXIT_ROUTE: '/login',
  LAYOUT: {
    HEADER: {
      LABEL: {
        TITLE: 'Header',
        VIEW_SIDENAV_RIGHT: 'Open Sidenav Right',
        NOTIFY: 'Notification',
      },
      // https://fonts.google.com/icons
      ICON: {
        VIEW_SIDENAV_RIGHT: 'tune',
        OPEN_CLOSE_MENU: 'menu',
        SUPPORT: 'help',
        EXIT: 'output',
        ACCOUNT: 'account_circle',
        OPTIONS: 'more_vert',
        NOTIFY: 'notifications_active',
      },
      TOOLTIP: {
        VIEW_SIDENAV_RIGHT: 'Sidenav Right',
        OPEN_CLOSE_MENU: 'Open and close menu',
        SUPPORT: 'Technical support',
        ACCOUNT: 'Profile account',
        EXIT: 'Exit',
        OPTIONS: 'Options',
        NOTIFY: 'Notification',
      }
    },
    MAIN: {
      LABEL: {
        SIDENAV_LEFT: 'Sidenav Left',
        SIDENAV_RIGHT: 'Sidenav Right',
        MAIN_ACCESS: 'Home',
      },
      ICON: {
        SUBHEADER_LEFT: 'flag_2',
        SUBHEADER_RIGHT: 'apps',
        SIDENAV_LEFT: 'list_alt',
        SIDENAV_RIGHT: 'tune',
        SIDENAV_RIGHT_CLOSE: 'close',
        MAIN_ACCESS: 'home',
      },
      TOOLTIP: {}
    },
    FOOTER: {
      LABEL: {
        TITLE: 'Footer',
        YEAR: new Date().getFullYear(),
        COPYRIGHT: 'Copyright',
        VERSION: 'Version 1.0.0',
      },
      ICON: {
        COPYRIGHT: 'copyright',
      },
      TOOLTIP: {}
    },
    SIDEBAR: {
      LABEL: {
        TITLE: 'Sidebar'
      },
      ICON: {},
      TOOLTIP: {}
    },
  },
  PLACEHOLDERS: {
    SEARCH: 'Search for...',
    FILTER: 'Filter by...',
    OPTIONAL: '(Optional)',
    REQUIRED: 'Required',
    SELECT: 'Select an option',
  },
  ACTION_BUTTON: {
    LABEL: {
      SEARCH: 'Search',
      YES: 'Yes',
      NO: 'No',
      CLEAR: 'Clear',
      SEND: 'Send',
      CANCEL: 'Cancel',
      SAVE: 'Save',
      UPDATE: 'Update',
      DELETE: 'Delete',
      NEW: 'New',
      EDIT: 'Edit',
    },
    // https://fonts.google.com/icons
    ICON: {
      SEARCH: 'search',
      YES: 'thumb_up',
      NO: 'thumb_down',
      CLEAR: 'clear',
      SEND: 'send',
      CANCEL: 'close',
      SAVE: 'save',
      UPDATE: 'save_as',
      DELETE: 'remove_circle',
      NEW: 'add_circle',
    },
    TOOLTIP: {
      SEARCH: 'Search',
      YES: 'Yes',
      NO: 'No',
      CLEAR: 'Clear',
      SEND: 'Send',
      CANCEL: 'Cancel',
      SAVE: 'Save',
      UPDATE: 'Update',
      DELETE: 'Delete',
      NEW: 'New',
    },
  },
  TAB: {
    LABEL: {
      CLOSING_CONFIRMATION: 'I really want to close this guide?'
    },
    // https://fonts.google.com/icons
    ICON: {
      CLOSE: 'close',
    },
    TOOLTIP: {
      CLOSE: 'Close',
    },
    DEFAULT: {
      TAB_NAME: 'Main',
      TEMPLATE_CONTENT: TemplateRef<any>,
      CLOSE_TAB: false
    },
  },
  TABLE: {
    LABEL: {
      ACTION_COLUMN: 'Options',
      DATA_NOT_FOUND: 'No records found.',
      DETAIL_TITLE: 'Detail Title',
      MENU_OPTION: 'Menu options',
      MENU_REFRESH: 'Refresh',
      MENU_NEW: 'New',
      MENU_EDIT: 'Edit',
      MENU_DETAILS: 'Details',
      MENU_DELETE: 'Delete',
      MENU_DELETE_ALL: 'Delete All',
      MENU_REPORT: 'Reports',
      MENU_EXPORT_PDF: 'Export PDF',
      MENU_EXPORT_CSV: 'Export CSV'
    },
    ICON: {
      CLEAR: 'clear',
      CLOSE: 'close',
      FILTER: 'filter_list',
      MENU_REPORT: 'file_download',
      EXPAND_LESS: 'expand_less',
      EXPAND_MORE: 'expand_more',
      MENU_OPTION: 'more_vert',
      MENU_NEW: 'add_circle',
      MENU_REFRESH: 'refresh',
      EDIT: 'edit',
      DELETE: 'remove_circle',
      MENU_DELETE_ALL: 'remove_circle',
      MENU_EXPORT_PDF: 'picture_as_pdf',
      MENU_EXPORT_CSV: 'article',
    },
    TOOLTIP: {
      CLEAR: 'Clear',
      FILTER: 'Filter',
      DETAILS: 'Details',
      MENU: 'Actions',
    },
    PAGE_SIZE_OPTIONS: [10, 30, 50, 100],

  },
  DIALOG: {
    LABEL: {
      CLOSE_BUTTON: 'Close',
    },
    ICON: {
      CLOSE_BUTTON: 'close'
    },
    TOOLTIP: {
      CLOSE_BUTTON: 'Close'
    },
    BOX_DEFAULT: {
      COLOR: '#D9D9DB',
      SIZE: 400,
    },
    BOX_TEXTUAL: {
      COLOR: '#D9D9DB',
      SIZE: 800,
    },
    BOX_CONFIRMATION: {
      TITLE: 'Confirmation',
      COLOR: '#3b657a',
      SIZE: 400,
    },
    BOX_ATTENTION: {
      TITLE: 'Attention',
      COLOR: '#f44336',
      SIZE: 400,
    },
    BOX_INFORMATION: {
      TITLE: 'Information',
      COLOR: '#174580',
      SIZE: 400,
    },
  },
  SNACKBAR: {
    DISPLAY_TIME: 3000,
    LABEL: {},
    ICON: {
      SUCCESS: 'check_circle',
      ERROR: 'error',
      WARNING: 'warning',
      INFO: 'info',
      CLOSE: 'close'
    },
    TOOLTIP: {
      CLOSE: 'Close'
    }
  },
  SPINNER: {
    LABEL: {
      LOADING: 'Please, wait ...'
    },
    ICON: {},
    TOOLTIP: {}
  },
  BOTTOM_SHEET_NOTIFY: {
    LABEL: {
      TITLE: 'Notifications',
      SUBTITLE: 'Here are the main system notifications',
      EMPTY_LIST: 'No notifications were found',
    },
    ICON: {
      TITLE: ' notifications_active'
    },
    TOOLTIP: {}
  },
  IFRAME: {
    LABEL: {},
    ICON: {
      HEADER_TITLE: 'share',
    },
    TOOLTIP: {},
  },
  EMBED: {
    LABEL: {},
    ICON: {
      HEADER_TITLE: 'share',
    },
    TOOLTIP: {},
  },
  AUDIO: {
    LABEL: {
      TITLE_PLAYLIST: 'Playlist',
    },
    ICON: {
      HEADER_TITLE: 'graphic_eq',
      AUDIO_LIST_ITEM: 'equalizer',
      PLAY_NEXT: 'skip_next',
      PLAY_PREVIOUS: 'skip_previous',
    },
    TOOLTIP: {
      PLAY_NEXT: 'Next',
      PLAY_PREVIOUS: 'Previous',
    },
  },
  VIDEO: {
    LABEL: {
      TITLE_PLAYLIST: 'Playlist',
    },
    ICON: {
      HEADER_TITLE: 'smart_display',
      VIDEO_LIST_ITEM: 'check',
      PLAY_NEXT: 'skip_next',
      PLAY_PREVIOUS: 'skip_previous',
    },
    TOOLTIP: {
      PLAY_NEXT: 'Next',
      PLAY_PREVIOUS: 'Previous',
    },
  },
  WINDOW: {
    WIDTH: window.innerWidth,
    HEIGHT: window.innerHeight,
  },
  updateWindowSize: () => {
    APP_CONST.WINDOW.WIDTH = window.innerWidth;
    APP_CONST.WINDOW.HEIGHT = window.innerHeight;
  }
}
// Adiciona um evento para atualizar o valor no resize
window.addEventListener('resize', APP_CONST.updateWindowSize);
