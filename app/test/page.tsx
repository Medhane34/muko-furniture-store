import SanityTestComponent from '@/components/test/SanityTestComponent';

export default function SanityTestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Sanity.io Integration Test</h1>
      <p className="text-gray-600 mb-8">
        This page tests the connection between your Next.js app and Sanity.io CMS.
        If everything is configured correctly, you should see products from your Sanity dataset below.
      </p>
      
      <SanityTestComponent />
      
      <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
        <h2 className="font-semibold mb-2">Troubleshooting Tips:</h2>
        <ul className="list-disc list-inside text-sm text-yellow-800 space-y-1">
          <li>Check that your Sanity project ID is correct</li>
          <li>Verify your dataset name matches ('production')</li>
          <li>Ensure CORS settings in Sanity allow your domain</li>
          <li>Check that you have published content in Sanity</li>
          <li>Look at browser console for detailed error messages</li>
        </ul>
      </div>
    </div>
  );
}