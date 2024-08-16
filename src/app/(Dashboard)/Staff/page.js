"use client";
import EmployeeTable from '../../Components/EmployeeTable';
import Subheading from '@/app/Components/Subheading';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/employees");
        const result = await response.json();
        setData(result);
        setCount(result.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle removal of an employee
  const remove = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/employees/${id}`);
      console.log('Deleted');
      // Update data and count after successful deletion
      setData(prevData => prevData.filter(item => item.id !== id));
      setCount(prevCount => prevCount - 1);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="p-4">
      <Subheading title='Staff Management'/>
      <h3 className='font-medium text-2xl leading-9 ml-4 mt-6'>Staff ({count})</h3>
      <div className='flex justify-center items-center mt-6'>
        <div className='w-full max-w-6xl'>
          <EmployeeTable data={data} onRemove={remove} />
        </div>
      </div>
    </div>
  );
};

export default Page;
