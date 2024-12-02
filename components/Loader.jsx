export default function Loader() {
  return (
    <div className="flex gap-5 justify-center items-center">
      <span className="ml-4 text-yellow-400">Cargando...</span>
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-400 border-solid" />
    </div>
  );
}
