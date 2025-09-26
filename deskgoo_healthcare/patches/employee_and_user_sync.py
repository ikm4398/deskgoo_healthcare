import frappe

def update_user_status(doc, method):
    if not doc.user_id:
        return # No linked user
    try:
        user = frappe.get_doc("User", doc.user_id)
        if doc.status in ["Left", "Inactive"]:
            user.enabled = 0
        elif doc.status == "Active":
            user.enabled = 1
        user.save(ignore_permissions=True)
    except frappe.DoesNotExistError:
        frappe.log_error(f"User {doc.user_id} not found for employee {doc.name}")