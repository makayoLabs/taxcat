import { useState, useCallback, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/ToastContext';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  successMessage?: string;
  onSuccess?: (___data: any) => void;
  onError?: (___error: any) => void;
}

interface ApiState<T> {
  data: T | null;
  error: any;
  isLoading: boolean;
}

export function useApi<T = any>(_endpoint: string) =>
  const router = useRouter();
  const { showToast } = useToast();
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const execute = useCallback(
    async ({
      method = 'GET',
      body,
      headers = {},
      successMessage,
      onSuccess,
      onError,
    }: ApiOptions = {}) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        const response = await fetch(endpoint, {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          body: body ? JSON.stringify(body) : undefined,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error?.message || 'Something went wrong');
        }

        setState((prev) => ({ ...prev, data: data.data || data, error: null }));

        if (_successMessage) =>
          showToast(successMessage, 'success');
        }

        onSuccess?.(data);
        return data;
      } catch (_error: any) =>
        const errorMessage = error.message || 'An unexpected error occurred. Please try again.';

        setState((prev) => ({ ...prev, error: errorMessage }));
        showToast(errorMessage, 'error');

        if (error.status === 401) {
          router.push('/auth/login');
        }

        onError?.(error);
        throw error;
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [endpoint, router, showToast]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      error: null,
      isLoading: false,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
