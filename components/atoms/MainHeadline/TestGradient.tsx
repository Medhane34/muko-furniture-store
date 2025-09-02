import React from 'react';
import Highlight from './Highlight';

const TestGradient = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Gradient Text Test</h2>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">Primary Gradient:</p>
          <div className="p-3 bg-gray-100 rounded">
            <span className="text-2xl font-bold">
              Normal text <Highlight>Gradient text</Highlight>
            </span>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-600 mb-1">Secondary Gradient:</p>
          <div className="p-3 bg-gray-100 rounded">
            <span className="text-2xl font-bold">
              Normal text <Highlight gradient="secondary">Gradient text</Highlight>
            </span>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-600 mb-1">With Background (test visibility):</p>
          <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded">
            <span className="text-2xl font-bold">
              <Highlight>This should be visible on light background</Highlight>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestGradient;