import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"

type RemoveCartDialogProps = {
  open: boolean
  setOpen: (val: boolean) => void
  onConfirm: () => void
}

export const RemoveCartDialog = ({ open, setOpen, onConfirm }: RemoveCartDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Remove previous items from cart?</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-600">
          Your cart already has items. Do you want to remove them and add new ones?
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            className="bg-orange-500 hover:bg-orange-600"
            onClick={() => {
              onConfirm()
              setOpen(false)
            }}
          >
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
