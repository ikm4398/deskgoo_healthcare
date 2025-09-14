// Copyright (c) 2025, a and contributors
// For license information, please see license.txt

frappe.ui.form.on('Ambulance', {

    onload(frm) {
        // === Filter State based on Country ===
        frm.fields_dict.state_province.get_query = function() {
            return {
                filters: {
                    country_name: frm.doc.country
                }
            };
        };

        // === Filter District based on Country + State ===
        frm.fields_dict.district.get_query = function() {
            return {
                filters: {
                    country_name: frm.doc.country,
                    state_name: frm.doc.state_province
                }
            };
        };

        // === Filter City based on Country + State + District ===
        frm.fields_dict.city_municipality.get_query = function() {
            return {
                filters: {
                    country_name: frm.doc.country,
                    state_name: frm.doc.state_province,
                    district_name: frm.doc.district
                }
            };
        };
    },

    // === Reset dependent fields on change ===
    country(frm) {
        frm.set_value('state_province', '');
        frm.set_value('district', '');
        frm.set_value('city_municipality', '');
        update_address(frm);
    },

    state_province(frm) {
        frm.set_value('district', '');
        frm.set_value('city_municipality', '');
        update_address(frm);
    },

    district(frm) {
        frm.set_value('city_municipality', '');
        update_address(frm);
    },

    city_municipality(frm) {
        update_address(frm);
    },

    street_address_line(frm) {
        update_address(frm);
    },

    ward_sector_number(frm) {
        update_address(frm);
    }
});

// === Function to auto-fill full address ===
function update_address(frm) {
    // Build city with ward number inside it
    let city_with_ward = frm.doc.city_municipality || "";
    if (frm.doc.ward_sector_number) {
        city_with_ward += " -" + frm.doc.ward_sector_number;
    }

    let parts = [
        frm.doc.street_address_line,
        city_with_ward,
        frm.doc.district,
        frm.doc.state_province,
        frm.doc.country
    ].filter(Boolean);

    frm.set_value('address', parts.join(', '));
}

