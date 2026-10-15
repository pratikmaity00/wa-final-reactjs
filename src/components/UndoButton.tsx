import React from 'react';
import { Undo2 } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export const UndoButton: React.FC = () => {
  const previousCartState = useCartStore((state) => state.previousCartState);
  const undoLastAction = useCartStore((state) => state.undoLastAction);

  const canUndo = previousCartState !== null;

  return (
    <button
      type="button"
      onClick={undoLastAction}
      disabled={!canUndo}
      className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3 py-2 rounded-lg border transition-all cursor-pointer ${
        canUndo
          ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100 active:bg-amber-200 shadow-xs'
          : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60'
      }`}
      id="undo-cart-btn"
      title={canUndo ? 'Undo last cart action' : 'No recent action to undo'}
      aria-label="Undo last cart action"
    >
      <Undo2 className="w-4 h-4" />
      <span>Undo Last Action</span>
    </button>
  );
};
