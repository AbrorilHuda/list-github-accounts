export default function ListJam() {
  return (
    <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h5 class="mb-4 text-base font-medium text-gray-500 dark:text-gray-400">
        Silahkan pilih waktu kelas
      </h5>
      <button
        type="submit"
        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Kelas 11:00 - 12:00
      </button>
    </div>
  );
}
