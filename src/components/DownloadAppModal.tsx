import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Download, Smartphone, Share, Plus, CheckCircle2 } from 'lucide-react';
import { usePWA } from '@/contexts/PWAContext';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface DownloadAppModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type OSType = 'android' | 'ios' | 'desktop';

export function DownloadAppModal({ open, onOpenChange }: DownloadAppModalProps) {
  const [currentOS, setCurrentOS] = useState<OSType>('desktop');
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const { deferredPrompt, isInstalled, showInstallPrompt } = usePWA();
  const { toast } = useToast();

  // Detect OS
  useEffect(() => {
    const detectOS = (): OSType => {
      const ua = navigator.userAgent.toLowerCase();
      if (/android/i.test(ua)) return 'android';
      if (/ipad|iphone|ipod/.test(ua)) return 'ios';
      return 'desktop';
    };
    setCurrentOS(detectOS());
  }, []);

  const handleAndroidInstall = async () => {
    setIsInstalling(true);

    try {
      const result = await showInstallPrompt();
      
      if (result) {
        toast({
          title: "App installed! 🎉",
          description: "CampusStream has been added to your home screen.",
        });
        onOpenChange(false);
      } else {
        toast({
          title: "Installation cancelled",
          description: "You can install the app anytime from the browser menu.",
          variant: "destructive",
        });
      }
    } catch (error) {
      // Fallback: Show manual instructions
      toast({
        title: "Install from browser",
        description: "Tap the menu (⋮) and select 'Install app' or 'Add to Home screen'.",
      });
    } finally {
      setIsInstalling(false);
    }
  };

  const handleIOSClick = () => {
    setShowIOSInstructions(true);
  };

  const handleBackToOptions = () => {
    setShowIOSInstructions(false);
  };

  // iOS Instructions View
  if (showIOSInstructions) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl">
                🍎
              </div>
              Install on iOS
            </DialogTitle>
            <DialogDescription>
              Follow these simple steps to add CampusStream to your home screen
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Share className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Step 1: Tap Share Button</h4>
                <p className="text-sm text-muted-foreground">
                  Tap the Share button <Share className="w-4 h-4 inline" /> at the bottom of Safari
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Step 2: Add to Home Screen</h4>
                <p className="text-sm text-muted-foreground">
                  Scroll down and tap "Add to Home Screen"
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Step 3: Confirm</h4>
                <p className="text-sm text-muted-foreground">
                  Tap "Add" in the top right corner
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleBackToOptions}
              variant="outline"
              className="flex-1"
            >
              ← Back to Options
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              className="flex-1 gradient-primary"
            >
              Got it!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Main Download Options View
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <img 
              src="/CAMPUS-STREAM 1024X1024.png" 
              alt="CampusStream" 
              className="w-10 h-10 rounded-lg"
            />
            Download CampusStream
          </DialogTitle>
          <DialogDescription>
            Get the app for quick access and offline functionality
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {/* Already Installed Badge */}
          {isInstalled && (
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-semibold">Already Installed!</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                CampusStream is already on your device
              </p>
            </div>
          )}

          {/* Android Option */}
          <button
            onClick={handleAndroidInstall}
            disabled={isInstalling || isInstalled}
            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
              currentOS === 'android'
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            } ${isInstalled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-2xl">
                  🤖
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    Download for Android
                    {currentOS === 'android' && (
                      <Badge variant="secondary" className="text-xs">Detected</Badge>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isInstalled ? 'Already installed' : 'Install now with one tap'}
                  </p>
                </div>
              </div>
              <Download className="w-5 h-5 text-muted-foreground" />
            </div>
          </button>

          {/* iOS Option */}
          <button
            onClick={handleIOSClick}
            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
              currentOS === 'ios'
                ? 'border-blue-500 bg-blue-500/5'
                : 'border-border hover:border-blue-500/50'
            } cursor-pointer`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl">
                  🍎
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    Download for iOS
                    {currentOS === 'ios' && (
                      <Badge variant="secondary" className="text-xs">Detected</Badge>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    View step-by-step instructions
                  </p>
                </div>
              </div>
              <Smartphone className="w-5 h-5 text-muted-foreground" />
            </div>
          </button>

          {/* Desktop Note */}
          {currentOS === 'desktop' && !isInstalled && (
            <div className="p-3 rounded-lg bg-muted/50 text-center">
              <p className="text-sm text-muted-foreground">
                💡 On desktop, look for the install icon in your browser's address bar
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>Works offline • Fast loading • App-like experience</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
