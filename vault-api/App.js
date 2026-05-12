export default function VaultFinanceApp() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Vault Finance</h1>
            <p className="text-gray-400 mt-2">
              Personal Finance Management Dashboard
            </p>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl">
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
            <h2 className="text-gray-400">Total Income</h2>
            <p className="text-3xl font-bold mt-3 text-green-400">
              ₹50,000
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
            <h2 className="text-gray-400">Total Expenses</h2>
            <p className="text-3xl font-bold mt-3 text-red-400">
              ₹32,000
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
            <h2 className="text-gray-400">Balance</h2>
            <p className="text-3xl font-bold mt-3 text-blue-400">
              ₹18,000
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">
              Add Transaction
            </h2>

            <form className="space-y-4">
              <input
                type="number"
                placeholder="Amount"
                className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700"
              />

              <input
                type="text"
                placeholder="Description"
                className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700"
              />

              <select className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700">
                <option>Food</option>
                <option>Salary</option>
                <option>Shopping</option>
                <option>Rent</option>
              </select>

              <input
                type="date"
                className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700"
              />

              <button className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold">
                Save Transaction
              </button>
            </form>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">
              Recent Transactions
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-xl flex justify-between">
                <div>
                  <p className="font-semibold">Groceries</p>
                  <p className="text-sm text-gray-400">
                    Food Category
                  </p>
                </div>

                <p className="text-red-400 font-bold">
                  - ₹2,000
                </p>
              </div>

              <div className="bg-gray-800 p-4 rounded-xl flex justify-between">
                <div>
                  <p className="font-semibold">Salary</p>
                  <p className="text-sm text-gray-400">
                    Income Category
                  </p>
                </div>

                <p className="text-green-400 font-bold">
                  + ₹50,000
                </p>
              </div>

              <div className="bg-gray-800 p-4 rounded-xl flex justify-between">
                <div>
                  <p className="font-semibold">Netflix</p>
                  <p className="text-sm text-gray-400">
                    Entertainment
                  </p>
                </div>

                <p className="text-red-400 font-bold">
                  - ₹500
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-gray-900 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            API Connection Example
          </h2>

          <pre className="bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm text-green-400">
{`fetch('http://localhost:5000/api/transactions', {
  method: 'GET',
  headers: {
    Authorization: 'Bearer YOUR_TOKEN'
  }
})
.then(res => res.json())
.then(data => console.log(data))`}
          </pre>
        </div>
      </div>
    </div>
  )
}
