import React from 'react';
import { Input } from '@material-tailwind/react'; // Import Input component from Material Tailwind CSS
import { Search } from 'lucide-react'; // Import Search icon from Lucide React Icons


function SearchBar({ handleSearch, search }) {
    
    return (
        <div className="p-4 max-w-2xl mx-auto">
            <Input
                type="search"
                label="Search"
                onChange={handleSearch}
                value={search}
                size='lg'
                icon={<Search className='text-gray-800'/>}
            />
        </div>
    );
}

export default SearchBar;
