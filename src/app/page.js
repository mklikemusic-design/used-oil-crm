"use client";
import { db } from "./firebase";

import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc
} from "firebase/firestore";

import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
export default function UsedOilResearchCRM() {
  const [company, setCompany] = useState("");
const [contact, setContact] = useState("");
const [phone, setPhone] = useState("");
const [status, setStatus] = useState("Not Called");
const [companies, setCompanies] = useState([]);
const saveEntry = async () => {

  await addDoc(collection(db, "companies"), {
    company,
    contact,
    phone,
    status,
    createdAt: new Date()
  });

  alert("Saved Successfully");

};
const updateEntry = async (id) => {

  const companyRef = doc(
    db,
    "companies",
    id
  );

  await updateDoc(companyRef, {
    status: "Follow-Up Needed"
  });

};
const exportExcel = () => {

  const worksheet =
    XLSX.utils.json_to_sheet(companies);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Companies"
  );

  XLSX.writeFile(
    workbook,
    "used-oil-data.xlsx"
  );
};
  useEffect(() => {

  const unsubscribe = onSnapshot(
    collection(db, "companies"),
    (snapshot) => {

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setCompanies(data);
    }
  );

  return () => unsubscribe();

}, []);
const statuses = [
    'Not Called',
    'Called',
    'No Response',
    'Follow-Up Needed',
    'Interested',
    'Completed'
  ];

  const fields = [
    'Company with Address',
    'Contact With',
    'Phone Number',
    'Annual Licensed Processing Capacity',
    'Primary Sources of Used Oil',
    'Current Sourcing Geographies',
    'Quality Control Process',
    'Supply Chain Challenges',
    'Import Countries',
    'Import Price',
    'Monthly Source vs Import',
    'Recycling Technology',
    'Typical Yield',
    'Contaminant Testing',
    'Group I or II',
    'CPCB Registration',
    'Collector Registration',
    'Procurement Cost',
    'RRBO Selling Price',
    'RRBO vs Virgin Base Oil Pricing',
    'RRBO Offtake Customers',
    'EPR Credits Generated',
    'EPR Credit Price',
    'EPR Credit Buyers',
    'Open to MOU with HPCL',
    'Current Processing Capacity',
    'Current Monthly Processing',
    'Marginal Processing Cost for Additional 50 KL',
    'Notes'
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Used Oil Research CRM</h1>
              <p className="text-gray-500 mt-1">
                Fast research data entry dashboard for recycler and RRBO market calls
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <button
              onClick={saveEntry}
              className="px-5 py-2 rounded-2xl bg-black text-white font-medium">
                Save Entry
              </button>

              <button className="px-5 py-2 rounded-2xl border border-gray-300 font-medium">
                Save & Next
              </button>

              <button 
              onClick={exportExcel}
              className="px-5 py-2 rounded-2xl border border-gray-300 font-medium">
                Export Excel
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl shadow p-5">
            <div className="text-sm text-gray-500">Total Companies</div>
            <div className="text-3xl font-bold mt-2">420</div>
          </div>

          <div className="bg-white rounded-3xl shadow p-5">
            <div className="text-sm text-gray-500">Calls Today</div>
            <div className="text-3xl font-bold mt-2">37</div>
          </div>

          <div className="bg-white rounded-3xl shadow p-5">
            <div className="text-sm text-gray-500">Follow-Ups Pending</div>
            <div className="text-3xl font-bold mt-2">12</div>
          </div>

          <div className="bg-white rounded-3xl shadow p-5">
            <div className="text-sm text-gray-500">Interested in MOU</div>
            <div className="text-3xl font-bold mt-2">18</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Call Status</label>
              <select className="w-full border border-gray-300 rounded-2xl px-4 py-3">
                {statuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Call Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-2xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Follow-Up Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-2xl px-4 py-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {fields.map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium mb-2">{field}</label>

                {field === 'Notes' ||
                field === 'Supply Chain Challenges' ||
                field === 'Marginal Processing Cost for Additional 50 KL' ? (
                  <textarea
                    rows={5}
                    placeholder={`Enter ${field}`}
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3"
                  />
                ) : (
                  <input
                    type="text"
                    placeholder={`Enter ${field}`}
                    value={field === "Company with Address" ? company : ""}
                    onChange={(e) => {
                      if (field === "Company with Address") {
                        setCompany(e.target.value);
                      }
                    }}
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold">Recent Entries</h2>

            <div className="flex gap-3 flex-wrap">
              <input
                type="text"
                placeholder="Search company"
                className="border border-gray-300 rounded-2xl px-4 py-2"
              />

              <select className="border border-gray-300 rounded-2xl px-4 py-2">
                <option>All Status</option>
                {statuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="py-3">Company</th>
                  <th className="py-3">Contact</th>
                  <th className="py-3">Phone</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">MOU</th>
                  <th className="py-3">Group</th>
                  <th className="py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4">ABC Re-Refiners Pvt Ltd</td>
                  <td className="py-4">Rajesh Sharma</td>
                  <td className="py-4">9876543210</td>
                  <td className="py-4">
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
                      Follow-Up Needed
                    </span>
                  </td>
                  <td className="py-4">Yes</td>
                  <td className="py-4">Group II</td>
                  <td className="py-4">
                    <button className="px-3 py-1 border rounded-xl">
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Recommended Backend Setup</h2>

          <div className="space-y-3 text-gray-700">
            <p>• Frontend: React + Tailwind</p>
            <p>• Database: Firebase or Google Sheets</p>
            <p>• Export: Excel/CSV</p>
            <p>• Hosting: Vercel</p>
            <p>• Authentication: Google Login (optional)</p>
            <p>• Analytics: Built-in dashboard cards</p>
            <p>• Editable Entries: Fully supported</p>
          </div>
        </div>
      </div>
    </div>
  );
}
