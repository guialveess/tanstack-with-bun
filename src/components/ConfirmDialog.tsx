"use client"

import { useState, useEffect } from "react"
import { Check, X, PaintRoller } from "lucide-react"
import { Button } from "./ui/button"

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({ open, onOpenChange, onConfirm, onCancel }: ConfirmDialogProps) {
  const [visible, setVisible] = useState(false)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (open) {
      setVisible(true)
      // dispara a animação no próximo frame
      requestAnimationFrame(() => setAnimate(true))
    } else {
      setAnimate(false)
      // remove do DOM depois da animação
      const timeout = setTimeout(() => setVisible(false), 300)
      return () => clearTimeout(timeout)
    }
  }, [open])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${animate ? "opacity-100" : "opacity-0"}`}
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <div
        className={`relative bg-layer border-layer rounded-3xl shadow-2xl w-[400px] p-5
                    transition-all duration-300 ease-out
                    ${animate ? "opacity-100 translate-y-0 blur-0" : "opacity-0 -translate-y-4 blur-sm"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-hue-6 rounded-full flex items-center justify-center">
              <PaintRoller className="w-4 h-4 text-gray-1" />
            </div>
            <h2 className="text-white text-xl font-medium">Confirmar pintura</h2>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <p className="text-white-feint-1 mb-6 text-sm leading-relaxed antialiased">
          Tem certeza que deseja pintar este pixel em azul? Isso usará 1 ponto
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="ghost2"
            onClick={onCancel}
            className="flex-1 antialiased cursor-pointer border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white rounded-full"
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            variant="hue"
            className="flex-1 antialiased text-black-1 cursor-pointer rounded-full"
          >
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  )
}
