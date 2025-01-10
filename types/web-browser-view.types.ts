export interface WebBrowserViewProps {
  showWebView: boolean;
  setShowWebView: (value: boolean) => void;
  url: string;
  onTokenReceived?: (token: string) => void;
}
