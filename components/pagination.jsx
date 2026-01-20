"use client"
import { useEffect, useState } from 'react';
import classes from './pagination.module.css';
import { countPosts } from '@/lib/news';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import useCountPages from './use-count-pages';

export default function Pagination() {
    const limit = 3
    const {pageNumber} = useCountPages(limit)
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    
    return (
        <nav aria-label="Page navigation example">
            <ul className={classes.pagination}>

                <li className={classes.pageItem}>
                    <Link
                        href={`?page=${currentPage - 1}`}
                        className={classes.pageLink}
                    >
                        Previous
                    </Link>
                </li>

                {Array.from({ length: pageNumber }, (_, i) => (
                    <li key={i} className={classes.pageItem}>
                        <Link
                            href={`?page=${i + 1}`}
                            className={`${classes.pageLink} ${currentPage === i + 1 ? classes.active : ''}`}
                        >
                            {i + 1}
                        </Link>
                    </li>
                ))}

                <li className={classes.pageItem}>
                    <Link
                        href={`?page=${currentPage + 1}`}
                        className={classes.pageLink}
                    >
                        Next
                    </Link>
                </li>
            </ul>
        </nav>
    )
}