app_name = "deskgoo_healthcare"
app_title = "Deskgoo Healthcare"
app_publisher = "a"
app_description = "a"
app_email = "a@a.a"
app_license = "mit"

# Apps
import importlib

# Custom Re-Branding Apps
try:
    override_module = importlib.import_module(f"{app_name}.patches.custom_rebrand_apps")
    override_module.override_hook_titles()
except ModuleNotFoundError:
    pass
# For update address dynamically based on selected value
doctype_js = {
    "Patient": [
        "public/js/custom_address_fetch_patient.js",
        ],
    "Employee": [
        "public/js/custom_address_fetch_employee.js",
    ]
}
# Hook into the Employee doctype for when update status also update user status
doc_events = {
    "Employee": {
        "before_validate": f"{app_name}.patches.employee_and_user_sync.update_user_status"
    }
}

fixtures = [
    {
        "dt": "Client Script",
        "filters": [
            ["name", "=", "Healthcare Practitioner Salutation"]
        ]
    },
    {
        "dt": "Server Script",
        "filters": [
            ["name", "=", "Healthcare Practitioner Salutation"]
        ]
    }
]