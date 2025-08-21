import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ConfirmDialog } from '~/components/ConfirmDialog'
import { Button } from '~/components/ui/button'
export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Button variant="hue" 
      onClick={() => setShowDialog(true)}>Abrir Dialogo</Button>
      
      <ConfirmDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onConfirm={() => {
          console.log("Confirmed!")
          setShowDialog(false)
        }}
        onCancel={() => setShowDialog(false)}
      />
    </div>
  )
}
