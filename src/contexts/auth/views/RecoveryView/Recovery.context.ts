// react
import { createContext, useContext } from 'react';
// props
import { RecoveryContextProps } from './Recovery.props';

export const RecoveryContext = createContext<RecoveryContextProps>({} as RecoveryContextProps);

export const useRecoveryContext = () => useContext(RecoveryContext);
