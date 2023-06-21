
interface PaginationProps {

    totalPosts: number;
    postsPerPage: number;
    setCurrentPage: any;
    currentPage: any;
    
}

function Pagination(props: PaginationProps): JSX.Element {

    const pages = [];

    for(let i = 1; i <= Math.ceil(props.totalPosts/props.postsPerPage); i++){
        pages.push(i)
    }

    return (
        <div className="Pagination">

			{pages.map((page, index ) =>
            <button key={index} onClick={() => props.setCurrentPage(page)}
            className={page == props.currentPage ? 'active' : ''} >{page}</button>)}

        </div>
    );
}

export default Pagination;