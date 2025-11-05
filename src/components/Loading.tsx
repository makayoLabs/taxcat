import { Loader2 } from 'lucide-react';

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export function Loading({ message = 'Loading...', fullScreen = false }: LoadingProps): JSX.Element {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        {content}
      </div>
    );
  }

  return <div className="flex items-center justify-center p-8">{content}</div>;
}
