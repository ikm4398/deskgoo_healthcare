// Copyright (c) 2025, a and contributors
// For license information, please see license.txt

frappe.ui.form.on("Emergency Register ER", {
	refresh(frm) {
		// Set admission_date to current datetime if not already set
		if (!frm.doc.admission_date) {
			frm.set_value("admission_date", frappe.datetime.now_datetime());
		}

		// Toggle field visibility based on patient_status
		toggle_fields_based_on_status(frm);

		// Toggle fields based on is_medical_legal_case
		toggle_medical_legal_fields(frm);

		// Update blood pressure display
		update_blood_pressure(frm);
	},

	patient_status(frm) {
		// Toggle field visibility when patient_status changes
		toggle_fields_based_on_status(frm);
	},

	is_medical_legal_case(frm) {
		// Toggle brought_by and brought_by_contact_number based on is_medical_legal_case
		toggle_medical_legal_fields(frm);
	},

	blood_pressure_systolic(frm) {
		// Update blood pressure when systolic changes
		update_blood_pressure(frm);
	},

	blood_pressure_diastolic(frm) {
		// Update blood pressure when diastolic changes
		update_blood_pressure(frm);
	},
});

// Function to toggle fields based on patient_status
function toggle_fields_based_on_status(frm) {
	let patient_status = frm.doc.patient_status || "";
	let is_admit = patient_status.toLowerCase() === "admit";

	// Show/hide discharge_date
	frm.toggle_display("discharge_date", !is_admit);

	// Show/hide admit_shift_to, ip_number, and bed_number
	frm.toggle_display(["admit_shift_to", "ip_number", "bed_number"], is_admit);
}

// Function to toggle fields based on is_medical_legal_case
function toggle_medical_legal_fields(frm) {
	let is_medical_legal = frm.doc.is_medical_legal_case || 0;

	// Show/hide brought_by and brought_by_contact_number
	frm.toggle_display(["brought_by", "brought_by_contact_number"], is_medical_legal);
}

// Function to update blood_pressure field
function update_blood_pressure(frm) {
	let systolic = frm.doc.blood_pressure_systolic || "";
	let diastolic = frm.doc.blood_pressure_diastolic || "";

	if (systolic && diastolic) {
		frm.set_value("blood_pressure", `${systolic}/${diastolic} mmHg`);
	} else {
		frm.set_value("blood_pressure", "");
	}
}
