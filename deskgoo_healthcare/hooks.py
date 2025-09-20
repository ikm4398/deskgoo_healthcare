app_name = "deskgoo_healthcare"
app_title = "Deskgoo Healthcare"
app_publisher = "a"
app_description = "a"
app_email = "a@a.a"
app_license = "mit"

# Apps
# ------------------
# Import and execute monkey patch for app titles
from deskgoo_healthcare.patches.override_hook_titles import override_hook_titles
# Execute during hook loading
override_hook_titles()

# Custom JS
doctype_js = {
    "Patient": [
        "public/js/custom_address_fetch_patient.js",
        ],
    "Employee": [
        "public/js/custom_address_fetch_employee.js",
    ]
}

