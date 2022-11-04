import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { createQueryObj } from '../../utils/searchutils';

const PaginationItem = ( {
    pagination : {
        startPage,
        endPage, 
        existNextPage, 
        existPrevPage, 
        limitStart, 
        totalPageCount, 
        totalRecordCount}
}) => {

    const [searchParams] = useSearchParams();
    const queryList = [...searchParams];
    const q = createQueryObj(queryList);

    const navigate = useNavigate();
    const loc = useLocation();
    const parentPath = loc.pathname.split("/").filter(str => str)[0];
    // console.log(loc.pathname, loc.pathname.split("/").filter(str => str))

    const [thisPage, setThisPage] = useState(1);
    const pageList = [];
    if (startPage !== 0 && endPage !== 0) {
        for (let i=startPage; i <= endPage; i++) {
            pageList.push(String(i));
        }
        console.log("pageList", pageList);
    }

    
    useEffect(() => {
        console.log("searchParams: ", q)
        if ("page" in q) {
            setThisPage(q.page[0]);
        }
    
        console.log(thisPage);

    }, [searchParams, thisPage]);

    const onClickPageBtn = (targetPage) => {
        console.log("page:",targetPage);
        const params = q;
        params['page'] = targetPage;
        console.log("parentPath: ", parentPath)
        navigate({
            pathname: `/${parentPath ? parentPath : ""}`,
            search: `?${createSearchParams(params)}`
        });
    }   

    return (
        <Pagination size="sm">
        <Pagination.Prev disabled={!existPrevPage} />
        {
            pageList.length > 0
            ?
            pageList.map((pageNum, idx) => (
                    <Pagination.Item key={`pagination-item-${idx}`}
                        onClick={() => onClickPageBtn(pageNum)}
                        active={pageNum == thisPage}>
                            {pageNum}
                    </Pagination.Item>
                )
            )
            :
            <Pagination.Item disabled>{1}</Pagination.Item>
        }
        <Pagination.Next disabled={!existNextPage} />
      </Pagination>
    )
}

export default PaginationItem;