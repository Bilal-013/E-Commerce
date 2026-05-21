import ProtectedRoute from "@/components/ProtectedRoute";

export default function SellerDashboardLayout({ children }) {
  // Allow robust management by letting admin also see it
  return (
    <ProtectedRoute allowedRoles={["seller", "admin"]}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-serif font-bold text-[#2c1e16] mb-8 border-b-2 border-[#e8e0d5] pb-2">
          Seller Dashboard
        </h1>
        {children}
      </div>
    </ProtectedRoute>
  );
}
