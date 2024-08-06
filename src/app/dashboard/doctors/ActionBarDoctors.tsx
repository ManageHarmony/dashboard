import { FiBell, FiPlus } from "react-icons/fi";

export default function ActionBarDoctors() {
    return (
        <div style={{backgroundColor: "#fff", padding: "10px 15px", borderRadius: "10px", marginBottom: "20px", width: "100%"}}>
            <div className="action-bar text-lg font-semibold mb-2">Action Bar</div>
            <div className="flex space-x-3">
                <button className="text-orange-600 py-2 px-3 rounded flex items-center" style={{ background: "#fff", border: "1px dashed orange" }}>
                    All Consultants <FiBell className="ml-2" />
                </button>
                <button className="text-orange-600 py-2 px-3 rounded flex items-center" style={{ background: "#fff" ,border: "1px dashed orange"}}>
                     Add New Doctor
                </button>
                <button className="text-orange-600 py-2 px-3 rounded flex items-center" style={{ background: "#fff", border: "1px dashed orange" }}>
                     View Pendings
                </button>
            </div>
        </div>
    )
}