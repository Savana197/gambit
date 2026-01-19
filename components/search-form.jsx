'use client'

import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSubmit = (e) => {
        e.preventDefault();

        const value = e.target.search.value;

        const params = new URLSearchParams(searchParams.toString());
        params.set('search', value);
        params.set('page', '1');

        router.push(`?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group mb-3 w-75">
                <input type="text" name="search" className="form-control" placeholder="Search news by title..." aria-describedby="button-addon2" />
                <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Search</button>
            </div>
        </form>
    );
}