function System(client) {
  this.client = client.scope({
    searchTimeout: 20000
  });
}

module.exports = System;

System.URL = 'app://system.gaiamobile.org/manifest.webapp';

System.Selector = Object.freeze({
  screen: '#screen',
  activeHomescreenFrame: '#homescreen.appWindow.active',
  appContextMenuSaveLink:
    '.appWindow.active .contextmenu [data-id="save-link"]',
  appWindow: '.appWindow',
  appTitlebar: '.appWindow.active .titlebar',
  appUrlbar: '.appWindow.active .title',
  appChrome: '.appWindow.active .chrome',
  appChromeBack: '.appWindow.active .back-button',
  appChromeForward: '.appWindow.active .forward-button',
  appChromeContextLink: '.appWindow.active .menu-button',
  appChromeContextMenu: '.appWindow.active .contextmenu',
  appChromeContextMenuNewWindow: '.appWindow.active [data-id=new-window]',
  appChromeContextMenuBookmark: '.appWindow.active [data-id=add-to-homescreen]',
  appChromeContextMenuShare: '.appWindow.active [data-id=share]',
  appChromeReloadButton: '.appWindow.active .controls .reload-button',
  appChromeStopButton: '.appWindow.active .controls .stop-button',
  appChromeWindowsButton: '.appWindow.active .controls .windows-button',
  appChromeProgressBar: '.appWindow.active .chrome gaia-progress',
  softwareButtons: '#software-buttons',
  browserWindow: '.appWindow.browser',
  dialogOverlay: '#screen #dialog-overlay',
  downloadDialog: '#downloadConfirmUI',
  imeMenu: '.ime-menu',
  sleepMenuContainer: '#sleep-menu-container',
  softwareHome: '#software-home-button',
  softwareHomeFullscreen: '#fullscreen-software-home-button',
  softwareHomeFullscreenLayout: '#software-buttons-fullscreen-layout',
  statusbar: '#statusbar',
  statusbarMaximizedWrapper: '#statusbar-maximized-wrapper',
  statusbarMinimizedWrapper: '#statusbar-minimized-wrapper',
  statusbarLabel: '#statusbar-label',
  topPanel: '#top-panel',
  leftPanel: '#left-panel',
  rightPanel: '#right-panel',
  utilityTray: '#utility-tray',
  visibleForm: '#screen > form.visible'
});

System.prototype = {
  client: null,

  getAppWindows: function() {
    return this.client.findElements(System.Selector.appWindow);
  },

  getBrowserWindows: function() {
    return this.client.findElements(System.Selector.browserWindow);
  },

  get appContextMenuSaveLink() {
    return this.client.helper.waitForElement(
      System.Selector.appContextMenuSaveLink);
  },

  get appTitlebar() {
    return this.client.helper.waitForElement(System.Selector.appTitlebar);
  },

  get appUrlbar() {
    return this.client.helper.waitForElement(System.Selector.appUrlbar);
  },

  get appChrome() {
    return this.client.helper.waitForElement(
      System.Selector.appChrome);
  },

  get appChromeBack() {
    return this.client.helper.waitForElement(
      System.Selector.appChromeBack);
  },

  get appChromeForward() {
    return this.client.helper.waitForElement(
      System.Selector.appChromeForward);
  },

  get appChromeContextLink() {
    return this.client.helper.waitForElement(
      System.Selector.appChromeContextLink);
  },

  get appChromeContextMenu() {
    return this.client.helper.waitForElement(
      System.Selector.appChromeContextMenu);
  },

  get appChromeContextMenuNewWindow() {
    return this.client.helper.waitForElement(
      System.Selector.appChromeContextMenuNewWindow);
  },

  get appChromeContextMenuBookmark() {
    return this.client.helper.waitForElement(
      System.Selector.appChromeContextMenuBookmark);
  },

  get appChromeContextMenuShare() {
    return this.client.helper.waitForElement(
      System.Selector.appChromeContextMenuShare);
  },

  get appChromeReloadButton() {
    return this.client.helper.waitForElement(
      System.Selector.appChromeReloadButton);
  },

  get appChromeStopButton() {
    return this.client.helper.waitForElement(
      System.Selector.appChromeStopButton);
  },

  get appChromeProgressBar() {
    return this.client.helper.waitForElement(
      System.Selector.appChromeProgressBar);
  },

  get dialogOverlay() {
    return this.client.helper.waitForElement(
      System.Selector.dialogOverlay);
  },

  get downloadDialog() {
    return this.client.helper.waitForElement(System.Selector.downloadDialog);
  },

  get imeMenu() {
    return this.client.helper.waitForElement(System.Selector.imeMenu);
  },

  get sleepMenuContainer() {
    return this.client.helper.waitForElement(
      System.Selector.sleepMenuContainer);
  },

  get softwareButtons() {
    return this.client.findElement(System.Selector.softwareButtons);
  },

  get softwareHome() {
    return this.client.findElement(System.Selector.softwareHome);
  },

  get softwareHomeFullscreen() {
    return this.client.findElement(System.Selector.softwareHomeFullscreen);
  },

  get softwareHomeFullscreenLayout() {
    return this.client.findElement(
      System.Selector.softwareHomeFullscreenLayout);
  },

  get statusbar() {
    return this.client.findElement(System.Selector.statusbar);
  },

  get statusbarMaximizedWrapper() {
    return this.client.findElement(System.Selector.statusbarMaximizedWrapper);
  },

  get statusbarMinimizedWrapper() {
    return this.client.findElement(System.Selector.statusbarMinimizedWrapper);
  },

  get statusbarLabel() {
    return this.client.findElement(System.Selector.statusbarLabel);
  },

  get utilityTray() {
    return this.client.findElement(System.Selector.utilityTray);
  },

  get topPanel() {
    return this.client.findElement(System.Selector.topPanel);
  },

  get leftPanel() {
    return this.client.findElement(System.Selector.leftPanel);
  },

  get rightPanel() {
    return this.client.findElement(System.Selector.rightPanel);
  },

  get visibleForm() {
    return this.client.findElement(System.Selector.visibleForm);
  },

  get cancelActivity() {
    return this.client.findElement(System.Selector.cancelActivity);
  },

  get screenSize() {
    return this.client.findElement(System.Selector.screen).size();
  },

  getAppIframe: function(url) {
    return this.client.findElement('iframe[src*="' + url + '"]');
  },

  /**
   * Clicks the bottom of the screen, where we expect the software home button
   * to exist. There are several different variations in the same spot, this
   * allows us to try to click all of them.
   */
  clickSoftwareHomeButton: function() {
    var body = client.findElement('body');
    var screenSize = body.scriptWith(function(el) {
      return el.getBoundingClientRect();
    });
    body.tap(screenSize.width / 2, screenSize.height - 10);
  },

  gotoBrowser: function(url) {
    var frame = this.client.helper.waitForElement(
      'div[transition-state="opened"] iframe[src="' + url + '"]');
    this.client.switchToFrame(frame);
    this.client.helper.waitForElement('body');
  },

  getHomescreenIframe: function() {
    return this.client.findElement('#homescreen iframe');
  },

  waitForLaunch: function(url) {
    this.client.apps.launch(url);
    var iframe = this.getAppIframe(url);
    this.client.waitFor(function() {
      return iframe.displayed();
    });

    return iframe;
  },

  waitForStartup: function() {
    var osLogo = this.client.findElement('#os-logo');
    this.client.waitFor(function() {
      return osLogo.getAttribute('class') == 'hide';
    });
  },

  goHome: function() {
    this.client.executeScript(function() {
      window.wrappedJSObject.dispatchEvent(new CustomEvent('home'));
    });
  },

  tapHome: function() {
    this.client.executeScript(function() {
      window.wrappedJSObject.dispatchEvent(new CustomEvent('home'));
    });
  },

  stopClock: function() {
    var client = this.client;
    var clock = client.executeScript(function() {
      return window.wrappedJSObject.StatusBar.icons.time;
    });
    client.executeScript(function() {
      window.wrappedJSObject.StatusBar.toggleTimeLabel(false);
    });
    client.waitFor(function() {
      return !clock.displayed();
    });
  },

  stopDevtools: function() {
    this.client.executeScript(function() {
      window.wrappedJSObject.developerHUD.stop();
    });
  },

  // It looks for an activity menu, and returns the first
  // button element which includes with str
  getActivityOptionMatching: function(str) {
    var activityMenuSelector = System.Selector.visibleForm + ' button.icon';
    var options = this.client.findElements(activityMenuSelector);
    for (var i = 0; i < options.length; i++) {
      if (options[i].getAttribute('style').indexOf(str) > 1) {
        return options[i];
      }
    }
  }
};
