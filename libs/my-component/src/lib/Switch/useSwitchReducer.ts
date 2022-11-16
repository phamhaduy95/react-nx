import { useReducer } from 'react';

type State = {
  phaseName: 'idle' | 'onAnimation';
  isChecked: boolean;
};

type Action = {
  type: 'CLICK' | 'ANIMATION_END';
};

function SwitchReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'CLICK':
      if (state.phaseName === 'idle') {
        let newState = moveToPhase(state, 'onAnimation');
        newState = toggleChecked(newState);
        return newState;
      }
      return state;
    case 'ANIMATION_END': {
      let newState = moveToPhase(state, 'idle');
      return newState;
    }
  }
}

export default function useSwitchReducer(defaultIsChecked: boolean) {
  const initialState: State = {
    phaseName: 'idle',
    isChecked: defaultIsChecked,
  };
  const [state, dispatch] = useReducer(SwitchReducer, initialState);
  return { state, dispatch };
}

function moveToPhase(state: State, phaseName: State['phaseName']) {
  return { ...state, phaseName };
}

function toggleChecked(state: State) {
  const isChecked = !state.isChecked;
  return { ...state, isChecked };
}
