/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Progressive Web App (PWA) Manager & Installation Service
 */

type PWAInstallListener = (canInstall: boolean) => void;
type PWAOnlineListener = (isOnline: boolean) => void;

class PWAManager {
  private deferredPrompt: any = null;
  private installListeners: Set<PWAInstallListener> = new Set();
  private onlineListeners: Set<PWAOnlineListener> = new Set();
  private isAppInstalled: boolean = false;
  private isOnlineStatus: boolean = navigator.onLine;

  constructor() {
    this.checkStandaloneMode();
    this.initEventListeners();
    this.registerServiceWorker();
  }

  private checkStandaloneMode() {
    if (typeof window === 'undefined') return;
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true ||
      document.referrer.includes('android-app://');
    this.isAppInstalled = isStandalone;
  }

  private initEventListeners() {
    if (typeof window === 'undefined') return;

    window.addEventListener('beforeinstallprompt', (e: Event) => {
      // Prevent automatic browser mini-infobar
      e.preventDefault();
      this.deferredPrompt = e;
      this.notifyInstallListeners(true);
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
      this.isAppInstalled = true;
      this.notifyInstallListeners(false);
    });

    window.addEventListener('online', () => {
      this.isOnlineStatus = true;
      this.notifyOnlineListeners(true);
    });

    window.addEventListener('offline', () => {
      this.isOnlineStatus = false;
      this.notifyOnlineListeners(false);
    });
  }

  public registerServiceWorker() {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    window.addEventListener('load', () => {
      // Register relative to current base path
      const swUrl = './sw.js';
      navigator.serviceWorker
        .register(swUrl)
        .then((reg) => {
          // Check for service worker updates periodically
          reg.onupdatefound = () => {
            const installingWorker = reg.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    console.log('[PWA] New content available; please refresh.');
                  } else {
                    console.log('[PWA] Content cached for offline use.');
                  }
                }
              };
            }
          };
        })
        .catch((err) => {
          console.warn('[PWA] Service Worker registration failed:', err);
        });
    });
  }

  public subscribeInstall(callback: PWAInstallListener): () => void {
    this.installListeners.add(callback);
    callback(this.canInstall());
    return () => this.installListeners.delete(callback);
  }

  public subscribeOnline(callback: PWAOnlineListener): () => void {
    this.onlineListeners.add(callback);
    callback(this.isOnlineStatus);
    return () => this.onlineListeners.delete(callback);
  }

  private notifyInstallListeners(canInstall: boolean) {
    this.installListeners.forEach((cb) => cb(canInstall));
  }

  private notifyOnlineListeners(isOnline: boolean) {
    this.onlineListeners.forEach((cb) => cb(isOnline));
  }

  public canInstall(): boolean {
    return !!this.deferredPrompt && !this.isAppInstalled;
  }

  public isInstalled(): boolean {
    return this.isAppInstalled;
  }

  public isOnline(): boolean {
    return this.isOnlineStatus;
  }

  public async promptInstall(): Promise<boolean> {
    if (!this.deferredPrompt) {
      return false;
    }
    try {
      this.deferredPrompt.prompt();
      const choiceResult = await this.deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        this.deferredPrompt = null;
        this.notifyInstallListeners(false);
        return true;
      }
      return false;
    } catch (err) {
      console.error('[PWA] Error during promptInstall:', err);
      return false;
    }
  }
}

export const pwaManager = new PWAManager();
