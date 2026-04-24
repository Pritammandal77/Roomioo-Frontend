export default function PrefCard({ icon, title, value }: any) {
  return (
    <div className="flex items-center gap-3 bg-green-50 p-4 rounded-xl hover:shadow-sm transition">
      <div className="text-green-600">{icon}</div>

      <div>
        <p className="text-xs text-gray-600">{title}</p>
        <p className="text-sm font-semibold text-gray-800 capitalize">
          {value}
        </p>
      </div>
    </div>
  );
}