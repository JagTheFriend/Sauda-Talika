
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile"
import { Edit2, Save, Trash2, X } from "lucide-react";
import { useState } from "react";

interface ListItem {
  id: string
  text: string
  completed: boolean
}

interface MobileItemEditorProps {
  item: ListItem
  onUpdate: (itemId: string, newText: string) => void
  onDelete: (itemId: string) => void
}

export function MobileItemEditor({ item, onUpdate, onDelete }: MobileItemEditorProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [editText, setEditText] = useState(item.text)
  const isMobile = useIsMobile()

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(item.id, editText.trim())
      setIsEditOpen(false)
    }
  }

  const handleDelete = () => {
    onDelete(item.id)
    setIsDeleteOpen(false)
  }

  const handleCancel = () => {
    setEditText(item.text)
    setIsEditOpen(false)
  }

  const EditContent = () => (
    <>
      <div className="space-y-4">
        <div>
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Item name"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave()
              if (e.key === 'Escape') handleCancel()
            }}
            autoFocus
          />
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={handleCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!editText.trim()}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </div>
    </>
  )

  return (
    <div className="flex gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsEditOpen(true)}
        className="h-6 w-6 p-0 hover:bg-accent opacity-70 group-hover:opacity-100 transition-opacity"
      >
        <Edit2 className="h-3 w-3 text-primary" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsDeleteOpen(true)}
        className="h-6 w-6 p-0 hover:bg-destructive/10 opacity-70 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="h-3 w-3 text-destructive" />
      </Button>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>Update the item name below.</DialogDescription>
          </DialogHeader>
          <EditContent />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{item.text}"? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
