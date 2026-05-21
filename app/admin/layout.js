import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-serif font-bold text-[#8b2323] mb-8 border-b-2 border-[#e8e0d5] pb-2">
          Admin Control Panel
        </h1>
        {children}
      </div>
    </ProtectedRoute>
  );
}
