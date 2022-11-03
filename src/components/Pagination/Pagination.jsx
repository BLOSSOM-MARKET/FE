import Pagination from 'react-bootstrap/Pagination';

const PaginationItem = ( {
    pagination : {
        page, 
        endPage, 
        existNextPage, 
        existPrevPage, 
        limitStart, 
        startPage, 
        totalPageCount, 
        totalRecordCount}
}) => {

    // 현재페이지에
    // <Pagination.Item active>{12}</Pagination.Item>

    return (
        <Pagination size="sm">
        <Pagination.Prev disabled={!existPrevPage} />
        <Pagination.Item>{1}</Pagination.Item>
  
        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item>{11}</Pagination.Item>
        <Pagination.Item active>{12}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Item disabled>{14}</Pagination.Item>
  
        <Pagination.Item>{20}</Pagination.Item>
        <Pagination.Next disabled={!existNextPage} />
      </Pagination>
    )
}

export default PaginationItem;