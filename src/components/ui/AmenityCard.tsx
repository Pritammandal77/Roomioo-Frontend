

export default function AmenityCard({ label, active = true, icon }: any) {
  return (
    <div
      className={`flex items-center gap-2 p-3 rounded-xl text-sm font-medium ${
        active
          ? "bg-green-50 text-green-700"
          : "bg-gray-100 text-gray-600 line-through"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}