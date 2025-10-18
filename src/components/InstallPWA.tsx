import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Download } from 'lucide-react';
import { usePWA } from '@/contexts/PWAContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function InstallPWA() {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const { deferredPrompt, isInstalled, showInstallPrompt: triggerInstall, dismissInstallPrompt } = usePWA();

  useEffect(() => {
    // Check if user has dismissed the prompt before
    const hasDismissed = localStorage.getItem('pwa-install-dismissed');
    if (hasDismissed || isInstalled) {
      return;
    }

    // Show prompt after 2 seconds if we have a deferred prompt
    const timer = setTimeout(() => {
      if (deferredPrompt && !isInstalled) {
        setShowInstallPrompt(true);
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [deferredPrompt, isInstalled]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback for browsers that don't support the install prompt
      alert(
        'To install this app:\n\n' +
        'Chrome/Edge: Click the install icon in the address bar\n' +
        'Firefox: Menu → Install\n' +
        'Safari (iOS): Share → Add to Home Screen'
      );
      return;
    }

    await triggerInstall();
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    dismissInstallPrompt();
  };

  if (isInstalled || !showInstallPrompt) {
    return null;
  }

  return (
    <Dialog open={showInstallPrompt} onOpenChange={setShowInstallPrompt}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <img 
              src="/CAMPUS-STREAM 1024X1024.png" 
              alt="CampusStream" 
              className="w-10 h-10 rounded-lg"
            />
            Install CampusStream
          </DialogTitle>
          <DialogDescription>
            Install CampusStream on your device for quick access and offline functionality.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm text-muted-foreground space-y-2">
            <p className="flex items-center gap-2">
              ✅ Works offline
            </p>
            <p className="flex items-center gap-2">
              ✅ Fast loading
            </p>
            <p className="flex items-center gap-2">
              ✅ App-like experience
            </p>
            <p className="flex items-center gap-2">
              ✅ Push notifications (coming soon)
            </p>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleInstallClick} 
              className="flex-1 gradient-primary"
              size="lg"
            >
              <Download className="w-4 h-4 mr-2" />
              Install Now
            </Button>
            <Button 
              onClick={handleDismiss} 
              variant="outline"
              size="lg"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            You can always install later from your browser menu
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
