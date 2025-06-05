import { TamaguiProvider } from '@tamagui/core'
import config from './tamagui.config'
import Login from '@/pages/Login';
import './src/utils/i18n';

export default function App() {
  return (
    <TamaguiProvider config={config}>
      <Login />
    </TamaguiProvider>
  );
}
