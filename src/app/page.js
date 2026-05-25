"use client";
import { db } from "./firebase";

import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as XLSX from "xlsx";
export default function UsedOilResearchCRM() {
  const [formData, setFormData] = useState({
  company: "",
  contact: "",
  phone: "",
  status: "Not Called",
followUpDate: "",
rrboFuelOil: "",
fuelPreference: "",
monthlySourceImport: "",
  capacity: "",
  sources: "",
  geographies: "",
  quality: "",
  IS18722: "",
  challenges: "",
  importCountries: "",
  importPrice: "",
  technology: [],
  yield: "",
  contaminants: "",
  group: "",
  cpcb: "",
  collector: "",
  procurementCost: "",
  rrboPrice: "",
  customers: "",
  eprCredits: "",
  eprPrice: "",
  eprBuyers: "",
  mou: "",
  processingCapacity: "",
  monthlyProcessing: "",
  marginalCost: "",

workshopType: "",
oilChanges: "",
usedOilGenerated: "",
storageMethod: "",
collectorName: "",
sellingPrice: "",
buyerType: "",
formalCollection: "",
Saleprice: "",
industryType: "",
monthlyOil: "",
storageCapacity: "",
disposalMethod: "",
authorizedRecycler: "",
disposalCost: "",
disposalFrequency: "",
eprAwareness: "",
formalInterest: "",

notes: ""
});
const [companies, setCompanies] = useState([]);
const [editingId, setEditingId] = useState(null);
const [researchType, setResearchType] =
  useState("Recycler");
const [searchTerm, setSearchTerm] =
  useState("");

const [statusFilter, setStatusFilter] =
  useState("All Status");
const saveEntry = async () => {

  if (editingId) {

    await updateDoc(
      doc(db, "companies", editingId),
      {
        ...formData,
      
      updatedAt:
  new Date().toLocaleString()
    });

    toast.success("Entry updated successfully");

    setEditingId(null);

  } else {

    await addDoc(collection(db, "companies"), {
      ...formData,
type: researchType,
createdAt:
  new Date().toLocaleString()
    });

    toast.success("Entry saved successfully");
  }

  setFormData({
  followUpDate: "",
rrboFuelOil: "",
fuelPreference: "",
monthlySourceImport: "",
  company: "",
  contact: "",
  phone: "",
  status: "Not Called",

  capacity: "",
  sources: "",
  geographies: "",
  quality: "",
  IS18722: "",
  challenges: "",
  importCountries: "",
  importPrice: "",
  technology: [],
  yield: "",
  contaminants: "",
  group: "",
  cpcb: "",
  collector: "",
  procurementCost: "",
  rrboPrice: "",
  customers: "",
  eprCredits: "",
  eprPrice: "",
  eprBuyers: "",
  mou: "",
  processingCapacity: "",
  monthlyProcessing: "",
  marginalCost: "",

workshopType: "",
oilChanges: "",
usedOilGenerated: "",
storageMethod: "",
collectorName: "",
sellingPrice: "",
buyerType: "",
formalCollection: "",
Saleprice: "",
industryType: "",
monthlyOil: "",
storageCapacity: "",
disposalMethod: "",
authorizedRecycler: "",
disposalCost: "",
disposalFrequency: "",
eprAwareness: "",
formalInterest: "",

notes: ""
});

};


const deleteEntry = async (id) => {

  const confirmDelete = confirm(
    "Delete this entry?"
  );

  if (!confirmDelete) return;

  await deleteDoc(doc(db, "companies", id));
  toast.success("Entry deleted");

};
const cleanData = (data) => {

  return data.map((item) => {

    const cleaned = {};

    Object.keys(item).forEach((key) => {

      if (
        item[key] !== "" &&
        item[key] !== undefined &&
        item[key] !== null
      ) {
        cleaned[key] = Array.isArray(item[key])
  ? item[key].join(", ")
  : item[key];
      }

    });

    return cleaned;

  });

};
const exportExcel = () => {

  const workbook = XLSX.utils.book_new();

  const recyclers =
  companies.filter(
    c => c.type === "Recycler"
  );

  const workshops =
  companies.filter(
    c => c.type === "Workshop"
  );

  const industrial =
  companies.filter(
    c => c.type === "Industrial"
  );

  const recyclerSheet =
    XLSX.utils.json_to_sheet(
  cleanData(recyclers)
);

  const workshopSheet =
    XLSX.utils.json_to_sheet(
  cleanData(workshops)
);

  const industrialSheet =
    XLSX.utils.json_to_sheet(
  cleanData(industrial)
);

  XLSX.utils.book_append_sheet(
    workbook,
    recyclerSheet,
    "Recyclers"
  );

  XLSX.utils.book_append_sheet(
    workbook,
    workshopSheet,
    "Workshops"
  );

  XLSX.utils.book_append_sheet(
    workbook,
    industrialSheet,
    "Industrial"
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

  const recyclerFields = [
  {
    label: "Company with Address",
    key: "company"
  },
  {
    label: "Contact With",
    key: "contact"
  },
  {
    label: "Phone Number",
    key: "phone"
  },
  
  {
    label: "Primary Sources of Used Oil",
    key: "sources"
  },
  {
    label: "Current Sourcing Geographies",
    key: "geographies"
  },
  {
    label: "Quality Control Process",
    key: "quality"
  },
  {
  label: "Meet IS 18722",
  key: "IS18722",
  type: "select",
  options: ["Yes", "No"]
},
  {
    label: "Supply Chain Challenges",
    key: "challenges"
  },
  {
    label: "Do you sell only RRBO or also fuel oil?",
    key: "rrboFuelOil"
  },
  {
    label: "When do recyclers prefer fuel applications over re-refining?",
    key: "fuelPreference"
  },
  {
    label: "Import Countries",
    key: "importCountries"
  },
  {
    label: "Import Price",
    key: "importPrice"
  },
  {
    label: "Import Percentage",
    key: "ImportPercent"
  },
  {
  label: "Recycling Technology",
  key: "technology",
  type: "checkbox",
  options: [
    "Hydrotreatment",
    "Vacuum Distillation",
    "Acid-Clay",
    "Thin Film Evaporation",
    "Blending",
    "Other"
  ]
},
  {
    label: "Typical Yield",
    key: "yield"
  },
  
  
  {
  label: "CPCB Registration",
  key: "cpcb",
  type: "select",
  options: ["Yes", "No", "Maybe"]
},
{
  label: "Collector Registration",
  key: "collector",
  type: "select",
  options: ["Yes", "No", "Maybe"]
},
  {
    label: "Procurement Cost",
    key: "procurementCost"
  },
  {
    label: "RRBO Selling Price",
    key: "rrboPrice"
  },
  
  {
    label: "RRBO Offtake Customers",
    key: "customers"
  },
  {
    label: "EPR Credits Generated",
    key: "eprCredits"
  },
  {
    label: "EPR Credit Price",
    key: "eprPrice"
  },
  {
    label: "EPR Credit Buyers",
    key: "eprBuyers"
  },
  {
  label: "Open to MOU with HPCL",
  key: "mou",
  type: "select",
  options: ["Yes", "No", "Maybe"]
},
  {
    label: "Current Processing Capacity",
    key: "processingCapacity"
  },
  {
    label: "Current Monthly Processing",
    key: "monthlyProcessing"
  },
  {
    label: "Marginal Processing Cost for Additional 50 KL",
    key: "marginalCost"
  },
  {
    label: "Notes",
    key: "notes"
  }
];
const workshopFields = [

  {
    label: "Workshop Name",
    key: "company"
  },

  {
    label: "Contact Person",
    key: "contact"
  },

  {
    label: "Phone Number",
    key: "phone"
  },

  {
  label: "Workshop Type",
  key: "workshopType",
  type: "select",
  options: [
    "Authorized",
    "Local Garage",
    "Fleet Workshop",
    "OEM Service Center"
  ]
},

  {
    label: "Oil Changes Per Day",
    key: "oilChanges"
  },

  {
    label: "Used Oil Generated Per Month",
    key: "usedOilGenerated"
  },

  {
    label: "Used Oil Storage Method",
    key: "storageMethod"
  },

  {
    label: "Who Collects Used Oil?",
    key: "collectorName"
  },

  {
    label: "Selling Price of Used Oil",
    key: "sellingPrice"
  },

  {
  label: "Formal or Informal Buyer",
  key: "buyerType",
  type: "select",
  options: [
    "Formal",
    "Informal",
    "Both"
  ]
},

  {
  label: "Open to Formal Collection?",
  key: "formalCollection",
  type: "select",
  options: ["Yes", "No", "Maybe"]
},

  {
    label: "Major Challenges",
    key: "challenges"
  },

  {
    label: "Notes",
    key: "notes"
  }

];
const industrialFields = [

  {
    label: "Industry Name",
    key: "company"
  },

  {
    label: "Contact Person",
    key: "contact"
  },

  {
    label: "Phone Number",
    key: "phone"
  },

  {
    label: "Industry Type",
    key: "industryType"
  },

  {
    label: "Monthly Used Oil Generation",
    key: "monthlyOil"
  },

  {
    label: "Storage Capacity",
    key: "storageCapacity"
  },
{
    label: "Selling Price",
    key: "Saleprice"
  },
  {
    label: "Current Disposal Method",
    key: "disposalMethod"
  },

  {
  label: "Authorized Recycler?",
  key: "authorizedRecycler",
  type: "select",
  options: ["Yes", "No", "Maybe"]
},

  {
    label: "Disposal Cost",
    key: "disposalCost"
  },

  {
    label: "Frequency of Disposal",
    key: "disposalFrequency"
  },

  {
  label: "Awareness of EPR Rules",
  key: "eprAwareness",
  type: "select",
  options: ["Yes", "No", "Partial"]
},

  {
  label: "Interested in Formal Collection?",
  key: "formalInterest",
  type: "select",
  options: ["Yes", "No", "Maybe"]
},

  {
    label: "Notes",
    key: "notes"
  }

];
const fields =
  researchType === "Recycler"
    ? recyclerFields
    : researchType === "Workshop"
    ? workshopFields
    : industrialFields;
const filteredCompanies =
  companies.filter((company) => {

    const matchesSearch =
      company.company
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    const matchesStatus =
      statusFilter === "All Status"
        ? true
        : company.status === statusFilter;

    return (
      matchesSearch &&
      matchesStatus
    );

});
const followUps =
  companies.filter(
    c => c.status === "Follow-Up Needed"
  ).length;

const interestedCompanies =
  companies.filter((c) => {

    const mou =
      c.mou || "";

    return (
      mou.toString().trim().toLowerCase()
      === "yes"
    );

  }).length;
  return (
  <div
  
    className="
      relative
      min-h-screen
      bg-cover
      bg-center
      bg-fixed
      p-4 md:p-8
    "
    style={{
      backgroundImage:
        "url('/background.jpg')"
    }}
  >
<Toaster
  position="top-right"
  toastOptions={{
    style: {
      background: "#111827",
      color: "#fff",
      borderRadius: "14px",
      padding: "12px 16px"
    }
  }}
/>
    <div className="absolute inset-0 bg-black/30"></div>

    <div className="relative z-10 max-w-7xl mx-auto space-y-6">

        <div className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl shadow-[0_8px_32px_rgba(31,38,135,0.15)] p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

  <div className="flex items-center gap-4">

    <img
      src="/logo.png"
      className="h-14"
    />

    <div>
      <h1 className="text-3xl font-bold text-white">
        Used Oil Ecosystem Intelligence Platform
      </h1>

      <p className="text-white/80 mt-1">
        Research data entry dashboard for recycler and RRBO market calls
      </p>
    </div>

  </div>

            <div className="flex gap-3 flex-wrap">
              <button
              onClick={saveEntry}
              className="px-5 py-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-medium">
                {editingId ? "Update Entry" : "Save Entry"}
              </button>

              
              <button 
              onClick={exportExcel}
              className="
px-5 py-2
rounded-2xl
border border-white/20
bg-white/10
text-white
font-medium
backdrop-blur-md
hover:bg-white/20
transition
">
                Export Excel
              </button>
              
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl shadow p-5">
            <div className="text-sm text-white/80">Total Companies</div>
            <div className="text-3xl font-bold mt-2">
  {companies.length}
</div>
          </div>

          <div className="
bg-white/40
backdrop-blur-xl
border border-white/30
shadow-xl
rounded-3xl
p-5
">

  <div className="text-sm text-white/70">
    Follow-Ups Pending
  </div>

  <div className="text-3xl font-bold mt-2 text-black">
    {followUps}
  </div>

</div>

          

          <div className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl shadow p-5">
            <div className="text-sm text-white/80">Interested in MOU</div>
            <div className="text-3xl font-bold mt-2">{interestedCompanies}</div>
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl shadow-[0_8px_32px_rgba(31,38,135,0.15)] p-6 space-y-6">
          <div>
  <label className="block text-sm font-medium text-white/90 mb-2">
    Research Type
  </label>

  <select
    value={researchType}
    onChange={(e) =>
      setResearchType(e.target.value)
    }
    className="
w-full
appearance-none
border border-white/20
bg-white/10
text-black
placeholder:text-black/40
rounded-2xl
px-4 py-3
backdrop-blur-md
focus:outline-none
focus:ring-2
focus:ring-blue-400
"
  >
    <option>Recycler</option>
    <option>Workshop</option>
    <option>Industrial</option>
  </select>
</div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Call Status</label>
              <select
  value={formData.status}
  onChange={(e) =>
    setFormData({
      ...formData,
      status: e.target.value
    })
  }
  className="
w-full
appearance-none
border border-white/20
bg-white/10
text-black
placeholder:text-black/40
rounded-2xl
px-4 py-3
backdrop-blur-md
focus:outline-none
focus:ring-2
focus:ring-blue-400
"
>
                {statuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Follow-Up Date</label>
              <input
  type="date"
  value={formData.followUpDate}
  onChange={(e) =>
    setFormData({
      ...formData,
      followUpDate: e.target.value
    })
  }
  className="
w-full
border border-white/20
bg-white/10
text-black
placeholder:text-black/40
rounded-2xl
px-4 py-3
backdrop-blur-md
focus:outline-none
focus:ring-2
focus:ring-blue-400
"
/>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {fields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-white/90 mb-2">
  {field.label}
</label>

                {field.key === 'notes' ||
field.key === 'challenges' ||
field.key === 'marginalCost' ? (

  <textarea
    rows={5}
    placeholder={`Enter ${field.label}`}
    value={formData[field.key] || ""}
    onChange={(e) =>
      setFormData({
        ...formData,
        [field.key]: e.target.value
      })
    }
    className="
w-full
border border-white/20
bg-white/10
text-black
placeholder:text-black/40
rounded-2xl
px-4 py-3
backdrop-blur-md
focus:outline-none
focus:ring-2
focus:ring-blue-400
"
/>
) : field.type === "checkbox" ? (

<div className="space-y-2">

  {field.options.map((option) => (

    <label
      key={option}
      className="
        flex items-center gap-3
        text-white
      "
    >

      <input
        type="checkbox"
        checked={
          formData[field.key]?.includes(option)
        }

        onChange={(e) => {

          if (e.target.checked) {

            setFormData({
              ...formData,
              [field.key]: [
                ...(formData[field.key] || []),
                option
              ]
            });

          } else {

            setFormData({
              ...formData,
              [field.key]:
                formData[field.key].filter(
                  (item) => item !== option
                )
            });

          }

        }}
      />

      {option}

    </label>

  ))}

</div>

) : field.type === "select" ? (

<select
  value={formData[field.key] || ""}
  onChange={(e) =>
    setFormData({
      ...formData,
      [field.key]: e.target.value
    })
  }
  className="
w-full
appearance-none
border border-white/20
bg-white/10
text-black
rounded-2xl
px-4 py-3
backdrop-blur-md
focus:outline-none
focus:ring-2
focus:ring-blue-400
"
>
  <option value="">
    Select {field.label}
  </option>

  {field.options.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ))}
</select>

) : (

<input
  type="text"
  placeholder={`Enter ${field.label}`}
  value={formData[field.key] || ""}
  onChange={(e) =>
    setFormData({
      ...formData,
      [field.key]: e.target.value
    })
  }
  className="
w-full
border border-white/20
bg-white/10
text-black
placeholder:text-black/40
rounded-2xl
px-4 py-3
backdrop-blur-md
focus:outline-none
focus:ring-2
focus:ring-blue-400
"
/>

)}
              </div>
            ))}
            
                    </div>

          <div className="flex gap-3 flex-wrap mt-6">
            <button
              onClick={saveEntry}
              className="px-5 py-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              {editingId ? "Update Entry" : "Save Entry"}
            </button>

            <button
              onClick={exportExcel}
              className="
px-5 py-2
rounded-2xl
border border-white/20
bg-white/10
text-white
font-medium
backdrop-blur-md
hover:bg-white/20
transition
"
            >
              Export Excel
            </button>
          </div>

        </div>

        <div className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl shadow-[0_8px_32px_rgba(31,38,135,0.15)] p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Entries</h2>

            <div className="flex gap-3 flex-wrap">
              <input
  type="text"
  placeholder="Search company"
  value={searchTerm}
  onChange={(e) =>
    setSearchTerm(e.target.value)
  }
  className="
    border border-white/20
    bg-white/10
    text-black
    placeholder:text-black/40
    rounded-2xl
    px-4 py-2
    backdrop-blur-md
    focus:outline-none
    focus:ring-2
    focus:ring-blue-400
  "
/>

              <select
  value={statusFilter}
  onChange={(e) =>
    setStatusFilter(e.target.value)
  }
  className="
    appearance-none
    border border-white/20
    bg-white/10
    text-black
    rounded-2xl
    px-4 py-2
    backdrop-blur-md
    focus:outline-none
    focus:ring-2
    focus:ring-blue-400
  "
>
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
                  <th className="py-3">Type</th>
                  <th className="py-3">MOU</th>
                  <th className="py-3">Group</th>
                  <th className="py-3">Actions</th>
                </tr>
              </thead>
 <tbody>
  {filteredCompanies.length === 0 ? (
    <tr>
      <td
        colSpan="7"
        className="text-center py-10 text-white/60"
      >
        No entries yet
      </td>
    </tr>
  ) : (
    filteredCompanies.map((company, index) => (
      <tr
  key={company.id || index}
        className="border-b border-gray-100"
      >
        <td className="py-4">
          {company.company}
        </td>

        <td className="py-4">
          {company.contact}
        </td>

        <td className="py-4">
          {company.phone}
        </td>

        <td className="py-4">
          <span className="px-3 py-1 rounded-full bg-gradient-to-br from-slate-200 via-blue-100 to-indigo-200 text-sm">
            {company.status}
          </span>
        </td>
        <td className="py-4">
  {company.type}
</td>

        <td className="py-4">
          {company.mou || "-"}
        </td>

        <td className="py-4">
          {company.group || "-"}
        </td>

        <td className="py-4 flex gap-2">

  <button
    onClick={() => {

      setFormData({
  ...formData,
  ...company,

  technology:
    Array.isArray(company.technology)
      ? company.technology
      : company.technology
      ? [company.technology]
      : []
});
setResearchType(
  company.type || "Recycler"
);

setEditingId(company.id);

    }}
    className="px-3 py-1 border rounded-xl"
  >
    Edit
  </button>

  <button
    onClick={() => deleteEntry(company.id)}
    className="px-3 py-1 border border-red-300 text-red-500 rounded-xl"
  >
    Delete
  </button>

</td>
      </tr>
    ))
  )}
</tbody>
              
            </table>
          </div>
        </div>

        <div className="
bg-white/40
backdrop-blur-xl
border border-white/30
shadow-xl
rounded-3xl
p-6
">

  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

    <div>
      <h2 className="text-xl font-bold text-white">
        System Status
      </h2>

      <p className="text-white/70 mt-1">
        Used Oil Ecosystem Intelligence Platform operational
      </p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

      <div>
        <div className="text-white/60 text-sm">
          Database
        </div>

        <div className="text-green-300 font-semibold">
          Connected
        </div>
      </div>

      <div>
        <div className="text-white/60 text-sm">
          Total Records
        </div>

        <div className="text-white font-semibold">
          {companies.length}
        </div>
      </div>

      <div>
        <div className="text-white/60 text-sm">
          Export
        </div>

        <div className="text-blue-300 font-semibold">
          Ready
        </div>
      </div>

      <div>
        <div className="text-white/60 text-sm">
          Version
        </div>

        <div className="text-white font-semibold">
          v101.0
        </div>
      </div>

    </div>

  </div>
</div>
      </div>
    </div>
  );
}
