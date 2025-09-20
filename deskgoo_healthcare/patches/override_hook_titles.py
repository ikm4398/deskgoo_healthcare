# apps/deskgoo_healthcare/deskgoo_healthcare/patches/override_hook_titles.py
import frappe.hooks
import healthcare.hooks
import hrms.hooks
import erpnext.hooks

def override_hook_titles():
    # Override healthcare
    healthcare.hooks.app_title = "Deskgoo Healthcare"
    healthcare.hooks.add_to_apps_screen[0]["title"] = "Deskgoo Healthcare"

    # Override hrms (fixing "Frappe HR" to "Deskgoo HR")
    hrms.hooks.app_title = "Deskgoo HR"
    hrms.hooks.add_to_apps_screen[0]["title"] = "Deskgoo HR"

    # Override erpnext
    erpnext.hooks.app_title = "Deskgoo ERP"
    erpnext.hooks.add_to_apps_screen[0]["title"] = "Deskgoo ERP"

    # Override frappe
    frappe.hooks.app_title = "Deskgoo Framework"