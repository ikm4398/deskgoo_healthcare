frappe.ui.form.on('Employee', {

    onload(frm) {
        // === Filter State based on Country ===
        frm.fields_dict.custom_state_province.get_query = function() {
            return {
                filters: {
                    country_name: frm.doc.custom_country
                }
            };
        };

        // === Filter District based on Country + State ===
        frm.fields_dict.custom_district.get_query = function() {
            return {
                filters: {
                    country_name: frm.doc.custom_country,
                    state_name: frm.doc.custom_state_province
                }
            };
        };

        // === Filter City based on Country + State + District ===
        frm.fields_dict.custom_city_municipality.get_query = function() {
            return {
                filters: {
                    country_name: frm.doc.custom_country,
                    state_name: frm.doc.custom_state_province,
                    district_name: frm.doc.custom_district
                }
            };
        };
    },

    // === Reset dependent fields on change ===
    custom_country(frm) {
        frm.set_value('custom_state_province', '');
        frm.set_value('custom_district', '');
        frm.set_value('custom_city_municipality', '');
        update_employee_address(frm);
    },

    custom_state_province(frm) {
        frm.set_value('custom_district', '');
        frm.set_value('custom_city_municipality', '');
        update_employee_address(frm);
    },

    custom_district(frm) {
        frm.set_value('custom_city_municipality', '');
        update_employee_address(frm);
    },

    custom_city_municipality(frm) {
        update_employee_address(frm);
    },

    custom_street_address_line(frm) {
        update_employee_address(frm);
    },

    custom_ward_sector_number(frm) {
        update_employee_address(frm);
    },
});

// === Function to auto-fill full address ===
function update_employee_address(frm) {
    let city_with_ward = frm.doc.custom_city_municipality || "";
    if (frm.doc.custom_ward_sector_number) {
        city_with_ward += " -" + frm.doc.custom_ward_sector_number;
    }

    let parts = [
        frm.doc.custom_street_address_line,
        city_with_ward,
        frm.doc.custom_district,
        frm.doc.custom_state_province,
        frm.doc.custom_country
    ].filter(Boolean);

    frm.set_value('custom_address', parts.join(', '));
}