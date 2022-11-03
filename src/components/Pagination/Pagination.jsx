import Pagination from 'react-bootstrap/Pagination';

const PaginationItem = ( {
    pagination : {
        page, 
        startPage,
        endPage, 
        existNextPage, 
        existPrevPage, 
        limitStart, 
        totalPageCount, 
        totalRecordCount}
}) => {

    const pageList = [];

    if (startPage !== 0 && endPage !== 0) {
        for (let i=startPage; i <= endPage; i++) {
            pageList.push(i);
        }
        console.log(pageList);
    }

    // 현재페이지에
    // <Pagination.Item active>{12}</Pagination.Item>

    return (
        <Pagination size="sm">
        <Pagination.Prev disabled={!existPrevPage} />
        {
            pageList.length > 0
            ?
            pageList.map((pageNum, idx) => (
                <Pagination.Item key={`pagination-item-${idx}`}
                active={pageNum === page}>{pageNum}</Pagination.Item>
            ))
            :
            <Pagination.Item disabled>{1}</Pagination.Item>
        }
        <Pagination.Next disabled={!existNextPage} />
      </Pagination>
    )
}

export default PaginationItem;