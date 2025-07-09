import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Plus, Edit2, Trash2, ListChecks, Calendar, ShoppingCart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import AutocompleteInput from "@/components/AutocompleteInput"
import { commonIngredients } from "@/data/commonIngredients"
import { Input } from "@/components/ui/input"

interface ListItem {
  id: string
  text: string
  completed: boolean
}

interface ShoppingList {
  id: string
  name: string
  description: string
  items: ListItem[]
  createdAt: string
  updatedAt: string
}

const Dashboard = () => {
  const [lists, setLists] = useState<ShoppingList[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingList, setEditingList] = useState<ShoppingList | null>(null)
  const [newListName, setNewListName] = useState("")
  const [newListDescription, setNewListDescription] = useState("")
  const [newItemTexts, setNewItemTexts] = useState<{[key: string]: string}>({})
  const { toast } = useToast()

  // Load lists from localStorage on component mount
  useEffect(() => {
    const savedLists = localStorage.getItem("saudaTalikaLists")
    if (savedLists) {
      setLists(JSON.parse(savedLists))
    }
  }, [])

  // Save lists to localStorage whenever lists change
  useEffect(() => {
    localStorage.setItem("saudaTalikaLists", JSON.stringify(lists))
  }, [lists])

  const createList = () => {
    if (!newListName.trim()) return

    const newList: ShoppingList = {
      id: Date.now().toString(),
      name: newListName,
      description: newListDescription,
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setLists(prev => [...prev, newList])
    setNewListName("")
    setNewListDescription("")
    setIsCreateDialogOpen(false)
    
    toast({
      title: "List created!",
      description: `"${newListName}" has been added to your lists.`,
    })
  }

  const updateList = () => {
    if (!editingList || !newListName.trim()) return

    setLists(prev => prev.map(list => 
      list.id === editingList.id 
        ? { ...list, name: newListName, description: newListDescription, updatedAt: new Date().toISOString() }
        : list
    ))

    setEditingList(null)
    setNewListName("")
    setNewListDescription("")
    
    toast({
      title: "List updated!",
      description: "Your list has been successfully updated.",
    })
  }

  const deleteList = (listId: string) => {
    const listToDelete = lists.find(list => list.id === listId)
    setLists(prev => prev.filter(list => list.id !== listId))
    
    toast({
      title: "List deleted!",
      description: `"${listToDelete?.name}" has been removed.`,
    })
  }

  const addItem = (listId: string) => {
    const itemText = newItemTexts[listId]
    if (!itemText?.trim()) return

    const newItem: ListItem = {
      id: Date.now().toString(),
      text: itemText,
      completed: false
    }

    setLists(prev => prev.map(list => 
      list.id === listId 
        ? { ...list, items: [...list.items, newItem], updatedAt: new Date().toISOString() }
        : list
    ))

    setNewItemTexts(prev => ({ ...prev, [listId]: "" }))
  }

  const toggleItem = (listId: string, itemId: string) => {
    setLists(prev => prev.map(list => 
      list.id === listId 
        ? {
            ...list, 
            items: list.items.map(item => 
              item.id === itemId ? { ...item, completed: !item.completed } : item
            ),
            updatedAt: new Date().toISOString()
          }
        : list
    ))
  }

  const deleteItem = (listId: string, itemId: string) => {
    setLists(prev => prev.map(list => 
      list.id === listId 
        ? { 
            ...list, 
            items: list.items.filter(item => item.id !== itemId),
            updatedAt: new Date().toISOString()
          }
        : list
    ))
  }

  const getCompletionStats = (list: ShoppingList) => {
    const total = list.items.length
    const completed = list.items.filter(item => item.completed).length
    return { total, completed, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 }
  }

  const openEditDialog = (list: ShoppingList) => {
    setEditingList(list)
    setNewListName(list.name)
    setNewListDescription(list.description)
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              My Shopping Lists
            </h1>
            <p className="text-gray-600 mt-2">Create, manage, and organize your shopping lists</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                New List
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New List</DialogTitle>
                <DialogDescription>
                  Give your shopping list a name and optional description.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="listName">List Name</Label>
                  <Input
                    id="listName"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="e.g., Weekly Groceries"
                  />
                </div>
                <div>
                  <Label htmlFor="listDescription">Description (Optional)</Label>
                  <Textarea
                    id="listDescription"
                    value={newListDescription}
                    onChange={(e) => setNewListDescription(e.target.value)}
                    placeholder="What's this list for?"
                    className="h-20"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={createList} disabled={!newListName.trim()}>
                  Create List
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        {lists.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-orange-200 bg-white/80">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <ListChecks className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{lists.length}</p>
                    <p className="text-sm text-gray-600">Total Lists</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-orange-200 bg-white/80">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">
                      {lists.reduce((acc, list) => acc + list.items.length, 0)}
                    </p>
                    <p className="text-sm text-gray-600">Total Items</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-orange-200 bg-white/80">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">
                      {lists.filter(list => 
                        new Date(list.updatedAt).toDateString() === new Date().toDateString()
                      ).length}
                    </p>
                    <p className="text-sm text-gray-600">Updated Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Lists Grid */}
        {lists.length === 0 ? (
          <Card className="border-orange-200 bg-white/80">
            <CardContent className="p-12 text-center">
              <ListChecks className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">No lists yet</h2>
              <p className="text-gray-500 mb-6">Create your first shopping list to get started</p>
              <Button 
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First List
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {lists.map((list) => {
              const stats = getCompletionStats(list)
              return (
                <Card key={list.id} className="border-orange-200 hover:shadow-lg transition-shadow duration-300 bg-white/80">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-gray-800 mb-1">{list.name}</CardTitle>
                        {list.description && (
                          <CardDescription className="text-sm text-gray-600">
                            {list.description}
                          </CardDescription>
                        )}
                      </div>
                      <div className="flex gap-1 ml-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => openEditDialog(list)}
                              className="h-8 w-8 p-0 hover:bg-orange-100"
                            >
                              <Edit2 className="h-4 w-4 text-orange-600" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit List</DialogTitle>
                              <DialogDescription>
                                Update your list name and description.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="editListName">List Name</Label>
                                <Input
                                  id="editListName"
                                  value={newListName}
                                  onChange={(e) => setNewListName(e.target.value)}
                                />
                              </div>
                              <div>
                                <Label htmlFor="editListDescription">Description</Label>
                                <Textarea
                                  id="editListDescription"
                                  value={newListDescription}
                                  onChange={(e) => setNewListDescription(e.target.value)}
                                  className="h-20"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setEditingList(null)}>
                                Cancel
                              </Button>
                              <Button onClick={updateList} disabled={!newListName.trim()}>
                                Update List
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 hover:bg-red-100"
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete List</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{list.name}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => deleteList(list.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-3">
                      <Badge variant="outline" className="border-orange-300 text-orange-600">
                        {stats.total} items
                      </Badge>
                      {stats.total > 0 && (
                        <Badge 
                          variant={stats.percentage === 100 ? "default" : "secondary"}
                          className={stats.percentage === 100 ? "bg-green-600" : ""}
                        >
                          {stats.percentage}% complete
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Add Item Form with Autocomplete */}
                    <div className="flex gap-2 mb-4">
                      <AutocompleteInput
                        value={newItemTexts[list.id] || ""}
                        onChange={(value) => setNewItemTexts(prev => ({ ...prev, [list.id]: value }))}
                        onSubmit={() => addItem(list.id)}
                        suggestions={commonIngredients}
                        className="flex-1"
                      />
                      <Button 
                        onClick={() => addItem(list.id)}
                        disabled={!newItemTexts[list.id]?.trim()}
                        size="sm"
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Items List */}
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {list.items.length === 0 ? (
                        <p className="text-gray-500 text-sm text-center py-4">
                          No items yet. Add your first item above!
                        </p>
                      ) : (
                        list.items.map((item) => (
                          <div 
                            key={item.id} 
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 group"
                          >
                            <Checkbox
                              checked={item.completed}
                              onCheckedChange={() => toggleItem(list.id, item.id)}
                            />
                            <span 
                              className={`flex-1 text-sm ${
                                item.completed 
                                  ? 'line-through text-gray-500' 
                                  : 'text-gray-700'
                              }`}
                            >
                              {item.text}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteItem(list.id, item.id)}
                              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-red-100 transition-opacity"
                            >
                              <Trash2 className="h-3 w-3 text-red-600" />
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                    
                    {/* Progress bar */}
                    {stats.total > 0 && (
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${stats.percentage}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
