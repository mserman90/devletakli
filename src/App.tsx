/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OperationCenter } from './components/OperationCenter';
import { HeroScreen } from './components/HeroScreen';
import { useGameStore } from './store/useGameStore';

export default function App() {
  const hasStartedGame = useGameStore((state) => state.hasStartedGame);

  if (!hasStartedGame) {
    return <HeroScreen />;
  }

  return <OperationCenter />;
}

