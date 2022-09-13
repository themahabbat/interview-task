import React from 'react';
import DatePicker from './components/DatePicker';

function App() {
    return (
        <div className="p-4 bg-gray-50 shadow rounded">

            <div className="flex items-center">
                <span className='mr-4'>Please select date range:</span>

                <DatePicker />
            </div>

        </div>
    );
}

export default App;
