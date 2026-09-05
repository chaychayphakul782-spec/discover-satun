import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Satun Wildlife App:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#f9f9f6] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white rounded-2xl border border-[#e2e3df] p-8 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h1 className="font-serif text-xl font-bold text-[#002218] mb-2">
              เกิดข้อผิดพลาดในการแสดงผล
            </h1>
            <p className="text-sm text-[#414845] mb-4">
              {this.state.error?.message || 'ระบบไม่สามารถประมวลผลข้อมูลหน้าเว็บได้ กรุณาลองใหม่อีกครั้ง'}
            </p>
            <button
              onClick={this.handleReload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0f382c] hover:bg-[#002218] text-white rounded-xl text-sm font-semibold transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              โหลดหน้านี้ใหม่
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
