export default function FeatureTable({ features }) {
  return (
    <div className='overflow-x-auto rounded-lg border'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              기능
            </th>
            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              React.js
            </th>
            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Next.js
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {features.map((feature, index) => (
            <tr key={index} className='hover:bg-gray-50'>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{feature.name}</td>
              <td className='px-6 py-4 text-sm text-gray-500'>{feature.react}</td>
              <td className='px-6 py-4 text-sm text-gray-500'>{feature.nextjs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
