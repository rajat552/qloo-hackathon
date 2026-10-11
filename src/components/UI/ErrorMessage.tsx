import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-[#FECDD3] border-2 border-slate-900 rounded-2xl p-4 shadow-brutal-sm flex items-start space-x-3 text-slate-900">
      <div className="w-8 h-8 rounded-lg bg-white border-2 border-slate-900 flex items-center justify-center shrink-0 shadow-[1px_1px_0px_#1E293B]">
        <AlertCircle className="w-5 h-5 text-rose-600" />
      </div>
      <div className="flex-1">
        <p className="text-xs sm:text-sm font-bold text-slate-900">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 text-xs font-black text-slate-900 underline hover:text-slate-700"
          >
            Try again &rarr;
          </button>
        )}
      </div>
    </div>
  );
};