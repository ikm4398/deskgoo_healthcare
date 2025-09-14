frappe.ui.form.on('Patient', {

    onload(frm) {
        frm.fields_dict.custom_state_province.get_query = function() {
            return {
                filters: {
                    country_name: frm.doc.country
                }
            };
        };

        frm.fields_dict.custom_district.get_query = function() {
            return {
                filters: {
                    country_name: frm.doc.country,
                    state_name: frm.doc.custom_state_province
                }
            };
        };

        frm.fields_dict.custom_city_municipality.get_query = function() {
            return {
                filters: {
                    country_name: frm.doc.country,
                    state_name: frm.doc.custom_state_province,
                    district_name: frm.doc.custom_district
                }
            };
        };
    },

    country(frm) {
        frm.set_value('custom_state_province', '');
        frm.set_value('custom_district', '');
        frm.set_value('custom_city_municipality', '');
        update_patient_address(frm);
    },

    custom_state_province(frm) {
        frm.set_value('custom_district', '');
        frm.set_value('custom_city_municipality', '');
        update_patient_address(frm);
    },

    custom_district(frm) {
        frm.set_value('custom_city_municipality', '');
        update_patient_address(frm);
    },

    custom_city_municipality(frm) {
        update_patient_address(frm);
    },

    custom_street_address_line(frm) {
        update_patient_address(frm);
    },

    custom_ward_sector_number(frm) {
        update_patient_address(frm);
    }
});

function update_patient_address(frm) {
    let city_with_ward = frm.doc.custom_city_municipality || "";
    if (frm.doc.custom_ward_sector_number) {
        city_with_ward += " -" + frm.doc.custom_ward_sector_number;
    }

    let parts = [
        frm.doc.custom_street_address_line,
        city_with_ward,
        frm.doc.custom_district,
        frm.doc.custom_state_province,
        frm.doc.country
    ].filter(Boolean);

    frm.set_value('custom_address', parts.join(', '));
}
