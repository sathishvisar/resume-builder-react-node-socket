import React, { Suspense, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { getRoutes } from './routes';
import { useAppDispatch, useAppSelector} from '@/store/hooks';
import { UserInfo } from '@/features/user/userThunks';


function AppRoutes() {
  return useRoutes(getRoutes());
}

const App: React.FC = () => {

  const dispatch = useAppDispatch();
  
  const status = useAppSelector((s) => s.auth.status); 

  useEffect(() => {
    if (status === 'idle') dispatch(UserInfo());
  }, [dispatch, status]);


  return (
    <Suspense fallback={<div>
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>}>
      <AppRoutes />
    </Suspense>
  );
}

export default App;
