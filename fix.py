import sys

with open('app/equipment/page.tsx', 'r') as f:
    content = f.read()

# 1. Change onClick handler
content = content.replace('onClick={handleAddEquipment}', 'onClick={() => setIsAddModalOpen(true)}')

# 2. Add createPortal to EditEquipmentModal
edit_modal = '''      {/* Render Edit Equipment Modal */}
      {editingProduct && (
        <EditEquipmentModal 
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSuccess={() => {
            setEditingProduct(null)
            fetchEquipment()
          }}
        />
      )}'''
new_edit_modal = '''      {/* Render Edit Equipment Modal */}
      {mounted && editingProduct && createPortal(
        <EditEquipmentModal 
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSuccess={() => {
            setEditingProduct(null)
            fetchEquipment()
          }}
        />,
        document.body
      )}'''
content = content.replace(edit_modal, new_edit_modal)

# 3. Add createPortal to AddEquipmentModal
add_modal = '''      {/* Render Add Equipment Modal */}
      {isAddModalOpen && (
        <AddEquipmentModal 
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={() => {
            setIsAddModalOpen(false)
            fetchEquipment()
          }}
        />
      )}'''
new_add_modal = '''      {/* Render Add Equipment Modal */}
      {mounted && isAddModalOpen && createPortal(
        <AddEquipmentModal 
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={() => {
            setIsAddModalOpen(false)
            fetchEquipment()
          }}
        />,
        document.body
      )}'''
content = content.replace(add_modal, new_add_modal)

with open('app/equipment/page.tsx', 'w') as f:
    f.write(content)
