import React, { useState } from 'react'
import Filter from './Filter'
import CourseSkeleton from '@/utills/CourseSkeleton';
import CourseNotFound from '@/utills/CourseNotFound';
import SearchResult from './SearchResult';
import { useSearchParams } from 'react-router-dom';
import { useGetSearchCourseQuery } from '@/features/api/courseApi';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [selectedCategories, setSelectedCatgories] = useState([]);
    const [sortByPrice, setSortByPrice] = useState("");
    const { data, isLoading } = useGetSearchCourseQuery({ searchQuery: query, categories: selectedCategories, sortByPrice })

    const isEmpty = !isLoading && data?.courses?.length == 0;
    const handleFilterChange = (category, price) => {
        setSelectedCatgories(category);
        setSortByPrice(price)
    }
    return (
        <div className='max-w-7xl mx-auto p-4 md:p-8 mt-5'>
            <div className="my-6">
                <h1 className='font-bold text-xl md:text-2xl'>result for "{query}"</h1>
                <p>Showing results for {" "}  <span className='text-blue-800 font-bold italic'>{query}</span></p>
            </div>

            <div className='flex flex-col md:flex-row gap-2'>
                <Filter handleFilterChange={handleFilterChange} />
                <div className="flex-1">
                    {isLoading ? (Array.from({ length: 3 }).map((_, idx) => (
                        <CourseSkeleton key={idx} />
                    ))) : isEmpty ? <CourseNotFound /> : (data?.courses?.map((course, idx) => (<SearchResult key={course._id} course={course} />)))}
                </div>
            </div>
        </div>
    )
}

export default SearchPage